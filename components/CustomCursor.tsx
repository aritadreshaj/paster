"use client";

import { useEffect } from "react";

export default function CustomCursor() {
  useEffect(() => {
    // Create the custom cursor element
    const cursor = document.createElement("div");
    cursor.id = "custom-cursor";
    cursor.style.position = "fixed";
    cursor.style.width = "12px";
    cursor.style.height = "12px";
    cursor.style.borderRadius = "50%";
    cursor.style.backgroundColor = "#ff6000"; // Default color is orange
    cursor.style.pointerEvents = "none";
    cursor.style.zIndex = "9999";
    cursor.style.transform = "translate(-50%, -50%)";
    cursor.style.transition = "background-color 0.2s ease, transform 0.1s ease";
    document.body.appendChild(cursor);

    // Hide the default cursor globally
    document.body.style.cursor = "none";

    // Apply `cursor: none` to all clickable elements
    const style = document.createElement("style");
    style.innerHTML = `
      * {
        cursor: none !important; /* Disable the default hand cursor globally */
      }
    `;
    document.head.appendChild(style);

    // Move the custom cursor with the mouse
    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    // Change cursor color to black when hovering over clickable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "A" || target.tagName === "BUTTON" || target.classList.contains("icon") || (target.tagName === "IMG" && target.hasAttribute("onclick"))) {
        cursor.style.backgroundColor = "black"; // Change to black
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "A" || target.tagName === "BUTTON") {
        cursor.style.backgroundColor = "#ff6000"; // Revert to orange
      } else if (target.tagName === "IMG" && target.hasAttribute("onclick")) {
        cursor.style.backgroundColor = "#ff6000"; // Revert to orange
      }
    };

    // Add event listeners
    document.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    // Cleanup on component unmount
    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.body.style.cursor = ""; // Restore the default cursor
      document.body.removeChild(cursor);
      document.head.removeChild(style); // Remove the added style
    };
  }, []);

  return null; // This component doesn't render anything directly
}