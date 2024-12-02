export enum submissionStatus {
    "A",
    "S",
    "D"
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