import { z } from 'zod';

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
    expPoints: z.number().nullable(),
    cashPrize: z.number().nullable(),
    swagCount: z.number().nullable(),
});