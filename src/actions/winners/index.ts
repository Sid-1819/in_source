import { sql } from "drizzle-orm";
import { db } from "~/server/db";
import { Winner } from "~/types/winner";

export async function getContestWinners(contestId: number) {

    const contestWinners = await db.execute(sql`
        WITH user_awards AS (
        SELECT
        u.username,
        COALESCE(SUM(CASE WHEN at.award_type_name = 'Points' THEN ia.award_details END), 0) AS points,
        COALESCE(SUM(CASE WHEN at.award_type_name = 'Swag Bag' THEN ia.award_details END), 1) AS swag_prize
        FROM "public"."in-source_user" u
        LEFT JOIN "public"."in-source_winner" w ON u.user_id = w.user_id AND w.contest_id = ${contestId}
        LEFT JOIN "public"."in-source_contest_award" ia ON w.award_id = ia.award_id
        LEFT JOIN "public"."in-source_award_type" at ON ia.award_type_id = at.award_type_id
        GROUP BY u.username
        )
        SELECT *
        FROM user_awards
        WHERE points > 0 AND swag_prize > 0;
    `);

    return contestWinners.rows as unknown as Winner[];

};