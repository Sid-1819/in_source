import { z } from 'zod';

const rewardSchema = z.object({
    expPoints: z.number().nullable(),
    cashPrize: z.number().nullable(),
    swagCount: z.number().nullable()
});

export const formSchema = z.object({
    title: z.string().min(5, {
        message: "Title must be at least 5 characters.",
    }),
    subtitle: z.string().min(10, {
        message: "Subtitle must be at least 10 characters.",
    }),
    description: z.string(),
    banner: z.string().optional(),
    badges: z.string(), // For the comma-separated badges input
    rewards: z.array(rewardSchema).min(1, "At least one reward is required")
});

export const submissionSchema = z.object({
    sourceCodeLink: z.string().url({ message: "Please enter a valid URL" }),
    teamMembers: z.array(z.string().min(3, { message: "Team member name cannot be empty" })).optional(),
    description: z.string().optional(),
    deploymentLink: z.string().url({ message: "Please enter a valid URL" }).optional(),
});