import type { Metadata } from "next";
import localFont from "next/font/local";
import { Agentation } from "agentation";
import "./globals.css";

const stackSansHeadline = localFont({
  src: "../../public/fonts/StackSansHeadline-latin.woff2",
  variable: "--font-heading",
  display: "swap",
});

const aspekta = localFont({
  src: [
    { path: "../../public/fonts/Aspekta-400.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/Aspekta-500.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/Aspekta-600.woff2", weight: "600", style: "normal" },
    { path: "../../public/fonts/Aspekta-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "STBL - Stablecoin 2.0",
  description: "Spend Your Stablecoin. Keep Your Yield.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${stackSansHeadline.variable} ${aspekta.variable}`}>
      <body className="min-h-full">
        {children}
        {process.env.NODE_ENV === "development" && <Agentation />}
      </body>
    </html>
  );
}
