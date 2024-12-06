"use server";

import { sql } from "drizzle-orm";
import { db } from "~/server/db";
import type { AllContestAdminDashboard } from "~/types/admin/dashboard/types";

/**
 * fetchs list of all the contest and its details 
 * @returns 
 */
export async function getAllContestDetailsOnAdminDashboard() {

    const allcontestinfo = await db.execute(sql`
        SELECT contest_id, title, sub_title, banner_url, tags, difficulty_level, status, start_date, end_date,
        (SELECT COUNT(p.participant_id) 
            FROM "participant_tbl" p 
            WHERE p.contest_id = '2c5689f0-4821-4fc6-a292-0be90d714b2f' 
            AND p.participation_status = 'A'
        ) as participation_count
        FROM "contest_tbl" c WHERE c.status <> 'A';
    `);

    console.log("all contest: ", allcontestinfo);

    return allcontestinfo.rows as unknown as AllContestAdminDashboard[]
}

