// "use server"

// import { db } from "~/server/db";
// import { contests } from "~/server/db/schema"

// export type Contest = typeof contests.$inferInsert;
// export const createContest = async (contest: Contest) => {
//     const res = await db.insert(contests).values(contest);
//     console.log("res", res);

// }