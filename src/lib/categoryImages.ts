import catPizza from "@/assets/cat-pizza.jpg";
import catBurgeri from "@/assets/cat-burgeri.jpg";
import catPui from "@/assets/cat-pui.jpg";
import catSalate from "@/assets/cat-salate.jpg";
import catPost from "@/assets/cat-post.jpg";
import catBauturi from "@/assets/cat-bauturi.jpg";
import catSosuri from "@/assets/cat-sosuri.jpg";
import burger1 from "@/assets/burger-1.jpg";
import burger2 from "@/assets/burger-2.jpg";
import burger3 from "@/assets/burger-3.jpg";
import shawarma from "@/assets/shawarma.jpg";

export const BURGER_CATEGORY_ID = "6de3c3fe-398d-427e-822b-1dc47bccdc35";
export const DRINKS_CATEGORY_ID = "a2ee7e30-46b6-42ff-b46e-624132ec79a1";

export const BURGER_IMAGES = [burger1, burger2, burger3];

export const CATEGORY_IMAGES: Record<string, string> = {
  "0f012af4-7ae8-49d3-b301-4086449f16f9": catPizza,
  [BURGER_CATEGORY_ID]: catBurgeri,
  "d4aa5e66-ee71-48dd-bc7a-eb0bab6fbd96": catPui,
  "c0f92428-9a0c-4d04-a0bc-07bb03b70844": catSalate,
  "b84ace89-8a9d-4d44-ad7a-7ba7ad31c735": catPost,
  [DRINKS_CATEGORY_ID]: catBauturi,
  "4a803387-170f-4b0e-942a-4beee7306808": catSosuri,
};

function stableIndex(seed: string, max: number): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return hash % max;
}

export function getProductImage(
  item: {
    image_url: string | null;
    category_id: string | null;
    name_ro?: string;
    name_en?: string;
  },
  index?: number
): string | null {
  if (item.category_id === BURGER_CATEGORY_ID) {
    const name = ((item.name_ro ?? "") + " " + (item.name_en ?? "")).toLowerCase();
    if (name.includes("shawarma")) return shawarma;
    if (name.includes("spicy")) return burger2;

    const seed = item.name_ro ?? item.name_en ?? String(index ?? 0);
    return BURGER_IMAGES[stableIndex(seed, BURGER_IMAGES.length)];
  }

  if (item.image_url) return item.image_url;
  if (item.category_id && CATEGORY_IMAGES[item.category_id]) return CATEGORY_IMAGES[item.category_id];
  return null;
}