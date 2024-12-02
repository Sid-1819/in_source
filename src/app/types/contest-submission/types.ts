export enum submissionStatus {
    "A" = "A",
    "S" = "S",
    "D" = "D"
}

export interface Submission {
    submission_id: number,
    contest_id: number,
    contest_title: string,
    contest_banner_url: string,
    contest_end_date: string
    user_id: number,
    submission_team_members?: string,
    description?: string,
    source_code_link: string,
    deployment_link?: string,
    created_at: string,
    updated_at: string,
}

export interface AllSubmissions {
    contestId: number;
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