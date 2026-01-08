import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { HiLightningBolt } from "react-icons/hi";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { registerUser, clearError } from "../slice/auth.slice";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Developer",
    agreeToTerms: false,
  });

  const [localError, setLocalError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    user,
    isLoading,
    error: apiError,
  } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
    return () => {
      dispatch(clearError());
    };
  }, [user, navigate, dispatch]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const val =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
    setLocalError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    const registerData = {
      fullName: formData.fullName,
      username: formData.username,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    };
    dispatch(registerUser(registerData));
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
            Join the elite <br />
            <span className="text-white drop-shadow-md">
              creator community.
            </span>
          </h1>
          <p className="text-lg text-(--color-quinary) max-w-md opacity-90 leading-relaxed">
            Create an account to start sharing your favorite discoveries and
            help fellow creators build amazing things.
          </p>
        </div>

        <div className="relative z-10">
          <div className="p-6 bg-white/20 backdrop-blur-lg rounded-2xl border border-white/30 max-w-sm shadow-xl">
            <p className="text-(--color-sextary) font-medium italic mb-2">
              "This platform changed how I find resources. No more digging
              through spammy lists!"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-(--color-secondary)" />
              <div>
                <p className="text-sm font-bold text-(--color-sextary)">
                  Alex Rivera
                </p>
                <p className="text-xs text-(--color-quinary)/70">
                  Full-stack Developer
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-5%] left-[-5%] w-48 h-48 bg-orange-200/20 rounded-full blur-2xl" />
      </div>

      {/* Right Side: Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 overflow-y-auto">
        <div className="w-full max-w-md py-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="text-center mb-8">
            {/* Mobile Logo */}
            <div className="lg:hidden flex justify-center items-center gap-2 text-(--color-sextary) mb-6">
              <HiLightningBolt size={28} className="text-(--color-tertiary)" />
              <span className="text-xl font-bold">CreatorStack</span>
            </div>

            <h2 className="text-3xl font-bold text-(--color-sextary) mb-2">
              Create Your Account
            </h2>
            <p className="text-(--color-quinary)/70">
              Join the community to discover and share hidden web resources
            </p>
          </div>

          {(apiError || localError) && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm font-bold rounded-2xl animate-in fade-in zoom-in duration-300">
              {apiError || localError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Full Name"
                name="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
              <Input
                label="Username"
                name="username"
                placeholder="johndoe"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <Input
              label="Email Address"
              name="email"
              placeholder="name@company.com"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <div className="w-full flex flex-col gap-1.5 focus-within:text-quaternary transition-colors">
              <label className="text-sm font-medium text-(--color-quinary) ml-1">
                What describes you best?
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-(--color-secondary)/30 border-2 border-transparent text-(--color-sextary) focus:border-quaternary focus:bg-white outline-none transition-all duration-300 appearance-none"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%235E2207'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")",
                  backgroundPosition: "right 1rem center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "1.5em",
                }}
              >
                <option value="Developer">Developer</option>
                <option value="Designer">Designer</option>
                <option value="Creator">Content Creator</option>
                <option value="Editor">Video/Photo Editor</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Password"
                name="password"
                placeholder="••••••••"
                isPassword
                value={formData.password}
                onChange={handleChange}
                required
              />
              <Input
                label="Confirm Password"
                name="confirmPassword"
                placeholder="••••••••"
                isPassword
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex items-start gap-2 pt-2">
              <input
                type="checkbox"
                id="agree"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="mt-1 w-4 h-4 rounded border-(--color-secondary) text-(--color-tertiary) focus:ring-(--color-tertiary) cursor-pointer"
                required
              />
              <label
                htmlFor="agree"
                className="text-xs text-(--color-quinary)/80 cursor-pointer select-none leading-relaxed"
              >
                I agree to the{" "}
                <Link
                  to="/terms"
                  className="text-quaternary font-semibold hover:underline"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  className="text-quaternary font-semibold hover:underline"
                >
                  Privacy Policy
                </Link>
                .
              </label>
            </div>

            <Button
              type="submit"
              fullWidth
              className="mt-2"
              isLoading={isLoading}
            >
              Create My Account
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-(--color-secondary)"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-(--color-primary) px-2 text-(--color-quinary)/40 font-medium">
                  Or join with
                </span>
              </div>
            </div>

            <Button type="button" variant="google" fullWidth>
              <FcGoogle size={20} />
              Sign up with Google
            </Button>
          </form>

          <p className="text-center mt-8 text-(--color-quinary)/70">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-quaternary hover:underline"
            >
              Log in instead
            </Link>
          </p>

          <div className="mt-8 pt-6 border-t border-(--color-secondary)/50 text-center">
            <p className="text-[10px] text-(--color-quinary)/50 uppercase tracking-widest font-bold">
              No spam. No ads. Community-driven.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
