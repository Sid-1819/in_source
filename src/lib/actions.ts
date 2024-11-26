"use server"

import { currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { db } from "~/server/db";
import { contests, participants } from "~/server/db/schema"
import { addParticipation, createDbUser, getContestById, getUserIdByEmail } from "~/server/queries";

export type Contest = typeof contests.$inferInsert;
export const createContest = async (contest: Contest) => {
    const res = await db.insert(contests).values(contest);
    // console.log("res", res);

}

export const getUser = async (email: string) => {
    const user = getUserIdByEmail(email);
    // console.log("actios: ", user);
    return user;
}

interface User {
    createdAt: Date;
    userId: number;
    username: string;
    email: string;
}

export async function createUserIfNotexists(): Promise<User | null> {
    try {
        const user = await currentUser();
        const username = user?.primaryEmailAddress?.emailAddress.split("@")[0] ?? "";
        const userEmail = user?.primaryEmailAddress?.emailAddress ?? "johndoe@gmail.com";

        if (!user) {
            redirect("/")
        }

        const isUserExists = await createDbUser({ email: userEmail, username });
        // console.log("userId: ", isUserExists);

        return isUserExists ?? null
    } catch (error) {
        console.error('Error fetching current user:', error);
        return null;
    }
}

export async function handleAddParticipation(formData: FormData) {
    const contestId = formData.get('contestId') as string;
    const userId = formData.get('userId') as string;
    const contestById = await getContestById(parseInt(contestId));

    const newParticipation = {
        contest_id: parseInt(contestId),
        user_id: parseInt(userId),
        start_date: contestById[0]?.startDate ?? '2024-11-08',
        end_date: contestById[0]?.endDate ?? '2025-06-31',
        participation_date: new Date().toISOString().split('T')[0] ?? '2024-11-26'
    };

    try {
        const res = await addParticipation(newParticipation);
        // console.log("res", res);
        redirect("/participations")
        return;
    } catch (error) {
        throw error;
    }
}

export async function removeParticipation(formData: FormData) {
    const id = formData.get('participantId') as string;
    const participantId = parseInt(id)

    // console.log("participantId", participantId);

    const result = await db.delete(participants).where(eq(participants.participantId, participantId))
    console.log("result of unjion hackathon", result);
    redirect("/participations")
}

export async function isUserJoined(userId: number, contestId: number) {
    const isAlreadyJoined = await db.select().from(participants).where(
        and(
            eq(participants.userId, userId),
            eq(participants.contestId, contestId)
        )
    );

    // console.log("isAlreadyJoined", isAlreadyJoined);
    return isAlreadyJoined.length > 0;

}