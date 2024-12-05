"use server";

import { sql } from "drizzle-orm";
import { db } from "~/server/db";

/**
 * fetchs contest details and no of subs to show in card
 * @param contestId 
 * @returns 
 */
export async function getContestDetailsAndNoOfSubmissions(contestId: string) {

    const res = await db.execute(sql`
        SELECT contest_id, title, sub_title, tags, created_at, banner_url, start_date, end_date, difficulty_level, 
        (   SELECT COUNT(s.submission_id) 
            FROM "contest_submission_tbl" s 
            WHERE s.contest_id = c.contest_id
        ) AS no_of_submissions
        FROM "contest_tbl" c 
        WHERE c.contest_id = ${contestId};
    `);

    console.log("resss: ", res);
    return res;
}


/**
 * fetchs list of submissions for a contest
 * @param contestId 
 * @param userId 
 * @returns 
 */
export async function getContestSubmissionsList(contestId: string, userId: string) {

    const res = await db.execute(sql`
        SELECT submission_id, description, team_members, source_code_link, deployment_link, created_at
        FROM "contest_submission_tbl" s
        WHERE EXISTS (
            SELECT user_id 
            FROM "participant_tbl" p 
            WHERE p.user_id = ${userId} 
                AND p.contest_id = ${contestId}
                AND p.participation_status = 'A'
        );
    `);

    console.log("resss: ", res);
    return res;
}