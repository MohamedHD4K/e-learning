import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuthStore } from "../stores/auth.store";
import { useMutation } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import { signupUser } from "../services/auth.api";

const Signup = () => {
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [data, setData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    singupMutate(data);
  };

  const handleChanges = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    if (name === "password") validatePassword(value);
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const { mutate: singupMutate, isPending: loading } = useMutation({
    mutationFn: signupUser,
    onSuccess: (data) => {
      login(data.user);
      toast.success(<p className="font-bold">User created successfuly</p>);
      setData({
        username: "",
        password: "",
        email: "",
      });
      setConfirmPassword("");
    },
    onError: (error) => {
      toast.error(<p className="font-bold">{error.message}</p>);
    },
  });

  const validatePassword = (pass: string) => {
    if (pass.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    }
    setPasswordError("");
    return true;
  };

 
  const googleLogin = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      try {
        const token = credentialResponse.code;
        const res = await fetch("http://localhost:3000/api/auth/google/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
          credentials : "include"
        });
  
        const data = await res.json();
  
        if (!res.ok) {
          toast.error(data.error || "Login failed");
          return;
        }
  
        toast.success(<p className="font-bold">Logged in successfully</p>);
      } catch (error) {
        toast.error("Something went wrong during login");
        console.error(error);
      }
    },
    onError: () => {
      toast.error("Google login failed");
    },
    flow: "auth-code",
  });

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-base-200">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-primary">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-secondary">
          Join thousands of learners from around the world
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-base-300 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-secondary"
              >
                User name
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="name"
                  required
                  value={data.username}
                  onChange={handleChanges}
                  className="input input-bordered rounded w-full"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-secondary"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={data.email}
                  onChange={handleChanges}
                  className="input input-bordered rounded w-full"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-secondary"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={data.password}
                  onChange={handleChanges}
                  className={`input input-bordered rounded w-full pr-10 ${
                    passwordError ? "input-error" : ""
                  }`}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {passwordError && (
                <p className="text-sm text-error mt-1">{passwordError}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Must be at least 6 characters
              </p>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-secondary"
              >
                Confirm password
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`input input-bordered rounded w-full ${
                    data.password !== confirmPassword && confirmPassword
                      ? "input-error"
                      : ""
                  }`}
                />
              </div>
              {data.password !== confirmPassword && confirmPassword && (
                <p className="text-sm text-error mt-1">
                  Passwords do not match
                </p>
              )}
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="checkbox checkbox-primary"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-info">
                I agree to the{" "}
                <Link
                  to="/terms"
                  className="text-primary hover:text-primary-focus"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  className="text-primary hover:text-primary-focus"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>

            <div className={`${!agreeTerms && "cursor-not-allowed"}`}>
              <button
                type="submit"
                className={`btn btn-primary ${
                  !agreeTerms &&
                  "opacity-70 pointer-events-none cursor-not-allowed"
                } w-full`}
              >
                {loading ? "Creating account..." : "Create account"}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-base-300 text-gray-500">
                  Or sign up with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => googleLogin()}
                className="btn btn-primary w-full"
              >
                Google
              </button>
              <button type="button" className="btn btn-primary w-full">
                GitHub
              </button>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-primary hover:text-primary-focus"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Signup;
