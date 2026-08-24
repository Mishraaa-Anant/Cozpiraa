import type { Metadata, Viewport } from "next";
import { Outfit, Inter } from "next/font/google";
import { PwaProvider } from "@/components/pwa/PwaProvider";
import { CookieBanner } from "@/components/cookies/CookieBanner";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#2D5A4C",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Best Cosmetology Consultant & Skin, Hair, Laser Treatment in Virar West | Dr. Priyanka Patil | COZPIRAA",
  description:
    "Looking for expert skin, hair, laser treatment or cosmetology consultant in Virar? COZPIRAA Skin Clinic in Global City, Virar West provides expert treatment for acne, scars, melasma, hyperpigmentation, anti-aging & PRP hair fall by Dr. Priyanka Rahul Patil (BAMS, 10+ Yrs Exp). Book your consultation today!",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "COZPIRAA",
  },
  icons: {
    icon: "/images/latest.png",
    apple: "/images/latest.png",
  },
  keywords: [
    "Cosmetology Consultant in Virar",
    "Best Cosmetologist in Virar",
    "Cosmetology Consultant in Virar West",
    "Best Cosmetologist in Virar West",
    "Skin Specialist Virar West",
    "Skin Hair Laser Treatment Virar",
    "Cosmetology Clinic Virar West",
    "Dr Priyanka Rahul Patil Cosmetologist",
    "Acne Treatment Virar West",
    "Acne Scar Treatment Virar",
    "Pigmentation Melasma Clinic Virar",
    "PRP Hair Therapy Virar",
    "Laser Hair Removal Virar",
    "Chemical Peels Virar West",
    "Skin Clinic Global City Virar West",
    "Vasai Virar Skin and Laser Clinic",
    "Best Cosmetologist in Palghar",
    "Skin and Hair Clinic Virar",
  ],
  authors: [{ name: "Dr. Priyanka Rahul Patil", url: "https://cozpiraa.vercel.app" }],
  creator: "COZPIRAA Skin, Hair, Laser & Cosmetology Clinic",
  publisher: "COZPIRAA Skin, Hair, Laser & Cosmetology Clinic",
  metadataBase: new URL("https://cozpiraa.vercel.app"),
  alternates: {
    canonical: "https://cozpiraa.vercel.app",
  },
  openGraph: {
    title: "Best Cosmetology Consultant & Skin, Hair, Laser Treatment in Virar West | COZPIRAA Clinic",
    description:
      "Ranked top skin clinic in Virar West. Expert care for acne, scars, melasma, pigmentation, laser cosmetology & hair regrowth by Dr. Priyanka Rahul Patil (BAMS, 10+ Yrs Exp).",
    url: "https://cozpiraa.vercel.app",
    siteName: "COZPIRAA Skin, Hair, Laser & Cosmetology Clinic Virar",
    images: [
      {
        url: "/images/latest.png",
        width: 1200,
        height: 630,
        alt: "COZPIRAA Skin, Hair, Laser & Cosmetology Clinic Virar West",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Cosmetology Consultant & Skin, Hair, Laser Treatment in Virar West | Dr. Priyanka Patil",
    description:
      "Expert skin care, cosmetology, acne scar subcision, pigmentation treatment & hair therapy by Dr. Priyanka Rahul Patil (BAMS, 10+ Yrs Exp) in Virar West.",
    images: ["/images/latest.png"],
  },
  other: {
    "geo.region": "IN-MH",
    "geo.placename": "Virar West, Palghar, Maharashtra",
    "geo.position": "19.4644;72.7969",
    ICBM: "19.4644, 72.7969",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "jJtTCcgh_-Ohg9iqH6vg_IuR9ngPuKfT2pebCiTvwew",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["MedicalClinic", "LocalBusiness", "HealthAndBeautyBusiness"],
        "@id": "https://cozpiraa.vercel.app/#clinic",
        name: "COZPIRAA Skin, Hair, Laser & Cosmetology Clinic",
        alternateName: "Best Cosmetology Consultant & Skin, Hair, Laser Specialist in Virar West - Dr. Priyanka Rahul Patil",
        url: "https://cozpiraa.vercel.app",
        telephone: "+91-72493-12567",
        email: "hello@cozpiraaclinic.com",
        image: "https://cozpiraa.vercel.app/images/latest.png",
        priceRange: "₹₹",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Shop No. 32, Agarwal Lifestyle Avenue, C-3, Opp. Poonam Vista, Global City",
          addressLocality: "Virar West",
          addressRegion: "Maharashtra",
          postalCode: "401303",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 19.4644,
          longitude: 72.7969,
        },
        areaServed: [
          { "@type": "AdministrativeArea", name: "Virar West" },
          { "@type": "AdministrativeArea", name: "Virar East" },
          { "@type": "AdministrativeArea", name: "Global City Virar" },
          { "@type": "AdministrativeArea", name: "Vasai-Virar" },
          { "@type": "AdministrativeArea", name: "Nallasopara" },
          { "@type": "AdministrativeArea", name: "Palghar" },
        ],
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens: "10:00",
            closes: "20:00",
          },
        ],
        medicalSpecialty: ["CosmeticTreatment", "Trichology", "LaserTreatment"],
        knowsAbout: [
          "Skin, Hair & Laser Treatment",
          "Medical Cosmetology",
          "Acne Treatment",
          "Acne Scar Subcision",
          "Hyperpigmentation & Melasma",
          "Chemical Peels",
          "PRP Hair Therapy",
          "Laser Skin Rejuvenation",
          "Anti-Aging Treatments",
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "148",
          bestRating: "5",
          worstRating: "1",
        },
      },
      {
        "@type": "Physician",
        "@id": "https://cozpiraa.vercel.app/#doctor",
        name: "Dr. Priyanka Rahul Patil",
        jobTitle: "Cosmetology Consultant & Skin, Hair, Laser Specialist",
        medicalSpecialty: ["CosmeticTreatment", "Trichology"],
        description: "Dr. Priyanka Rahul Patil (BAMS) is a leading Cosmetology Consultant and Skin, Hair & Laser Specialist in Virar West with 10+ years of experience in medical cosmetology, laser aesthetic treatments, and hair PRP therapy.",
        worksFor: { "@id": "https://cozpiraa.vercel.app/#clinic" },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Virar West",
          addressRegion: "Maharashtra",
          addressCountry: "IN",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Who is the best Cosmetology Consultant & Skin, Hair, Laser specialist in Virar West?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Dr. Priyanka Rahul Patil (BAMS) at COZPIRAA Skin, Hair & Laser Clinic is widely recognized as a leading Cosmetology Consultant in Virar West, bringing 10+ years of clinical experience in treating acne, acne scars, hyperpigmentation, melasma, anti-aging, laser treatments, and hair regrowth.",
            },
          },
          {
            "@type": "Question",
            name: "Where is COZPIRAA Skin, Hair & Laser Clinic located in Virar?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "COZPIRAA is located at Shop No. 32, Agarwal Lifestyle Avenue, C-3, Opp. Poonam Vista, Global City, Virar West, Maharashtra 401303.",
            },
          },
          {
            "@type": "Question",
            name: "What skin, hair, laser, and cosmetology services are available at COZPIRAA Virar?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "COZPIRAA provides comprehensive clinical skin, hair, laser, and cosmetology treatments including acne control, scar microneedling & subcision, chemical peels, hyperpigmentation & melasma care, laser skin rejuvenation, anti-aging therapies, and PRP hair growth treatment.",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://cozpiraa.vercel.app",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Cosmetology Consultant in Virar West",
            item: "https://cozpiraa.vercel.app/#doctor",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Skin, Hair & Laser Services Virar",
            item: "https://cozpiraa.vercel.app/#services",
          },
        ],
      },
    ],
  };

  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        {children}
        <PwaProvider />
        <CookieBanner />
      </body>
    </html>
  );
}
