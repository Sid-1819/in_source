import { db } from "~/server/db";
import { sql } from "drizzle-orm";
import { Contest } from "~/types/contest";

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