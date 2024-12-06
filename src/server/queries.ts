import "server-only";
import { db } from "./db";
import { participants } from "./db/schema";

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

interface AddParticipation {
    contest_id: string;
    user_id: string;
    participation_date: string
}


export async function addParticipation(user: AddParticipation) {
    const newParticipant = await db.insert(participants).values({
        contestId: user.contest_id,
        userId: user.user_id,
        participationDate: user.participation_date,
        participationStatus: 'A',
    }).returning();

    return newParticipant;

}