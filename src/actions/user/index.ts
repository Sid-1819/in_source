import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";

export async function getUserIdByEmail(email: string) {
    try {
        const user = await db.select().from(users).where(eq(users.email, email));
        if (user.length == 0) return "";
        return user[0]?.userId ?? "";
    } catch (error) {
        console.error('Error fetching user by email:', error);
        throw error;
    }
};

interface NewUser {
    username: string;
    email: string;
}

export async function createDbUser(userData: NewUser) {
    try {
        // First check if user already exists
        const existingUser = await db.query.users.findFirst({
            where: eq(users.email, userData.email)
        });

        if (existingUser) {
            return existingUser;
        }

        // Insert new user
        const [newUser] = await db.insert(users)
            .values({
                username: userData.username,
                email: userData.email,
                // createdAt will be set automatically by the default value
            })
            .returning();

        return newUser;
    } catch (error) {
        console.error('Error creating user:', error);
        // Check for unique constraint violations
        if (error instanceof Error && error.message.includes('unique constraint')) {
            if (error.message.includes('username_unique')) {
                throw new Error('Username already taken');
            }
            if (error.message.includes('email_unique')) {
                throw new Error('Email already registered');
            }
        }
        throw new Error('Failed to create user');
    }
}