"use client"
import { useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { HiMenuAlt3 } from "react-icons/hi";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="min-h-screen flex flex-col">
          <Navbar />

          {/* Hamburger menu for mobile */}
          <div className="md:hidden px-4 py-2 border-t border-gray-200 bg-white shadow">
            <button onClick={() => setSidebarOpen(true)}>
              <HiMenuAlt3 size={24} />
            </button>
          </div>

          <div className="flex flex-1 bg-white min-h-screen relative">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="flex-1 p-4 bg-white text-black overflow-auto z-0">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}