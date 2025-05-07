import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuthStore } from "../stores/auth.store";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../services/auth.api";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuthStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutate(data);
  };

  const handleChanges = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const { mutate: loginMutate, isPending: loading } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      login(data.user);
      toast.success(<p className="font-bold">Loged in successfuly</p>);
    },
    onError: (error) => {
      toast.error(<p className="font-bold">{error.message}</p>);
    },
  });

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
          Welcome back
        </h2>
        <p className="mt-2 text-center text-sm text-secondary">
          Sign in to continue your learning journey
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
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="username"
                  autoComplete="username"
                  required
                  value={data.username}
                  onChange={handleChanges}
                  className="input input-bordered rounded w-full"
                  placeholder="Enter your name"
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
                  autoComplete="current-password"
                  required
                  placeholder="Enter your password"
                  value={data.password}
                  onChange={handleChanges}
                  className="input input-bordered rounded w-full pr-10"
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
              <div className="flex items-center justify-between mt-2">
                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="font-medium text-primary hover:text-primary-focus"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign in"}
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
                  Or continue with
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
              <button type="button" className="btn text-white bg-base-100 hover:bg-base-200 w-full">
                GitHub
              </button>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-primary hover:text-primary-focus"
            >
              Sign up now
            </Link>
          </p>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
