import catPizza from "@/assets/cat-pizza.jpg";
import catBurgeri from "@/assets/cat-burgeri.jpg";
import catPui from "@/assets/cat-pui.jpg";
import catSalate from "@/assets/cat-salate.jpg";
import catPost from "@/assets/cat-post.jpg";
import catBauturi from "@/assets/cat-bauturi.jpg";
import catSosuri from "@/assets/cat-sosuri.jpg";

// Maps category UUIDs (from menu_categories) to a representative photo.
export const CATEGORY_IMAGES: Record<string, string> = {
  "0f012af4-7ae8-49d3-b301-4086449f16f9": catPizza,    // Pizza
  "6de3c3fe-398d-427e-822b-1dc47bccdc35": catBurgeri,  // Burgeri
  "d4aa5e66-ee71-48dd-bc7a-eb0bab6fbd96": catPui,      // Preparate cu Pui
  "c0f92428-9a0c-4d04-a0bc-07bb03b70844": catSalate,   // Salate și Garnituri
  "b84ace89-8a9d-4d44-ad7a-7ba7ad31c735": catPost,     // Meniu de Post (Vegan)
  "a2ee7e30-46b6-42ff-b46e-624132ec79a1": catBauturi,  // Băuturi
  "4a803387-170f-4b0e-942a-4beee7306808": catSosuri,   // Sosuri
};

export function getProductImage(item: { image_url: string | null; category_id: string | null }): string | null {
  if (item.image_url) return item.image_url;
  if (item.category_id && CATEGORY_IMAGES[item.category_id]) return CATEGORY_IMAGES[item.category_id];
  return null;
}
