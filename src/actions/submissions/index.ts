import { eq, asc, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "~/server/db";
import { contestSubmissions } from "~/server/db/schema";
import { getUserIdByEmail } from "~/server/queries";
import { AllSubmissions, ContestSumbmission, Submission, submissionStatus, UserSubmission } from "~/types/submission";

export async function getAllSubmissions(): Promise<AllSubmissions[]> {
    const subs = await db.select()
        .from(contestSubmissions)
        .where(eq(contestSubmissions.submissionStatus, submissionStatus.S))
        .orderBy(asc(contestSubmissions.contestId));

    // console.log("subs: ", subs);
    return subs as unknown as AllSubmissions[];
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

    // console.log("submissions: ", submission.rows);
    return submission.rows[0] as unknown as Submission;
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

export async function editSubmission(data: ContestSumbmission, submissionId: string, emailId: string) {
    const userId = await getUserIdByEmail(emailId);

    await db.update(contestSubmissions)
        .set({
            contestId: data.contestId,
            userId: userId,
            teamMembers: data.teamMembers,
            sourceCodeLink: data.sourceCodeLink,
            deploymentLink: data.deploymentLink,
            description: data.description,
            updatedAt: (sql`CURRENT_TIMESTAMP`)
        })
        .where(eq(contestSubmissions.submissionId, submissionId))
        .returning();

    // console.log("editSubmission", submission);
    redirect("/user/submissions")
}

export async function removeSubmission(formData: FormData) {
    const submissionId = (formData.get('submissionId') as string);
    // console.log("submissionId", submissionId, formData);
    await db.delete(contestSubmissions).where(eq(contestSubmissions.submissionId, submissionId));
    revalidatePath("/submissions")
    // console.log("removedSub: ", removedSubmission);
}

