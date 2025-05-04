import type React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import localFont from "next/font/local";
import { QueryProvider } from "@/providers/query-client";
import { ResearchProvider } from "@/hooks/use-research";

const obviously = localFont({
  src: [
    {
      path: "../public/fonts/Obviously-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Obviously-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Obviously-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Obviously-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-obviously",
  display: "swap",
});

const cabinetGrotesk = localFont({
  src: [
    {
      path: "../public/fonts/CabinetGrotesk-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/CabinetGrotesk-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/CabinetGrotesk-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/CabinetGrotesk-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-cabinet-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Research GPT",
  description: "An all-purpose research platform",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${obviously.variable} ${cabinetGrotesk.variable} font-cabinet bg-off-white text-deep-graphite`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <ResearchProvider>{children}</ResearchProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
