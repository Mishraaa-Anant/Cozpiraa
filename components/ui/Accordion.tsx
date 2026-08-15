"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { clsx } from "clsx";

export interface AccordionItemProps {
  id: string;
  question: string;
  answer: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

export function AccordionItem({
  id,
  question,
  answer,
  isOpen: externalIsOpen,
  onToggle,
}: AccordionItemProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      setInternalIsOpen(!internalIsOpen);
    }
  };

  return (
    <div className="border border-ivory-300 rounded-2xl bg-white overflow-hidden transition-colors duration-200">
      <button
        onClick={handleToggle}
        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-600 group"
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${id}`}
      >
        <span className="font-semibold text-charcoal-800 text-base sm:text-lg pr-4 group-hover:text-sage-700 transition-colors">
          {question}
        </span>
        <span
          className={clsx(
            "p-2 rounded-full bg-ivory-100 text-sage-700 transition-transform duration-300 shrink-0",
            isOpen && "rotate-180 bg-sage-100 text-sage-800"
          )}
        >
          <ChevronDown className="w-5 h-5" />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`accordion-content-${id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-1 text-charcoal-600 text-sm sm:text-base leading-relaxed border-t border-ivory-100 mt-1">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
