import React from 'react';
import { Card } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Badge } from '~/components/ui/badge';
import { Calendar, X } from 'lucide-react';
import Link from 'next/link';

interface ParticipatedContestCardProps {
    contest: {
        id: string;
        title: string;
        banner_url?: string;
        start_date: string;
        end_date: string;
        date_of_participation: string;
        status?: 'Completed' | 'Ongoing' | 'Upcoming';
        result_status?: 'Won' | 'Participated' | 'Not Ranked';
        prize_position?: number;
    };
    onUnjoinContest?: (contestId: string) => void;
}

const ParticipatedContestCard = () => {
    // Determine contest status and result status

    const contest = {
        id: "123",
        title: "Observability & Alerting Documentation Challenge: Know when it happens and what happened!",
        banner_url: "https://pjrjxbdononaezaz.public.blob.vercel-storage.com/observability-roTq0Fva4HMcN1SvOtPBkj8LVpzGu3.png",
        start_date: "2022-01-01T00:00:00",
        end_date: "2022-01-31T23:59:59",
        date_of_participation: "2022-01-15T12:00:00",
        status: 'Completed',
        result_status: 'Won',
        prize_position: 1,
    }
    const onUnjoinContest = (contestId: string) => {
        console.log("Unjoin");
    }

    const determineContestStatus = () => {
        const startDate = new Date(contest.start_date);
        const endDate = new Date(contest.end_date);
        const now = new Date();

        if (now < startDate) return 'Upcoming';
        if (now > endDate) return 'Completed';
        return 'Ongoing';
    };

    const contestStatus = determineContestStatus();

    return (
        <Card className="flex items-center p-4 mb-4 overflow-hidden transition-shadow hover:shadow-lg">
            {/* Contest Image */}
            <div className="w-24 h-24 mr-4 flex-shrink-0 overflow-hidden rounded-lg">
                <img
                    src={contest.banner_url ?? "/placeholder-contest.png"}
                    alt={contest.title}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Contest Details */}
            <div className="flex-grow space-y-2">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-lg font-semibold text-primary">
                            {contest.title}
                        </h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Badge
                                variant="outline"
                                className={`
                  ${contestStatus === 'Completed' ? 'bg-green-50 text-green-600' :
                                        contestStatus === 'Ongoing' ? 'bg-blue-50 text-blue-600' :
                                            'bg-gray-50 text-gray-600'}
                `}
                            >
                                {contestStatus}
                            </Badge>
                            {contest.result_status && (
                                <Badge
                                    variant="outline"
                                    className={`
                    ${contest.result_status === 'Won' ? 'bg-yellow-50 text-yellow-600' :
                                            contest.result_status === 'Participated' ? 'bg-blue-50 text-blue-600' :
                                                'bg-gray-50 text-gray-600'}
                  `}
                                >
                                    {contest.result_status}
                                    {contest.prize_position && ` (#${contest.prize_position})`}
                                </Badge>
                            )}
                        </div>
                    </div>
                </div>

                {/* Date Information */}
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>Start: {contest.start_date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>End: {contest.end_date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>Joined: {contest.date_of_participation}</span>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col space-y-2 ml-4">
                <Link href={`/contest/${contest.id}`}>
                    <Button variant="outline" size="sm">
                        View Details
                    </Button>
                </Link>

                {contestStatus !== 'Completed' && (
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={(e) => {
                            e.preventDefault();
                            onUnjoinContest(contest.id);
                        }}
                        className="flex items-center"
                    >
                        <X className="w-4 h-4 mr-1" />
                        Unjoin
                    </Button>
                )}
            </div>
        </Card>
    );
};

export default ParticipatedContestCard;