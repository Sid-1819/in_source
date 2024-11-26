import React from 'react';
import { Card, CardContent } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Badge } from '~/components/ui/badge';
import { Calendar, Trophy, X } from 'lucide-react';
import Link from 'next/link';
import { getUserParticipations } from '~/server/queries';
import { currentUser } from '@clerk/nextjs/server';
import { removeParticipation } from '~/lib/actions';
import UnjoinButton from './unjoin-button';

// Define proper types for our data structures
interface UserParticipations {
    contest_id: number,
    participant_id: number,
    title: string,
    banner_url: string,
    participation_status: string,
    participation_date: string,
    start_date: string,
    end_date: string,
}
// const determineContestStatus = () => {
//     const startDate = new Date(contest.start_date);
//     const endDate = new Date(contest.end_date);
//     const now = new Date();

//     if (now < startDate) return 'Upcoming';
//     if (now > endDate) return 'Completed';
//     return 'Ongoing';
// };

// const contestStatus = determineContestStatus();

const NoParticipationsCard: React.FC = () => (
    <Card className="w-full">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-gray-100 p-4 mb-4">
                <Trophy className="w-8 h-8 text-gray-400" />
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No Contest Participations Yet
            </h3>

            <p className="text-gray-500 mb-6 max-w-md">
                You haven`&apos`t participated in any contests yet. Join a contest to showcase your skills and win exciting prizes!
            </p>

            <Link href="/">
                <Button className="flex items-center gap-2">
                    Browse Contests
                </Button>
            </Link>
        </CardContent>
    </Card>
);

const ContestCard: React.FC<{ contest: UserParticipations }> = ({ contest }) => {
    // const getStatusBadgeStyle = (status: Contest['status']) => {
    //     const styles = {
    //         Completed: 'bg-green-50 text-green-600',
    //         Ongoing: 'bg-blue-50 text-blue-600',
    //         Upcoming: 'bg-gray-50 text-gray-600'
    //     };
    //     return styles[status];
    // };

    // const getParticipationBadgeStyle = (status: UserParticipations['participation_status']) => {
    //     const styles = {
    //         Won: 'bg-yellow-50 text-yellow-600',
    //         Participated: 'bg-blue-50 text-blue-600',
    //         'Not Ranked': 'bg-gray-50 text-gray-600'
    //     };
    //     return styles[status];
    // };

    return (
        <Card className="flex items-center p-4 mb-4 overflow-hidden transition-shadow hover:shadow-lg">
            <div className="w-24 h-24 mr-4 flex-shrink-0 overflow-hidden rounded-lg">
                <img
                    src={contest.banner_url ?? "/placeholder-contest.png"}
                    alt={contest.title}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="flex-grow space-y-2">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-lg font-semibold text-primary">
                            {contest.title}
                        </h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            {/* <Badge
                                variant="outline"
                                className={(contest.)}
                            >
                                {contest.status}
                            </Badge> */}
                            <Badge
                                variant="outline"
                                className={(contest.participation_status)}
                            >
                                {contest.participation_status}
                            </Badge>
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-600">
                    {[
                        { label: 'Start', date: contest.start_date },
                        { label: 'End', date: contest.end_date },
                        { label: 'Joined', date: contest.participation_date }
                    ].map(({ label, date }) => (
                        <div key={label} className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{label}: {date}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-col space-y-2 ml-4">
                <Link href={`/contest/${contest.contest_id}`}>
                    <Button variant="outline" size="sm">
                        View Details
                    </Button>
                </Link>

                {contest.participation_status !== 'Won' && (
                    <form action={removeParticipation}>
                        <input
                            type="hidden"
                            name="participantId"
                            value={contest.participant_id}
                        />

                        <UnjoinButton
                            participantId={contest.participant_id}
                        />
                    </form>

                )}
            </div>
        </Card>
    );
};

const ParticipatedContestCard = async () => {
    const user = await currentUser();
    const email = user?.primaryEmailAddress?.emailAddress ?? "john@example.com";
    const contestList = await getUserParticipations("john@example.com");

    if (!contestList.length) {
        return <NoParticipationsCard />;
    }

    return (
        <div className="space-y-4">
            {contestList.map((contest, idx) => (
                <ContestCard key={idx + 1} contest={contest} />
            ))}
        </div>
    );
};

export default ParticipatedContestCard;