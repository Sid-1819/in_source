import "server-only";
import { db } from "./db";
import { eq, sql } from "drizzle-orm";
import { contests } from "./db/schema";

export type Contest = {
    contest_id: number;
    title: string;
    sub_title: string;
    tags: string;
    participants: number | null;
    cash_awards: number | null;
    swag_awards: number | null;
    points_awards: number | null;
    banner_url: string | null;
    difficulty_level: string | null;
    end_date: string;
};

export async function getContestById(contestId: number) {

    // const user = auth();
    // if (!user.userId) throw new Error("Unauthorized");

    const contestsById = await db.select().from(contests).where(eq(contests.contestId, contestId));
    return contestsById;

}

export async function getContestList(status: string) {

    const contestsList = await db.select().from(contests).where(eq(contests.status, status));
    return contestsList;
}


export async function getContestOnHome(status: string): Promise<Contest[]> {
    const contestList = await db.execute(sql`
        SELECT contest_id, title, sub_title, end_date, difficulty_level, banner_url, tags, 

        (SELECT count(1) FROM "public"."in-source_participant" p WHERE p.contest_id=c.contest_id) participants, 

        (SELECT sum(award_details) FROM "public"."in-source_contest_award" a,"public"."in-source_award_type" t  
        WHERE a.award_type_id=t.award_type_id AND a.contest_id=c.contest_id 
        AND t.award_type_name ='Cash Prize') cash_awards,

        (SELECT sum(award_details) FROM "public"."in-source_contest_award" a,"public"."in-source_award_type" t  
        WHERE a.award_type_id=t.award_type_id AND a.contest_id=c.contest_id 
        AND t.award_type_name ='Swag Bag') swag_awards,

        (SELECT sum(award_details) FROM "public"."in-source_contest_award" a,"public"."in-source_award_type" t  
        WHERE a.award_type_id=t.award_type_id AND a.contest_id=c.contest_id 
        AND t.award_type_name ='Points') points_awards 

        FROM "public"."in-source_contest" c WHERE status='a';
    `);

    return contestList.rows as Contest[];
}