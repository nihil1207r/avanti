import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import type { MenuCategory, MenuItem } from "./types";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase.from("menu_categories").select("*").order("sort_order");
      if (error) throw error;
      return (data ?? []) as MenuCategory[];
    },
  });
}

export function useMenuItems() {
  return useQuery({
    queryKey: ["menu_items"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("menu_items")
        .select("*")
        .order("sort_order")
        .limit(500);
      if (error) throw error;
      return (data ?? []) as MenuItem[];
    },
  });
}

export function useFeaturedItems() {
  return useQuery({
    queryKey: ["menu_items", "featured"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("menu_items")
        .select("*")
        .eq("is_featured", true)
        .eq("available", true)
        .order("sort_order");
      if (error) throw error;
      return (data ?? []) as MenuItem[];
    },
  });
}
