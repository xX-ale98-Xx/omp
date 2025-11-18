import type { Metadata } from "next";
import { inter, lusitana } from "@/utils/ui/fonts";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "OhMyPhysio - OMP!",
  description: "Landing page for OMP application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${inter.variable} ${lusitana.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
