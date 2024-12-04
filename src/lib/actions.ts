"use server"

import { currentUser } from "@clerk/nextjs/server";
import { and, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ContestSumbmission, submissionStatus } from "~/types/submission";
import { db } from "~/server/db";
import { contests, contestSubmission, participants } from "~/server/db/schema"
import { addParticipation, createDbUser, getUserIdByEmail } from "~/server/queries";

// interface UserSubmission {
//     contest_id: number;
//     submission_id: number,
//     contest_title: string;
//     contest_banner_url: string;
//     contest_end_date: string;
//     description: string,
//     submission_team_members: string;
//     created_at: string;
//     updated_at: string;
// }

// export type Contest = typeof contests.$inferInsert;
// export const createContest = async (contest: Contest) => {
//     const res = await db.insert(contests).values(contest);
//     // console.log("res", res);

// }

// export const getUser = async (email: string) => {
//     const user = getUserIdByEmail(email);
//     // console.log("actios: ", user);
//     return user;
// }

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
        // console.log("res", res);
        redirect("/user/participations")
        return;
    } catch (error) {
        console.log("Something went wrong: ", error)
        throw error;
    }
}

export async function removeParticipation(formData: FormData) {
    const participantId = formData.get('participantId') as string;

    // console.log("participantId", participantId);

    await db.update(participants).set({ participationStatus: 'N' }).where(eq(participants.participantId, participantId));
    // console.log("result of unjion hackathon", result);
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

    // console.log("isAlreadyJoined", isAlreadyJoined);
    return isAlreadyJoined.length > 0;

}

// export async function addSubmission(data: ContestSumbmission, emailId: string) {

//     await db.insert(contestSubmission).values({
//         contestId: data.contestId,
//         userId: data.userId,
//         submissionStatus: submissionStatus.S,
//         teamMembers: data.teamMembers,
//         sourceCodeLink: data.sourceCodeLink,
//         deploymentLink: data.deploymentLink,
//         description: data.description,
//     }).returning();

//     // console.log("addSubmission", submission);
//     redirect("/user/submissions")
// }

// export async function editSubmission(data: ContestSumbmission, submissionId: string, emailId: string) {
//     const userId = await getUserIdByEmail(emailId) ?? "65";
//     // console.log("userId: ", userId, "data: ", data);


//     await db.update(contestSubmission)
//         .set({
//             contestId: data.contestId,
//             userId: userId,
//             teamMembers: data.teamMembers,
//             sourceCodeLink: data.sourceCodeLink,
//             deploymentLink: data.deploymentLink,
//             description: data.description,
//             updatedAt: (sql`CURRENT_TIMESTAMP`)
//         })
//         .where(eq(contestSubmission.submissionId, submissionId))
//         .returning();

//     // console.log("editSubmission", submission);
//     redirect("/user/submissions")
// }

// export async function getUserSubmission(emailId: string): Promise<UserSubmission[]> {

//     const submissions = await db.execute(sql`
//         SELECT 
//         s.contest_id AS contest_id,
//         (SELECT c.title FROM "in-source_contest" c WHERE c.contest_id = s.contest_id) AS contest_title,
//         (SELECT c.banner_url FROM "in-source_contest" c WHERE c.contest_id = s.contest_id) AS contest_banner_url,
//         (SELECT c.end_date FROM "in-source_contest" c WHERE c.contest_id = s.contest_id) AS contest_end_date,
//         s.user_id AS user_id,
//         s.team_members AS submission_team_members,
//         s.description,
//         s.submission_id,
//         s.created_at AS created_at,
//         s.updated_at AS updated_at
//         FROM 
//             "in-source_contest_submissions" s
//         WHERE 
//             s.user_id = (SELECT u.user_id FROM "in-source_user" u WHERE u.email = ${emailId});
//     `);
//     // console.log("getUserSubmission", submissions.rows);
//     return submissions.rows as unknown as UserSubmission[];
// }

// export async function removeSubmission(formData: FormData) {
//     const submissionId = parseInt(formData.get('submissionId') as string);
//     // console.log("submissionId", submissionId, formData);
//     await db.delete(contestSubmissions).where(eq(contestSubmissions.submissionId, submissionId));
//     revalidatePath("/submissions")
//     // console.log("removedSub: ", removedSubmission);
// }

// export async function getSubmissionById(submissionId: number) {
//     const submission = await db.execute(sql`
//     SELECT 
//         s.contest_id AS contest_id,
//         (SELECT c.title FROM "in-source_contest" c WHERE c.contest_id = s.contest_id) AS contest_title,
//         (SELECT c.banner_url FROM "in-source_contest" c WHERE c.contest_id = s.contest_id) AS contest_banner_url,
//         (SELECT c.end_date FROM "in-source_contest" c WHERE c.contest_id = s.contest_id) AS contest_end_date,
//         s.user_id AS user_id,
//         s.team_members AS submission_team_members,
//         s.description,
//         s.submission_id,
//         s.source_code_link,
//         s.deployment_link,
//         s.created_at AS created_at,
//         s.updated_at AS updated_at
//         FROM 
//             "in-source_contest_submissions" s
//         WHERE 
//             s.submission_id = ${submissionId};
//     `);

//     // console.log("submissions: ", submission.rows);
//     return submission.rows[0] as unknown as Submission;
// }

// export async function getAllSubmissions(): Promise<AllSubmissions[]> {
//     const subs = await db.select()
//         .from(contestSubmissions)
//         .where(eq(contestSubmissions.submissionStatus, submissionStatus.S))
//         .orderBy(asc(contestSubmissions.contestId));

//     // console.log("subs: ", subs);
//     return subs as unknown as AllSubmissions[];
// }