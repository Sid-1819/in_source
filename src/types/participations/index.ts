
export interface UserParticipations {
    contest_id: number,
    title: string,
    banner_url: string,
    participant_id: number,
    participation_status: string,
    participation_date: string,
    start_date: string,
    end_date: string,
}

export interface AddUserParticipation {
    contest_id: string;
    user_id: string;
    start_date: string;
    end_date: string;
    participation_date: string
}