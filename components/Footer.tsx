import typography from "@/styles/typography"; // Import the typography configuration

export default function Footer({ className }: { className?: string }) {
  return (
    <footer className={`border-t border-neutral-200 bg-white py-4 ${className || ''}`}>
      <div className="container mx-auto text-center">
        <p className={`${typography.sizes.xs} ${typography.colors.darkGray}`}>
          © 2024 Arita Dreshaj. All rights reserved.
        </p>
      </div>
    </footer>
  );
}