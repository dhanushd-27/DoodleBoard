import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from "next/font/google"

export const metadata: Metadata = {
  title: "DoodleBoard",
  description: "Excalidraw clone",
};

const roboto = Roboto({
  subsets: ["latin"]
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className}`}>
        {children}
      </body>
    </html>
  );
}
