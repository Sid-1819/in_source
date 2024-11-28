import React from 'react';
import { Card, CardContent } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Badge } from '~/components/ui/badge';
import { Trophy, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { currentUser } from '@clerk/nextjs/server';
import { getUserSubmission, removeSubmission } from '~/lib/actions';

export const dynamic = "force-dynamic"

// Define proper types for submission data
interface UserSubmission {
    contest_id: number;
    contest_title: string;
    contest_banner_url: string;
    contest_end_date: string;
    submission_team_members: string;
    created_at: string;
    updated_at: string;
}

const NoSubmissionsCard: React.FC = () => (
    <Card className="w-full">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-gray-100 p-4 mb-4">
                <Trophy className="w-8 h-8 text-gray-400" />
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No Contest Submissions Yet
            </h3>

            <p className="text-gray-500 mb-6 max-w-md">
                You haven&apos;t made any contest submissions. Start participating and showcase your skills!
            </p>

            <Link href="/contests">
                <Button className="flex items-center gap-2">
                    Browse Contests
                </Button>
            </Link>
        </CardContent>
    </Card>
);

const SubmissionCard: React.FC<{ submission: UserSubmission }> = ({ submission }) => {
    const getStatusBadgeStyle = (status: string) => {
        const styles = {
            'Pending Review': 'bg-yellow-50 text-yellow-600',
            'Accepted': 'bg-green-50 text-green-600',
            'Rejected': 'bg-red-50 text-red-600'
        };
        return styles[status as keyof typeof styles] || 'bg-gray-50 text-gray-600';
    };

    const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US');

    console.log("submissions : ", submission);

    const teamMembers: Array<string> = JSON.parse(submission.submission_team_members) as Array<string>;

    return (
        <Card className="flex items-center p-4 mb-4 overflow-hidden transition-shadow hover:shadow-lg">
            <div className="w-24 h-24 mr-4 flex-shrink-0 overflow-hidden rounded-lg">
                <img
                    src={submission.contest_banner_url ?? "/placeholder-contest.png"}
                    alt={submission.contest_title}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="flex-grow space-y-2">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-lg font-semibold text-primary">
                            {submission.contest_title}
                        </h3>
                        {/* <Badge
                            variant="outline"
                            className={getStatusBadgeStyle(submission.submission_status)}
                        >
                            {submission.submission_status}
                        </Badge> */}
                    </div>
                </div>

                {/* <p className="text-sm text-gray-600 line-clamp-2">
                    {submission.description}
                </p> */}

                <div className="text-sm text-gray-600">
                    <strong>Team Members:</strong>
                    <div className="flex space-x-2 mt-1">
                        {teamMembers.map((member, index) => (
                            <Badge key={index + 1} variant="secondary">
                                {member}
                            </Badge>
                        ))}
                    </div>
                </div>

                <div className="text-sm text-gray-500 flex space-x-4">
                    {(submission.updated_at !== submission.created_at) ? (
                        <p>Last Updated: {submission.updated_at}</p>
                    ) : (
                        <p>Created: {formatDate(submission.created_at)}</p>
                    )}
                </div>
            </div>

            <div className="flex flex-col space-y-2 ml-4">
                <Link href={`/submissions}`}>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Edit className="w-4 h-4" /> Edit
                    </Button>
                </Link>

                <form action={removeSubmission}>
                    <input
                        type="hidden"
                        name="submissionId"
                        value={submission.contest_id}
                    />
                    <Button
                        variant="destructive"
                        size="sm"
                        className="flex items-center gap-2"
                    >
                        <Trash2 className="w-4 h-4" /> Delete
                    </Button>
                </form>
            </div>
        </Card>
    );
};

const UserSubmissionsCard = async () => {
    const user = await currentUser();
    const email = user?.primaryEmailAddress?.emailAddress ?? "john@example.com";
    const submissionsList = await getUserSubmission(email);

    if (!submissionsList.length) {
        return <NoSubmissionsCard />;
    }

    return (
        <div className="space-y-4">
            {submissionsList.map((submission, idx) => (
                <SubmissionCard
                    key={idx + 1}
                    submission={submission}
                />
            ))}
        </div>
    );
};

export default UserSubmissionsCard;