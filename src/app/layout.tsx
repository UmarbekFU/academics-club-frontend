import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Academics Club - Guiding Students to Write, Reflect, and Get Admitted",
  description: "Master the art of writing and storytelling for college admissions. Our experienced mentors support students in crafting essays that express their authentic voice.",
  keywords: "college admissions, essay writing, writing program, college application, academic writing, admissions consulting",
  authors: [{ name: "The Academics Club" }],
  openGraph: {
    title: "The Academics Club - College Admissions Writing Programs",
    description: "Guiding Students to Write, Reflect, and Get Admitted",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <GoogleAnalytics />
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
