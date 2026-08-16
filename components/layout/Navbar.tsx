"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Menu, X, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Dermatology", href: "#services" },
  { name: "Skin Concerns", href: "#concerns" },
  { name: "Treatments", href: "#treatments" },
  { name: "FAQs", href: "#faq" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setMobileMenuOpen(false);

    let targetSelector = href;
    if (targetSelector === "#treatments" && !document.querySelector("#treatments")) {
      targetSelector = "#journey";
    }

    // Delay scroll positioning briefly so mobile drawer collapse animation finishes and doesn't distort layout scroll offset
    setTimeout(() => {
      const isHomePage = pathname === "/" || pathname === "" || pathname === null;

      if (isHomePage) {
        const element = document.querySelector(targetSelector);
        if (element) {
          const rect = element.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const offsetTop = rect.top + scrollTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
          return;
        }
      }

      router.push(`/${href}`);
    }, 150);
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      let hash = window.location.hash;
      if (hash === "#treatments" && !document.querySelector("#treatments")) {
        hash = "#journey";
      }
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          const rect = element.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const offsetTop = rect.top + scrollTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      }, 200);
    }
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-clinical py-3 border-b border-ivory-300/60"
            : "bg-ivory-100/60 backdrop-blur-sm py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#home");
              }}
              className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-sage-600 rounded-lg p-1"
            >
              <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-sm border border-sage-600/20 bg-white p-1 group-hover:scale-105 transition-transform">
                <Image
                  src="/images/latest.png"
                  alt="COZPIRAA Dermatology Clinic"
                  fill
                  className="object-contain p-0.5"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight text-charcoal-800 flex items-center gap-1">
                  COZPIRAA
                  <ShieldCheck className="w-4 h-4 text-sage-600 inline" />
                </span>
                <span className="text-[10px] uppercase font-semibold text-sage-700 tracking-widest -mt-1">
                  Dermatology Clinic
                </span>
              </div>
            </Link>

            {/* Desktop Links */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="px-3.5 py-2 text-sm font-medium text-charcoal-700 hover:text-sage-700 hover:bg-sage-50/60 rounded-lg transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center">
              <Button
                variant="primary"
                size="md"
                leftIcon={<Calendar className="w-4 h-4" />}
                onClick={() => scrollToSection("#appointment")}
              >
                Book Consultation
              </Button>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden p-2.5 rounded-xl text-charcoal-800 hover:bg-ivory-200 active:bg-ivory-300 transition-colors focus:outline-none focus:ring-2 focus:ring-sage-600 touch-manipulation"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="lg:hidden bg-white/98 backdrop-blur-md border-b border-ivory-300 px-4 pt-3 pb-6 shadow-elevation overflow-hidden max-h-[85vh] overflow-y-auto"
            >
              <div className="flex flex-col space-y-1.5 pt-2">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.name}
                    type="button"
                    onClick={() => scrollToSection(link.href)}
                    className="w-full text-left px-4 py-3.5 rounded-xl text-base font-medium text-charcoal-800 hover:bg-ivory-100 hover:text-sage-700 active:bg-sage-50 transition-colors flex items-center justify-between touch-manipulation"
                  >
                    <span>{link.name}</span>
                  </button>
                ))}
                <div className="pt-4 px-2">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full justify-center shadow-md py-3.5 text-base font-semibold"
                    leftIcon={<Calendar className="w-5 h-5" />}
                    onClick={() => scrollToSection("#appointment")}
                  >
                    Book Consultation
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Backdrop Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 z-30 bg-charcoal-900/30 backdrop-blur-xs lg:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </>
  );
}
