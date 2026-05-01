import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { Flame, Leaf, Baby, ChefHat, Star, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const config: Record<string, { icon: any; cls: string }> = {
  popular:   { icon: Star,    cls: "bg-accent text-accent-foreground border-transparent" },
  picant:    { icon: Flame,   cls: "bg-primary text-primary-foreground border-transparent" },
  vegan:     { icon: Leaf,    cls: "bg-emerald-600 text-white border-transparent" },
  copii:     { icon: Baby,    cls: "bg-sky-500 text-white border-transparent" },
  chef_pick: { icon: ChefHat, cls: "bg-secondary text-secondary-foreground border-transparent" },
  energy:    { icon: Zap,     cls: "bg-violet-600 text-white border-transparent" },
};

export function ProductBadge({ badge }: { badge: string | null }) {
  const { t } = useTranslation();
  if (!badge || !config[badge]) return null;
  const { icon: Icon, cls } = config[badge];
  return (
    <Badge className={cn("gap-1 px-2.5 py-1 font-medium shadow-sm", cls)}>
      <Icon className="size-3" />
      {t(`badges.${badge}`)}
    </Badge>
  );
}
