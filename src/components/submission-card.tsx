import { UserSubmission } from "~/app/types";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Link from "next/link";
import { Edit, Trash2 } from "lucide-react";
import { removeSubmission } from "~/lib/actions";

const SubmissionCard: React.FC<{ submission: UserSubmission }> = ({ submission }) => {

    const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US');
    const teamMembers: Array<string> = JSON.parse(submission.submission_team_members) as Array<string>;

    return (

        <Link href={`/submissions/${submission.submission_id}`}>
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
                        </div>
                    </div>

                    {submission.description &&
                        <p className="text-sm text-gray-600 line-clamp-2">
                            {submission.description}
                        </p>
                    }

                    <div className="text-sm text-gray-600">
                        <strong>Team Members:</strong>
                        <div className="flex space-x-2 mt-1">
                            {teamMembers.map((member, index) => (
                                <Badge key={index + 1} variant="outline">
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
                    <Link href={`/submissions/edit/${submission.submission_id}`}>
                        <Button variant="outline" size="sm" className="flex items-center gap-2 w-full">
                            <Edit className="w-6 h-4" /> Edit
                        </Button>
                    </Link>

                    <form action={removeSubmission}>
                        <input
                            type="hidden"
                            name="submissionId"
                            value={submission.submission_id}
                        />
                        <Button
                            variant="destructive"
                            type="submit"
                            size="sm"
                            className="flex items-center gap-2 w-full"
                        >
                            <Trash2 className="w-4 h-4" /> Delete
                        </Button>
                    </form>
                </div>
            </Card>
        </Link>
    );
};

export default SubmissionCard;