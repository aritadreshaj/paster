// Import necessary modules and components
"use client";

import projectsData from '@/data/research-prj.json'; // Import project data
import { useParams } from 'next/navigation'; // For accessing dynamic route parameters
import Link from 'next/link'; // For navigation links
import React, { useState, useEffect } from 'react'; // React hooks for state management
import Header from '@/components/Header'; // Header component
import Footer from '@/components/Footer'; // Footer component
import CustomCursor from '@/components/CustomCursor'; // Custom cursor component
import NavigationArrows from '@/components/NavigationArrows'; // Navigation arrows for project navigation
import '@/styles/typography.js'; // Typography styles
import '@/styles/project-page.css'; // Project-specific styles
import "../../../styles/globals.css"; // Global styles

// Define the type for a project
type Project = {
  title: string;
  slug: string;
  date: string;
  location: string;
  publisher?: string;
  institute?: string;
  theme?: string;
  content: string;
  layout: string;
  category: string;
  images: string[];
  collaborator?: string;
  private?: boolean;
  linkCategory?: {
    text: string;
    url: string;
    active?: boolean;
  };
};

// Explicitly type the projects array
const projects: Project[] = projectsData;

export default function ProjectPage() {
  // Extract the slug parameter from the URL
  const params = useParams() as Record<string, string | string[]> | null;
  const slug = params?.slug;

  // If the slug is not available, show a loading message
  if (!slug) {
    return <p>Loading...</p>;
  }

  // Find the project that matches the slug
  const project = projects.find((project: { slug: string | string[]; }) => project.slug === slug);

  // If the project is not found, show an error message
  if (!project) {
    return <p>Project not found</p>;
  }

  // If the project is private, prevent access
  if (project.private) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">This project is private and currently unavailable.</h1>
        <Link href="/research">
          <span className="text-blue-500 underline mt-4 cursor-pointer">Go back to Research</span>
        </Link>
      </div>
    );
  }

  // Filter out private projects
  const publicProjects = projects.filter((project) => !project.private);

  // Sort public projects by date in descending order
  const sortedProjects = publicProjects.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Find the index of the current project and determine the previous and next public projects
  const projectIndex = sortedProjects.findIndex((p) => p.slug === slug);
  const prevProject =
    projectIndex + 1 < sortedProjects.length
      ? sortedProjects[projectIndex + 1]
      : sortedProjects[0];
  const nextProject =
    projectIndex - 1 >= 0
      ? sortedProjects[projectIndex - 1]
      : sortedProjects[sortedProjects.length - 1];

  return (
    // Main container for the page
    <div className="min-h-screen flex flex-col"> {/* Vertical rule: Full height of the screen, column layout */}
      <CustomCursor /> {/* Custom cursor component */}
      <Header /> {/* Header component */}
      <div className="flex-1 flex"> {/* Vertical rule: Main content grows to fill available space */}
        <div className="margin-rule flex gap-[2%] overflow-hidden"> {/* Horizontal rule: Gap between columns, no vertical scrolling */}
          <div className="w-1/2 flex items-start" style={{ marginTop: '2%', marginBottom: '2%' }}> {/* Horizontal rule: Left column (50% width) */}
            <div className="project-page-left w-full text-justify"> {/* Horizontal rule: Full width for text content */}
              <h1 className="project-page-title"> {/* Project title */}
                {project.title.split('').map((char: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, index: React.Key | null | undefined) => (
                  <span
                    key={index}
                    className={`inline-block ${char === ' ' ? 'w-2' : ''}`}
                  >
                    {char}
                  </span>
                ))}
              </h1>
              <p className="project-page-category">Publisher: {project.publisher || 'N/A'}</p> {/* Publisher info */}
              <p className="project-page-category">Institute: {project.institute || 'N/A'}</p> {/* Institute info */}
              <p className="project-page-category">Location: {project.location}</p> {/* Location info */}
              <p className="project-page-category">Date: {project.date}</p> {/* Date info */}
              <p className="project-page-theme">Theme: {project.theme || 'N/A'}</p> {/* Theme info */}
              <p className="project-page-content">{project.content}</p> {/* Project content */}
              {/* Conditionally render linkCategory if active */}
              {project.linkCategory && project.linkCategory.active && project.linkCategory.text && project.linkCategory.url && (
                <div className="mt-8">
                  <Link
                    href={project.linkCategory.url}
                    className="project-page-theme italic underline"
                  >
                    {project.linkCategory.text}
                  </Link>
                </div>
              )}
              {project.collaborator && ( /* Conditionally render collaborator info */
                <p className="project-page-category">Collaborator: {project.collaborator}</p>
              )}
            </div>
          </div>
          <div className="w-1/2 flex flex-col"> {/* Horizontal rule: Right column (50% width) */}
            <div className="flex-1 bg-gray-200 flex items-center justify-center">
              <img
                src={project.images[0]}
                alt="Main Project Image"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
      <NavigationArrows
        prevProjectUrl={prevProject ? `/research/${prevProject.slug}` : null}
        nextProjectUrl={nextProject ? `/research/${nextProject.slug}` : null}
      />
      <Footer /> {/* Footer stays at the bottom */}
    </div>
  );
}