"use server";

import { db } from "~/server/db";
import { eq, sql } from "drizzle-orm";
import { Contest, ContestParticipant, ContestPrizes } from "~/types/contest";
import { contests } from "~/server/db/schema";

export async function getContestOnHome(status: string): Promise<Contest[]> {
     const contestList = await db.execute(sql`
        SELECT contest_id, title, sub_title, start_date, end_date, difficulty_level, banner_url, tags, 

        (SELECT count(1) FROM "public"."participant_tbl" p WHERE p.contest_id=c.contest_id) participants, 

        (SELECT sum(award_details) FROM "public"."contest_award_tbl" a,"public"."award_type_tbl" t  
        WHERE a.award_type_id=t.award_type_id AND a.contest_id=c.contest_id 
             AND t.award_type_name ='Cash Prize') cash_awards,

        (SELECT sum(award_details) FROM "public"."contest_award_tbl" a,"public"."award_type_tbl" t  
        WHERE a.award_type_id=t.award_type_id AND a.contest_id=c.contest_id 
             AND t.award_type_name ='Swag Bag') swag_awards,

        (SELECT sum(award_details) FROM "public"."contest_award_tbl" a,"public"."award_type_tbl" t  
        WHERE a.award_type_id=t.award_type_id AND a.contest_id=c.contest_id 
             AND t.award_type_name ='Points') points_awards 

        FROM "public"."contest_tbl" c WHERE status=${status}
        ORDER BY c.contest_id ASC;
    `);

     return contestList.rows as Contest[];
}

export async function getContestById(contestId: string) {
     const contestsById = await db.select().from(contests).where(eq(contests.contestId, contestId));
     return contestsById[0];
}

export async function getContestPizes(contestId: string): Promise<ContestPrizes[]> {

     const prizes = await db.execute(sql`
        SELECT 
        position_id,
        (SELECT at.award_type_name FROM "award_type" at WHERE at.award_type_id = ca.award_type_id) AS award_type,
        award_details
        FROM "contest_award" ca
        WHERE contest_id = ${contestId}
        ORDER BY position_id, award_type;
    `);

     return prizes.rows as unknown as ContestPrizes[];
}

export async function getContestParticipants(contestId: string) {

     const participants = await db.execute(sql`
        SELECT 
        user_id,
        (SELECT username FROM "user_tbl" us WHERE us.user_id = pt.user_id) AS username, 
        participation_date 
        FROM "participant_tbl" pt 
        WHERE pt.contest_id = ${contestId}
        ORDER BY pt.participation_date DESC;
    `);

     return participants.rows as unknown as ContestParticipant[];
}