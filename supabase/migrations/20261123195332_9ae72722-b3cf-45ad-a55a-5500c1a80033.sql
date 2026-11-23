CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT _user_id = auth.uid()
    AND EXISTS (
      SELECT 1
      FROM public.user_roles
      WHERE user_id = _user_id
        AND role = _role
    );
$$;
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;

INSERT INTO public.user_roles (user_id, role)
VALUES ('e95e08ec-85e0-4e01-b54d-bcd49324cad6'::uuid, 'admin'::public.app_role)
ON CONFLICT (user_id, role) DO NOTHING;

ALTER TABLE public.projects
  ADD COLUMN is_published boolean NOT NULL DEFAULT true;
ALTER TABLE public.skills
  ADD COLUMN is_published boolean NOT NULL DEFAULT true;

DROP POLICY IF EXISTS "Anyone can view projects" ON public.projects;
DROP POLICY IF EXISTS "Authenticated users can insert projects" ON public.projects;
DROP POLICY IF EXISTS "Authenticated users can update projects" ON public.projects;
DROP POLICY IF EXISTS "Authenticated users can delete projects" ON public.projects;
CREATE POLICY "Anyone can view published projects"
  ON public.projects FOR SELECT TO anon, authenticated
  USING (is_published IS TRUE);
CREATE POLICY "Admins can view all projects"
  ON public.projects FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can insert projects"
  ON public.projects FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can update projects"
  ON public.projects FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can delete projects"
  ON public.projects FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Anyone can view skills" ON public.skills;
DROP POLICY IF EXISTS "Authenticated users can insert skills" ON public.skills;
DROP POLICY IF EXISTS "Authenticated users can update skills" ON public.skills;
DROP POLICY IF EXISTS "Authenticated users can delete skills" ON public.skills;
CREATE POLICY "Anyone can view published skills"
  ON public.skills FOR SELECT TO anon, authenticated
  USING (is_published IS TRUE);
CREATE POLICY "Admins can view all skills"
  ON public.skills FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can insert skills"
  ON public.skills FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can update skills"
  ON public.skills FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can delete skills"
  ON public.skills FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.contact_messages;
CREATE POLICY "Validated contact form submissions"
  ON public.contact_messages FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(name) BETWEEN 1 AND 100
    AND char_length(btrim(name)) BETWEEN 1 AND 100
    AND char_length(email) BETWEEN 3 AND 255
    AND email ~* '^[^[:space:]@]+@[^[:space:]@]+[.][^[:space:]@]+$'
    AND (
      subject IS NULL
      OR (
        char_length(subject) BETWEEN 1 AND 200
        AND char_length(btrim(subject)) BETWEEN 1 AND 200
      )
    )
    AND char_length(message) BETWEEN 1 AND 1000
    AND char_length(btrim(message)) BETWEEN 1 AND 1000
  );