CREATE SCHEMA IF NOT EXISTS portfolio_private;
REVOKE ALL ON SCHEMA portfolio_private FROM PUBLIC, anon, authenticated;
GRANT USAGE ON SCHEMA portfolio_private TO authenticated;

ALTER FUNCTION public.has_role(uuid, public.app_role)
  SET SCHEMA portfolio_private;
REVOKE ALL ON FUNCTION portfolio_private.has_role(uuid, public.app_role)
  FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION portfolio_private.has_role(uuid, public.app_role)
  TO authenticated;

REVOKE ALL ON TABLE public.user_roles FROM PUBLIC, anon, authenticated;
GRANT ALL ON TABLE public.user_roles TO service_role;
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;