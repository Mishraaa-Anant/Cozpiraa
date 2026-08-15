"use client";

import React, { useState } from "react";
import { HelpCircle, CheckCircle2, ShieldAlert, Sparkles, RefreshCw } from "lucide-react";
import { MYTHS_VS_FACTS } from "@/lib/data";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export function MythFactSection() {
  const [activeFlippedId, setActiveFlippedId] = useState<string | null>(null);

  const toggleFlip = (id: string) => {
    setActiveFlippedId(activeFlippedId === id ? null : id);
  };

  return (
    <section className="py-24 bg-ivory-100/60 border-b border-ivory-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <Badge variant="terracotta" icon={<Sparkles className="w-3.5 h-3.5" />}>
            Dermatological Clarity
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal-800 tracking-tight">
            Skin Myths vs Facts
          </h2>
          <p className="text-charcoal-600 text-base sm:text-lg leading-relaxed">
            Dispelling common skincare misconceptions with clinical facts and barrier safety evidence.
          </p>
        </div>

        {/* Myths vs Facts Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MYTHS_VS_FACTS.map((item) => {
            const isFlipped = activeFlippedId === item.id;
            return (
              <Card
                key={item.id}
                variant="hover"
                className="p-6 sm:p-7 flex flex-col justify-between cursor-pointer border-ivory-300 min-h-[300px]"
                onClick={() => toggleFlip(item.id)}
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-ivory-200 mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-sage-700 bg-sage-50 px-2 py-0.5 rounded-md">
                      {item.category}
                    </span>
                    <button
                      className="text-xs text-charcoal-400 hover:text-sage-700 flex items-center gap-1 font-semibold"
                      aria-label="Toggle Myth or Fact view"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>{isFlipped ? "Show Myth" : "Show Fact"}</span>
                    </button>
                  </div>

                  {!isFlipped ? (
                    /* MYTH VIEW */
                    <div className="space-y-3 animate-in fade-in duration-200">
                      <div className="flex items-center gap-2 text-rose-700 text-xs font-bold uppercase tracking-wider">
                        <ShieldAlert className="w-4 h-4 shrink-0" />
                        <span>Common Skincare Myth</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-charcoal-800 leading-snug">
                        "{item.myth}"
                      </h3>
                      <p className="text-xs text-charcoal-500 italic pt-2">
                        Click card to reveal the clinical dermatological fact.
                      </p>
                    </div>
                  ) : (
                    /* FACT VIEW */
                    <div className="space-y-3 animate-in fade-in duration-200">
                      <div className="flex items-center gap-2 text-sage-700 text-xs font-bold uppercase tracking-wider">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>Clinical Dermatology Fact</span>
                      </div>
                      <h3 className="text-base font-bold text-charcoal-800 leading-snug">
                        "{item.fact}"
                      </h3>
                      <p className="text-xs text-charcoal-600 bg-ivory-100 p-3 rounded-lg border border-ivory-300 mt-2">
                        {item.insight}
                      </p>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-ivory-200 mt-4 flex items-center justify-between text-xs text-charcoal-500 font-medium">
                  <span>{isFlipped ? "Clinical Insight" : "Tap card to flip"}</span>
                  <HelpCircle className="w-4 h-4 text-sage-600" />
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
