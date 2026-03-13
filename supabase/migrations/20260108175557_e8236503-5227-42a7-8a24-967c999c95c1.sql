-- Assigner le rôle admin à gary.h@dikio.fr
INSERT INTO public.user_roles (user_id, role)
VALUES ('2b09a7cd-e8de-4db1-981f-e59636e5568e', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;