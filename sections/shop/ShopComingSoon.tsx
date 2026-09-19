"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  ShieldCheck,
  Sparkles,
  Leaf,
  Droplets,
  Package,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";

const UPCOMING_CATEGORIES = [
  {
    icon: Droplets,
    title: "Skin Essentials",
    desc: "Cleansers, moisturisers, and serums formulated for clinical skin health",
    tag: "Launching First",
  },
  {
    icon: Sparkles,
    title: "Targeted Treatments",
    desc: "Targeted formulations for acne, pigmentation, and sensitivity",
    tag: "In Curation",
  },
  {
    icon: Leaf,
    title: "Hair & Scalp Care",
    desc: "Evidence-based hair care products for thinning, dandruff, and scalp health",
    tag: "Coming Soon",
  },
  {
    icon: Package,
    title: "Wellness & Supplements",
    desc: "Nutraceuticals and wellness products recommended for skin-from-within care",
    tag: "Coming Soon",
  },
];

const PROMISE_POINTS = [
  "Every product personally reviewed by Dr. Priyanka Rahul Patil (BAMS)",
  "No misleading claims — only ingredients with clinical backing",
  "Curated for Indian skin types and climate conditions",
  "Safe for use alongside in-clinic treatments",
];

export function ShopComingSoon() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <div id="shop-content">
      {/* Categories Preview Section */}
      <section className="py-24 bg-white border-b border-ivory-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <Badge variant="sage" icon={<Sparkles className="w-3.5 h-3.5" />}>
              Product Collection
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal-800 tracking-tight">
              What We Are Building
            </h2>
            <p className="text-charcoal-600 text-base sm:text-lg leading-relaxed">
              A carefully curated product range — not a generic catalogue. Every
              item selected based on clinical evidence and real patient outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {UPCOMING_CATEGORIES.map(({ icon: Icon, title, desc, tag }, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="relative p-6 rounded-2xl bg-ivory-100/60 border border-ivory-300/80 space-y-4 hover:border-sage-300 hover:bg-white transition-all duration-300 group"
              >
                {/* Tag */}
                <div className="absolute top-4 right-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-terracotta-600 bg-terracotta-50 border border-terracotta-200 px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                </div>

                <div className="w-12 h-12 rounded-xl bg-sage-100 text-sage-700 flex items-center justify-center group-hover:bg-sage-600 group-hover:text-white transition-colors duration-300">
                  <Icon className="w-6 h-6" />
                </div>

                <div className="space-y-1.5 pr-6">
                  <h3 className="text-base font-bold text-charcoal-800 group-hover:text-sage-700 transition-colors">
                    {title}
                  </h3>
                  <p className="text-xs text-charcoal-600 leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Promise Section */}
      <section className="py-24 bg-ivory-100/50 border-b border-ivory-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Copy */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <Badge variant="sage" icon={<ShieldCheck className="w-3.5 h-3.5" />}>
                The COZPIRAA Promise
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-charcoal-800 tracking-tight leading-tight">
                Products You Can Trust Because They Come From a Clinic
              </h2>
              <p className="text-charcoal-600 text-base leading-relaxed">
                The beauty industry is filled with exaggerated claims and
                ineffective formulations. At COZPIRAA, we will only offer
                products we genuinely use and recommend in our clinic — nothing
                more.
              </p>

              <ul className="space-y-3 pt-2">
                {PROMISE_POINTS.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-charcoal-700">
                    <CheckCircle2 className="w-4 h-4 text-sage-600 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Right: Early Access Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative rounded-2xl bg-white border border-ivory-300 shadow-elevation overflow-hidden">
                {/* Top strip */}
                <div className="bg-gradient-to-r from-sage-800 to-sage-900 px-6 py-5 text-white">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
                      <Bell className="w-4.5 h-4.5 w-[18px] h-[18px] text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base">Get Early Access</h3>
                      <p className="text-xs text-sage-200 mt-0.5">
                        Be the first to know when we launch
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-4 flex flex-col items-center gap-3 text-center"
                    >
                      <div className="w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6 text-sage-600" />
                      </div>
                      <div>
                        <p className="font-bold text-charcoal-800 text-base">You&apos;re on the list</p>
                        <p className="text-sm text-charcoal-500 mt-1">
                          We&apos;ll reach out as soon as the collection is ready.
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <>
                      <p className="text-sm text-charcoal-600 leading-relaxed">
                        Leave your email and we&apos;ll notify you when the COZPIRAA
                        product collection launches — with early-access pricing.
                      </p>

                      <form onSubmit={handleNotify} className="flex flex-col sm:flex-row gap-3">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          required
                          className="flex-1 px-4 py-2.5 rounded-xl border border-ivory-300 bg-ivory-50 text-sm text-charcoal-800 placeholder:text-charcoal-400 focus:outline-none focus:ring-2 focus:ring-sage-600 focus:border-transparent transition-all"
                        />
                        <button
                          type="submit"
                          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-sage-600 hover:bg-sage-700 text-white text-sm font-semibold rounded-xl transition-all duration-300 shadow-clinical hover:shadow-elevation active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-600 focus-visible:ring-offset-2 whitespace-nowrap"
                        >
                          <span>Notify Me</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </form>

                      <p className="text-xs text-charcoal-400">
                        No spam. One email when we launch. Unsubscribe any time.
                      </p>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
