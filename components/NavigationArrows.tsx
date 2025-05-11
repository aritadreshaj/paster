import React from 'react';
import '@/styles/project-page.css';

interface NavigationArrowsProps {
  prevProjectUrl: string | null; // Updated to accept full URLs
  nextProjectUrl: string | null; // Updated to accept full URLs
}

const NavigationArrows: React.FC<NavigationArrowsProps> = ({ prevProjectUrl, nextProjectUrl }) => {
  return (
    <>
      {prevProjectUrl && (
        <div className="project-page-arrow project-page-arrow-right">
          <a href={prevProjectUrl}>
            <img src="/previous.png" alt="Previous" />
          </a>
        </div>
      )}
      {nextProjectUrl && (
        <div className="project-page-arrow project-page-arrow-left">
          <a href={nextProjectUrl}>
            <img src="/next.png" alt="Next" />
          </a>
        </div>
      )}
    </>
  );
};

export default NavigationArrows;