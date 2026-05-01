import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useCategories, useMenuItems } from "@/lib/queries";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Seo } from "@/components/Seo";
import { Pencil, Trash2, Plus, LogOut, Upload } from "lucide-react";
import { toast } from "sonner";
import type { MenuItem } from "@/lib/types";
import { ProductBadge } from "@/components/ProductBadge";

// ── File upload constraints ────────────────────────────────────────────────
const ALLOWED_MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

function validateImageFile(file: File): string | null {
  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    return `File type "${file.type}" is not allowed. Use JPEG, PNG, WebP, or GIF.`;
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return `File is too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Maximum is ${MAX_FILE_SIZE_MB} MB.`;
  }
  return null;
}

const empty = {
  name_ro: "", name_en: "", ingredients_ro: "", ingredients_en: "",
  price: 0, badge: null as string | null, image_url: null as string | null,
  category_id: null as string | null, is_featured: false, available: true, sort_order: 0,
};

const Admin = () => {
  const { t } = useTranslation();
  const { user, isAdmin, loading, signOut } = useAuth();
  const { data: cats = [] } = useCategories();
  const { data: items = [] } = useMenuItems();
  const qc = useQueryClient();
  const [editing, setEditing] = useState<typeof empty & { id?: string } | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [bootstrap, setBootstrap] = useState(false);

  // First-user bootstrap: if no admin exists yet, allow first signed-in user to claim admin
  useEffect(() => {
    (async () => {
      if (!user || isAdmin || loading) return;
      const { count } = await supabase
        .from("user_roles")
        .select("*", { count: "exact", head: true })
        .eq("role", "admin");
      if ((count ?? 0) === 0) setBootstrap(true);
    })();
  }, [user, isAdmin, loading]);

  // loading covers both session and isAdmin resolution — no flash risk
  if (loading) return <div className="pt-32 text-center">...</div>;
  if (!user) return <Navigate to="/auth" replace />;

  if (bootstrap && !isAdmin) {
    return (
      <section className="pt-32 pb-12 container-edge max-w-2xl">
        <Seo title="Admin Setup — Avanti Pizza" description="Setup admin" path="/admin" />
        <div className="rounded-2xl border bg-card p-8 shadow-card">
          <h1 className="font-display text-3xl font-bold">First admin setup</h1>
          <p className="mt-3 text-muted-foreground">
            No admin exists yet. To grant your account admin access, run the following one-time
            setup in the Supabase SQL editor.
          </p>
          <pre className="block mt-4 p-3 bg-muted rounded text-sm break-all select-all">
            {`INSERT INTO user_roles (user_id, role)\nVALUES ('${user.id}', 'admin');`}
          </pre>
          <Button className="mt-6" onClick={() => location.reload()}>
            Refresh after setup
          </Button>
        </div>
      </section>
    );
  }

  if (!isAdmin) {
    return (
      <section className="pt-32 pb-12 container-edge max-w-2xl">
        <div className="rounded-2xl border bg-card p-8 shadow-card text-center">
          <h1 className="font-display text-2xl font-bold">{t("auth.notAdmin")}</h1>
          <Button onClick={signOut} className="mt-6">{t("admin.logout")}</Button>
        </div>
      </section>
    );
  }

  const open = (it?: MenuItem) => {
    setEditing(
      it
        ? { ...it, ingredients_ro: it.ingredients_ro ?? "", ingredients_en: it.ingredients_en ?? "" }
        : { ...empty },
    );
    setDialogOpen(true);
  };

  const save = async () => {
    if (!editing) return;

    // Basic input sanitisation — strip leading/trailing whitespace
    const payload = {
      ...editing,
      name_ro: editing.name_ro.trim(),
      name_en: editing.name_en.trim(),
      ingredients_ro: editing.ingredients_ro?.trim() ?? null,
      ingredients_en: editing.ingredients_en?.trim() ?? null,
      badge: editing.badge || null,
      category_id: editing.category_id || null,
      price: Math.max(0, Number(editing.price)),
    };

    if (!payload.name_ro || !payload.name_en) {
      toast.error("Both Romanian and English names are required.");
      return;
    }

    if (editing.id) {
      const { error } = await supabase.from("menu_items").update(payload).eq("id", editing.id);
      if (error) return toast.error(error.message);
    } else {
      const { id, ...insertable } = payload;
      const { error } = await supabase.from("menu_items").insert(insertable);
      if (error) return toast.error(error.message);
    }
    toast.success(t("admin.saved"));
    qc.invalidateQueries({ queryKey: ["menu_items"] });
    setDialogOpen(false);
  };

  const del = async (id: string) => {
    if (!confirm(t("admin.confirmDelete"))) return;
    const { error } = await supabase.from("menu_items").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success(t("admin.deleted"));
    qc.invalidateQueries({ queryKey: ["menu_items"] });
  };

  const uploadImage = async (file: File) => {
    if (!editing) return;

    // Validate file before uploading
    const validationError = validateImageFile(file);
    if (validationError) {
      toast.error(validationError);
      return;
    }

    setUploading(true);
    try {
      // Use a safe extension derived from the validated MIME type
      const mimeToExt: Record<string, string> = {
        "image/jpeg": "jpg",
        "image/png": "png",
        "image/webp": "webp",
        "image/gif": "gif",
      };
      const ext = mimeToExt[file.type] ?? "jpg";
      const path = `${crypto.randomUUID()}.${ext}`;

      const { error } = await supabase.storage
        .from("menu-images")
        .upload(path, file, { upsert: false, contentType: file.type });

      if (error) {
        toast.error(error.message);
        return;
      }

      const { data: { publicUrl } } = supabase.storage.from("menu-images").getPublicUrl(path);
      setEditing({ ...editing, image_url: publicUrl });
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Seo title="Admin — Avanti Pizza" description="Administrare meniu" path="/admin" />
      <section className="pt-28 pb-16 container-edge">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-4xl font-bold">{t("admin.title")}</h1>
            <p className="text-muted-foreground mt-1">{t("admin.subtitle")}</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => open()} className="bg-primary hover:bg-primary-glow">
              <Plus className="size-4 mr-1" /> {t("admin.add")}
            </Button>
            <Button variant="outline" onClick={signOut}>
              <LogOut className="size-4 mr-1" /> {t("admin.logout")}
            </Button>
          </div>
        </div>

        <div className="rounded-2xl bg-card border border-border shadow-card overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary text-secondary-foreground uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Nume</th>
                <th className="px-4 py-3">Categorie</th>
                <th className="px-4 py-3">Preț</th>
                <th className="px-4 py-3">Badge</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Acțiuni</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it, idx) => {
                const cat = cats.find((c) => c.id === it.category_id);
                return (
                  <tr key={it.id} className={idx % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                    <td className="px-4 py-3 font-medium">{it.name_ro}</td>
                    <td className="px-4 py-3 text-muted-foreground">{cat?.name_ro ?? "—"}</td>
                    <td className="px-4 py-3">{Number(it.price).toFixed(2)} Lei</td>
                    <td className="px-4 py-3"><ProductBadge badge={it.badge} /></td>
                    <td className="px-4 py-3">
                      <span className={it.available ? "text-emerald-600" : "text-muted-foreground"}>
                        {it.available ? "✓" : "—"}
                      </span>
                      {it.is_featured && <span className="ml-2 text-accent">★</span>}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="sm" onClick={() => open(it)}>
                        <Pencil className="size-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => del(it.id)}>
                        <Trash2 className="size-4 text-destructive" />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing?.id ? t("admin.edit") : t("admin.add")}</DialogTitle>
          </DialogHeader>
          {editing && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>{t("admin.nameRo")}</Label>
                  <Input value={editing.name_ro} onChange={(e) => setEditing({ ...editing, name_ro: e.target.value })} />
                </div>
                <div>
                  <Label>{t("admin.nameEn")}</Label>
                  <Input value={editing.name_en} onChange={(e) => setEditing({ ...editing, name_en: e.target.value })} />
                </div>
              </div>
              <div>
                <Label>{t("admin.ingredientsRo")}</Label>
                <Textarea value={editing.ingredients_ro ?? ""} onChange={(e) => setEditing({ ...editing, ingredients_ro: e.target.value })} />
              </div>
              <div>
                <Label>{t("admin.ingredientsEn")}</Label>
                <Textarea value={editing.ingredients_en ?? ""} onChange={(e) => setEditing({ ...editing, ingredients_en: e.target.value })} />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label>{t("admin.price")}</Label>
                  <Input
                    type="number"
                    step="0.5"
                    min="0"
                    max="9999"
                    value={editing.price}
                    onChange={(e) => setEditing({ ...editing, price: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label>{t("admin.category")}</Label>
                  <Select
                    value={editing.category_id ?? ""}
                    onValueChange={(v) => setEditing({ ...editing, category_id: v || null })}
                  >
                    <SelectTrigger><SelectValue placeholder="—" /></SelectTrigger>
                    <SelectContent>
                      {cats.map((c) => <SelectItem key={c.id} value={c.id}>{c.name_ro}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>{t("admin.badge")}</Label>
                  <Select
                    value={editing.badge ?? "_none"}
                    onValueChange={(v) => setEditing({ ...editing, badge: v === "_none" ? null : v })}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="_none">{t("admin.none")}</SelectItem>
                      {["popular","picant","vegan","copii","chef_pick","energy"].map((b) => (
                        <SelectItem key={b} value={b}>{t(`badges.${b}`)}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>{t("admin.image")}</Label>
                <p className="text-xs text-muted-foreground mt-0.5">
                  JPEG, PNG, WebP or GIF · max {MAX_FILE_SIZE_MB} MB
                </p>
                <div className="flex items-center gap-3 mt-1.5">
                  {editing.image_url && (
                    <img src={editing.image_url} alt="" className="size-16 rounded object-cover" />
                  )}
                  <label className="flex items-center gap-2 cursor-pointer rounded-md border border-border px-3 py-2 hover:bg-muted">
                    <Upload className="size-4" />
                    {uploading ? t("admin.uploading") : "Upload"}
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0])}
                    />
                  </label>
                </div>
              </div>
              <div className="flex gap-6">
                <label className="flex items-center gap-2">
                  <Switch
                    checked={editing.is_featured}
                    onCheckedChange={(v) => setEditing({ ...editing, is_featured: v })}
                  />
                  {t("admin.featured")}
                </label>
                <label className="flex items-center gap-2">
                  <Switch
                    checked={editing.available}
                    onCheckedChange={(v) => setEditing({ ...editing, available: v })}
                  />
                  {t("admin.available")}
                </label>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  {t("admin.cancel")}
                </Button>
                <Button onClick={save} className="bg-primary hover:bg-primary-glow">
                  {t("admin.save")}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
export default Admin;
