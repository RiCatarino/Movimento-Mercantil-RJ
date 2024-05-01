"use client";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import styles from "./background.module.css";
import { usePathname } from "next/navigation";
import { HomeIcon } from "lucide-react";
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) {
    return (
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          {children}
        </body>
      </html>
    );
  } else {
    return (
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
          id="magicpattern"
        >
          <nav className="absolute w-full z-10">
            <div className="flex items-center justify-between p-4 mx-10 mt-5 bg-white shadow-xl rounded-3xl md:mx-24">
              <h1 className="text-xl font-bold ml-6">MM RJ</h1>
              <ul className="flex items-center space-x-4 mr-6">
                <li className="p-1 text-blue-500 rounded-lg cursor-pointer hover:bg-blue-500 hover:text-white">
                  <a href="/" className="">
                    <HomeIcon />
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-500">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-500">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          <main className="bg-transparent">{children}</main>
        </body>
      </html>
    );
  }
}
