"use client";

import Link from "next/link";
import Header from "@/components/Header"; // Import the reusable Header component
import Footer from "@/components/Footer"; // Import the reusable Footer component
import CustomCursor from "@/components/CustomCursor"; // Import the reusable CustomCursor component

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 mx-[20%] py-16 text-center">
        {/* About Section */}
        <h1 className="text-2xl font-light mb-10">about</h1>
        <p className="text-neutral-700 mb-4">
        Arita Dreshaj is an architect and urban designer whose research explores the intersections of space, memory, and historical theory. Since 2020, she has worked across a range of projects, from new constructions to reconstructions and urban-scale competitions, earning multiple awards including four first prizes. Her work investigates how architecture can serve as a vessel for cultural memory and social identity within evolving urban landscapes.
        </p>

        {/* Contact Information */}
        <div className="mt-8">
          <p className="text-neutral-700">
            Based: <span className="text-[#ff6000]">between Berlin & Prishtine</span>
          </p>
          <p className="text-neutral-700">
            Contact: <a href="mailto:info@aritadreshaj.com" className="text-[#ff6000]">info@aritadreshaj.com</a>
          </p>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}