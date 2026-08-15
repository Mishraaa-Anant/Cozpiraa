export interface SkinConcern {
  id: string;
  title: string;
  category: "Acne" | "Pigmentation" | "Texture" | "Aging" | "Scalp";
  summary: string;
  explanation: string;
  keyCharacteristics: string[];
  treatmentCategories: string[];
  medicalDisclaimer: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  keyBenefits: string[];
  targetConcerns: string[];
  overview: string;
}

export interface JourneyStep {
  step: string;
  number: string;
  title: string;
  shortDesc: string;
  detailedDesc: string;
  deliverables: string[];
}

export interface EduTopic {
  id: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  content: {
    heading: string;
    body: string;
  }[];
  keyTakeaway: string;
}

export interface MythFact {
  id: string;
  myth: string;
  fact: string;
  category: string;
  insight: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface DoctorProfile {
  name: string;
  title: string;
  qualification: string;
  experience: string;
  bio: string;
  specialties: string[];
  image: string;
  clinicAddress: string;
  phone: string;
  whatsapp: string;
  email: string;
  hours: string;
}
