"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  CheckCircle2,
  Stethoscope,
  FileText,
  Activity,
  HeartPulse,
  ChevronRight,
} from "lucide-react";
import { PATIENT_JOURNEY } from "@/lib/data";
import { JourneyStep } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const STEP_ICONS = [Calendar, Stethoscope, FileText, Activity, HeartPulse];

export function SkinJourneySection() {
  const [activeStep, setActiveStep] = useState<JourneyStep>(PATIENT_JOURNEY[0]);

  const scrollToAppointment = () => {
    const element = document.querySelector("#appointment");
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="journey" className="py-24 bg-ivory-100/60 border-b border-ivory-200 relative">
      <div id="treatments" className="absolute -top-24" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <Badge variant="terracotta" icon={<Activity className="w-3.5 h-3.5" />}>
            Transparent & Structured Care
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal-800 tracking-tight">
            Interactive Skin Journey
          </h2>
          <p className="text-charcoal-600 text-base sm:text-lg leading-relaxed">
            From initial consultation to long-term barrier protection, explore what to expect at every stage of your dermatological care.
          </p>
        </div>

        {/* Desktop Horizontal Timeline Switcher */}
        <div className="hidden lg:block mb-12">
          <div className="relative flex items-center justify-between">
            {/* Connecting line */}
            <div className="absolute top-1/2 left-8 right-8 h-1 bg-ivory-300 -translate-y-1/2 -z-0" />

            {PATIENT_JOURNEY.map((stepItem, index) => {
              const Icon = STEP_ICONS[index] || Calendar;
              const isActive = activeStep.step === stepItem.step;
              return (
                <button
                  key={stepItem.step}
                  onClick={() => setActiveStep(stepItem)}
                  className={`relative z-10 flex flex-col items-center group focus:outline-none`}
                >
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-lg transition-all duration-300 shadow-md ${
                      isActive
                        ? "bg-sage-600 text-white scale-110 shadow-elevation ring-4 ring-sage-100"
                        : "bg-white text-charcoal-700 hover:bg-ivory-200 border border-ivory-300"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="mt-3 text-xs font-bold text-sage-700 tracking-widest">
                    STEP {stepItem.number}
                  </span>
                  <span
                    className={`text-sm font-semibold mt-0.5 transition-colors ${
                      isActive ? "text-charcoal-900 font-bold" : "text-charcoal-600 group-hover:text-sage-700"
                    }`}
                  >
                    {stepItem.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile Vertical Timeline Switcher */}
        <div className="lg:hidden flex flex-wrap gap-2 justify-center mb-8">
          {PATIENT_JOURNEY.map((stepItem) => {
            const isActive = activeStep.step === stepItem.step;
            return (
              <button
                key={stepItem.step}
                onClick={() => setActiveStep(stepItem)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border ${
                  isActive
                    ? "bg-sage-600 text-white border-sage-700 shadow-sm"
                    : "bg-white text-charcoal-700 border-ivory-300"
                }`}
              >
                {stepItem.number} {stepItem.title}
              </button>
            );
          })}
        </div>

        {/* Active Step Details Panel */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep.step}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-8 sm:p-10 border-sage-600/30 bg-white shadow-elevation space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-ivory-200">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-sage-600">
                      Phase {activeStep.number} of 05
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-charcoal-800 mt-1">
                      {activeStep.title}
                    </h3>
                  </div>
                  <Badge variant="sage" className="self-start sm:self-auto text-xs px-3 py-1">
                    Patient-Centered Care
                  </Badge>
                </div>

                <div className="space-y-4">
                  <p className="text-charcoal-700 text-base sm:text-lg leading-relaxed font-normal">
                    {activeStep.detailedDesc}
                  </p>

                  <div className="space-y-2 pt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-500">
                      Key Deliverables & Objectives
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                      {activeStep.deliverables.map((del, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-ivory-100/80 rounded-xl border border-ivory-300/80 flex items-center gap-2.5 text-xs text-charcoal-800 font-semibold"
                        >
                          <CheckCircle2 className="w-4 h-4 text-sage-600 shrink-0" />
                          <span>{del}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-6 border-t border-ivory-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-xs text-charcoal-500 italic">
                    Every step is carefully paced to prioritize your skin barrier safety.
                  </p>
                  <Button
                    variant="primary"
                    size="md"
                    onClick={scrollToAppointment}
                    rightIcon={<ChevronRight className="w-4 h-4" />}
                  >
                    Start Your Skin Journey
                  </Button>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
