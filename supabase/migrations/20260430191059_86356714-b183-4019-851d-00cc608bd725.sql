
ALTER FUNCTION public.touch_updated_at() SET search_path = public;

REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) TO postgres, service_role;

DROP POLICY IF EXISTS "Menu images public read" ON storage.objects;
-- Public bucket still serves files via direct URL; we just don't allow listing.
