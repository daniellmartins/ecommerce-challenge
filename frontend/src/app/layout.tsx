import "./globals.css";

import type { Metadata } from "next";
import Header from "@/components/header";
import Cart from "@/components/cart";
import CartInitializer from "@/components/cart-initializer";

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
      <body>
        <CartInitializer>
          <Header />
          <main>{children}</main>
          <Cart />
        </CartInitializer>
      </body>
    </html>
  );
}
