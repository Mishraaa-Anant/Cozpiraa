"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export type Experience = "consultation" | "shop";

interface ExperienceContextValue {
  experience: Experience;
  setExperience: (exp: Experience) => void;
  isShop: boolean;
  isConsultation: boolean;
}

const ExperienceContext = createContext<ExperienceContextValue>({
  experience: "consultation",
  setExperience: () => {},
  isShop: false,
  isConsultation: true,
});

const SESSION_KEY = "cozpiraa_experience";

export function ExperienceProvider({ children }: { children: React.ReactNode }) {
  const [experience, setExperienceState] = useState<Experience>("consultation");

  // Rehydrate from sessionStorage on mount
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(SESSION_KEY) as Experience | null;
      if (stored === "consultation" || stored === "shop") {
        setExperienceState(stored);
      }
    } catch {
      // sessionStorage may not be available (SSR, private mode)
    }
  }, []);

  const setExperience = useCallback((exp: Experience) => {
    setExperienceState(exp);
    try {
      sessionStorage.setItem(SESSION_KEY, exp);
    } catch {
      // Ignore
    }
  }, []);

  return (
    <ExperienceContext.Provider
      value={{
        experience,
        setExperience,
        isShop: experience === "shop",
        isConsultation: experience === "consultation",
      }}
    >
      {children}
    </ExperienceContext.Provider>
  );
}

export function useExperience() {
  return useContext(ExperienceContext);
}
