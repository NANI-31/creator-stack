import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { HiLightningBolt } from "react-icons/hi";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { loginUser, clearError } from "../slice/auth.slice";

const Login: React.FC = () => {
  const [email, setEmail] = useState("aa1@a.com");
  const [password, setPassword] = useState("a");
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, isLoading, error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      if (user.role === "Admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    }
    return () => {
      dispatch(clearError());
    };
  }, [user, navigate, dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="min-h-screen flex bg-(--color-primary)">
      {/* Left Side: Gradient Panel (Desktop Only) */}
      <div className="hidden lg:flex w-1/2 bg-linear-to-br from-(--color-primary) to-(--color-tertiary) p-12 flex-col justify-between relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-(--color-sextary) mb-12">
            <HiLightningBolt size={32} className="text-(--color-tertiary)" />
            <span className="text-2xl font-bold tracking-tight">
              CreatorStack
            </span>
          </div>

          <h1 className="text-5xl font-extrabold text-(--color-sextary) leading-tight mb-6">
            Discover the web's <br />
            <span className="text-white drop-shadow-md">hidden gems.</span>
          </h1>
          <p className="text-lg text-(--color-quinary) max-w-md opacity-90 leading-relaxed">
            Join a community of developers and designers sharing high-quality
            tools that help you build better products.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-4 text-sm font-medium text-(--color-quinary)">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border-2 border-white bg-gray-200"
              />
            ))}
          </div>
          <span>Trusted by 5,000+ creators</span>
        </div>

        {/* Decorative circle */}
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-orange-200/20 rounded-full blur-2xl" />
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="text-center mb-10">
            {/* Mobile Logo */}
            <div className="lg:hidden flex justify-center items-center gap-2 text-(--color-sextary) mb-6">
              <HiLightningBolt size={28} className="text-(--color-tertiary)" />
              <span className="text-xl font-bold">CreatorStack</span>
            </div>

            <h2 className="text-3xl font-bold text-(--color-sextary) mb-2">
              Welcome Back
            </h2>
            <p className="text-(--color-quinary)/70">
              Login to discover and share hidden gems on the web
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm font-bold rounded-2xl animate-in fade-in zoom-in duration-300">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email Address"
              placeholder="name@company.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="space-y-1.5">
              <Input
                label="Password"
                placeholder="••••••••"
                isPassword
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="flex justify-end">
                <Link
                  to="/forgot-password"
                  title="Recover your password"
                  className="text-sm font-medium text-quaternary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-(--color-secondary) text-(--color-tertiary) focus:ring-(--color-tertiary) cursor-pointer"
              />
              <label
                htmlFor="remember"
                className="text-sm text-(--color-quinary)/80 cursor-pointer select-none"
              >
                Remember me for 30 days
              </label>
            </div>

            <Button type="submit" fullWidth isLoading={isLoading}>
              Login to Account
            </Button>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-(--color-secondary)"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-(--color-primary) px-2 text-(--color-quinary)/40">
                  Or continue with
                </span>
              </div>
            </div>

            <Button type="button" variant="google" fullWidth>
              <FcGoogle size={20} />
              Google Authentication
            </Button>
          </form>

          <p className="text-center mt-10 text-(--color-quinary)/70">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="font-bold text-quaternary hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
