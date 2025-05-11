"use client";

import projectsData from '@/data/architecture-prj.json';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import NavigationArrows from '@/components/NavigationArrows';
import '@/styles/typography.js';
import '@/styles/arch-project-page.css';
import "../../../styles/globals.css";
import "../../../styles/arch-project-page.css";

// Update the Project type to match the JSON data structure
interface Project {
  phase: string;
  title: string;
  slug: string;
  date: string;
  location: string;
  publisher?: string;
  institute?: string;
  theme?: string;
  content?: string; // Made optional
  layout?: string; // Made optional
  category?: string; // Made optional
  images: string[]; // Updated to match JSON data
  collaborator?: string;
  budget?: string;
  client?: string;
  status?: string;
  type?: string;
  description?: string; // Added description field
  private?: boolean; // Added private field
}

// Correct the mapping logic for images and other properties
const projects: Project[] = projectsData.map((project) => ({
  ...project,
  images: project.images, // Directly map images as strings
  type: project.type, // Map 'type' from JSON data
}));

export default function ProjectPage() {
  const { slug } = useParams();

  if (!slug) {
    return <div>Loading...</div>;
  }

  const project = projects.find((project) => project.slug === slug);

  if (!project) {
    return <div>Project not found</div>;
  }

  // Filter out private projects
  const publicProjects = projects.filter((project) => !project.private);

  // Sort public projects by date in descending order
  const sortedProjects = publicProjects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Find the index of the current project and determine the previous and next public projects
  const projectIndex = sortedProjects.findIndex((p) => p.slug === slug);
  const prevProject = projectIndex + 1 < sortedProjects.length ? sortedProjects[projectIndex + 1] : sortedProjects[0];
  const nextProject = projectIndex - 1 >= 0 ? sortedProjects[projectIndex - 1] : sortedProjects[sortedProjects.length - 1];

  // Add state to manage the active tab
  const [activeTab, setActiveTab] = useState("images");

  // Explicitly type the tab parameter in handleTabSwitch
  const handleTabSwitch = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <CustomCursor />
      <Header />
      <div className="arch-project-page">
        <div className="arch-project-page-main">
          <div className="flex justify-between mb-12">
            {/* Left: Project Name */}
            <div className="w-[30%]">
              <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
              <p className="text-gray-500 italic">{project.location}</p>
            </div>

            {/* Right: Project Description */}
            <div className="w-[70%]">
              <p className="text-lg leading-relaxed mb-8">{project.description || "No description available."}</p>

              {/* Add space before the buttons */}
              <div className="flex justify-start gap-4">
                <button
                  className={`text-black font-medium ${activeTab === "images" ? "border-b-2 border-black" : ""}`}
                  onClick={() => handleTabSwitch("images")}
                >
                  Images
                </button>
                <button
                  className={`text-black font-medium ${activeTab === "info" ? "border-b-2 border-black" : ""}`}
                  onClick={() => handleTabSwitch("info")}
                >
                  Project Information
                </button>
              </div>
            </div>
          </div>

          {/* Add the main image and sliding effect */}
          <div className="relative overflow-hidden mt-4">
            {/* Main Image */}
            <div
              className={`transition-transform duration-500 ${activeTab === "info" ? "-translate-x-[30%]" : "translate-x-0"}`}
            >
              <img
                src={project.images[0]}
                alt="Main Project Image"
                className="w-full h-auto shadow-md"
              />
            </div>

            {/* Project Information Layer */}
            <div
              className={`absolute top-0 right-0 h-full bg-white p-6 pt-6 transition-transform duration-500 ease-in-out ${
                activeTab === "info" ? "translate-x-0" : "translate-x-full"
              }`}
              style={{ width: '70%', boxSizing: 'border-box', zIndex: 10 }}
            >
              <table className="w-full text-left text-sm border-t border-gray-300">
                <tbody>
                  <tr className="border-b border-gray-300">
                    <th className="pr-4 font-medium py-2">TYPE</th>
                    <td className="py-2">{project.type}</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <th className="pr-4 font-medium py-2">CLIENT</th>
                    <td className="py-2">{project.client || "N/A"}</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <th className="pr-4 font-medium py-2">DATE</th>
                    <td className="py-2">{project.date}</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <th className="pr-4 font-medium py-2">STATUS</th>
                    <td className="py-2">{project.status || "Completed"}</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <th className="pr-4 font-medium py-2">COLLABORATORS</th>
                    <td className="py-2">{project.collaborator || "N/A"}</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <th className="pr-4 font-medium py-2">BUDGET</th>
                    <td className="py-2">{project.budget || "N/A"}</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <th className="pr-4 font-medium py-2">PHASE</th>
                    <td className="py-2">{project.phase || "N/A"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <NavigationArrows
        prevProjectUrl={prevProject ? `/architecture/${prevProject.slug}` : null}
        nextProjectUrl={nextProject ? `/architecture/${nextProject.slug}` : null}
      />
      <Footer />
    </div>
  );
}
