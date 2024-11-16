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

interface Winner {
    username: string;
    points: number;
    swag_prize: number;
}

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

        FROM "public"."in-source_contest" c WHERE status=${status};
    `);

    return contestList.rows as Contest[];
}


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