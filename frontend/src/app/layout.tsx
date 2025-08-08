import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "E-Shop - Sua loja online",
  description: "Encontre os melhores produtos com preços incríveis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className="antialiased"
      >
        {children}
      </body>
    </html>
  );
}
