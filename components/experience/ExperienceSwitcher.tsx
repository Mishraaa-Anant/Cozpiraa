"use client";

import React, { useId } from "react";
import { motion } from "framer-motion";
import { Stethoscope, ShoppingBag } from "lucide-react";
import { useExperience, type Experience } from "@/components/experience/ExperienceContext";

const OPTIONS: { id: Experience; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "consultation", label: "Consultation", icon: Stethoscope },
  { id: "shop", label: "Shop", icon: ShoppingBag },
];

interface ExperienceSwitcherProps {
  className?: string;
}

export function ExperienceSwitcher({ className = "" }: ExperienceSwitcherProps) {
  const { experience, setExperience } = useExperience();
  const layoutId = useId();

  return (
    <div
      role="tablist"
      aria-label="Switch between Consultation and Shop"
      className={`inline-flex items-center bg-ivory-200/80 border border-ivory-300/80 rounded-full p-1 gap-0.5 shadow-clinical backdrop-blur-sm ${className}`}
    >
      {OPTIONS.map(({ id, label, icon: Icon }) => {
        const isActive = experience === id;
        return (
          <button
            key={id}
            role="tab"
            aria-selected={isActive}
            aria-controls={`experience-panel-${id}`}
            id={`experience-tab-${id}`}
            type="button"
            onClick={() => setExperience(id)}
            className={`relative flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-sm font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-600 focus-visible:ring-offset-1 select-none ${
              isActive
                ? "text-white"
                : "text-charcoal-600 hover:text-charcoal-900"
            }`}
          >
            {/* Animated sliding pill background */}
            {isActive && (
              <motion.span
                layoutId={`switcher-pill-${layoutId}`}
                className="absolute inset-0 bg-sage-600 rounded-full shadow-clinical"
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: 380,
                  damping: 34,
                  mass: 0.8,
                }}
                aria-hidden="true"
              />
            )}

            {/* Icon + Label */}
            <span className="relative z-10 flex items-center gap-2">
              <Icon className={`w-3.5 h-3.5 shrink-0 transition-colors duration-200 ${isActive ? "text-white" : "text-charcoal-500"}`} />
              <span>{label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
