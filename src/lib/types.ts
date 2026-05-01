export type MenuCategory = {
  id: string;
  slug: string;
  name_ro: string;
  name_en: string;
  icon: string | null;
  sort_order: number;
};

export type MenuItem = {
  id: string;
  category_id: string | null;
  name_ro: string;
  name_en: string;
  ingredients_ro: string | null;
  ingredients_en: string | null;
  price: number;
  badge: string | null;
  image_url: string | null;
  is_featured: boolean;
  available: boolean;
  sort_order: number;
};

export type Badge = "popular" | "picant" | "vegan" | "copii" | "chef_pick" | "energy";
