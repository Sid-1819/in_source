import { getContestById } from "~/server/queries"

export const GET = async (request: Request, { params }: { params: { contestId: number } }) => {
    try {
        const contests = await getContestById(params.contestId);

        console.log("contests ", contests)
        return contests;
    } catch (error) {
        return new Response("Failed to fetch prompts created by user", { status: 500 })
    }
} 