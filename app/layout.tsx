import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://minhajkhan.dev"),
  title: "Minhaj Khan | Flutter Developer",
  description:
    "Flutter developer building scalable, high-performance mobile applications with modern UI, Firebase, REST APIs, maps, payments and real-time systems.",
  keywords: [
    "Minhaj Khan",
    "Flutter Developer",
    "Mobile App Developer",
    "Dart Developer",
    "Firebase Developer",
    "India",
  ],
  openGraph: {
    title: "Minhaj Khan | Flutter Developer",
    description: "Mobile applications designed for speed, clarity and scale.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#07090b" },
    { media: "(prefers-color-scheme: light)", color: "#f4f5f0" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
