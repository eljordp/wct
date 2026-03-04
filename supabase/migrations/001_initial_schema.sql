-- ============================================
-- West Coast Terpz - Database Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- ── Delivery Products ──

create table if not exists delivery_products (
  id text primary key,
  name text not null,
  category text not null check (category in ('flower', 'vapes')),
  terpene_profile text not null check (terpene_profile in ('relaxed', 'euphoric', 'creative', 'heavy')),
  price numeric not null default 0,
  thc text default '',
  description text default '',
  image_url text,
  in_stock boolean not null default true,
  badge text,
  weights jsonb, -- { eighth: 30, q: 55, h: 100, oz: 180 }
  quantity_pricing jsonb, -- [{ minQty, price, label }]
  flavors jsonb, -- [{ name, description, thc, emoji, terpene_profile }]
  brand text,
  max_quantity integer,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ── Wholesale Products ──

create table if not exists wholesale_products (
  id text primary key,
  name text not null,
  category text not null check (category in ('flower', 'vapes', 'edibles', 'concentrates', 'pre-rolls')),
  strain text not null check (strain in ('indica', 'sativa', 'hybrid')),
  retail numeric not null default 0,
  wholesale jsonb not null default '[]', -- [{ minQty, price, label }]
  thc text default '',
  description text default '',
  image_url text default '',
  in_stock boolean not null default true,
  badge text,
  min_order integer not null default 10,
  brand text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ── Orders ──

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  order_number text unique not null,
  mode text not null check (mode in ('delivery', 'wholesale')),
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled')),

  -- Customer info
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,

  -- Delivery info
  address text,
  city text,
  zip text,
  delivery_window text,
  delivery_notes text,

  -- Payment
  payment_method text,
  subtotal numeric not null default 0,
  total numeric not null default 0,

  -- Items stored as JSON array
  items jsonb not null default '[]',

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ── Auto-update timestamps ──

create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger delivery_products_updated_at
  before update on delivery_products
  for each row execute function update_updated_at();

create trigger wholesale_products_updated_at
  before update on wholesale_products
  for each row execute function update_updated_at();

create trigger orders_updated_at
  before update on orders
  for each row execute function update_updated_at();

-- ── Row Level Security ──

alter table delivery_products enable row level security;
alter table wholesale_products enable row level security;
alter table orders enable row level security;

-- Public can read products
create policy "Anyone can read delivery products"
  on delivery_products for select
  using (true);

create policy "Anyone can read wholesale products"
  on wholesale_products for select
  using (true);

-- Only authenticated users (admin) can modify products
create policy "Admin can insert delivery products"
  on delivery_products for insert
  to authenticated
  with check (true);

create policy "Admin can update delivery products"
  on delivery_products for update
  to authenticated
  using (true);

create policy "Admin can delete delivery products"
  on delivery_products for delete
  to authenticated
  using (true);

create policy "Admin can insert wholesale products"
  on wholesale_products for insert
  to authenticated
  with check (true);

create policy "Admin can update wholesale products"
  on wholesale_products for update
  to authenticated
  using (true);

create policy "Admin can delete wholesale products"
  on wholesale_products for delete
  to authenticated
  using (true);

-- Anyone can create orders (customers placing orders)
create policy "Anyone can create orders"
  on orders for insert
  with check (true);

-- Only admin can view/manage orders
create policy "Admin can read orders"
  on orders for select
  to authenticated
  using (true);

create policy "Admin can update orders"
  on orders for update
  to authenticated
  using (true);
