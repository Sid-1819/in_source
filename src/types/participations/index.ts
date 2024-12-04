
export interface UserParticipations {
    contest_id: string,
    participant_id: string,
    title: string,
    banner_url: string,
    participation_status: string,
    participation_date: string,
    start_date: string,
    end_date: string,
}

export interface AddUserParticipation {
    contest_id: string;
    user_id: string;
    participation_date: string
}