"use server";

import { eq, asc, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "~/server/db";
import { contestSubmission } from "~/server/db/schema";
import { AllSubmissions, ContestSumbmission, Submission, submissionStatus, UserSubmission } from "~/types/submission";

export async function getAllSubmissions(): Promise<AllSubmissions[]> {
    const subs = await db.select()
        .from(contestSubmission)
        .where(eq(contestSubmission.submissionStatus, submissionStatus.S))
        .orderBy(asc(contestSubmission.contestId));

    return subs as unknown as AllSubmissions[];
}

export async function getSubmissionById(submissionId: string) {
    const submission = await db.execute(sql`
    SELECT 
        s.contest_id AS contest_id,
        (SELECT c.title FROM "contest_tbl" c WHERE c.contest_id = s.contest_id) AS contest_title,
        (SELECT c.banner_url FROM "contest_tbl" c WHERE c.contest_id = s.contest_id) AS contest_banner_url,
        (SELECT c.end_date FROM "contest_tbl" c WHERE c.contest_id = s.contest_id) AS contest_end_date,
        s.user_id AS user_id,
        s.team_members AS submission_team_members,
        s.description,
        s.submission_id,
        s.source_code_link,
        s.deployment_link,
        s.created_at AS created_at,
        s.updated_at AS updated_at
        FROM 
            "contest_submission_tbl" s
        WHERE 
            s.submission_id = ${submissionId};
    `);

    return submission.rows[0] as unknown as Submission;
}

export async function getUserSubmission(emailId: string): Promise<UserSubmission[]> {

    const submissions = await db.execute(sql`
        SELECT 
        s.contest_id AS contest_id,
        (SELECT c.title FROM "contest_tbl" c WHERE c.contest_id = s.contest_id) AS contest_title,
        (SELECT c.banner_url FROM "contest_tbl" c WHERE c.contest_id = s.contest_id) AS contest_banner_url,
        (SELECT c.end_date FROM "contest_tbl" c WHERE c.contest_id = s.contest_id) AS contest_end_date,
        s.user_id AS user_id,
        s.team_members AS submission_team_members,
        s.description,
        s.submission_id,
        s.created_at AS created_at,
        s.updated_at AS updated_at
        FROM 
            "contest_submission_tbl" s
        WHERE 
            s.user_id = (SELECT u.user_id FROM "user_tbl" u WHERE u.email = ${emailId});
    `);
    return submissions.rows as unknown as UserSubmission[];
}

export async function addSubmission(data: ContestSumbmission) {

    await db.insert(contestSubmission).values({
        contestId: data.contestId,
        userId: data.userId,
        submissionStatus: submissionStatus.S,
        teamMembers: data.teamMembers,
        sourceCodeLink: data.sourceCodeLink,
        deploymentLink: data.deploymentLink,
        description: data.description,
    }).returning();

    redirect("/user/submissions")
}

export async function editSubmission(data: ContestSumbmission, submissionId: string) {

    await db.update(contestSubmission)
        .set({
            contestId: data.contestId,
            userId: data.userId,
            teamMembers: data.teamMembers,
            sourceCodeLink: data.sourceCodeLink,
            deploymentLink: data.deploymentLink,
            description: data.description,
            updatedAt: (sql`CURRENT_TIMESTAMP`)
        })
        .where(eq(contestSubmission.submissionId, submissionId))
        .returning();

    redirect("/user/submissions")
}

export async function removeSubmission(formData: FormData) {
    const submissionId = (formData.get('submissionId') as string);
    await db.delete(contestSubmission).where(eq(contestSubmission.submissionId, submissionId));
    revalidatePath("/submissions")
}

