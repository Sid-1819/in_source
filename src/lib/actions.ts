"use server"

import { currentUser } from "@clerk/nextjs/server";
import { and, eq, sql } from "drizzle-orm";
import { redirect } from "next/navigation";
import { ContestSumbmission, Submission } from "~/app/types";
import { db } from "~/server/db";
import { contests, contestSubmissions, participants } from "~/server/db/schema"
import { addParticipation, createDbUser, getContestById, getUserIdByEmail } from "~/server/queries";

interface UserSubmission {
    contest_id: number;
    submission_id: number,
    contest_title: string;
    contest_banner_url: string;
    contest_end_date: string;
    description: string,
    submission_team_members: string;
    created_at: string;
    updated_at: string;
}

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
        const username = user?.primaryEmailAddress?.emailAddress.split("@")[0]?.replace('.', '_') ?? "";
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

export async function addSubmission(data: ContestSumbmission, emailId: string) {
    const userId = await getUserIdByEmail(emailId) ?? 65;

    const submission = await db.insert(contestSubmissions).values({
        contestId: data.contestId,
        userId: userId,
        teamMembers: data.teamMembers,
        sourceCodeLink: data.sourceCodeLink,
        deploymentLink: data.deploymentLink,
        description: data.description,
    }).returning();

    console.log("addSubmission", submission);
    redirect("/submissions")
}

export async function getUserSubmission(emailId: string): Promise<UserSubmission[]> {

    const submissions = await db.execute(sql`
        SELECT 
        s.contest_id AS contest_id,
        (SELECT c.title FROM "in-source_contest" c WHERE c.contest_id = s.contest_id) AS contest_title,
        (SELECT c.banner_url FROM "in-source_contest" c WHERE c.contest_id = s.contest_id) AS contest_banner_url,
        (SELECT c.end_date FROM "in-source_contest" c WHERE c.contest_id = s.contest_id) AS contest_end_date,
        s.user_id AS user_id,
        s.team_members AS submission_team_members,
        s.description,
        s.submission_id,
        s.created_at AS created_at,
        s.updated_at AS updated_at
        FROM 
            "in-source_contest_submissions" s
        WHERE 
            s.user_id = (SELECT u.user_id FROM "in-source_user" u WHERE u.email = ${emailId});
    `);
    // console.log("getUserSubmission", submissions.rows);
    return submissions.rows as unknown as UserSubmission[];
}

export async function removeSubmission(formData: FormData) {
    const submissionId = parseInt(formData.get('submissionId') as string);

    console.log("submissionId", submissionId, formData);
    const removedSubmission = await db.delete(contestSubmissions).where(eq(contestSubmissions.submissionId, submissionId));

    console.log("removedSub: ", removedSubmission);

}

export async function getSubmissionById(submissionId: number) {
    const submission = await db.execute(sql`
    SELECT 
        s.contest_id AS contest_id,
        (SELECT c.title FROM "in-source_contest" c WHERE c.contest_id = s.contest_id) AS contest_title,
        (SELECT c.banner_url FROM "in-source_contest" c WHERE c.contest_id = s.contest_id) AS contest_banner_url,
        (SELECT c.end_date FROM "in-source_contest" c WHERE c.contest_id = s.contest_id) AS contest_end_date,
        s.user_id AS user_id,
        s.team_members AS submission_team_members,
        s.description,
        s.submission_id,
        s.source_code_link,
        s.deployment_link,
        s.created_at AS created_at,
        s.updated_at AS updated_at
        FROM 
            "in-source_contest_submissions" s
        WHERE 
            s.submission_id = ${submissionId};
    `);

    console.log("submissions: ", submission.rows);
    return submission.rows[0] as unknown as Submission;
}