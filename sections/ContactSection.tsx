"use client";

import React from "react";
import {
  MapPin,
  Phone,
  MessageSquare,
  Mail,
  Clock,
  Compass,
  ShieldCheck,
} from "lucide-react";
import { DOCTOR_PROFILE } from "@/lib/data";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-white border-b border-ivory-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <Badge variant="sage" icon={<MapPin className="w-3.5 h-3.5" />}>
            Visit COZPIRAA Clinic
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal-800 tracking-tight">
            Clinic Location & Contact
          </h2>
          <p className="text-charcoal-600 text-base sm:text-lg leading-relaxed">
            Conveniently located in Global City, Virar West. We look forward to welcoming you to our clinic.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Contact Info Cards & Actions */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Address Card */}
              <Card className="p-5 flex items-start gap-4 border-ivory-300">
                <div className="w-10 h-10 rounded-xl bg-sage-100 text-sage-700 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-500">
                    Clinic Address
                  </h4>
                  <p className="text-sm font-semibold text-charcoal-800 leading-snug">
                    {DOCTOR_PROFILE.clinicAddress}
                  </p>
                  <p className="text-xs text-charcoal-500">Opposite Poonam Vista, Global City</p>
                </div>
              </Card>

              {/* Phone Card */}
              <Card className="p-5 flex items-start gap-4 border-ivory-300">
                <div className="w-10 h-10 rounded-xl bg-terracotta-100 text-terracotta-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-500">
                    Telephone Contact
                  </h4>
                  <a
                    href={`tel:${DOCTOR_PROFILE.phone.replace(/[^0-9+]/g, "")}`}
                    className="text-sm font-bold text-charcoal-800 hover:text-sage-700 transition-colors block"
                  >
                    {DOCTOR_PROFILE.phone}
                  </a>
                  <p className="text-xs text-charcoal-500">Tap to call during clinic hours</p>
                </div>
              </Card>

              {/* Email Card */}
              <Card className="p-5 flex items-start gap-4 border-ivory-300">
                <div className="w-10 h-10 rounded-xl bg-sage-100 text-sage-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-500">
                    Email Consultation
                  </h4>
                  <a
                    href={`mailto:${DOCTOR_PROFILE.email}`}
                    className="text-sm font-bold text-charcoal-800 hover:text-sage-700 transition-colors block"
                  >
                    {DOCTOR_PROFILE.email}
                  </a>
                  <p className="text-xs text-charcoal-500">Official patient support inbox</p>
                </div>
              </Card>

              {/* Operating Hours Card */}
              <Card className="p-5 flex items-start gap-4 border-ivory-300">
                <div className="w-10 h-10 rounded-xl bg-ivory-200 text-charcoal-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-500">
                    Clinic Operating Schedule
                  </h4>
                  <p className="text-sm font-bold text-charcoal-800">
                    Monday – Saturday: 10:00 AM – 8:00 PM
                  </p>
                  <p className="text-xs text-rose-600 font-medium">Closed on Sundays & Public Holidays</p>
                </div>
              </Card>
            </div>

            {/* CTAs */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={`tel:${DOCTOR_PROFILE.phone.replace(/[^0-9+]/g, "")}`}
                className="w-full"
              >
                <Button
                  variant="primary"
                  size="md"
                  className="w-full justify-center"
                  leftIcon={<Phone className="w-4 h-4" />}
                >
                  Call Now
                </Button>
              </a>
              <a
                href={`https://wa.me/${DOCTOR_PROFILE.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button
                  variant="secondary"
                  size="md"
                  className="w-full justify-center bg-emerald-600 hover:bg-emerald-700"
                  leftIcon={<MessageSquare className="w-4 h-4" />}
                >
                  WhatsApp
                </Button>
              </a>
            </div>
          </div>

          {/* Right: Embedded Google Maps */}
          <div className="lg:col-span-7 h-full min-h-[400px] rounded-2xl overflow-hidden shadow-card border border-ivory-300 relative bg-ivory-100">
            <iframe
              title="COZPIRAA Skin, Hair & Laser Clinic Location Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3756.2745985618726!2d72.79683121489867!3d19.46441578691127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7a9e4e8a2acd3%3A0x9bfa6a8f8d44b1a5!2sGlobal%20City%2C%20Virar%20West%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              className="w-full h-full min-h-[400px] border-0"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
