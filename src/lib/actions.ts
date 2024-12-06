"use server"

import { currentUser } from "@clerk/nextjs/server";
import { and, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ContestSumbmission, submissionStatus } from "~/types/submission";
import { db } from "~/server/db";
import { contests, contestSubmission, participants } from "~/server/db/schema"
import { addParticipation } from "~/server/queries";
import { createDbUser } from "~/actions/user";

interface User {
    createdAt: Date;
    userId: string;
    username: string;
    email: string;
}

export async function createUserIfNotexists(): Promise<User | null> {
    try {
        const user = await currentUser();
        const userEmail = user?.primaryEmailAddress?.emailAddress ?? "john.doe@gmail.com";
        const username = userEmail.split("@")[0]?.replace('.', '_') ?? "";

        if (!user) {
            redirect("/")
        }

        const isUserExists = await createDbUser({ email: userEmail, username });

        return isUserExists ?? null
    } catch (error) {
        console.error('Error fetching current user:', error);
        return null;
    }
}

export async function handleAddParticipation(formData: FormData) {
    const contestId = formData.get('contestId') as string;
    const userId = formData.get('userId') as string;
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate); // Outputs: 2024-12-03

    const newParticipation = {
        contest_id: (contestId),
        user_id: (userId),
        participation_date: formattedDate
    };

    try {
        await addParticipation(newParticipation);
        redirect("/user/participations")
        return;
    } catch (error) {
        console.log("Something went wrong: ", error)
        throw error;
    }
}

export async function removeParticipation(formData: FormData) {
    const participantId = formData.get('participantId') as string;

    await db.update(participants).set({ participationStatus: 'N' }).where(eq(participants.participantId, participantId));
    revalidatePath("/user/participations")
}

export async function isUserJoined(userId: string, contestId: string) {
    const isAlreadyJoined = await db.select().from(participants).where(
        and(
            eq(participants.userId, userId),
            eq(participants.contestId, contestId),
            eq(participants.participationStatus, 'A')
        )
    );

    return isAlreadyJoined.length > 0;
}
