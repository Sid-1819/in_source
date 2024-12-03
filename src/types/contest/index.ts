export type Contest = {
    contest_id: number;
    title: string;
    sub_title: string;
    tags: string;
    participants: number | null;
    cash_awards: number | null;
    swag_awards: number | null;
    points_awards: number | null;
    banner_url: string | null;
    difficulty_level: string | null;
    start_date: string;
    end_date: string;
};

export interface ContestPrizes {
    position_id: number;
    award_type: string;
    award_details: number;
}

export interface ContestParticipant {
    user_id: number;
    username: string;
    participation_date: string;
}