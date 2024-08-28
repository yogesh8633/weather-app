import "./globals.css";

import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { Providers } from "./provider"; // Adjust the import path as needed

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Weather App",
  description: "Weather App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.9.55/css/materialdesignicons.min.css"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
