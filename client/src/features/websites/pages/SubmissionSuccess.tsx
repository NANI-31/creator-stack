import React from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineCheckCircle,
  HiOutlineArrowRight,
  HiOutlineClock,
  HiOutlineLightBulb,
} from "react-icons/hi";
import Button from "../../../components/ui/Button";

const SubmissionSuccess: React.FC = () => {
  // Mock data for display - in a real app, this might come from route state or Redux
  const submissionDetails = {
    name: "AI Design Helper",
    category: "Design Resources",
    date: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-6 duration-1000">
      <div className="max-w-3xl mx-auto py-8">
        {/* Main Confirmation Card */}
        <div className="bg-(--color-secondary)/40 backdrop-blur-sm border border-(--color-secondary)/50 rounded-[3.5rem] p-10 md:p-16 text-center shadow-2xl shadow-orange-500/5 relative overflow-hidden">
          {/* Background Decorative Gradient */}
          <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-(--color-primary) via-tertiary to-(--color-primary)" />

          {/* Icon & Visual */}
          <div className="flex justify-center mb-10">
            <div className="relative">
              <div className="absolute inset-0 bg-tertiary/20 rounded-full blur-2xl animate-pulse" />
              <div className="relative w-24 h-24 bg-white rounded-full flex items-center justify-center text-tertiary shadow-xl">
                <HiOutlineCheckCircle
                  size={56}
                  className="animate-in zoom-in-50 duration-500"
                />
              </div>
            </div>
          </div>

          {/* Title & Message */}
          <div className="space-y-4 mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-(--color-sextary) tracking-tight">
              Website Submitted Successfully!
            </h1>
            <p className="text-xl font-medium text-(--color-quinary)/70 max-w-xl mx-auto leading-relaxed">
              Your submission for{" "}
              <span className="text-(--color-sextary) font-black">
                "{submissionDetails.name}"
              </span>{" "}
              has been received and is now under review.
            </p>
          </div>

          {/* Status Indicator */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/60 rounded-full border border-orange-200/50 mb-12 shadow-sm">
            <div className="w-2.5 h-2.5 rounded-full bg-tertiary animate-pulse" />
            <span className="text-sm font-black text-quaternary uppercase tracking-widest">
              Review Pending
            </span>
          </div>

          {/* Timeline / Steps */}
          <div className="max-w-lg mx-auto mb-16 px-4">
            <div className="relative flex justify-between">
              {/* Progress Line */}
              <div className="absolute top-5 left-0 w-full h-1 bg-(--color-quinary)/10 rounded-full">
                <div className="w-[45%] h-full bg-tertiary rounded-full shadow-[0_0_10px_rgba(240,148,16,0.5)]" />
              </div>

              {/* Steps */}
              {[
                {
                  label: "Submitted",
                  icon: HiOutlineCheckCircle,
                  status: "complete",
                },
                {
                  label: "Under Review",
                  icon: HiOutlineClock,
                  status: "current",
                },
                {
                  label: "Approved",
                  icon: HiOutlineCheckCircle,
                  status: "pending",
                },
              ].map((step, i) => (
                <div
                  key={i}
                  className="relative flex flex-col items-center gap-3 z-10 w-24"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      step.status === "complete"
                        ? "bg-tertiary text-white shadow-lg"
                        : step.status === "current"
                        ? "bg-white border-4 border-tertiary text-tertiary shadow-md"
                        : "bg-white border-2 border-(--color-quinary)/10 text-(--color-quinary)/30"
                    }`}
                  >
                    <step.icon size={20} />
                  </div>
                  <span
                    className={`text-[10px] font-black uppercase tracking-widest ${
                      step.status === "complete" || step.status === "current"
                        ? "text-(--color-sextary)"
                        : "text-(--color-quinary)/40"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto mb-12">
            <div className="bg-white/40 p-5 rounded-3xl border border-white/60 text-left">
              <p className="text-[10px] font-black text-(--color-quinary)/40 uppercase tracking-widest mb-1">
                Category
              </p>
              <p className="text-sm font-bold text-(--color-sextary)">
                {submissionDetails.category}
              </p>
            </div>
            <div className="bg-white/40 p-5 rounded-3xl border border-white/60 text-left">
              <p className="text-[10px] font-black text-(--color-quinary)/40 uppercase tracking-widest mb-1">
                Expected Review
              </p>
              <p className="text-sm font-bold text-(--color-sextary)">
                24–48 Hours
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/my-contributions" className="w-full sm:w-auto">
              <Button
                variant="primary"
                className="w-full px-8! py-4! text-base shadow-xl shadow-orange-500/20"
              >
                View My Submissions
              </Button>
            </Link>
            <Link to="/submit" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full px-8! py-4! text-base bg-white! border-transparent!"
              >
                Submit Another
              </Button>
            </Link>
          </div>

          {/* Link to Dashboard */}
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 mt-10 text-sm font-black text-quaternary hover:text-(--color-sextary) transition-colors group"
          >
            Go to Dashboard Overview
            <HiOutlineArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        {/* Help & Info Section */}
        <div className="mt-12 bg-white/30 rounded-3xl p-6 border border-white/50 flex items-start gap-4">
          <div className="w-10 h-10 rounded-2xl bg-tertiary/10 flex items-center justify-center text-tertiary shrink-0">
            <HiOutlineLightBulb size={22} />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-bold text-(--color-sextary)">
              What happens next?
            </p>
            <p className="text-sm text-(--color-quinary)/60 leading-relaxed">
              Our curators will review your submission to ensure it meets our
              quality standards. You'll receive a notification and an email once
              the status changes to{" "}
              <span className="font-bold text-(--color-sextary)">Approved</span>{" "}
              or if we need more info.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionSuccess;
