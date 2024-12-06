
export enum submissionStatus {
    "A" = "A",
    "S" = "S",
    "D" = "D"
}

interface Submission {
    submission_id: string,
    contest_id: string,
    user_id: string,
    contest_title: string,
    contest_banner_url: string,
    contest_end_date: string
    submission_team_members?: string,
    description?: string,
    source_code_link: string,
    deployment_link?: string,
    created_at: string,
    updated_at: string,
}

interface AllSubmissions {
    contestId: string;
    description?: string;
    createdAt: Date,
    updatedAt: Date;
    userId: number;
    submissionId: number;
    teamMembers?: string;
    submissionStatus: submissionStatus;
    sourceCodeLink: string;
    deploymentLink?: string;
}

interface ContestSumbmission {
    contestId: string,
    userId: string,
    sourceCodeLink: string,
    teamMembers?: string,
    description?: string,
    deploymentLink?: string,
}

interface UserSubmission {
    contest_id: string;
    contest_title: string;
    contest_banner_url: string;
    contest_end_date: string;
    description: string,
    submission_id: number;
    submission_team_members: string;
    created_at: string;
    updated_at: string;
}

interface Submissions {
    submission_id: string,
    description: string,
    team_members: string,
    source_code_link: string,
    deployment_link: string,
    created_at: Date,
}

export type {
    Submission,
    AllSubmissions,
    ContestSumbmission,
    UserSubmission,
    Submissions,
}