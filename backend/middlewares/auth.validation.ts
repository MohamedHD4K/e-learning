import { body, ValidationChain, validationResult } from "express-validator";
import { NextFunction, Response, Request } from "express";

export const signupValidation: ValidationChain[] = [
  body("username").trim().notEmpty().withMessage("Username is required"),
  body("email").trim().isEmail().withMessage("Invalid email"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password too short"),
];

export const loginValidation: ValidationChain[] = [
  body("username").trim().notEmpty().withMessage("Username is required"),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

export const validate = (validations: ValidationChain[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.all(validations.map((validation) => validation.run(req)))
      .then(() => {
        const result = validationResult(req);
        if (result.isEmpty()) {
          return next();
        }
        res.status(422).json({
          success: false,
          message: "Validation failed",
          errors: result.array().map((err) => ({
            message: err.msg,
          })),
        });
      })
      .catch(next);
  };
};
