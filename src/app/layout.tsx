// Import global CSS styles (typically Tailwind base styles, custom styles, etc.)
import "@/styles/globals.css";

// Import the Inter font from Google Fonts using Next.js font optimization
import { Inter } from "next/font/google";

// Initialize the Inter font with Latin character subset
const inter = Inter({ subsets: ["latin"] });

// Metadata used by Next.js for setting page title and description (e.g. for SEO)
export const metadata = {
  title: "Next.js Todo App", // Browser tab title
  description:
    "A simple to do app built with Next.js, TypeScript, and Tailwind CSS", // Meta description for SEO
};

// Define the layout component that wraps around every page
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    // Root HTML element with language set to English
    <html lang="en">
      {/* Body element with the Inter font applied */}
      <body className={inter.className}>
        {/* Wrapper div for setting background and full height */}
        {/* Centered content container with padding and max width */}
        <div className="min-h-screen bg-gray-100 max-w-4xl mx-auto px-4 py-8">
          {/* App header */}
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Mei's Todo App
          </h1>

          {/* Render the page-specific content passed as children such as page.tsx*/}
          {children}
        </div>
      </body>
    </html>
  );
};

// Export the layout component as default (used automatically in app layout)
export default RootLayout;
