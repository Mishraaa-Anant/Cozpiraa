"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl";
}

export function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = "lg",
}: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-charcoal-900/60 backdrop-blur-sm transition-opacity"
            aria-hidden="true"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={`relative w-full ${maxWidthClasses[maxWidth]} bg-white rounded-2xl shadow-elevation overflow-hidden border border-ivory-300 z-10 my-8`}
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Header */}
            {(title || subtitle) && (
              <div className="px-6 pt-6 pb-4 border-b border-ivory-200 flex items-start justify-between gap-4">
                <div>
                  {title && (
                    <h3 className="text-xl font-semibold text-charcoal-800 tracking-tight">
                      {title}
                    </h3>
                  )}
                  {subtitle && (
                    <p className="text-xs text-charcoal-500 mt-1">{subtitle}</p>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="text-charcoal-400 hover:text-charcoal-800 p-1.5 rounded-lg hover:bg-ivory-100 transition-colors focus:outline-none focus:ring-2 focus:ring-sage-600"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}

            {!title && !subtitle && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-charcoal-400 hover:text-charcoal-800 p-1.5 rounded-lg hover:bg-ivory-100 transition-colors z-20 focus:outline-none focus:ring-2 focus:ring-sage-600"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            {/* Modal Body */}
            <div className="p-6 max-h-[75vh] overflow-y-auto">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
