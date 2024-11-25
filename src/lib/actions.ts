"use server"

import { currentUser } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import { contests, users } from "~/server/db/schema"
import { createDbUser, getUserByEmail } from "~/server/queries";

export type Contest = typeof contests.$inferInsert;
export const createContest = async (contest: Contest) => {
    const res = await db.insert(contests).values(contest);
    console.log("res", res);

}

export const getUser = async (email: string) => {
    const user = getUserByEmail(email);
    console.log("actios: ", user);
    return user;
}

interface User {
    createdAt: Date;
    userId: number;
    username: string;
    email: string;
}

export async function getCurrentUser(): Promise<User | null> {
    try {
        const user = await currentUser();
        const username = user?.primaryEmailAddress?.emailAddress.split("@")[0] ?? "";
        const userEmail = user?.primaryEmailAddress?.emailAddress ?? "johndoe@gmail.com";

        if (!user) {
            // redirect("/")
            console.log("please sign in");

        }

        const isUserExists = await createDbUser({ email: userEmail, username });
        console.log("userId: ", isUserExists);

        return isUserExists ?? null
    } catch (error) {
        console.error('Error fetching current user:', error);
        return null;
    }
}