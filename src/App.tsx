import { useEffect } from "react";
import Navbar from "./components/ui/Navbar";
import Hero from "./components/ui/Hero";
import Experience from "./components/ui/Experience";
import MenuSection from "./components/ui/MenuSection";
import Story from "./components/ui/Story";
import Gallery from "./components/ui/Gallery";
import Reservation from "./components/ui/Reservation";
import Footer from "./components/ui/Footer";
import Preloader from "./components/ui/Preloader";
import CartPage, { CartToast } from "./components/ui/CartPage";
import CheckoutPage from "./components/ui/CheckoutPage";
import { CartProvider } from "./store/cart";
import { useGlobalReveals } from "./hooks/useReveals";
import { useRoute } from "./hooks/useRoute";
import { useLenisScroll } from "./hooks/useLenisScroll";

export default function App() {
  const route = useRoute();
  const lenisRef = useLenisScroll();
  useGlobalReveals(route);

  useEffect(() => {
    if (route !== "home") {
      if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
      else window.scrollTo(0, 0);
      return;
    }
    const id = window.location.hash.slice(1);
    if (!id) return;
    const t = window.setTimeout(() => {
      const target = document.getElementById(id);
      if (!target) return;
      if (lenisRef.current) lenisRef.current.scrollTo(target);
      else target.scrollIntoView();
    }, 80);
    return () => window.clearTimeout(t);
  }, [route, lenisRef]);

  return (
    <CartProvider>
      <div className="noise relative min-h-screen bg-[#090D12] text-[#F6F1E7]">
        <Preloader />
        <Navbar />
        {route === "home" ? (
          <main>
            <Hero />
            <Experience />
            <MenuSection />
            <Story />
            <Gallery />
            <Reservation />
          </main>
        ) : (
          <main>{route === "cart" ? <CartPage /> : <CheckoutPage />}</main>
        )}
        <Footer />
        <CartToast />
      </div>
    </CartProvider>
  );
}
