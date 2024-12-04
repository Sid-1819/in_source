import { sql } from "drizzle-orm";
import {
  integer,
  pgTableCreator,
  timestamp,
  varchar,
  text,
  date,
  char,
  primaryKey,
  uniqueIndex,
  uuid,
  serial,
  json,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `${name}_tbl`);

export const contests = createTable(
  "contest",
  {
    contestId: uuid("contest_id").primaryKey().defaultRandom(),
    title: varchar("title", { length: 255 }).notNull(),
    subTitle: varchar("sub_title", { length: 255 }).notNull(),
    description: text("description"),
    tags: varchar("tags", { length: 255 }),
    bannerUrl: varchar("banner_url", { length: 255 }),
    difficultyLevel: varchar("difficulty_level", { length: 25 }),
    status: char("status", { length: 1 }).default('U'), // Un-archived, archived, deleted
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .$onUpdate(() => new Date()),
    startDate: date("start_date").notNull(),
    endDate: date("end_date").notNull(),
  }
);

export const customPages = createTable(
  "custom_page",
  {
    pageId: serial("page_id").primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    content: text("content").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .$onUpdate(() => new Date()),
  }
);

export const contestCustomPages = createTable(
  "contest_custom_page",
  {
    contestId: uuid("contest_id").references(() => contests.contestId, { onDelete: 'cascade' }),
    pageId: integer("page_id").references(() => customPages.pageId, { onDelete: 'cascade' }),
    displayOrder: integer("display_order").default(0),
  },
  (table) => ({
    pkWithCustomName: primaryKey({ name: 'contest_custom_page_id', columns: [table.contestId, table.pageId] }),
  })
);

export const awardTypes = createTable(
  "award_type",
  {
    awardTypeId: serial("award_type_id").primaryKey(),
    awardTypeName: varchar("award_type_name", { length: 50 }).notNull(),
  },
);

export const contestAwards = createTable(
  "contest_award",
  {
    awardId: serial("award_id").primaryKey(),
    contestId: uuid("contest_id").references(() => contests.contestId, { onDelete: 'cascade' }),
    awardTypeId: integer("award_type_id").references(() => awardTypes.awardTypeId),
    positionId: integer("position_id"),
    awardDetails: integer("award_details"),
  }
);

export const users = createTable(
  "user",
  {
    userId: uuid("user_id").primaryKey().defaultRandom(),
    username: varchar("username", { length: 100 }).notNull(),
    email: varchar("email", { length: 100 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => ({
    usernameUnique: uniqueIndex("username_unique").on(table.username),
    emailUnique: uniqueIndex("email_unique").on(table.email),
  })
);

export const participants = createTable(
  "participant",
  {
    participantId: uuid("participant_id").primaryKey().defaultRandom(),
    contestId: uuid("contest_id").references(() => contests.contestId, { onDelete: 'cascade' }),
    userId: uuid("user_id").references(() => users.userId, { onDelete: 'cascade' }),
    participationDate: date("participation_date"),
    participationStatus: char("participation_status", { length: 1 }).default('A'), // A / N -- active / not-active
  }
);

export const winners = createTable(
  "winner",
  {
    winnerId: uuid("winner_id").primaryKey().defaultRandom(),
    contestId: uuid("contest_id").references(() => contests.contestId, { onDelete: 'cascade' }),
    userId: uuid("user_id").references(() => users.userId, { onDelete: 'cascade' }),
    awardId: integer("award_id").references(() => contestAwards.awardId),
    winDate: timestamp("win_date", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  }
);

export const contestSubmission = createTable(
  "contest_submission",
  {
    submissionId: uuid("submission_id").primaryKey().defaultRandom(),
    contestId: uuid("contest_id").references(() => contests.contestId, { onDelete: 'cascade' }),
    userId: uuid("user_id").references(() => users.userId, { onDelete: 'cascade' }),
    description: text("description"),
    teamMembers: json("team_members"),
    submissionStatus: char("submission_status", { length: 1 }).default('S'), //'Draft - D' | 'Submitted - S' | 'Deleted - N'
    sourceCodeLink: varchar("source_code_link", { length: 500 }).notNull(),
    deploymentLink: varchar("deployment_link", { length: 500 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .$onUpdate(() => new Date()),
  }
);

export const season = createTable(
  "season",
  {
    seasonId: uuid("season_id").primaryKey().defaultRandom(),
    seasonName: varchar("season_name", { length: 50 }),
    startDate: date("start_date"),
    endDate: date("end_date"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .$onUpdate(() => new Date()),
  }
);

export const leaderboard = createTable(
  "leaderboard",
  {
    leaderboardId: uuid("leaderboard_id").primaryKey().defaultRandom(),
    contestId: uuid("contest_id").references(() => contests.contestId, { onDelete: 'cascade' }),
    userId: uuid("user_id").references(() => users.userId, { onDelete: 'cascade' }),
    seasonId: uuid("season_id").references(() => season.seasonId, { onDelete: 'cascade' }),
    expPoints: integer("exp_points"),
    submissionCount: integer("submission_count"),
    noOfWins: integer("no_of_wins"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .$onUpdate(() => new Date()),
  }
);