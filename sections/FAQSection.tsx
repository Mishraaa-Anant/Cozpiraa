"use client";

import React, { useState } from "react";
import { HelpCircle } from "lucide-react";
import { FAQS } from "@/lib/data";
import { AccordionItem } from "@/components/ui/Accordion";
import { Badge } from "@/components/ui/Badge";

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const handleToggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 bg-white border-b border-ivory-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <Badge variant="sage" icon={<HelpCircle className="w-3.5 h-3.5" />}>
            Patient Guidance
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal-800 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-charcoal-600 text-base sm:text-lg leading-relaxed">
            Essential information regarding your dermatology consultation, appointment booking, and clinic procedures.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {FAQS.map((faq) => (
            <AccordionItem
              key={faq.id}
              id={faq.id}
              question={faq.question}
              answer={faq.answer}
              isOpen={openId === faq.id}
              onToggle={() => handleToggle(faq.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
