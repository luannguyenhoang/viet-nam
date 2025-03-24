import { ReactNode } from "react";
import Footer from "../organisms/Footer";
import Header from "../organisms/Header";
import { CartProvider } from "@/utils/cart";

export const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <CartProvider>
      <Header />
      {children}
      <Footer />
    </CartProvider>
  );
};
