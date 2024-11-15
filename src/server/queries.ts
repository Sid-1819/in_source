import "server-only";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { contests } from "./db/schema";

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
