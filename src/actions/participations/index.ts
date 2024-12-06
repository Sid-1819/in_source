"use server";

import { sql } from "drizzle-orm/sql";
import { db } from "~/server/db";
import { participants } from "~/server/db/schema";
import type { AddUserParticipation, UserParticipations } from "~/types/participations";

export async function getUserParticipations(email: string) {

    const participants = await db.execute(sql`
        WITH user_data AS (
        SELECT user_id
        FROM "user_tbl"
        WHERE email = ${email}
    ),
    participation_data AS (
        SELECT
            participant_id,
            participation_status,
            participation_date,
            contest_id,
            user_id
        FROM "participant_tbl" p
        WHERE user_id = (SELECT user_id FROM user_data) AND p.participation_status = 'A'
    ),
    contest_data AS (
        SELECT
            contest_id,
            title,
            banner_url,
            start_date,
            end_date
        FROM "contest_tbl"
        WHERE contest_id IN (SELECT contest_id FROM participation_data)
    )
    SELECT
        c.contest_id,
        c.title,
        c.banner_url,
        p.participant_id,
        p.participation_status,
        p.participation_date,
        c.start_date,
        c.end_date
    FROM contest_data c
    JOIN participation_data p ON c.contest_id = p.contest_id;
    `);

    // console.log("participation", participants.rows);
    return participants.rows as unknown as UserParticipations[];
}

export async function addParticipation(user: AddUserParticipation) {
    const newParticipant = await db.insert(participants).values({
        contestId: user.contest_id,
        userId: user.user_id,
        participationDate: user.participation_date,
    }).returning();

    // console.log("newParticipant", newParticipant);

    return newParticipant;

}