create extension if not exists pgcrypto;
create table if not exists public.profiles (id uuid primary key references auth.users on delete cascade, display_name text not null default 'Athlete', age_band text, experience text not null default 'beginner', preferences jsonb not null default '{}'::jsonb, created_at timestamptz not null default now());
create table if not exists public.exercises (id text primary key, title text not null, category text not null, level text not null, duration_seconds int not null check(duration_seconds between 10 and 600), instructions jsonb not null, modification text not null, safety_notes text not null, enabled boolean not null default true);
create table if not exists public.workout_sessions (id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users on delete cascade, title text not null, duration_minutes int not null check(duration_minutes > 0), completed_at timestamptz not null default now());
create table if not exists public.food_items (id text primary key, title text not null, ingredients jsonb not null, steps jsonb not null, dairy_free boolean not null default false, vegetarian_reviewed boolean not null default false, published boolean not null default false, check(vegetarian_reviewed = false or published = true));
create table if not exists public.admin_roles (user_id uuid primary key references auth.users on delete cascade, role text not null check(role in ('admin','editor')));
create table if not exists public.user_rewards (user_id uuid not null references auth.users on delete cascade, reward_id text not null, unlocked_at timestamptz not null default now(), primary key(user_id,reward_id));
alter table public.profiles enable row level security; alter table public.workout_sessions enable row level security; alter table public.user_rewards enable row level security; alter table public.exercises enable row level security; alter table public.food_items enable row level security; alter table public.admin_roles enable row level security;
create policy "profiles own read" on public.profiles for select using (auth.uid() = id);
create policy "profiles own insert" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles own update" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);
create policy "sessions own all" on public.workout_sessions for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "rewards own read" on public.user_rewards for select using (auth.uid() = user_id);
create policy "published exercises read" on public.exercises for select using (enabled = true);
create policy "reviewed vegetarian meals read" on public.food_items for select using (published = true and vegetarian_reviewed = true);
create policy "admin role self read" on public.admin_roles for select using (auth.uid() = user_id);
-- No client write policy exists for admin_roles, published content, or reward unlocks.
insert into public.exercises(id,title,category,level,duration_seconds,instructions,modification,safety_notes) values
('marching','Marching in Place','Warm-up','beginner',45,'["Stand tall near support","Lift one foot comfortably","Alternate gently"]','Keep feet low and hold a chair.','Stop if pain, dizziness, or unusual breathlessness occurs.'),
('wall-pushups','Wall Push-Ups','Strength','beginner',40,'["Place palms on a wall","Step back comfortably","Bend elbows and press away"]','Stand closer to the wall.','Stop if wrists or shoulders hurt.') on conflict do nothing;

