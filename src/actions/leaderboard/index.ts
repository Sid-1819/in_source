"use server";

import { db } from "~/server/db";
import { sql } from "drizzle-orm";
import { LeaderboardUser } from "~/types/leaderboard";

export async function getLeaderBoardList(season_id: string) {

    const leaderboardData = await db.execute(sql`
        SELECT 
        u.username,
        lb.exp_points,
        lb.no_of_wins,
        lb.submission_count AS total_submissions
        FROM 
        "user_tbl" u
        INNER JOIN "leaderboard_tbl" lb ON u.user_id = lb.user_id
        INNER JOIN "season_tbl" s ON lb.season_id = s.season_id
        WHERE 
        lb.season_id = ${season_id}
        ORDER BY 
        lb.exp_points DESC;
    `);

    return leaderboardData.rows as unknown as LeaderboardUser[];
}