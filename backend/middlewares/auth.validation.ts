import { body, ValidationChain, validationResult } from "express-validator";
import { NextFunction, Response, Request } from "express";

export const signupValidation: ValidationChain[] = [
  body("username").trim().notEmpty().withMessage("Username is required"),

  body("firstname").trim().notEmpty().withMessage("First name is required"),

  body("lastname").trim().notEmpty().withMessage("Last name is required"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address"),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("confirmPassword")
    .trim()
    .notEmpty()
    .withMessage("Confirm Password is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),

  body("phone")
    .optional()
    .trim()
    .isLength({ min: 11, max: 11 })
    .withMessage("Phone number must be 11 digits")
    .isMobilePhone("any")
    .withMessage("Please enter a valid phone number"),

  body("gender")
    .notEmpty()
    .withMessage("Gender is required")
    .isIn(["MALE", "FEMALE"])
    .withMessage("Gender must be either MALE or FEMALE"),

  body("role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn(["USER", "ADMIN"])
    .withMessage("Role must be either USER or ADMIN"),

  body("birthday")
    .notEmpty()
    .withMessage("Birthday is required")
    .isISO8601()
    .toDate()
    .withMessage("Birthday must be a valid date"),
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
        res.status(422).json({ error: result.array() });
      })
      .catch(next);
  };
};
