import type { Metadata } from "next";
import { Fraunces, Work_Sans } from "next/font/google";
import Link from "next/link";
import SmoothScrollProvider from "@/components/smooth-scroll-provider";
import CustomCursor from "@/components/custom-cursor";
import PassportTracker from "@/components/passport-tracker";
import "./globals.css";

// Heading font: Fraunces (warm, editorial serif with expressive italic)
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

// Body font: Work Sans (clean, readable sans-serif)
const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Sanchaari | The places worth finding",
    template: "%s | Sanchaari",
  },
  description:
    "An editorial travel magazine documenting offbeat stays, meals and sights across India, written by people who actually went.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${workSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F4EEE1] text-[#0E1B1A]">
        <SmoothScrollProvider>
          {/* Custom cinematic follower on desktop */}
          <CustomCursor />

          {/* Sticky Editorial Header */}
          <header className="border-b border-[#E0D7C4] bg-[#FAF7F0]/90 backdrop-blur-md sticky top-0 z-30">
            <div className="max-w-7xl mx-auto px-6 sm:px-10 py-4 flex items-center justify-between">
              <Link
                href="/"
                className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#0E1B1A] hover:text-[#B5502E] transition-colors"
              >
                Sanchaari
              </Link>

              <div className="flex items-center gap-4">
                <span className="hidden md:inline text-xs text-[#6C7976] italic font-serif">
                  The places worth finding
                </span>
                <PassportTracker totalPlaces={9} />
              </div>
            </div>
          </header>

          {/* Main page content */}
          <main className="flex-1">{children}</main>

          {/* Cinematic Night Teal Footer */}
          <footer className="relative bg-[#0E1B1A] text-[#FAF7F0] border-t border-[#233D3A] py-16 sm:py-20 overflow-hidden">
            <div className="absolute inset-0 film-grain pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#233D3A]">
                <div className="md:col-span-6 space-y-4">
                  <span className="font-serif text-3xl sm:text-4xl font-bold text-[#FAF7F0] block">
                    Sanchaari
                  </span>
                  <p className="font-serif italic text-base sm:text-lg text-[#E0A030] max-w-md">
                    “The places worth finding.”
                  </p>
                  <p className="text-sm text-[#8E9D9A] leading-relaxed max-w-md">
                    Stays, meals and sights across offbeat India, documented
                    honestly by travellers who walked the trails and ate at the
                    tables.
                  </p>
                </div>

                <div className="md:col-span-3 space-y-3">
                  <span className="text-xs uppercase font-mono tracking-wider text-[#E0A030] block">
                    Explore
                  </span>
                  <ul className="space-y-2 text-sm text-[#CBD5D3]">
                    <li>
                      <Link href="/#explore" className="hover:text-[#FAF7F0]">
                        Curated index
                      </Link>
                    </li>
                    <li>
                      <Link href="/places/kashi-art-cafe-kochi" className="hover:text-[#FAF7F0]">
                        Fort Kochi courtyard
                      </Link>
                    </li>
                    <li>
                      <Link href="/places/boulders-hideaway-hampi" className="hover:text-[#FAF7F0]">
                        Hampi granite hideaway
                      </Link>
                    </li>
                    <li>
                      <Link href="/places/nongriat-stilt-cottage-meghalaya" className="hover:text-[#FAF7F0]">
                        Meghalaya living root bridge
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="md:col-span-3 space-y-3">
                  <span className="text-xs uppercase font-mono tracking-wider text-[#E0A030] block">
                    Photography credits
                  </span>
                  <p className="text-xs text-[#8E9D9A] leading-relaxed">
                    Imagery provided by independent photographers on Unsplash
                    (Pratiksha Mohanty, Shashi Ch, Sanat Joshi, Kyungho Stott,
                    Mae Mu, Bailey Zindel, Biju Boro, Sylwia Bartyzel, Annie
                    Spratt).
                  </p>
                </div>
              </div>

              <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#6C7976]">
                <p>© 2026 Sanchaari. Written like a friend, not a brochure.</p>
                <p>Sentence case everywhere · No promotional buzzwords</p>
              </div>
            </div>
          </footer>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
