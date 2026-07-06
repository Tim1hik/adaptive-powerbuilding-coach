alter table users enable row level security;
alter table user_profiles enable row level security;
alter table user_settings enable row level security;
alter table sleep_entries enable row level security;
alter table body_weight_entries enable row level security;
alter table nutrition_targets enable row level security;
alter table nutrition_logs enable row level security;
alter table training_sessions enable row level security;
alter table training_sets enable row level security;
alter table readiness_checkins enable row level security;
alter table personal_records enable row level security;
alter table leaderboard_profiles enable row level security;
alter table leaderboard_entries enable row level security;

create policy "users-own-row" on users for all using (auth.uid() = id) with check (auth.uid() = id);
create policy "profiles-own-row" on user_profiles for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "settings-own-row" on user_settings for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "sleep-own-row" on sleep_entries for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "weight-own-row" on body_weight_entries for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "nutrition-targets-own-row" on nutrition_targets for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "nutrition-logs-own-row" on nutrition_logs for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "sessions-own-row" on training_sessions for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "readiness-own-row" on readiness_checkins for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "prs-own-row" on personal_records for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "public-template-programs-read" on training_programs for select using (is_public_template = true or auth.uid() = owner_user_id);
create policy "own-training-programs-write" on training_programs for all using (auth.uid() = owner_user_id) with check (auth.uid() = owner_user_id);
create policy "public-template-days-read" on training_program_days for select using (exists (select 1 from training_programs where training_programs.id = training_program_days.program_id and training_programs.is_public_template = true));
create policy "public-template-exercises-read" on training_program_exercises for select using (exists (select 1 from training_program_days join training_programs on training_programs.id = training_program_days.program_id where training_program_days.id = training_program_exercises.program_day_id and training_programs.is_public_template = true));

create policy "leaderboard-opt-in-public-read" on leaderboard_profiles for select using (opted_in = true);
create policy "leaderboard-own-write" on leaderboard_profiles for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "leaderboard-entries-public-read" on leaderboard_entries for select using (exists (select 1 from leaderboard_profiles where leaderboard_profiles.user_id = leaderboard_entries.user_id and leaderboard_profiles.opted_in = true));

create policy "support-public-read" on support_config for select using (true);
create policy "donor-rewards-public-read" on donor_rewards for select using (true);
