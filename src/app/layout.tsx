import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alles Gute zum 18. Geburtstag, Alina! 🎉",
  description: "Eine besondere Überraschung für einen besonderen Tag",
  keywords: ["Geburtstag", "18", "Alina", "Überraschung"],
  authors: [{ name: "Mit viel Liebe erstellt" }],
  robots: "noindex, nofollow", // Keep it private
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
