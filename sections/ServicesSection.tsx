"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Layers,
  Sun,
  Zap,
  ShieldCheck,
  Clock,
  Activity,
  Target,
  Stethoscope,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { DERMATOLOGY_SERVICES } from "@/lib/data";
import { ServiceItem } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Sparkles,
  Layers,
  Sun,
  Zap,
  ShieldCheck,
  Clock,
  Activity,
  Target,
  Stethoscope,
  CheckCircle2,
};

export function ServicesSection() {
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  const scrollToAppointment = () => {
    setActiveModalService(null);
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
    <section id="services" className="py-24 bg-white border-b border-ivory-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <Badge variant="sage" icon={<Stethoscope className="w-3.5 h-3.5" />}>
            Clinical Expertise
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal-800 tracking-tight">
            Comprehensive Dermatological Care
          </h2>
          <p className="text-charcoal-600 text-base sm:text-lg leading-relaxed">
            Evidence-based skin, hair, and dermatological procedures conducted with medical precision and personalized care.
          </p>
        </div>

        {/* 10 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DERMATOLOGY_SERVICES.map((service) => {
            const IconComponent = ICON_MAP[service.iconName] || Stethoscope;
            return (
              <Card
                key={service.id}
                variant="hover"
                className="flex flex-col justify-between p-6 sm:p-7 border-ivory-300 hover:border-sage-400 group"
              >
                <div className="space-y-4">
                  {/* Icon & Title */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-sage-100 text-sage-700 flex items-center justify-center shrink-0 group-hover:bg-sage-600 group-hover:text-white transition-colors duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-charcoal-800 group-hover:text-sage-700 transition-colors">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-charcoal-600 text-sm leading-relaxed">
                    {service.shortDesc}
                  </p>

                  {/* Benefit bullets */}
                  <ul className="space-y-1.5 pt-2">
                    {service.keyBenefits.slice(0, 2).map((benefit, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-charcoal-700 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sage-600 shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Learn More Button */}
                <div className="pt-6 border-t border-ivory-200 mt-6 flex items-center justify-between">
                  <button
                    onClick={() => setActiveModalService(service)}
                    className="text-xs font-bold uppercase tracking-wider text-sage-700 hover:text-sage-800 flex items-center gap-1 group/btn focus:outline-none focus:underline"
                  >
                    <span>Learn More</span>
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                  <Badge variant="neutral" className="text-[10px]">
                    Clinical Care
                  </Badge>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Service Details Modal */}
      <Modal
        isOpen={!!activeModalService}
        onClose={() => setActiveModalService(null)}
        title={activeModalService?.title}
        subtitle="Clinical Dermatology Overview"
        maxWidth="lg"
      >
        {activeModalService && (
          <div className="space-y-6">
            <p className="text-charcoal-700 text-sm sm:text-base leading-relaxed">
              {activeModalService.fullDesc}
            </p>

            {/* Overview */}
            <div className="p-4 bg-ivory-100 rounded-xl border border-ivory-300 space-y-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-sage-800">
                Procedure Overview
              </h4>
              <p className="text-xs text-charcoal-700 leading-relaxed">
                {activeModalService.overview}
              </p>
            </div>

            {/* Target Concerns */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-500">
                Target Concerns
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {activeModalService.targetConcerns.map((tc, idx) => (
                  <Badge key={idx} variant="sage" className="text-xs">
                    {tc}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Benefits list */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-500">
                Key Benefits
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-charcoal-700">
                {activeModalService.keyBenefits.map((b, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sage-600 shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action CTA */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <Button
                variant="primary"
                size="md"
                className="w-full sm:w-auto justify-center"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                onClick={scrollToAppointment}
              >
                Schedule Consultation for {activeModalService.title}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
