"use server";

import { sql } from "drizzle-orm";
import { db } from "~/server/db";
import type { Submissions } from "~/types/submission";

export interface ContestDetails {
    contest_id: string; // Assuming contest_id is a UUID or string
    title: string;
    sub_title: string | null; // Nullable, if sub_title can be null
    tags: string; // Assuming tags are stored as an array
    created_at: Date;
    banner_url: string | null; // Nullable, if banner_url can be null
    start_date: Date;
    end_date: Date;
    difficulty_level: string; // Adjust type if difficulty_level has specific allowed values
    no_of_submissions: number; // The result of the COUNT() function
}

/**
 * fetchs contest details and no of subs to show in card
 * @param contestId 
 * @returns 
 */
export async function getContestDetailsAndNoOfSubmissions(contestId: string) {

    const contestDetails = await db.execute(sql`
        SELECT contest_id, title, sub_title, tags, created_at, banner_url, start_date, end_date, difficulty_level, 
        (   SELECT COUNT(s.submission_id) 
            FROM "contest_submission_tbl" s 
            WHERE s.contest_id = c.contest_id
        ) AS no_of_submissions
        FROM "contest_tbl" c 
        WHERE c.contest_id = ${contestId};
    `);

    return contestDetails.rows[0] as unknown as ContestDetails;
}


/**
 * fetchs list of submissions for a contest
 * @param contestId 
 * @param userId 
 * @returns 
 */
export async function getContestSubmissionsList(contestId: string) {

    const submssionList = await db.execute(sql`
        SELECT submission_id, description, team_members, source_code_link, deployment_link, created_at
        FROM "contest_submission_tbl" s
        WHERE EXISTS (
            SELECT user_id 
            FROM "participant_tbl" p 
            WHERE p.contest_id = ${contestId} AND p.participation_status = 'A'
        );
    `);

    return submssionList.rows as unknown as Submissions[];
}