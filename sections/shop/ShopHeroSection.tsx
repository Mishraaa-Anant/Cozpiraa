"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Leaf,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ExperienceSwitcher } from "@/components/experience/ExperienceSwitcher";

const PRODUCT_PILLARS = [
  {
    icon: ShieldCheck,
    label: "Clinically Formulated",
    desc: "Every product reviewed and approved by Dr. Priyanka Rahul Patil (BAMS)",
  },
  {
    icon: Leaf,
    label: "Dermatologist-Tested",
    desc: "Safe for sensitive, acne-prone, and post-treatment skin",
  },
  {
    icon: Sparkles,
    label: "Targeted Results",
    desc: "Products matched to real skin concerns — not generic marketing claims",
  },
];

export function ShopHeroSection() {
  const scrollToShopContent = () => {
    const element = document.querySelector("#shop-content");
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] pt-28 pb-16 md:pt-36 md:pb-24 flex items-center bg-gradient-to-b from-ivory-100 via-ivory-50 to-white overflow-hidden border-b border-ivory-200/60"
    >
      {/* Background Decorative Circles — mirrored from HeroSection */}
      <div
        className="absolute top-10 left-1/4 w-96 h-96 bg-sage-200/20 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-10 w-80 h-80 bg-terracotta-200/20 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Switcher — centred above the hero grid */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center mb-10 md:mb-12"
        >
          <ExperienceSwitcher />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column Text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            <Badge
              variant="terracotta"
              icon={<ShoppingBag className="w-4 h-4 text-terracotta-600" />}
              className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider shadow-sm"
            >
              COZPIRAA Skincare — Coming Soon
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal-800 tracking-tight leading-[1.15]">
              Skincare Curated by{" "}
              <span className="text-sage-600 relative inline-block">
                Your Doctor
                <span className="absolute left-0 bottom-1 w-full h-2 bg-sage-200/50 -z-10 rounded-full" />
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-charcoal-600 font-normal leading-relaxed max-w-2xl">
              We are building a curated product collection — skincare, haircare,
              and wellness essentials — hand-selected and approved by{" "}
              <strong className="text-charcoal-800 font-semibold">
                Dr. Priyanka Rahul Patil (BAMS)
              </strong>{" "}
              based on 10+ years of clinical experience.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <Button
                variant="primary"
                size="lg"
                leftIcon={<ShoppingBag className="w-5 h-5" />}
                onClick={scrollToShopContent}
                className="shadow-elevation"
              >
                Explore What&apos;s Coming
              </Button>
              <Button
                variant="outline"
                size="lg"
                leftIcon={<Sparkles className="w-5 h-5 text-sage-600" />}
                onClick={scrollToShopContent}
              >
                Get Early Access
              </Button>
            </div>

            {/* Trust Line */}
            <div className="pt-6 border-t border-ivory-300/80 flex items-center gap-2 text-xs sm:text-sm font-medium text-charcoal-500">
              <ShieldCheck className="w-4 h-4 text-sage-600 shrink-0" />
              <span>Clinically Approved</span>
              <span className="text-ivory-400">•</span>
              <span>Doctor-Curated</span>
              <span className="text-ivory-400">•</span>
              <span>Quality-Verified</span>
            </div>
          </motion.div>

          {/* Right Column — Product Pillars */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="space-y-4">
              {/* Outer decorative ring */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-sage-200/30 via-ivory-200 to-terracotta-200/20 blur-lg -z-10" />

              <div className="relative rounded-2xl border border-ivory-300 bg-white shadow-elevation overflow-hidden">
                {/* Header strip */}
                <div className="bg-gradient-to-r from-sage-800 to-sage-900 text-white px-6 py-5 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-base">COZPIRAA Shop</h3>
                    <p className="text-xs text-sage-200 mt-0.5">Premium Skincare Collection</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Pillar cards */}
                <div className="divide-y divide-ivory-200">
                  {PRODUCT_PILLARS.map(({ icon: Icon, label, desc }, idx) => (
                    <div key={idx} className="flex items-start gap-4 px-6 py-5 group hover:bg-ivory-50/80 transition-colors">
                      <div className="w-9 h-9 rounded-lg bg-sage-100 text-sage-700 flex items-center justify-center shrink-0 group-hover:bg-sage-600 group-hover:text-white transition-colors duration-300">
                        <Icon className="w-4.5 h-4.5 w-[18px] h-[18px]" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-charcoal-800">{label}</h4>
                        <p className="text-xs text-charcoal-500 leading-relaxed mt-0.5">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Coming soon footer */}
                <div className="px-6 py-4 bg-ivory-100/60 border-t border-ivory-200 flex items-center justify-between">
                  <span className="text-xs text-charcoal-500 font-medium">Collection launching soon</span>
                  <button
                    onClick={scrollToShopContent}
                    className="flex items-center gap-1.5 text-xs font-bold text-sage-700 hover:text-sage-800 transition-colors focus:outline-none focus:underline group/btn"
                  >
                    <span>Register Interest</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 text-charcoal-400 opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
        onClick={scrollToShopContent}
      >
        <span className="text-[10px] font-semibold uppercase tracking-widest">Explore</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  );
}
