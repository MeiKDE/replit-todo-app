import "@/styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Next.js Todo App",
  description: "A simple app built with Next.js, Typescript, and Tailwind CSS",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <div className="border border-blue-700 flex flex-col items-center">
          <h1 className="border border-red-700"> Welcome to Mei's Todo App</h1>
          {children}
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
