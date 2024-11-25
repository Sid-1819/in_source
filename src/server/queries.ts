import "server-only";
import { db } from "./db";
import { eq, sql } from "drizzle-orm";
import { contests, users } from "./db/schema";

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
    start_date: string;
    end_date: string;
};

interface Winner {
    username: string;
    points: number;
    swag_prize: number;
}

interface Season {
    season_name: string;
}

interface LeaderboardUser {
    username: string;
    exp_points: number,
    no_of_wins: number,
    total_submissions: number
}

interface Prizes {
    position_id: number;
    award_type: string;
    award_details: number;
}

interface Participant {
    user_id: number;
    username: string;
    participation_date: string;
}

export async function getContestById(contestId: number) {
    const contestsById = await db.select().from(contests).where(eq(contests.contestId, contestId));
    return contestsById;
}

export async function getContestList(status: string) {

    const contestsList = await db.select().from(contests).where(eq(contests.status, status));
    return contestsList;
}


export async function getContestOnHome(status: string): Promise<Contest[]> {
    const contestList = await db.execute(sql`
        SELECT contest_id, title, sub_title, start_date, end_date, difficulty_level, banner_url, tags, 

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

        FROM "public"."in-source_contest" c WHERE status=${status}
        ORDER BY c.contest_id ASC;
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

export async function getLeaderBoardList(season_id: number) {

    const leaderboardData = await db.execute(sql`
        SELECT 
        u.username,
        lb.exp_points,
        lb.no_of_wins,
        lb.submission_count AS total_submissions
        FROM 
        "in-source_user" u
        INNER JOIN "in-source_leaderboard" lb ON u.user_id = lb.user_id
        INNER JOIN "in-source_season" s ON lb.season_id = s.season_id
        WHERE 
        lb.season_id = ${season_id}
        ORDER BY 
        lb.exp_points DESC;
    `);

    return leaderboardData.rows as unknown as LeaderboardUser[];
}

export async function getSeasonNameById(season_id: number) {

    const seasonName = await db.execute(sql`
        SELECT s.season_name FROM "in-source_season" s WHERE s.season_id = ${season_id};
    `);

    return seasonName.rows as unknown as Season[];
}

export async function getContestPizes(contestId: number): Promise<Prizes[]> {

    const prizes = await db.execute(sql`
        SELECT 
        position_id,
        (SELECT at.award_type_name FROM "in-source_award_type" at WHERE at.award_type_id = ca.award_type_id) AS award_type,
        award_details
        FROM "in-source_contest_award" ca
        WHERE contest_id = ${contestId}
        ORDER BY position_id, award_type;
    `);

    return prizes.rows as unknown as Prizes[];
}

export async function getContestParticipants(contestId: number) {

    const participants = await db.execute(sql`
        SELECT 
        user_id,
        (SELECT username FROM "in-source_user" us WHERE us.user_id = pt.user_id) AS username, 
        participation_date 
        FROM "in-source_participant" pt 
        WHERE pt.contest_id = 1 
        ORDER BY pt.participation_date DESC;
    `);

    return participants.rows as unknown as Participant[];
}

// export const createContest = async (contest: any) => {
//     const createdContest = await db.insert(contests).values(contest);
//     console.log(createdContest);

//     return createdContest[0].contest_id;
// }

export async function getUserByEmail(email: string) {
    try {
        const user = await db.select().from(users).where(eq(users.email, email));
        return user;
    } catch (error) {
        console.error('Error fetching user by email:', error);
        throw error;
    }
};

interface NewUser {
    username: string;
    email: string;
}

export async function createDbUser(userData: NewUser) {
    try {
        // First check if user already exists
        const existingUser = await db.query.users.findFirst({
            where: eq(users.email, userData.email)
        });

        if (existingUser) {
            return existingUser;
        }

        // Insert new user
        const [newUser] = await db.insert(users)
            .values({
                username: userData.username,
                email: userData.email,
                // createdAt will be set automatically by the default value
            })
            .returning();

        return newUser;
    } catch (error) {
        console.error('Error creating user:', error);
        // Check for unique constraint violations
        if (error instanceof Error && error.message.includes('unique constraint')) {
            if (error.message.includes('username_unique')) {
                throw new Error('Username already taken');
            }
            if (error.message.includes('email_unique')) {
                throw new Error('Email already registered');
            }
        }
        throw new Error('Failed to create user');
    }
}