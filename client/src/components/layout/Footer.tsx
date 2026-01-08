import React from "react";
import { HiLightningBolt } from "react-icons/hi";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-(--color-primary) border-t border-(--color-secondary)/40 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-1">
            <Link
              to="/"
              className="flex items-center gap-2 text-(--color-sextary) mb-6"
            >
              <HiLightningBolt size={24} className="text-(--color-tertiary)" />
              <span className="text-xl font-bold tracking-tight">
                CreatorStack
              </span>
            </Link>
            <p className="text-sm text-(--color-quinary)/70 leading-relaxed mb-6">
              Discover and share the web's hidden gems. Curated tools for
              developers, designers, and creators worldwide.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-(--color-quinary) hover:text-quaternary transition-colors"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="#"
                className="text-(--color-quinary) hover:text-quaternary transition-colors"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="#"
                className="text-(--color-quinary) hover:text-quaternary transition-colors"
              >
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Links Grid */}
          <div>
            <h4 className="text-(--color-sextary) font-bold mb-6">Platform</h4>
            <ul className="space-y-4 text-sm text-(--color-quinary)/70">
              <li>
                <Link
                  to="/trending"
                  className="hover:text-quaternary transition-colors"
                >
                  Trending Tools
                </Link>
              </li>
              <li>
                <Link
                  to="/categories"
                  className="hover:text-quaternary transition-colors"
                >
                  Browse Categories
                </Link>
              </li>
              <li>
                <Link
                  to="/submit"
                  className="hover:text-quaternary transition-colors"
                >
                  Submit Resource
                </Link>
              </li>
              <li>
                <Link
                  to="/requests"
                  className="hover:text-quaternary transition-colors"
                >
                  User Requests
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-(--color-sextary) font-bold mb-6">Community</h4>
            <ul className="space-y-4 text-sm text-(--color-quinary)/70">
              <li>
                <Link
                  to="/about"
                  className="hover:text-quaternary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contributors"
                  className="hover:text-quaternary transition-colors"
                >
                  Top Contributors
                </Link>
              </li>
              <li>
                <Link
                  to="/feedback"
                  className="hover:text-quaternary transition-colors"
                >
                  Send Feedback
                </Link>
              </li>
              <li>
                <Link
                  to="/status"
                  className="hover:text-quaternary transition-colors"
                >
                  Platform Status
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-(--color-sextary) font-bold mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-(--color-quinary)/70">
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-quaternary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:text-quaternary transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/cookies"
                  className="hover:text-quaternary transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-quaternary transition-colors"
                >
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-(--color-secondary)/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-(--color-quinary)/50">
            © {new Date().getFullYear()} CreatorStack. Built with passion for
            the creator community.
          </p>
          <div className="flex gap-6 text-[10px] text-(--color-quinary)/40 uppercase tracking-widest font-bold">
            <span>Server: V1.0.4</span>
            <span>Uptime: 99.9%</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
