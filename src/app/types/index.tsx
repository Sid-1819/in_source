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

export interface UserSubmission {
    contest_id: number;
    contest_title: string;
    contest_banner_url: string;
    contest_end_date: string;
    description: string,
    submission_id: number;
    submission_team_members: string;
    created_at: string;
    updated_at: string;
}

export interface Submission {
    contest_id: number,
    contest_title: string,
    contest_banner_url: string,
    contest_end_date: string
    user_id: number,
    submission_team_members?: string,
    description?: string,
    submission_id: number,
    source_code_link: string,
    deployment_link?: string,
    created_at: string,
    updated_at: string,
}