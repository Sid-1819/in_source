// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  timestamp,
  varchar,
  text,
  date,
  char,
  primaryKey,
  uniqueIndex,
  serial,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `in-source_${name}`);

// Contest Management Schema
export const contests = createTable(
  "contest",
  {
    contestId: serial("contest_id").primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    subTitle: varchar("sub_title", { length: 255 }).notNull(),
    description: text("description"),
    bannerUrl: varchar("banner_url", { length: 255 }),
    status: char("status", { length: 1 }).default('a'),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
    startDate: date("start_date").notNull(),
    endDate: date("end_date").notNull(),
  },
  (example) => ({
    contestIndex: index("contest_idx").on(example.contestId)
  })
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
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  }
);

export const contestCustomPages = createTable(
  "contest_custom_page",
  {
    contestId: integer("contest_id").references(() => contests.contestId, { onDelete: 'cascade' }),
    pageId: integer("page_id").references(() => customPages.pageId, { onDelete: 'cascade' }),
    displayOrder: integer("display_order").default(0),
  },
  (table) => ({
    pk: primaryKey(table.contestId, table.pageId),
  })
);

export const tags = createTable(
  "tag",
  {
    tagId: serial("tag_id").primaryKey(),
    tagName: varchar("tag_name", { length: 100 }).notNull(),
  },
  (table) => ({
    tagNameUnique: uniqueIndex("tag_name_unique").on(table.tagName),
  })
);

export const contestTags = createTable(
  "contest_tag",
  {
    contestId: integer("contest_id").references(() => contests.contestId, { onDelete: 'cascade' }),
    tagId: integer("tag_id").references(() => tags.tagId, { onDelete: 'cascade' }),
  },
  (table) => ({
    pk: primaryKey(table.contestId, table.tagId),
  })
);

export const awardTypes = createTable(
  "award_type",
  {
    awardTypeId: serial("award_type_id").primaryKey(),
    awardTypeName: varchar("award_type_name", { length: 50 }).notNull(),
  },
  (table) => ({
    awardTypeNameUnique: uniqueIndex("award_type_name_unique").on(table.awardTypeName),
  })
);

export const contestAwards = createTable(
  "contest_award",
  {
    awardId: serial("award_id").primaryKey(),
    contestId: integer("contest_id").references(() => contests.contestId, { onDelete: 'cascade' }),
    awardTypeId: integer("award_type_id").references(() => awardTypes.awardTypeId),
    awardDetails: integer("award_details"),
  }
);

export const users = createTable(
  "user",
  {
    userId: serial("user_id").primaryKey(),
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

export const applications = createTable(
  "application",
  {
    applicationId: serial("application_id").primaryKey(),
    contestId: integer("contest_id").references(() => contests.contestId, { onDelete: 'cascade' }),
    userId: integer("user_id").references(() => users.userId, { onDelete: 'cascade' }),
    applicationDate: timestamp("application_date", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => ({
    contestUserUnique: uniqueIndex("contest_user_unique").on(table.contestId, table.userId),
  })
);

export const participants = createTable(
  "participant",
  {
    participantId: serial("participant_id").primaryKey(),
    contestId: integer("contest_id").references(() => contests.contestId, { onDelete: 'cascade' }),
    userId: integer("user_id").references(() => users.userId, { onDelete: 'cascade' }),
    participationDate: date("participation_date"),
    participationStatus: varchar("participation_status", { length: 50 }).notNull(),
    startDate: date("start_date").notNull(),
    endDate: date("end_date").notNull(),
  },
  (table) => ({
    contestDateUnique: uniqueIndex("contest_date_unique").on(table.contestId, table.participationDate),
  })
);

export const winners = createTable(
  "winner",
  {
    winnerId: serial("winner_id").primaryKey(),
    contestId: integer("contest_id").references(() => contests.contestId, { onDelete: 'cascade' }),
    userId: integer("user_id").references(() => users.userId, { onDelete: 'cascade' }),
    awardId: integer("award_id").references(() => contestAwards.awardId),
    winDate: timestamp("win_date", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  }
);