export type MenuCategory = "Coffee" | "Cold Drinks" | "Desserts" | "Bakery";

export interface MenuItem {
  id: string;
  name: string;
  desc: string;
  price: number;
  category: MenuCategory;
  tag?: string;
  img: string;
  rating: number;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "orbital-latte",
    name: "Orbital Latte",
    desc: "Double ristretto, silk-steamed milk, lime-zest mist & honey orbit.",
    price: 340,
    category: "Coffee",
    tag: "Signature",
    img: "https://images.pexels.com/photos/35821973/pexels-photo-35821973.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    rating: 4.9,
  },
  {
    id: "nebula-cappuccino",
    name: "Nebula Cappuccino",
    desc: "Araku Valley single origin, cocoa-dust constellation, velvet foam.",
    price: 310,
    category: "Coffee",
    tag: "Single Origin",
    img: "https://images.pexels.com/photos/5112652/pexels-photo-5112652.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    rating: 4.8,
  },
  {
    id: "event-horizon-espresso",
    name: "Event Horizon Espresso",
    desc: "Triple-shot Chikmagalur dark matter — syrupy, smoky, infinite.",
    price: 260,
    category: "Coffee",
    img: "https://images.pexels.com/photos/30226590/pexels-photo-30226590.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    rating: 4.9,
  },
  {
    id: "cosmos-cortado",
    name: "Cosmos Cortado",
    desc: "1:1 espresso & textured milk in chilled crystal. Pure gravity.",
    price: 295,
    category: "Coffee",
    img: "https://images.pexels.com/photos/14537669/pexels-photo-14537669.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    rating: 4.7,
  },
  {
    id: "zero-g-coldbrew",
    name: "Zero-G Cold Brew",
    desc: "18-hour slow orbit brew, orange nebula ice, tonic stardust.",
    price: 360,
    category: "Cold Drinks",
    tag: "18-hr Brew",
    img: "https://images.pexels.com/photos/37603050/pexels-photo-37603050.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    rating: 4.9,
  },
  {
    id: "lunar-matcha",
    name: "Lunar Matcha Cloud",
    desc: "Ceremonial Uji matcha, oat-milk galaxy, vanilla moon foam.",
    price: 380,
    category: "Cold Drinks",
    tag: "New",
    img: "https://images.pexels.com/photos/37486068/pexels-photo-37486068.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    rating: 4.8,
  },
  {
    id: "supernova-frappe",
    name: "Supernova Frappe",
    desc: "Espresso + dark chocolate + smoked sea salt, meteor crunch.",
    price: 390,
    category: "Cold Drinks",
    img: "https://images.pexels.com/photos/16052372/pexels-photo-16052372.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    rating: 4.7,
  },
  {
    id: "stardust-cooler",
    name: "Stardust Citrus Cooler",
    desc: "Yuzu, calamansi & cold-brew sparkle. Zero alcohol, full cosmos.",
    price: 320,
    category: "Cold Drinks",
    img: "https://images.pexels.com/photos/37486080/pexels-photo-37486080.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    rating: 4.6,
  },
  {
    id: "blackhole-brownie",
    name: "Black Hole Brownie",
    desc: "70% Ecuadorian dark, molten core, vanilla-bean supernova scoop.",
    price: 340,
    category: "Desserts",
    tag: "Bestseller",
    img: "https://images.pexels.com/photos/33312980/pexels-photo-33312980.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    rating: 5.0,
  },
  {
    id: "galaxy-tart",
    name: "Galaxy Chocolate Tart",
    desc: "Mirror-glaze nebula, sea-salt caramel orbit, cocoa-nib soil.",
    price: 365,
    category: "Desserts",
    img: "https://images.pexels.com/photos/32333752/pexels-photo-32333752.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    rating: 4.9,
  },
  {
    id: "moon-tiramisu",
    name: "Moon-Dust Tiramisu",
    desc: "Espresso-soaked savoiardi, mascarpone cloud, cocoa eclipse.",
    price: 350,
    category: "Desserts",
    img: "https://images.pexels.com/photos/16052360/pexels-photo-16052360.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    rating: 4.8,
  },
  {
    id: "comet-croissant",
    name: "Comet Butter Croissant",
    desc: "72-layer French lamination, Auroville butter, comet-tail flakes.",
    price: 220,
    category: "Bakery",
    tag: "Baked 7AM",
    img: "https://images.pexels.com/photos/3850349/pexels-photo-3850349.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    rating: 4.9,
  },
  {
    id: "pulsar-pain",
    name: "Pulsar Pain au Chocolat",
    desc: "Valrhona batons, slow-fermented dough, torched sugar crust.",
    price: 250,
    category: "Bakery",
    img: "https://images.pexels.com/photos/4129384/pexels-photo-4129384.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    rating: 4.7,
  },
  {
    id: "eclipse-bun",
    name: "Eclipse Cinnamon Orbit",
    desc: "Brioche swirl, Ceylon cinnamon, cream-cheese gravity glaze.",
    price: 240,
    category: "Bakery",
    img: "https://images.pexels.com/photos/7332870/pexels-photo-7332870.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    rating: 4.8,
  },
];

export const GALLERY = [
  {
    img: "https://images.pexels.com/photos/31206741/pexels-photo-31206741.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    label: "The Main Deck",
    sub: "120 covers · oak & obsidian",
    span: "tall",
  },
  {
    img: "https://images.pexels.com/photos/13735913/pexels-photo-13735913.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    label: "Pour Ritual",
    sub: "Slow bar · V60 station",
    span: "std",
  },
  {
    img: "https://images.pexels.com/photos/15404793/pexels-photo-15404793.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    label: "Latte Cartography",
    sub: "Every cup mapped",
    span: "std",
  },
  {
    img: "https://images.pexels.com/photos/15484160/pexels-photo-15484160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    label: "Neon Hour",
    sub: "19:00 — lights low",
    span: "wide",
  },
  {
    img: "https://images.pexels.com/photos/302893/pexels-photo-302893.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    label: "Engine Room",
    sub: "La Marzocco Linea",
    span: "std",
  },
  {
    img: "https://images.pexels.com/photos/35171248/pexels-photo-35171248.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    label: "Window Orbit",
    sub: "Rainy-day favourite",
    span: "std",
  },
  {
    img: "https://images.pexels.com/photos/37034120/pexels-photo-37034120.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    label: "Barista in Motion",
    sub: "Craft, daily",
    span: "tall",
  },
];
