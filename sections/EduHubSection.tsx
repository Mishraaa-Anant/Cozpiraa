"use client";

import React, { useState } from "react";
import { BookOpen, Clock, ChevronRight, CheckCircle2, Sparkles } from "lucide-react";
import { EDU_TOPICS } from "@/lib/data";
import { EduTopic } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";

export function EduHubSection() {
  const [selectedTopic, setSelectedTopic] = useState<EduTopic | null>(null);

  return (
    <section className="py-24 bg-white border-b border-ivory-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <Badge variant="sage" icon={<BookOpen className="w-3.5 h-3.5" />}>
            Educational Dermatology Hub
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal-800 tracking-tight">
            Understand Your Skin
          </h2>
          <p className="text-charcoal-600 text-base sm:text-lg leading-relaxed">
            Evidence-based educational guides to help you make informed decisions about your skin barrier, sun protection, and routine safety.
          </p>
        </div>

        {/* 8 Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {EDU_TOPICS.map((topic) => (
            <Card
              key={topic.id}
              variant="hover"
              className="flex flex-col justify-between p-6 border-ivory-300 hover:border-sage-400 group cursor-pointer"
              onClick={() => setSelectedTopic(topic)}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sage-700 bg-sage-50 px-2 py-0.5 rounded-md">
                    {topic.category}
                  </span>
                  <span className="text-[11px] text-charcoal-400 font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {topic.readTime}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-charcoal-800 group-hover:text-sage-700 transition-colors leading-snug">
                  {topic.title}
                </h3>

                <p className="text-xs text-charcoal-600 leading-relaxed line-clamp-3">
                  {topic.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-ivory-200 mt-4 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-sage-700 group-hover:text-sage-800 flex items-center gap-1">
                  Read Guide
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <Sparkles className="w-4 h-4 text-sage-400 opacity-60 group-hover:opacity-100" />
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Reading Modal */}
      <Modal
        isOpen={!!selectedTopic}
        onClose={() => setSelectedTopic(null)}
        title={selectedTopic?.title}
        subtitle={selectedTopic ? `${selectedTopic.category} • ${selectedTopic.readTime}` : undefined}
        maxWidth="lg"
      >
        {selectedTopic && (
          <div className="space-y-6">
            <p className="text-charcoal-700 text-sm italic border-l-2 border-sage-600 pl-3 py-1">
              "{selectedTopic.summary}"
            </p>

            <div className="space-y-5">
              {selectedTopic.content.map((sec, idx) => (
                <div key={idx} className="space-y-1.5">
                  <h4 className="font-bold text-base text-charcoal-800">
                    {sec.heading}
                  </h4>
                  <p className="text-charcoal-600 text-sm leading-relaxed">
                    {sec.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-4 bg-sage-50 rounded-xl border border-sage-200 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-sage-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-sage-800">
                  Key Takeaway
                </h4>
                <p className="text-xs text-charcoal-700 mt-0.5 font-medium">
                  {selectedTopic.keyTakeaway}
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
