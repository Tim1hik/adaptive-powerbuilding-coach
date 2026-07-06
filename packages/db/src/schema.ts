import { relations } from "drizzle-orm";
import {
  boolean,
  date,
  integer,
  jsonb,
  numeric,
  pgEnum,
  pgSchema,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid
} from "drizzle-orm/pg-core";

export const authSchema = pgSchema("auth");

export const authUsers = authSchema.table("users", {
  id: uuid("id").primaryKey(),
  email: text("email")
});

export const localeEnum = pgEnum("locale", ["en", "ru"]);
export const sexEnum = pgEnum("sex", ["male", "female"]);
export const unitsEnum = pgEnum("units", ["metric", "imperial"]);
export const nutritionGoalEnum = pgEnum("nutrition_goal", ["aggressive_cut", "cut", "maintenance", "lean_bulk", "bulk"]);
export const trainingDayTypeEnum = pgEnum("training_day_type", ["push", "pull", "legs", "rest", "upper", "lower"]);
export const painAreaEnum = pgEnum("pain_area", ["none", "shoulder", "low_back", "knee", "elbow", "hip", "other"]);
export const painSeverityEnum = pgEnum("pain_severity", ["none", "mild", "moderate", "strong"]);
export const adaptationDecisionEnum = pgEnum("adaptation_decision", ["keep_plan", "keep_plan_no_pr", "reduce_load_or_sets", "light_technique", "block_heavy_sets"]);
export const setStatusEnum = pgEnum("set_status", ["completed", "skipped"]);
export const leaderboardCategoryEnum = pgEnum("leaderboard_category", ["power_score", "bench_relative", "squat_relative", "deadlift_relative", "monthly_progress", "consistency"]);
export const muscleGroupEnum = pgEnum("muscle_group", ["chest", "back", "shoulders", "triceps", "biceps", "rear_delt", "quads", "hamstrings", "calves", "abs", "adductors"]);
export const exerciseCategoryEnum = pgEnum("exercise_category", ["compound", "isolation", "bodyweight", "rest"]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().references(() => authUsers.id, { onDelete: "cascade" }),
  email: text("email").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow()
});

export const userProfiles = pgTable("user_profiles", {
  userId: uuid("user_id").primaryKey().references(() => users.id, { onDelete: "cascade" }),
  displayName: text("display_name").notNull(),
  email: text("email").notNull(),
  telegramUsername: text("telegram_username"),
  age: integer("age"),
  sex: sexEnum("sex"),
  heightCm: numeric("height_cm", { precision: 5, scale: 2 }),
  currentWeightKg: numeric("current_weight_kg", { precision: 6, scale: 2 }),
  estimatedBodyFatPercent: numeric("estimated_body_fat_percent", { precision: 5, scale: 2 }),
  goal: nutritionGoalEnum("goal").notNull().default("maintenance"),
  averageSteps: integer("average_steps"),
  sleepDuration: numeric("sleep_duration", { precision: 4, scale: 2 }),
  sleepQuality: integer("sleep_quality"),
  trainingDaysPerWeek: integer("training_days_per_week"),
  bench1rm: numeric("bench_1rm", { precision: 6, scale: 2 }),
  squat1rm: numeric("squat_1rm", { precision: 6, scale: 2 }),
  deadlift1rm: numeric("deadlift_1rm", { precision: 6, scale: 2 }),
  overheadPress1rm: numeric("overhead_press_1rm", { precision: 6, scale: 2 }),
  preferredLanguage: localeEnum("preferred_language").notNull().default("en"),
  units: unitsEnum("units").notNull().default("metric"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow()
});

export const userSettings = pgTable("user_settings", {
  userId: uuid("user_id").primaryKey().references(() => users.id, { onDelete: "cascade" }),
  leaderboardOptIn: boolean("leaderboard_opt_in").notNull().default(false),
  showDisplayName: boolean("show_display_name").notNull().default(true),
  showWeightClass: boolean("show_weight_class").notNull().default(false),
  allowProgressSharing: boolean("allow_progress_sharing").notNull().default(false),
  emailNotifications: boolean("email_notifications").notNull().default(true),
  privacySettings: jsonb("privacy_settings").$type<Record<string, boolean>>().notNull().default({}),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow()
});

export const sleepEntries = pgTable("sleep_entries", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  entryDate: date("entry_date").notNull(),
  durationHours: numeric("duration_hours", { precision: 4, scale: 2 }).notNull(),
  quality: integer("quality").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow()
});

export const bodyWeightEntries = pgTable("body_weight_entries", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  entryDate: date("entry_date").notNull(),
  weightKg: numeric("weight_kg", { precision: 6, scale: 2 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow()
});

export const nutritionTargets = pgTable("nutrition_targets", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  goal: nutritionGoalEnum("goal").notNull(),
  calories: integer("calories").notNull(),
  proteinGrams: integer("protein_grams").notNull(),
  fatGrams: integer("fat_grams").notNull(),
  carbGrams: integer("carb_grams").notNull(),
  startsOn: date("starts_on").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow()
});

export const nutritionLogs = pgTable("nutrition_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  logDate: date("log_date").notNull(),
  calories: integer("calories"),
  proteinGrams: integer("protein_grams"),
  fatGrams: integer("fat_grams"),
  carbGrams: integer("carb_grams"),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow()
});

export const trainingPrograms = pgTable("training_programs", {
  id: text("id").primaryKey(),
  ownerUserId: uuid("owner_user_id").references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  goal: text("goal").notNull(),
  isPublicTemplate: boolean("is_public_template").notNull().default(false),
  progressionNotes: jsonb("progression_notes").$type<string[]>().notNull().default([]),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow()
});

export const trainingProgramDays = pgTable("training_program_days", {
  id: text("id").primaryKey(),
  programId: text("program_id").notNull().references(() => trainingPrograms.id, { onDelete: "cascade" }),
  dayNumber: integer("day_number").notNull(),
  dayType: trainingDayTypeEnum("day_type").notNull(),
  isRestDay: boolean("is_rest_day").notNull().default(false),
  notes: jsonb("notes").$type<string[]>().notNull().default([])
});

export const trainingProgramExercises = pgTable("training_program_exercises", {
  id: text("id").primaryKey(),
  programDayId: text("program_day_id").notNull().references(() => trainingProgramDays.id, { onDelete: "cascade" }),
  exerciseOrder: integer("exercise_order").notNull(),
  muscleGroup: muscleGroupEnum("muscle_group").notNull(),
  exerciseName: text("exercise_name").notNull(),
  exerciseCategory: exerciseCategoryEnum("exercise_category").notNull(),
  sets: integer("sets").notNull(),
  minReps: integer("min_reps").notNull(),
  maxReps: integer("max_reps").notNull(),
  targetRpeMin: numeric("target_rpe_min", { precision: 3, scale: 1 }).notNull(),
  targetRpeMax: numeric("target_rpe_max", { precision: 3, scale: 1 }).notNull(),
  restSecondsMin: integer("rest_seconds_min").notNull(),
  restSecondsMax: integer("rest_seconds_max").notNull(),
  techniqueNotes: jsonb("technique_notes").$type<string[]>().notNull().default([]),
  progressionNotes: jsonb("progression_notes").$type<string[]>().notNull().default([])
});

export const exercises = pgTable("exercises", {
  id: text("id").primaryKey(),
  ownerUserId: uuid("owner_user_id").references(() => users.id, { onDelete: "cascade" }),
  muscleGroup: muscleGroupEnum("muscle_group").notNull(),
  exerciseName: text("exercise_name").notNull(),
  exerciseCategory: exerciseCategoryEnum("exercise_category").notNull(),
  isPublic: boolean("is_public").notNull().default(false)
});

export const readinessCheckins = pgTable("readiness_checkins", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  checkinDate: date("checkin_date").notNull(),
  sleepQuality: integer("sleep_quality").notNull(),
  sleepDurationHours: numeric("sleep_duration_hours", { precision: 4, scale: 2 }).notNull(),
  energy: integer("energy").notNull(),
  stress: integer("stress").notNull(),
  motivation: integer("motivation").notNull(),
  soreness: integer("soreness").notNull(),
  painArea: painAreaEnum("pain_area").notNull().default("none"),
  painSeverity: painSeverityEnum("pain_severity").notNull().default("none"),
  desireToTrainHeavy: boolean("desire_to_train_heavy").notNull().default(false),
  readinessScore: integer("readiness_score").notNull(),
  adaptationDecision: adaptationDecisionEnum("adaptation_decision").notNull()
});

export const trainingSessions = pgTable("training_sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  trainingProgramId: text("training_program_id").references(() => trainingPrograms.id),
  readinessCheckinId: uuid("readiness_checkin_id").references(() => readinessCheckins.id),
  sessionDate: date("session_date").notNull(),
  trainingDayType: trainingDayTypeEnum("training_day_type").notNull(),
  adaptationDecision: adaptationDecisionEnum("adaptation_decision"),
  status: setStatusEnum("status").notNull().default("completed"),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow()
});

export const trainingSets = pgTable("training_sets", {
  id: uuid("id").primaryKey().defaultRandom(),
  trainingSessionId: uuid("training_session_id").notNull().references(() => trainingSessions.id, { onDelete: "cascade" }),
  exerciseId: text("exercise_id").references(() => exercises.id),
  selectedExerciseName: text("selected_exercise_name").notNull(),
  setNumber: integer("set_number").notNull(),
  weightKg: numeric("weight_kg", { precision: 6, scale: 2 }),
  reps: integer("reps"),
  rpe: numeric("rpe", { precision: 3, scale: 1 }),
  notes: text("notes"),
  estimatedOneRepMaxKg: numeric("estimated_1rm_kg", { precision: 6, scale: 2 }),
  status: setStatusEnum("status").notNull().default("completed")
});

export const personalRecords = pgTable("personal_records", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  exerciseId: text("exercise_id").references(() => exercises.id),
  exerciseName: text("exercise_name").notNull(),
  oneRepMaxKg: numeric("one_rep_max_kg", { precision: 6, scale: 2 }).notNull(),
  achievedOn: date("achieved_on").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow()
});

export const leaderboardProfiles = pgTable("leaderboard_profiles", {
  userId: uuid("user_id").primaryKey().references(() => users.id, { onDelete: "cascade" }),
  publicDisplayName: text("public_display_name").notNull(),
  weightClassKg: integer("weight_class_kg"),
  optedIn: boolean("opted_in").notNull().default(false),
  showWeightClass: boolean("show_weight_class").notNull().default(false),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow()
});

export const leaderboardEntries = pgTable("leaderboard_entries", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => leaderboardProfiles.userId, { onDelete: "cascade" }),
  category: leaderboardCategoryEnum("category").notNull(),
  score: numeric("score", { precision: 10, scale: 2 }).notNull(),
  rankPeriod: text("rank_period").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow()
}, (table) => [uniqueIndex("leaderboard_entries_user_category_period_idx").on(table.userId, table.category, table.rankPeriod)]);

export const supportConfig = pgTable("support_config", {
  id: text("id").primaryKey(),
  fundingGoalAmount: numeric("funding_goal_amount", { precision: 12, scale: 2 }).notNull(),
  currentRaisedAmount: numeric("current_raised_amount", { precision: 12, scale: 2 }).notNull().default("0"),
  donorCount: integer("donor_count").notNull().default(0),
  donatepayUrl: text("donatepay_url"),
  telegramUsername: text("telegram_username"),
  manualUpdateEnabled: boolean("manual_update_enabled").notNull().default(true),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow()
});

export const donorRewards = pgTable("donor_rewards", {
  id: uuid("id").primaryKey().defaultRandom(),
  supportConfigId: text("support_config_id").notNull().references(() => supportConfig.id, { onDelete: "cascade" }),
  donorOrder: integer("donor_order").notNull(),
  donorDisplayName: text("donor_display_name"),
  rewardName: text("reward_name").notNull(),
  isClaimed: boolean("is_claimed").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow()
});

export const auditLogs = pgTable("audit_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  actorUserId: uuid("actor_user_id").references(() => users.id, { onDelete: "set null" }),
  action: text("action").notNull(),
  entityType: text("entity_type").notNull(),
  entityId: text("entity_id"),
  metadata: jsonb("metadata").$type<Record<string, unknown>>().notNull().default({}),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow()
});

export const usersRelations = relations(users, ({ one, many }) => ({
  profile: one(userProfiles),
  settings: one(userSettings),
  sessions: many(trainingSessions)
}));
