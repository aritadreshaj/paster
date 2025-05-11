"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import Link from "next/link";
import projects from '@/data/architecture-prj.json';
import { useState, useEffect } from "react";
import "@/styles/scroll-reveal.css";
import "@/styles/globals.css";

export default function ArchitecturePage() {
  // Sort projects by date in descending order
  const sortedProjects = projects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // State to track the number of projects to display
  const [visibleProjects, setVisibleProjects] = useState(6);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollPosition >= documentHeight - 100) {
        setVisibleProjects((prev) => Math.min(prev + 6, sortedProjects.length));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative">
      <CustomCursor />
      <Header />
      <main className="flex-1 flex flex-col py-16">
        <div className="margin-rule">
          <h1 className="text-2xl font-light mb-10 text-left">architecture</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {sortedProjects.slice(0, visibleProjects).map((project) => (
              <div key={project.slug} className="opacity-100 transition-opacity duration-500">
                <div className="aspect-[1/1] bg-neutral-200"></div>
                <div className="mt-4 text-center">
                  {project.private ? (
                    <p className="text-lg font-medium text-gray-500 cursor-not-allowed">{project.title}</p>
                  ) : (
                    <p className="text-lg font-medium">
                      <Link href={`/architecture/${project.slug}`} className="text-black hover:text-[#ff6000]">
                        {project.title}
                      </Link>
                    </p>
                  )}
                  <p className="text-sm text-neutral-600">{project.location}</p>
                  <p className="text-sm text-neutral-600">{new Date(project.date).getFullYear()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}