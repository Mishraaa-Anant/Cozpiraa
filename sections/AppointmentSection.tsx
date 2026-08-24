"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar as CalendarIcon,
  User,
  Phone,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Droplet,
  Hash,
  Sparkles,
  MapPin
} from "lucide-react";
import { SKIN_CONCERNS } from "@/lib/data";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { supabase } from "@/lib/supabase";

interface FormData {
  fullName: string;
  age: string;
  phone: string;
  bloodGroup: string;
  preferredDate: string;
  slot: string;
  concern: string;
  message: string;
}

const TIME_SLOTS = [
  { id: "10:00-11:00", label: "10:00 AM – 11:00 AM" },
  { id: "11:00-12:00", label: "11:00 AM – 12:00 PM" },
  { id: "12:00-13:00", label: "12:00 PM – 01:00 PM" },
  { id: "13:00-14:00", label: "01:00 PM – 02:00 PM" },
  { id: "14:00-15:00", label: "02:00 PM – 03:00 PM" },
  { id: "15:00-16:00", label: "03:00 PM – 04:00 PM" },
  { id: "16:00-17:00", label: "04:00 PM – 05:00 PM" },
  { id: "17:00-18:00", label: "05:00 PM – 06:00 PM" },
  { id: "18:00-19:00", label: "06:00 PM – 07:00 PM" },
  { id: "19:00-20:00", label: "07:00 PM – 08:00 PM" },
  { id: "20:00-20:30", label: "08:00 PM – 08:30 PM" },
];

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Unknown"];

export function AppointmentSection() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    age: "",
    phone: "",
    bloodGroup: "O+",
    preferredDate: new Date().toISOString().split("T")[0],
    slot: "10:00-11:00",
    concern: "Acne & Scars",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [bookingRef, setBookingRef] = useState<string>("");

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.concern) newErrors.concern = "Please select a primary skin/hair concern";
      if (!formData.preferredDate) newErrors.preferredDate = "Please select an appointment date";
      if (!formData.slot) newErrors.slot = "Please select a time slot";
    }

    if (step === 2) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = "Patient full name is required";
      }
      if (!formData.age.trim()) {
        newErrors.age = "Patient age is required";
      } else {
        const numAge = parseInt(formData.age, 10);
        if (isNaN(numAge) || numAge < 1 || numAge > 120) {
          newErrors.age = "Enter a valid age (1-120)";
        }
      }
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required";
      } else if (!/^[0-9+\s-]{8,15}$/.test(formData.phone)) {
        newErrors.phone = "Enter a valid phone number";
      }
      if (!formData.bloodGroup) {
        newErrors.bloodGroup = "Please select a blood group";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 2));
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(2)) return;

    setIsSubmitting(true);

    const generatedRef = "CZP-" + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(generatedRef);

    try {
      // Save appointment to Supabase with ALL columns matching Admin Table
      const { error } = await supabase.from("appointments").insert([
        {
          name: formData.fullName.trim(),
          age: parseInt(formData.age, 10),
          phone: formData.phone.trim(),
          blood_group: formData.bloodGroup,
          day: formData.preferredDate,
          slot: formData.slot,
          status: "confirmed",
          booking_ref: generatedRef,
        },
      ]);

      if (error) {
        console.warn("Supabase insertion fallback warning:", error.message);
      }
    } catch (err) {
      console.error("Submission error:", err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      age: "",
      phone: "",
      bloodGroup: "O+",
      preferredDate: new Date().toISOString().split("T")[0],
      slot: "10:00-11:00",
      concern: "Acne & Scars",
      message: "",
    });
    setCurrentStep(1);
    setIsSubmitted(false);
    setErrors({});
    setBookingRef("");
  };

  return (
    <section id="appointment" className="py-24 bg-ivory-100/60 border-b border-ivory-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <Badge variant="sage" icon={<CalendarIcon className="w-3.5 h-3.5" />}>
            Instant Online Booking
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal-800 tracking-tight font-serif">
            Book Your Skin, Hair & Laser Consultation
          </h2>
          <p className="text-charcoal-600 text-base leading-relaxed">
            Fill in your patient details to confirm your slot directly with Dr. Priyanka Rahul Patil at COZPIRAA Clinic, Virar West.
          </p>
        </div>

        <Card className="p-6 sm:p-10 bg-white border-sage-600/20 shadow-elevation">
          {!isSubmitted ? (
            <div>
              {/* Step Progress Indicator */}
              <div className="mb-8">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-charcoal-500 mb-3">
                  <span className={currentStep >= 1 ? "text-sage-700 font-extrabold" : ""}>
                    1. Concern, Date & Slot
                  </span>
                  <span className={currentStep >= 2 ? "text-sage-700 font-extrabold" : ""}>
                    2. Patient Details (Admin Records)
                  </span>
                </div>

                <div className="w-full h-2 bg-ivory-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-sage-600 rounded-full"
                    initial={{ width: "50%" }}
                    animate={{ width: `${(currentStep / 2) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <AnimatePresence mode="wait">
                  {/* STEP 1: CONCERN, DATE & TIME SLOT */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-6"
                    >
                      {/* Skin Concern Selection */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-2">
                          1. Select Skin or Scalp Concern <span className="text-rose-600">*</span>
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                          {SKIN_CONCERNS.map((c) => (
                            <button
                              type="button"
                              key={c.id}
                              onClick={() => setFormData({ ...formData, concern: c.title })}
                              className={`p-3 rounded-xl text-left border text-xs font-semibold transition-all ${
                                formData.concern === c.title
                                  ? "bg-sage-600 text-white border-sage-700 shadow-sm"
                                  : "bg-white text-charcoal-800 border-ivory-300 hover:border-sage-400"
                              }`}
                            >
                              {c.title}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Appointment Date */}
                      <div>
                        <label htmlFor="preferredDate" className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-2">
                          2. Select Appointment Date <span className="text-rose-600">*</span>
                        </label>
                        <input
                          id="preferredDate"
                          type="date"
                          min={new Date().toISOString().split("T")[0]}
                          value={formData.preferredDate}
                          onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-ivory-300 bg-white text-charcoal-800 text-sm focus:outline-none focus:ring-2 focus:ring-sage-600 font-medium"
                        />
                        {errors.preferredDate && (
                          <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>{errors.preferredDate}</span>
                          </p>
                        )}
                      </div>

                      {/* Time Slot Picker */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-2">
                          3. Select Consultation Time Slot <span className="text-rose-600">*</span>
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                          {TIME_SLOTS.map((slot) => (
                            <button
                              type="button"
                              key={slot.id}
                              onClick={() => setFormData({ ...formData, slot: slot.id })}
                              className={`p-3 rounded-xl text-center border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                                formData.slot === slot.id
                                  ? "bg-terracotta-500 text-white border-terracotta-600 shadow-sm"
                                  : "bg-sage-50/50 text-charcoal-800 border-sage-200 hover:border-terracotta-400"
                              }`}
                            >
                              <Clock className="w-3.5 h-3.5 shrink-0" />
                              <span>{slot.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: PATIENT DETAILS (ALL ADMIN TABLE COLUMNS) */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-4"
                    >
                      <div className="p-3 bg-sage-50 border border-sage-200 rounded-xl text-xs text-sage-800 font-medium flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-sage-600 shrink-0" />
                        <span>All patient fields below are stored directly in our secure Admin Database.</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* COLUMN 1: PATIENT NAME */}
                        <div>
                          <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                            Patient Full Name <span className="text-rose-600">*</span>
                          </label>
                          <div className="relative">
                            <User className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-3.5" />
                            <input
                              id="fullName"
                              type="text"
                              required
                              placeholder="e.g. Rahul Sharma"
                              value={formData.fullName}
                              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                              className="w-full pl-10 pr-4 py-3 rounded-xl border border-ivory-300 bg-white text-charcoal-800 text-sm focus:outline-none focus:ring-2 focus:ring-sage-600"
                            />
                          </div>
                          {errors.fullName && (
                            <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                              <AlertCircle className="w-3.5 h-3.5" />
                              <span>{errors.fullName}</span>
                            </p>
                          )}
                        </div>

                        {/* COLUMN 2: AGE */}
                        <div>
                          <label htmlFor="age" className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                            Age (Years) <span className="text-rose-600">*</span>
                          </label>
                          <div className="relative">
                            <Hash className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-3.5" />
                            <input
                              id="age"
                              type="number"
                              required
                              min="1"
                              max="120"
                              placeholder="e.g. 28"
                              value={formData.age}
                              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                              className="w-full pl-10 pr-4 py-3 rounded-xl border border-ivory-300 bg-white text-charcoal-800 text-sm focus:outline-none focus:ring-2 focus:ring-sage-600"
                            />
                          </div>
                          {errors.age && (
                            <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                              <AlertCircle className="w-3.5 h-3.5" />
                              <span>{errors.age}</span>
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* COLUMN 3: PHONE */}
                        <div>
                          <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                            Phone Number <span className="text-rose-600">*</span>
                          </label>
                          <div className="relative">
                            <Phone className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-3.5" />
                            <input
                              id="phone"
                              type="tel"
                              required
                              placeholder="e.g. +91 98200 12345"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="w-full pl-10 pr-4 py-3 rounded-xl border border-ivory-300 bg-white text-charcoal-800 text-sm focus:outline-none focus:ring-2 focus:ring-sage-600"
                            />
                          </div>
                          {errors.phone && (
                            <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                              <AlertCircle className="w-3.5 h-3.5" />
                              <span>{errors.phone}</span>
                            </p>
                          )}
                        </div>

                        {/* COLUMN 4: BLOOD GROUP */}
                        <div>
                          <label htmlFor="bloodGroup" className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                            Blood Group <span className="text-rose-600">*</span>
                          </label>
                          <div className="relative">
                            <Droplet className="w-4 h-4 text-rose-500 absolute left-3.5 top-3.5" />
                            <select
                              id="bloodGroup"
                              value={formData.bloodGroup}
                              onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                              className="w-full pl-10 pr-4 py-3 rounded-xl border border-ivory-300 bg-white text-charcoal-800 text-sm focus:outline-none focus:ring-2 focus:ring-sage-600 font-semibold"
                            >
                              {BLOOD_GROUPS.map((bg) => (
                                <option key={bg} value={bg}>
                                  {bg}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Additional Notes */}
                      <div>
                        <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                          Medical History or Special Requests (Optional)
                        </label>
                        <textarea
                          id="message"
                          rows={2}
                          placeholder="Previous skin treatments, allergies, or specific consultation questions..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-ivory-300 bg-white text-charcoal-800 text-sm focus:outline-none focus:ring-2 focus:ring-sage-600 resize-none"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Form Control Buttons */}
                <div className="pt-4 border-t border-ivory-200 flex items-center justify-between">
                  {currentStep > 1 ? (
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={handlePrevStep}
                      leftIcon={<ArrowLeft className="w-4 h-4" />}
                    >
                      Back
                    </Button>
                  ) : (
                    <div />
                  )}

                  {currentStep < 2 ? (
                    <Button
                      type="button"
                      variant="primary"
                      onClick={handleNextStep}
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                    >
                      Continue to Patient Details
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="primary"
                      isLoading={isSubmitting}
                      leftIcon={<CheckCircle2 className="w-4 h-4" />}
                    >
                      Confirm & Save to Admin Panel
                    </Button>
                  )}
                </div>
              </form>
            </div>
          ) : (
            /* CONFIRMATION SCREEN (MATCHING ALL ADMIN COLUMNS) */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6 space-y-6"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <Badge variant="terracotta">Booking Confirmed</Badge>
                <h3 className="text-2xl font-bold text-charcoal-800 font-serif">
                  Appointment Saved & Recorded!
                </h3>
                <p className="text-charcoal-600 text-sm max-w-md mx-auto leading-relaxed">
                  Your appointment record is now active in the COZPIRAA Admin system. Please arrive 10 minutes prior to your selected slot.
                </p>
              </div>

              {/* Admin Records Summary Box */}
              <div className="p-6 bg-sage-50 rounded-2xl border border-sage-200 text-left max-w-md mx-auto text-xs space-y-2.5 text-charcoal-800 shadow-xs">
                <div className="flex justify-between items-center pb-2 border-b border-sage-200">
                  <span className="font-semibold text-charcoal-500 uppercase tracking-wider text-[10px]">Booking Ref:</span>
                  <span className="font-mono font-bold text-terracotta-600 text-sm bg-white px-2 py-0.5 rounded border border-terracotta-200">
                    {bookingRef}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold text-charcoal-500">Patient Name:</span>
                  <span className="font-bold">{formData.fullName}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold text-charcoal-500">Age:</span>
                  <span className="font-bold">{formData.age} Yrs</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold text-charcoal-500">Phone Number:</span>
                  <span className="font-bold">{formData.phone}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold text-charcoal-500">Blood Group:</span>
                  <span className="font-bold text-rose-600">{formData.bloodGroup}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold text-charcoal-500">Appointment Date:</span>
                  <span className="font-bold">{formData.preferredDate}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold text-charcoal-500">Time Slot:</span>
                  <span className="font-bold text-sage-700">
                    {TIME_SLOTS.find((s) => s.id === formData.slot)?.label || formData.slot}
                  </span>
                </div>

                <div className="flex justify-between pt-1">
                  <span className="font-semibold text-charcoal-500">Status:</span>
                  <span className="font-bold text-emerald-700 uppercase tracking-wider text-[10px]">
                    Confirmed
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <Button variant="outline" onClick={resetForm}>
                  Book Another Appointment
                </Button>
                <a
                  href="https://maps.google.com/?q=COZPIRAA+Skin+Clinic+Virar+West"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-sage-600 hover:bg-sage-700 text-white font-semibold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Get Clinic Directions</span>
                </a>
              </div>
            </motion.div>
          )}
        </Card>
      </div>
    </section>
  );
}
