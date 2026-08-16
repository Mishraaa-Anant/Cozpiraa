"use client";

import React, { useState, useEffect } from "react";
import { Cookie, ShieldCheck, Check, Settings, X, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  acceptedAt: string;
}

const STORAGE_KEY = "cozpiraa_cookie_consent";

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Always required
    analytics: true,
    marketing: true,
    acceptedAt: "",
  });

  useEffect(() => {
    // Read saved preferences on load
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setPreferences(JSON.parse(saved));
      } catch (e) {
        setShowBanner(true);
      }
    } else {
      setShowBanner(true);
    }

    // Register global trigger for re-opening cookie settings from footer
    (window as any).openCookiePreferences = () => {
      setShowModal(true);
    };

    return () => {
      delete (window as any).openCookiePreferences;
    };
  }, []);

  const saveConsent = (updated: CookiePreferences) => {
    const dataWithTimestamp = {
      ...updated,
      essential: true,
      acceptedAt: new Date().toISOString(),
    };
    setPreferences(dataWithTimestamp);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataWithTimestamp));
    setShowBanner(false);
    setShowModal(false);
  };

  const handleAcceptAll = () => {
    saveConsent({
      essential: true,
      analytics: true,
      marketing: true,
      acceptedAt: "",
    });
  };

  const handleRejectNonEssential = () => {
    saveConsent({
      essential: true,
      analytics: false,
      marketing: false,
      acceptedAt: "",
    });
  };

  return (
    <>
      {/* Cookie Consent Banner */}
      <AnimatePresence>
        {showBanner && !showModal && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-xl z-50 bg-white/95 backdrop-blur-md border border-ivory-300 p-5 rounded-2xl shadow-elevation space-y-4"
          >
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-sage-100 text-sage-700 rounded-xl shrink-0 mt-0.5">
                <Cookie className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-charcoal-800 flex items-center gap-1.5">
                  Privacy & Cookie Preferences
                  <ShieldCheck className="w-4 h-4 text-sage-600 inline" />
                </h4>
                <p className="text-xs text-charcoal-600 leading-relaxed">
                  COZPIRAA Dermatology Clinic uses essential cookies for secure appointment bookings and optional analytical cookies to continuously improve patient experience.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2 pt-1 border-t border-ivory-200">
              <button
                onClick={() => setShowModal(true)}
                className="px-3 py-2 text-xs font-semibold text-charcoal-600 hover:text-sage-700 hover:bg-ivory-100 rounded-xl transition-colors flex items-center gap-1.5"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Customize</span>
              </button>
              <button
                onClick={handleRejectNonEssential}
                className="px-3.5 py-2 text-xs font-semibold text-charcoal-700 bg-ivory-100 hover:bg-ivory-200 rounded-xl transition-colors"
              >
                Essential Only
              </button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleAcceptAll}
                className="text-xs py-2 px-4 shadow-sm"
              >
                Accept All
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detailed Cookie Preferences Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-white border border-ivory-300 rounded-2xl max-w-lg w-full p-6 shadow-elevation space-y-6 relative overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-ivory-200 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-sage-100 text-sage-700 rounded-xl">
                    <Cookie className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-charcoal-800">Cookie Settings</h3>
                    <p className="text-xs text-charcoal-500">COZPIRAA Clinical Privacy Management</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-1.5 text-charcoal-400 hover:text-charcoal-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                {/* Essential Cookies */}
                <div className="p-4 bg-ivory-100/60 rounded-xl border border-ivory-200 flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-charcoal-800">Essential Cookies</span>
                      <span className="text-[10px] uppercase tracking-wider font-bold text-sage-700 bg-sage-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5" /> Required
                      </span>
                    </div>
                    <p className="text-xs text-charcoal-600 leading-normal">
                      Necessary for basic website security, session management, and appointment booking functionality. Cannot be disabled.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={true}
                    disabled={true}
                    className="mt-1 accent-sage-600 rounded cursor-not-allowed opacity-70 w-4 h-4"
                  />
                </div>

                {/* Analytics Cookies */}
                <div className="p-4 bg-white rounded-xl border border-ivory-300 flex items-start justify-between gap-3 hover:border-sage-400 transition-colors">
                  <div className="space-y-1">
                    <span className="font-semibold text-sm text-charcoal-800">Analytics & Performance</span>
                    <p className="text-xs text-charcoal-600 leading-normal">
                      Helps us analyze site traffic, page load performance, and optimize our medical information hubs for patients.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    id="analyticsCookies"
                    checked={preferences.analytics}
                    onChange={(e) =>
                      setPreferences({ ...preferences, analytics: e.target.checked })
                    }
                    className="mt-1 accent-sage-600 rounded w-4 h-4 cursor-pointer"
                  />
                </div>

                {/* Marketing & Reminders */}
                <div className="p-4 bg-white rounded-xl border border-ivory-300 flex items-start justify-between gap-3 hover:border-sage-400 transition-colors">
                  <div className="space-y-1">
                    <span className="font-semibold text-sm text-charcoal-800">Reminders & Communication</span>
                    <p className="text-xs text-charcoal-600 leading-normal">
                      Allows clinic notification reminders, skin care tips updates, and personalized appointment scheduling alerts.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    id="marketingCookies"
                    checked={preferences.marketing}
                    onChange={(e) =>
                      setPreferences({ ...preferences, marketing: e.target.checked })
                    }
                    className="mt-1 accent-sage-600 rounded w-4 h-4 cursor-pointer"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-ivory-200 flex items-center justify-between gap-3">
                <button
                  onClick={handleRejectNonEssential}
                  className="text-xs font-semibold text-charcoal-600 hover:text-charcoal-800 underline"
                >
                  Decline Non-Essential
                </button>
                <div className="flex items-center gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => saveConsent(preferences)}
                    leftIcon={<Check className="w-4 h-4" />}
                  >
                    Save Preferences
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
