'use client';

import { useInitializeCart } from "@/hooks/use-initialize-cart";

export default function CartInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  useInitializeCart();
  return children;
}