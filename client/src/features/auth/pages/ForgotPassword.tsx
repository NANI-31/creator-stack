import React, { useState } from "react";
import { HiLightningBolt, HiMail, HiCheckCircle } from "react-icons/hi";
import { IoArrowBack } from "react-icons/io5";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { Link } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-(--color-primary) p-6">
        <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-xl shadow-orange-500/5 text-center animate-in zoom-in-95 duration-500">
          <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <HiCheckCircle size={48} />
          </div>
          <h2 className="text-3xl font-bold text-(--color-sextary) mb-4">
            Check your inbox
          </h2>
          <p className="text-(--color-quinary)/70 mb-8 leading-relaxed">
            We've sent a password reset link to{" "}
            <span className="font-bold text-(--color-sextary)">{email}</span>.
            Please follow the instructions in the email to reset your password.
          </p>
          <div className="space-y-4">
            <Button
              fullWidth
              onClick={() => setIsSubmitted(false)}
              variant="outline"
            >
              Didn't receive the email? Try again
            </Button>
            <Link
              to="/login"
              className="flex items-center justify-center gap-2 text-sm font-bold text-quaternary hover:underline"
            >
              <IoArrowBack /> Back to login
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
            Everything will be <br />
            <span className="text-white drop-shadow-md">okay.</span>
          </h1>
          <p className="text-lg text-(--color-quinary) max-w-md opacity-90 leading-relaxed">
            Forgotten passwords happen to the best of us. Just tell us your
            email and we'll have you back in the community in no time.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3 text-sm text-(--color-sextary)/60 bg-white/30 backdrop-blur-md px-4 py-3 rounded-2xl w-fit">
          <HiMail size={20} className="text-(--color-tertiary)" />
          <span>secure.community.driven</span>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-5%] left-[-5%] w-48 h-48 bg-orange-200/20 rounded-full blur-2xl" />
      </div>

      {/* Right Side: Forgot Password Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="text-center mb-10">
            {/* Mobile Logo */}
            <div className="lg:hidden flex justify-center items-center gap-2 text-(--color-sextary) mb-8">
              <HiLightningBolt size={28} className="text-(--color-tertiary)" />
              <span className="text-xl font-bold">CreatorStack</span>
            </div>

            <h2 className="text-3xl font-bold text-(--color-sextary) mb-3">
              Forgot your password?
            </h2>
            <p className="text-(--color-quinary)/70 px-4">
              No worries. Enter your email and we'll help you reset it.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <Input
              label="Email Address"
              placeholder="name@company.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />

            <div className="space-y-4">
              <Button type="submit" fullWidth disabled={!email || isLoading}>
                {isLoading ? "Sending Link..." : "Send Reset Link"}
              </Button>

              <Link
                to="/login"
                className="flex items-center justify-center gap-2 text-sm font-bold text-quaternary hover:underline"
              >
                <IoArrowBack /> Back to login
              </Link>
            </div>
          </form>

          <div className="mt-12 p-6 bg-(--color-secondary)/20 rounded-2xl border border-(--color-secondary)/40 flex items-start gap-3">
            <div className="text-(--color-tertiary) mt-0.5">
              <HiMail size={24} />
            </div>
            <p className="text-xs text-(--color-quinary)/70 leading-relaxed">
              We'll send a password reset link to your email. If you don't see
              it in a few minutes, check your spam folder.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
