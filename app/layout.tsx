import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/components/context/cart/CartContext";
import Footer from "@/components/feature/Footer";
import Header from "@/components/feature/Header";

export const metadata: Metadata = {
  title: {
    default: 'Vercel Swag Store',
    template: '%s | Vercel Swag Store',
  },
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    siteName: "Vercel Swag Store"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>
        <CartProvider>
          <header>
            <Header logo="/vercel.svg" links={[{ label: "Home", href: "/" }, { label: "Search", href: "/search" }]} />
          </header>
          <div className="page-content-wrapper">
            <div className="page-content">
              <main>
                {children}
              </main>
            </div>
          </div>
          <footer>
            <Footer />
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
