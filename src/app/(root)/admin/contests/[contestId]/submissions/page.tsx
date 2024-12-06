import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import {
    Trophy,
    Users,
    CalendarDays,
} from 'lucide-react';
import { getContestDetailsAndNoOfSubmissions, getContestSubmissionsList } from '~/actions/admin/contest-submissions';
import Link from 'next/link';
import { parseJsonArray } from '~/utils';

async function ContestSubmissions({ params }: { params: Promise<{ contestId: string }> }) {
    const { contestId } = await params;

    // const contestCardData = await getContestDetailsAndNoOfSubmissions(contestId);
    // const submissionList = await getContestSubmissionsList(contestId);

    const [submissionList, contestCardData] = await Promise.all([
        getContestSubmissionsList(contestId),
        getContestDetailsAndNoOfSubmissions(contestId),
    ])

    console.log("res", typeof submissionList)

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Contest Header */}
            <div className="mb-8 bg-white shadow-md rounded-lg p-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            {contestCardData?.title}
                        </h1>
                        <p className="text-gray-600 mb-4">{contestCardData?.sub_title}</p>
                    </div>
                    <Badge variant={contestCardData?.difficulty_level === 'Medium' ? 'default' : 'outline'}>
                        {contestCardData?.difficulty_level}
                    </Badge>
                </div>

                <div className="grid md:grid-cols-4 gap-4 mt-4">
                    <div className="flex items-center space-x-2">
                        <CalendarDays className="text-blue-500" />
                        {contestCardData?.start_date ? (
                            <span>
                                Start:{" "}
                                {new Intl.DateTimeFormat("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                }).format(new Date(contestCardData.start_date))}
                            </span>
                        ) : (
                            <span>Start: N/A</span>
                        )}
                    </div>

                    <div className="flex items-center space-x-2">
                        <CalendarDays className="text-red-500" />
                        {contestCardData?.end_date ? (
                            <span>
                                End:{" "}
                                {new Intl.DateTimeFormat("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                }).format(new Date(contestCardData.end_date))}
                            </span>
                        ) : (
                            <span>Start: N/A</span>
                        )}
                    </div>
                    <div className="flex items-center space-x-2">
                        <Trophy className="text-yellow-500" />
                        <span>Total Submissions: {contestCardData?.no_of_submissions}</span>
                    </div>
                </div>
            </div>

            {/* Submissions Grid */}
            {submissionList.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {submissionList.map((submission) => (
                        <Card key={submission.submission_id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle className="flex justify-between items-center">
                                    {/* <Badge variant="secondary">{submission.teamName}</Badge> */}
                                </CardTitle>
                                <CardDescription>{submission.description}</CardDescription>
                            </CardHeader>

                            <CardContent>
                                <div className="flex flex-col space-y-4">
                                    {/* Team Members */}
                                    <div className="flex items-center space-x-2">
                                        <Users className="text-gray-500" />
                                        <div className="flex flex-wrap space-x-2">
                                            {parseJsonArray(submission.team_members).map((member) => (
                                                <span key={member} className="text-sm font-medium text-gray-700">
                                                    {member}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Submission Details */}
                                    <div className="flex items-center space-x-2">
                                        <CalendarDays className="text-gray-500" />
                                        <span>
                                            Submitted: {" "}
                                            {new Intl.DateTimeFormat("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            }).format(new Date(contestCardData.created_at))}
                                        </span>
                                    </div>

                                    {/* Technologies
                                    <div className="flex items-center space-x-2">
                                        <FileText className="text-gray-500" />
                                        <div className="flex flex-wrap gap-2">
                                            {submission.t.map((tech) => (
                                                <Badge key={tech} variant="outline">{tech}</Badge>
                                            ))}
                                        </div>
                                    </div> */}

                                    {/* Actions */}
                                    <div className="mt-4">
                                        <Link href={`/admin/contests/${contestId}/submissions/${submission.submission_id}`}>
                                            <Button variant="outline" className="w-full">
                                                View Submission Details
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="text-center py-8 text-gray-500">
                    No submissions found for this contest.
                </div>
            )}
        </div>
    );
}

export default ContestSubmissions;