import { useEffect, useState } from "react";

export type Route = "home" | "cart" | "checkout";

const read = (): Route => {
  const h = window.location.hash;
  if (h.startsWith("#/cart")) return "cart";
  if (h.startsWith("#/checkout")) return "checkout";
  return "home";
};

export function useRoute() {
  const [route, setRoute] = useState<Route>(read);
  useEffect(() => {
    const on = () => setRoute(read());
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return route;
}
