"use client";

import React from "react";
import { motion } from "framer-motion";
import { Stethoscope, ShoppingBag } from "lucide-react";
import { useExperience, type Experience } from "@/components/experience/ExperienceContext";

interface ExperienceOption {
  id: Experience;
  label: string;
  sublabel: string;
  badge?: string;
  icon: React.ComponentType<{ className?: string }>;
}

const OPTIONS: ExperienceOption[] = [
  {
    id: "consultation",
    label: "Consultation",
    sublabel: "Clinic & Treatments",
    icon: Stethoscope,
  },
  {
    id: "shop",
    label: "Shop",
    sublabel: "Doctor-Curated Skincare",
    badge: "Curated",
    icon: ShoppingBag,
  },
];

interface ExperienceSwitcherProps {
  className?: string;
}

export function ExperienceSwitcher({ className = "" }: ExperienceSwitcherProps) {
  const { experience, setExperience } = useExperience();

  return (
    <nav
      role="tablist"
      aria-label="Platform section: Consultation or Shop"
      className={`w-full flex items-center justify-between sm:justify-start ${className}`}
    >
      <div className="grid grid-cols-2 sm:flex sm:items-center w-full sm:w-auto gap-1 sm:gap-6">
        {OPTIONS.map(({ id, label, sublabel, badge, icon: Icon }) => {
          const isActive = experience === id;

          return (
            <button
              key={id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`experience-panel-${id}`}
              id={`experience-tab-${id}`}
              type="button"
              onClick={() => {
                if (experience !== id) {
                  setExperience(id);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className={`
                relative flex items-center justify-center sm:justify-start gap-2 sm:gap-2.5
                py-2.5 sm:py-3 px-3 sm:px-4
                min-h-[44px] cursor-pointer
                transition-all duration-200
                focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-600 focus-visible:ring-offset-1
                select-none group
              `}
            >
              {/* Minimal Icon */}
              <Icon
                className={`w-4 h-4 shrink-0 transition-colors duration-200 pointer-events-none ${
                  isActive
                    ? "text-sage-700"
                    : "text-charcoal-400 group-hover:text-charcoal-700"
                }`}
              />

              {/* Typography Hierarchy */}
              <div className="flex items-baseline gap-1.5 sm:gap-2 pointer-events-none">
                <span
                  className={`
                    text-xs sm:text-sm font-semibold tracking-tight transition-colors duration-200
                    ${
                      isActive
                        ? "text-sage-900 font-bold"
                        : "text-charcoal-600 group-hover:text-charcoal-900"
                    }
                  `}
                >
                  {label}
                </span>

                {/* Sublabel for desktop clarity */}
                <span
                  className={`
                    hidden md:inline-block text-[11px] font-normal transition-colors duration-200
                    ${
                      isActive
                        ? "text-sage-700/90"
                        : "text-charcoal-400 group-hover:text-charcoal-500"
                    }
                  `}
                >
                  • {sublabel}
                </span>

                {/* Refined Section Badge (e.g. Curated / Coming Soon) */}
                {badge && (
                  <span
                    className={`
                      text-[9px] sm:text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.2 rounded transition-colors
                      ${
                        isActive
                          ? "bg-sage-100/90 text-sage-800 border border-sage-200"
                          : "bg-ivory-200/90 text-charcoal-500 border border-ivory-300/80 group-hover:border-charcoal-300"
                      }
                    `}
                  >
                    {badge}
                  </span>
                )}
              </div>

              {/* Animated Underline Indicator */}
              {isActive && (
                <motion.div
                  layoutId="active-experience-nav-underline"
                  className="absolute bottom-0 left-0 right-0 sm:left-2 sm:right-2 h-[2.5px] bg-sage-600 rounded-full"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 420,
                    damping: 34,
                    mass: 0.8,
                  }}
                />
              )}

              {/* Subtle hover indicator line when not active */}
              {!isActive && (
                <span
                  className="absolute bottom-0 left-4 right-4 h-[1.5px] bg-charcoal-200 scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-200 rounded-full opacity-70"
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
