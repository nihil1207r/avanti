import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQueryClient, useQuery } from "@tanstack/react-query";
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
import { Pencil, Trash2, Plus, LogOut, Upload, Mail, MailOpen, UtensilsCrossed, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import type { MenuItem } from "@/lib/types";
import { ProductBadge } from "@/components/ProductBadge";

/* ── Types ─────────────────────────────────────────────────── */
type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  created_at: string;
};

type Tab = "menu" | "messages";

/* ── Menu item default ──────────────────────────────────────── */
const empty = {
  name_ro: "", name_en: "", ingredients_ro: "", ingredients_en: "",
  price: 0, badge: null as string | null, image_url: null as string | null,
  category_id: null as string | null, is_featured: false, available: true, sort_order: 0,
};

/* ── Helpers ────────────────────────────────────────────────── */
function formatDate(iso: string) {
  return new Date(iso).toLocaleString("ro-RO", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

/* ══════════════════════════════════════════════════════════════
   Admin page
══════════════════════════════════════════════════════════════ */
const Admin = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language.startsWith("en") ? "en" : "ro";
  const { user, isAdmin, loading, signOut } = useAuth();
  const { data: cats = [] } = useCategories();
  const { data: items = [] } = useMenuItems();
  const qc = useQueryClient();

  const [tab, setTab] = useState<Tab>("menu");
  const [editing, setEditing] = useState<typeof empty & { id?: string } | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [bootstrap, setBootstrap] = useState(false);

  /* selected message for read-modal */
  const [selectedMsg, setSelectedMsg] = useState<ContactMessage | null>(null);
  const [msgDialogOpen, setMsgDialogOpen] = useState(false);

  /* ── Fetch messages ── */
  const { data: messages = [], refetch: refetchMessages } = useQuery<ContactMessage[]>({
    queryKey: ["contact_messages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
    enabled: isAdmin,
  });

  const unreadCount = messages.filter((m) => !m.read).length;

  /* ── Bootstrap check ── */
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

  /* ── Guards ── */
  if (loading) return <div className="pt-32 text-center">...</div>;
  if (!user) return <Navigate to="/auth" replace />;

  if (bootstrap && !isAdmin) {
    return (
      <section className="pt-32 pb-12 container-edge max-w-2xl">
        <Seo title="Admin Setup — Avanti Pizza" description="Setup admin" path="/admin" />
        <div className="rounded-2xl border bg-card p-8 shadow-card">
          <h1 className="font-display text-3xl font-bold">{t("admin.firstSetupTitle")}</h1>
          <p className="mt-3 text-muted-foreground">
            {t("admin.firstSetupDesc")}
          </p>
          <code className="block mt-4 p-3 bg-muted rounded text-sm break-all">{user.id}</code>
          <p className="mt-4 text-sm text-muted-foreground">
            {t("admin.firstSetupSql")}<br />
            <code>{`INSERT INTO user_roles (user_id, role) VALUES ('${user.id}', 'admin');`}</code>
          </p>
          <Button className="mt-6" onClick={() => location.reload()}>{t("admin.firstSetupRefresh")}</Button>
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

  /* ── Menu actions ── */
  const open = (it?: MenuItem) => {
    setEditing(it
      ? { ...it, ingredients_ro: it.ingredients_ro ?? "", ingredients_en: it.ingredients_en ?? "" }
      : { ...empty });
    setDialogOpen(true);
  };

  const save = async () => {
    if (!editing) return;
    const payload = { ...editing, badge: editing.badge || null, category_id: editing.category_id || null };
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
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("menu-images").upload(path, file, { upsert: false });
    setUploading(false);
    if (error) return toast.error(error.message);
    const { data: { publicUrl } } = supabase.storage.from("menu-images").getPublicUrl(path);
    setEditing({ ...editing, image_url: publicUrl });
  };

  /* ── Message actions ── */
  const openMessage = async (msg: ContactMessage) => {
    setSelectedMsg(msg);
    setMsgDialogOpen(true);
    if (!msg.read) {
      await supabase.from("contact_messages").update({ read: true }).eq("id", msg.id);
      refetchMessages();
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm(t("admin.deleteMessage"))) return;
    const { error } = await supabase.from("contact_messages").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success(t("admin.messageDeleted"));
    refetchMessages();
    if (selectedMsg?.id === id) setMsgDialogOpen(false);
  };

  /* ══════════════════════════════════════════════════════════
     Render
  ══════════════════════════════════════════════════════════ */
  return (
    <>
      <Seo title="Admin — Avanti Pizza" description="Administrare meniu" path="/admin" />

      <section className="pt-28 pb-16 container-edge">

        {/* ── Page header ── */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-4xl font-bold">{t("admin.title")}</h1>
            <p className="text-muted-foreground mt-1">{t("admin.subtitle")}</p>
          </div>
          <div className="flex gap-2">
            {tab === "menu" && (
              <Button onClick={() => open()} className="bg-primary hover:bg-primary-glow">
                <Plus className="size-4 mr-1" /> {t("admin.add")}
              </Button>
            )}
            <Button variant="outline" onClick={signOut}>
              <LogOut className="size-4 mr-1" /> {t("admin.logout")}
            </Button>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="flex gap-1 mb-6 border-b border-border">
          <button
            onClick={() => setTab("menu")}
            className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-t-lg transition-colors
              ${tab === "menu"
                ? "bg-card border border-b-card border-border text-foreground -mb-px"
                : "text-muted-foreground hover:text-foreground"}`}
          >
            <UtensilsCrossed className="size-4" /> {t("admin.tabMenu")}
          </button>
          <button
            onClick={() => setTab("messages")}
            className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-t-lg transition-colors
              ${tab === "messages"
                ? "bg-card border border-b-card border-border text-foreground -mb-px"
                : "text-muted-foreground hover:text-foreground"}`}
          >
            <MessageSquare className="size-4" /> {t("admin.tabMessages")}
            {unreadCount > 0 && (
              <span className="ml-1 inline-flex items-center justify-center size-5 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                {unreadCount}
              </span>
            )}
          </button>
        </div>

        {/* ══════════════════ TAB: MENU ══════════════════ */}
        {tab === "menu" && (
          <div className="rounded-2xl bg-card border border-border shadow-card overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-secondary text-secondary-foreground uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">{t("admin.colName")}</th>
                  <th className="px-4 py-3">{t("admin.colCategory")}</th>
                  <th className="px-4 py-3">{t("admin.colPrice")}</th>
                  <th className="px-4 py-3">{t("admin.colBadge")}</th>
                  <th className="px-4 py-3">{t("admin.colStatus")}</th>
                  <th className="px-4 py-3 text-right">{t("admin.colActions")}</th>
                </tr>
              </thead>
              <tbody>
                {items.map((it, idx) => {
                  const cat = cats.find((c) => c.id === it.category_id);
                  return (
                    <tr key={it.id} className={idx % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                      <td className="px-4 py-3 font-medium">{lang === "en" ? it.name_en : it.name_ro}</td>
                      <td className="px-4 py-3 text-muted-foreground">{cat ? (lang === "en" ? cat.name_en : cat.name_ro) : "—"}</td>
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
                {items.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-10 text-center text-muted-foreground">
                      {t("admin.noProducts")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* ══════════════════ TAB: MESSAGES ══════════════════ */}
        {tab === "messages" && (
          <div className="rounded-2xl bg-card border border-border shadow-card overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-secondary text-secondary-foreground uppercase text-xs">
                <tr>
                  <th className="px-4 py-3 w-6"></th>
                  <th className="px-4 py-3">{t("admin.colName")}</th>
                  <th className="px-4 py-3">{t("admin.colEmail")}</th>
                  <th className="px-4 py-3">{t("admin.colMessage")}</th>
                  <th className="px-4 py-3">{t("admin.colDate")}</th>
                  <th className="px-4 py-3 text-right">{t("admin.colActions")}</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((msg, idx) => (
                  <tr
                    key={msg.id}
                    onClick={() => openMessage(msg)}
                    className={`cursor-pointer transition-colors hover:bg-primary/5
                      ${idx % 2 === 0 ? "bg-background" : "bg-muted/30"}
                      ${!msg.read ? "font-semibold" : ""}`}
                  >
                    <td className="px-4 py-3">
                      {msg.read
                        ? <MailOpen className="size-4 text-muted-foreground" />
                        : <Mail className="size-4 text-primary" />}
                    </td>
                    <td className="px-4 py-3">{msg.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{msg.email}</td>
                    <td className="px-4 py-3 text-muted-foreground max-w-xs truncate">
                      {msg.message}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                      {formatDate(msg.created_at)}
                    </td>
                    <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteMessage(msg.id)}
                      >
                        <Trash2 className="size-4 text-destructive" />
                      </Button>
                    </td>
                  </tr>
                ))}
                {messages.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-10 text-center text-muted-foreground">
                      {t("admin.noMessages")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* ══ Dialog: edit / add menu item ══ */}
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
                  <Input type="number" step="0.5" value={editing.price} onChange={(e) => setEditing({ ...editing, price: parseFloat(e.target.value) || 0 })} />
                </div>
                <div>
                  <Label>{t("admin.category")}</Label>
                  <Select value={editing.category_id ?? ""} onValueChange={(v) => setEditing({ ...editing, category_id: v || null })}>
                    <SelectTrigger><SelectValue placeholder="—" /></SelectTrigger>
                    <SelectContent>
                      {cats.map((c) => <SelectItem key={c.id} value={c.id}>{lang === "en" ? c.name_en : c.name_ro}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>{t("admin.badge")}</Label>
                  <Select value={editing.badge ?? "_none"} onValueChange={(v) => setEditing({ ...editing, badge: v === "_none" ? null : v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="_none">{t("admin.none")}</SelectItem>
                      {["popular", "picant", "vegan", "copii", "chef_pick", "energy"].map((b) => (
                        <SelectItem key={b} value={b}>{t(`badges.${b}`)}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>{t("admin.image")}</Label>
                <div className="flex items-center gap-3 mt-1.5">
                  {editing.image_url && <img src={editing.image_url} alt="" className="size-16 rounded object-cover" />}
                  <label className="flex items-center gap-2 cursor-pointer rounded-md border border-border px-3 py-2 hover:bg-muted">
                    <Upload className="size-4" /> {uploading ? t("admin.uploading") : "Upload"}
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0])} />
                  </label>
                </div>
              </div>
              <div className="flex gap-6">
                <label className="flex items-center gap-2">
                  <Switch checked={editing.is_featured} onCheckedChange={(v) => setEditing({ ...editing, is_featured: v })} />
                  {t("admin.featured")}
                </label>
                <label className="flex items-center gap-2">
                  <Switch checked={editing.available} onCheckedChange={(v) => setEditing({ ...editing, available: v })} />
                  {t("admin.available")}
                </label>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>{t("admin.cancel")}</Button>
                <Button onClick={save} className="bg-primary hover:bg-primary-glow">{t("admin.save")}</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ══ Dialog: view message ══ */}
      <Dialog open={msgDialogOpen} onOpenChange={setMsgDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MailOpen className="size-5 text-primary" /> {t("admin.messageFrom")} {selectedMsg?.name}
            </DialogTitle>
          </DialogHeader>
          {selectedMsg && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-semibold mb-0.5">{t("admin.colName")}</p>
                  <p className="font-medium">{selectedMsg.name}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-semibold mb-0.5">{t("admin.colEmail")}</p>
                  <a href={`mailto:${selectedMsg.email}`} className="font-medium text-primary hover:underline">
                    {selectedMsg.email}
                  </a>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">{t("admin.colMessage")}</p>
                <div className="rounded-xl bg-muted p-4 text-sm whitespace-pre-wrap leading-relaxed">
                  {selectedMsg.message}
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{formatDate(selectedMsg.created_at)}</p>
              <div className="flex justify-between pt-1">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteMessage(selectedMsg.id)}
                >
                  <Trash2 className="size-4 mr-1" /> {t("admin.delete")}
                </Button>
                <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
                  <a href={`mailto:${selectedMsg.email}`}>{t("admin.reply")}</a>
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