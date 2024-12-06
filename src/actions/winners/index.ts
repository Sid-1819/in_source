"use server";

import { sql } from "drizzle-orm";
import { db } from "~/server/db";
import type { Winner } from "~/types/winner";

export async function getContestWinners(contestId: string) {

    const contestWinners = await db.execute(sql`
        WITH user_awards AS (
        SELECT
        u.username,
        COALESCE(SUM(CASE WHEN at.award_type_name = 'Points' THEN ia.award_details END), 0) AS points,
        COALESCE(SUM(CASE WHEN at.award_type_name = 'Swag Bag' THEN ia.award_details END), 1) AS swag_prize
        FROM "public"."user_tbl" u
        LEFT JOIN "public"."winner_tbl" w ON u.user_id = w.user_id AND w.contest_id = ${contestId}
        LEFT JOIN "public"."contest_award_tbl" ia ON w.award_id = ia.award_id
        LEFT JOIN "public"."award_type_tbl" at ON ia.award_type_id = at.award_type_id
        GROUP BY u.username
        )
        SELECT *
        FROM user_awards
        WHERE points > 0 AND swag_prize > 0;
    `);

    return contestWinners.rows as unknown as Winner[];

};