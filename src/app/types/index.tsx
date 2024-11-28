// interface Contest {
//     title: string;
//     subtitle: string;
//     description: string;
//     banner: string;
//     badges
// }

export interface ContestSumbmission {
    contestId: number,
    userId: number,
    sourceCodeLink: string,
    teamMembers?: string,
    description?: string,
    deploymentLink?: string,
}