import React, { useState } from "react";
import { HiArrowRight, HiOutlineCursorClick } from "react-icons/hi";
import Button from "../../../../components/ui/Button";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../../app/hooks";
import LoginPromptModal from "../../../auth/components/LoginPromptModal";

const Hero: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [isLoginPromptOpen, setIsLoginPromptOpen] = useState(false);

  const handleSubmitClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      setIsLoginPromptOpen(true);
    }
  };

  return (
    <section className="relative overflow-hidden bg-(--color-primary) pt-16 pb-20 md:pt-24 md:pb-32">
      {/* Background patterns */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-orange-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-100 h-100 bg-pink-200/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/50 text-xs font-bold text-quaternary mb-8 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-(--color-tertiary) animate-ping" />
            Join 5,000+ creators discovering hidden gems
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-(--color-sextary) leading-[1.1] mb-8 tracking-tight">
            Discover useful websites <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-tertiary to-quaternary">
              most people don't know.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-(--color-quinary)/80 leading-relaxed mb-12 max-w-2xl mx-auto font-medium">
            A curated platform for developers, designers, and creators to find
            the best-kept secrets on the web. Quality-vetted by the community.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/websites">
              <Button variant="primary" className="px-8! py-4! text-lg">
                Explore Websites
                <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/submit" onClick={handleSubmitClick}>
              <Button variant="outline" className="px-8! py-4! text-lg">
                Submit a Website <HiOutlineCursorClick />
              </Button>
            </Link>
          </div>

          <LoginPromptModal
            isOpen={isLoginPromptOpen}
            onClose={() => setIsLoginPromptOpen(false)}
          />

          {/* Trust stats */}
          <div className="mt-16 pt-12 border-t border-(--color-secondary)/40 flex flex-wrap justify-center gap-8 md:gap-16 opacity-70">
            <div className="text-center">
              <p className="text-2xl font-bold text-(--color-sextary)">
                1,200+
              </p>
              <p className="text-xs font-bold uppercase tracking-widest text-(--color-quinary)/60">
                Resources
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-(--color-sextary)">450+</p>
              <p className="text-xs font-bold uppercase tracking-widest text-(--color-quinary)/60">
                Contributors
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-(--color-sextary)">15k+</p>
              <p className="text-xs font-bold uppercase tracking-widest text-(--color-quinary)/60">
                Monthly Votes
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
