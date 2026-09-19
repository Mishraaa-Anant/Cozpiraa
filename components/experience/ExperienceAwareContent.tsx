"use client";

import React from "react";
import { useExperience } from "@/components/experience/ExperienceContext";

interface ExperienceAwareContentProps {
  consultation: React.ReactNode;
  shop: React.ReactNode;
}

export function ExperienceAwareContent({ consultation, shop }: ExperienceAwareContentProps) {
  const { isShop } = useExperience();

  return (
    <>
      {isShop ? shop : consultation}
    </>
  );
}
