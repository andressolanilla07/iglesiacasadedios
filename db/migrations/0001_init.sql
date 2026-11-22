-- CDD-009 · Migración inicial del modelo de datos
-- Iglesia Presbiteriana Cumberland Casa de Dios · Jamundí
--
-- ESTADO: revisable, NO ejecutada por OpenCode en esta entrega.
-- Requiere PostgreSQL 15 o superior. No crea la base ni configura credenciales.
-- Aplicar únicamente en una base desechable y tras revisión independiente.
--
-- Reglas del modelo:
--   * El dinero usa numeric(16,2), nunca coma flotante.
--   * Presupuesto, valor ejecutado y donaciones recaudadas son columnas distintas.
--   * No se almacenan datos de tarjetas ni cuerpos completos de eventos de pago.
--   * La auditoría es append-only.
--   * Los datos personales de donantes no forman parte de esta versión.

BEGIN;

CREATE SCHEMA IF NOT EXISTS app;
CREATE SCHEMA IF NOT EXISTS content;
CREATE SCHEMA IF NOT EXISTS ministry;
CREATE SCHEMA IF NOT EXISTS project;
CREATE SCHEMA IF NOT EXISTS donations;
CREATE SCHEMA IF NOT EXISTS audit;

CREATE TYPE content.editorial_status AS ENUM (
  'draft',
  'in_review',
  'approved',
  'published',
  'archived'
);

CREATE TYPE donations.reference_status AS ENUM (
  'created',
  'pending',
  'approved',
  'rejected',
  'cancelled',
  'refunded',
  'failed'
);

-- ---------------------------------------------------------------------------
-- Usuarios y roles (autenticación aún no implementada)
-- ---------------------------------------------------------------------------

CREATE TABLE app.user_account (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE CHECK (email = lower(email) AND position('@' IN email) > 1),
  display_name text NOT NULL CHECK (length(trim(display_name)) > 0),
  -- La autenticación no está implementada. Nunca guardar contraseñas en texto plano.
  password_hash text,
  is_active boolean NOT NULL DEFAULT true,
  mfa_enabled boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE app.role (
  key text PRIMARY KEY CHECK (length(trim(key)) > 0),
  name text NOT NULL,
  description text NOT NULL
);

INSERT INTO app.role (key, name, description) VALUES
  ('editor', 'Editor', 'Prepara contenido y avances en borrador; no publica ni cambia destinos de donación.'),
  ('institutional_reviewer', 'Revisor institucional', 'Revisa contenido, permisos de imágenes y publicación.'),
  ('finance_manager', 'Responsable financiero', 'Consulta conciliación y propone cambios financieros; no aprueba su propia solicitud.'),
  ('finance_approver', 'Segundo aprobador financiero', 'Verifica y aprueba solicitudes de otra persona; no sustituye unilateralmente el destino.'),
  ('technical_admin', 'Administrador técnico', 'Opera infraestructura según procedimientos; no aprueba cambios financieros.')
ON CONFLICT (key) DO NOTHING;

CREATE TABLE app.user_role (
  user_id uuid NOT NULL REFERENCES app.user_account (id) ON DELETE CASCADE,
  role_key text NOT NULL REFERENCES app.role (key) ON DELETE RESTRICT,
  granted_at timestamptz NOT NULL DEFAULT now(),
  granted_by uuid REFERENCES app.user_account (id) ON DELETE SET NULL,
  PRIMARY KEY (user_id, role_key),
  CHECK (granted_by IS NULL OR granted_by <> user_id)
);

COMMENT ON TABLE app.user_account IS 'Cuentas administrativas. No hay autenticación ni cuentas reales en esta entrega.';
COMMENT ON COLUMN app.user_account.password_hash IS 'Reservado para un hash robusto cuando se implemente autenticación; nunca texto plano.';
COMMENT ON TABLE app.user_role IS 'Asignación de roles. La aprobación financiera exige una persona distinta del solicitante.';

-- ---------------------------------------------------------------------------
-- Recursos y contenido editorial
-- ---------------------------------------------------------------------------

CREATE TABLE content.media_asset (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  storage_key text NOT NULL UNIQUE CHECK (length(trim(storage_key)) > 0),
  kind text NOT NULL CHECK (kind IN ('logo', 'photo', 'render', 'plan', 'document')),
  mime_type text NOT NULL CHECK (length(trim(mime_type)) > 0),
  byte_size bigint NOT NULL CHECK (byte_size > 0),
  width integer CHECK (width IS NULL OR width > 0),
  height integer CHECK (height IS NULL OR height > 0),
  alt_text text NOT NULL CHECK (length(trim(alt_text)) > 0),
  credit text,
  permission_status text NOT NULL DEFAULT 'pending'
    CHECK (permission_status IN ('pending', 'granted', 'denied')),
  permission_notes text,
  is_public boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (is_public = false OR permission_status = 'granted')
);

COMMENT ON TABLE content.media_asset IS 'Metadatos de archivos. El almacenamiento real y su ubicación fuera de rutas ejecutables quedan pendientes.';
COMMENT ON COLUMN content.media_asset.is_public IS 'Solo puede ser público si el permiso de uso fue concedido.';

CREATE TABLE content.institution_profile (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  legal_name text,
  public_name text NOT NULL CHECK (length(trim(public_name)) > 0),
  denomination text NOT NULL CHECK (length(trim(denomination)) > 0),
  city text NOT NULL,
  address_line1 text NOT NULL,
  address_line2 text,
  region text NOT NULL,
  country text NOT NULL,
  map_url text,
  status content.editorial_status NOT NULL DEFAULT 'draft',
  is_public boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (is_public = false OR status = 'published')
);

CREATE UNIQUE INDEX institution_profile_one_public
  ON content.institution_profile ((is_public))
  WHERE is_public;

COMMENT ON COLUMN content.institution_profile.legal_name IS 'Pendiente de confirmación institucional; no se publica por defecto.';
COMMENT ON COLUMN content.institution_profile.map_url IS 'Solo un enlace de mapa validado; no aceptar destinos arbitrarios del navegador.';

CREATE TABLE content.service_schedule (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_id uuid NOT NULL REFERENCES content.institution_profile (id) ON DELETE CASCADE,
  -- ISO-8601: 1 = lunes, 7 = domingo.
  day_of_week smallint NOT NULL CHECK (day_of_week BETWEEN 1 AND 7),
  start_time time NOT NULL,
  end_time time NOT NULL,
  label text NOT NULL CHECK (length(trim(label)) > 0),
  is_public boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (institution_id, day_of_week, start_time, end_time),
  CHECK (end_time > start_time)
);

CREATE TABLE content.page (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE CHECK (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  title text NOT NULL CHECK (length(trim(title)) > 0),
  summary text,
  status content.editorial_status NOT NULL DEFAULT 'draft',
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (status <> 'published' OR published_at IS NOT NULL)
);

CREATE TABLE content.page_revision (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id uuid NOT NULL REFERENCES content.page (id) ON DELETE CASCADE,
  revision_number integer NOT NULL CHECK (revision_number > 0),
  -- Bloques estructurados y saneados en servidor; no HTML arbitrario.
  body jsonb NOT NULL CHECK (jsonb_typeof(body) IN ('object', 'array')),
  status content.editorial_status NOT NULL DEFAULT 'draft',
  author_id uuid REFERENCES app.user_account (id) ON DELETE SET NULL,
  reviewed_by uuid REFERENCES app.user_account (id) ON DELETE SET NULL,
  reviewed_at timestamptz,
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (page_id, revision_number),
  CHECK (status <> 'published' OR published_at IS NOT NULL),
  CHECK (reviewed_by IS NULL OR reviewed_by <> author_id)
);

COMMENT ON TABLE content.page_revision IS 'Historial editorial. La publicación requiere revisión y deja rastro de autor y revisor.';

CREATE TABLE content.pastoral_profile (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  display_name text,
  role_title text NOT NULL DEFAULT 'Pastor' CHECK (length(trim(role_title)) > 0),
  biography text,
  photo_asset_id uuid REFERENCES content.media_asset (id) ON DELETE SET NULL,
  status content.editorial_status NOT NULL DEFAULT 'draft',
  is_current boolean NOT NULL DEFAULT false,
  confirmed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (is_current = false OR confirmed_at IS NOT NULL)
);

CREATE UNIQUE INDEX pastoral_profile_one_current
  ON content.pastoral_profile ((is_current))
  WHERE is_current;

COMMENT ON COLUMN content.pastoral_profile.display_name IS 'Nulo mientras la iglesia no confirme nombre, continuidad y autorización de publicación.';
COMMENT ON COLUMN content.pastoral_profile.photo_asset_id IS 'Debe apuntar a un recurso con permiso concedido antes de publicarse.';

-- ---------------------------------------------------------------------------
-- Grupos y actividades
-- ---------------------------------------------------------------------------

CREATE TABLE ministry.community_group (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE CHECK (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  name text NOT NULL CHECK (length(trim(name)) > 0),
  description text,
  meeting_schedule text,
  status content.editorial_status NOT NULL DEFAULT 'draft',
  is_public boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (is_public = false OR status = 'published')
);

CREATE TABLE ministry.activity (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id uuid REFERENCES ministry.community_group (id) ON DELETE SET NULL,
  title text NOT NULL CHECK (length(trim(title)) > 0),
  description text,
  starts_at timestamptz NOT NULL,
  ends_at timestamptz,
  location text,
  status content.editorial_status NOT NULL DEFAULT 'draft',
  is_public boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (ends_at IS NULL OR ends_at > starts_at),
  CHECK (is_public = false OR status = 'published')
);

COMMENT ON TABLE ministry.community_group IS 'No contiene grupos reales en esta entrega; los nombres requieren confirmación.';

-- ---------------------------------------------------------------------------
-- Proyecto del templo y cifras
-- ---------------------------------------------------------------------------

CREATE TABLE project.progress_update (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE CHECK (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  title text NOT NULL CHECK (length(trim(title)) > 0),
  summary text,
  body text,
  progress_note text,
  status content.editorial_status NOT NULL DEFAULT 'draft',
  cutoff_date date,
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (status <> 'published' OR (published_at IS NOT NULL AND cutoff_date IS NOT NULL))
);

CREATE TABLE project.progress_media (
  update_id uuid NOT NULL REFERENCES project.progress_update (id) ON DELETE CASCADE,
  media_asset_id uuid NOT NULL REFERENCES content.media_asset (id) ON DELETE RESTRICT,
  position integer NOT NULL DEFAULT 0 CHECK (position >= 0),
  PRIMARY KEY (update_id, media_asset_id)
);

CREATE TABLE project.financial_snapshot (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  as_of_date date NOT NULL,
  currency char(3) NOT NULL DEFAULT 'COP' CHECK (currency ~ '^[A-Z]{3}$'),
  budget_amount numeric(16, 2) CHECK (
    budget_amount IS NULL OR (
      budget_amount >= 0
      AND budget_amount <> 'NaN'::numeric
      AND budget_amount <> 'Infinity'::numeric
    )
  ),
  executed_amount numeric(16, 2) CHECK (
    executed_amount IS NULL OR (
      executed_amount >= 0
      AND executed_amount <> 'NaN'::numeric
      AND executed_amount <> 'Infinity'::numeric
    )
  ),
  raised_amount numeric(16, 2) CHECK (
    raised_amount IS NULL OR (
      raised_amount >= 0
      AND raised_amount <> 'NaN'::numeric
      AND raised_amount <> 'Infinity'::numeric
    )
  ),
  source_note text NOT NULL CHECK (length(trim(source_note)) > 0),
  is_public boolean NOT NULL DEFAULT false,
  approved_by uuid REFERENCES app.user_account (id) ON DELETE SET NULL,
  approved_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (as_of_date, currency),
  CHECK (budget_amount IS NOT NULL OR executed_amount IS NOT NULL OR raised_amount IS NOT NULL),
  CHECK ((approved_by IS NULL) = (approved_at IS NULL)),
  CHECK (is_public = false OR (approved_by IS NOT NULL AND approved_at IS NOT NULL))
);

COMMENT ON TABLE project.financial_snapshot IS 'Cifras exactas y fechadas. Presupuesto, ejecutado y recaudo son conceptos distintos.';
COMMENT ON COLUMN project.financial_snapshot.executed_amount IS 'Valor ejecutado de la obra; no equivale a donaciones recaudadas.';
COMMENT ON COLUMN project.financial_snapshot.raised_amount IS 'Solo desde registros conciliados y aprobados; nunca derivado del presupuesto.';
COMMENT ON COLUMN project.financial_snapshot.is_public IS 'Una cifra solo puede publicarse con aprobación registrada.';

-- ---------------------------------------------------------------------------
-- Donaciones (contratos; sin pasarela ni datos de tarjetas)
-- ---------------------------------------------------------------------------

CREATE TABLE donations.donation_reference (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  public_reference text NOT NULL UNIQUE CHECK (length(public_reference) >= 16),
  provider text NOT NULL CHECK (length(trim(provider)) > 0),
  provider_reference text,
  amount numeric(16, 2) NOT NULL CHECK (
    amount > 0
    AND amount <> 'NaN'::numeric
    AND amount <> 'Infinity'::numeric
  ),
  currency char(3) NOT NULL DEFAULT 'COP' CHECK (currency ~ '^[A-Z]{3}$'),
  status donations.reference_status NOT NULL DEFAULT 'created',
  confirmed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (status <> 'approved' OR confirmed_at IS NOT NULL)
);

CREATE UNIQUE INDEX donation_reference_provider_ref
  ON donations.donation_reference (provider, provider_reference)
  WHERE provider_reference IS NOT NULL;

COMMENT ON TABLE donations.donation_reference IS 'Referencias de pago conciliadas. No guarda datos de tarjetas, cuentas ni datos personales del donante.';
COMMENT ON COLUMN donations.donation_reference.amount IS 'Importe exacto en numeric; nunca float. La moneda se valida en servidor.';

CREATE TABLE donations.provider_event (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider text NOT NULL CHECK (length(trim(provider)) > 0),
  provider_event_id text NOT NULL CHECK (length(trim(provider_event_id)) > 0),
  reference_id uuid REFERENCES donations.donation_reference (id) ON DELETE RESTRICT,
  event_type text NOT NULL CHECK (length(trim(event_type)) > 0),
  -- Solo un resumen verificable; no se guarda el cuerpo completo del evento.
  payload_digest text NOT NULL CHECK (length(payload_digest) >= 32),
  received_at timestamptz NOT NULL DEFAULT now(),
  processed_at timestamptz,
  UNIQUE (provider, provider_event_id)
);

COMMENT ON TABLE donations.provider_event IS 'Idempotencia y conciliación. Los eventos repetidos o fuera de orden se comparan con el proveedor.';
COMMENT ON COLUMN donations.provider_event.payload_digest IS 'Huella del cuerpo recibido; el cuerpo completo no se persiste.';

-- ---------------------------------------------------------------------------
-- Auditoría append-only
-- ---------------------------------------------------------------------------

CREATE TABLE audit.event (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  occurred_at timestamptz NOT NULL DEFAULT now(),
  actor_type text NOT NULL CHECK (actor_type IN ('user', 'system', 'integration')),
  actor_user_id uuid REFERENCES app.user_account (id) ON DELETE SET NULL,
  action text NOT NULL CHECK (length(trim(action)) > 0),
  entity_type text NOT NULL CHECK (length(trim(entity_type)) > 0),
  entity_id text,
  outcome text NOT NULL CHECK (outcome IN ('success', 'denied', 'error')),
  request_id text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(metadata) = 'object'),
  CHECK (actor_type <> 'user' OR actor_user_id IS NOT NULL)
);

CREATE INDEX audit_event_occurred_at_idx ON audit.event (occurred_at DESC);
CREATE INDEX audit_event_entity_idx ON audit.event (entity_type, entity_id);
CREATE INDEX audit_event_actor_idx ON audit.event (actor_user_id, occurred_at DESC);

COMMENT ON TABLE audit.event IS 'Registro append-only. No incluir secretos, datos de tarjetas ni cuerpos completos de pago.';

CREATE OR REPLACE FUNCTION audit.reject_mutation()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  RAISE EXCEPTION 'audit.event es append-only: no se permite UPDATE, DELETE ni TRUNCATE';
END;
$$;

CREATE TRIGGER audit_event_immutable
  BEFORE UPDATE OR DELETE ON audit.event
  FOR EACH ROW
  EXECUTE FUNCTION audit.reject_mutation();

CREATE TRIGGER audit_event_no_truncate
  BEFORE TRUNCATE ON audit.event
  FOR EACH STATEMENT
  EXECUTE FUNCTION audit.reject_mutation();

-- ---------------------------------------------------------------------------
-- Actualización de marcas de tiempo
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION app.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER user_account_set_updated_at
  BEFORE UPDATE ON app.user_account
  FOR EACH ROW EXECUTE FUNCTION app.set_updated_at();

CREATE TRIGGER institution_profile_set_updated_at
  BEFORE UPDATE ON content.institution_profile
  FOR EACH ROW EXECUTE FUNCTION app.set_updated_at();

CREATE TRIGGER content_page_set_updated_at
  BEFORE UPDATE ON content.page
  FOR EACH ROW EXECUTE FUNCTION app.set_updated_at();

CREATE TRIGGER pastoral_profile_set_updated_at
  BEFORE UPDATE ON content.pastoral_profile
  FOR EACH ROW EXECUTE FUNCTION app.set_updated_at();

CREATE TRIGGER community_group_set_updated_at
  BEFORE UPDATE ON ministry.community_group
  FOR EACH ROW EXECUTE FUNCTION app.set_updated_at();

CREATE TRIGGER activity_set_updated_at
  BEFORE UPDATE ON ministry.activity
  FOR EACH ROW EXECUTE FUNCTION app.set_updated_at();

CREATE TRIGGER progress_update_set_updated_at
  BEFORE UPDATE ON project.progress_update
  FOR EACH ROW EXECUTE FUNCTION app.set_updated_at();

CREATE TRIGGER donation_reference_set_updated_at
  BEFORE UPDATE ON donations.donation_reference
  FOR EACH ROW EXECUTE FUNCTION app.set_updated_at();

COMMIT;
