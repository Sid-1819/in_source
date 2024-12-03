import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { FileText, Users, Clock, ExternalLink, Code } from "lucide-react";
import { getSubmissionById } from '~/actions/submissions';

import { formatDate, FormatType, parseJsonArray } from '~/utils';


const SubmissionDetails = async ({ params }: { params: Promise<{ id: number }> }) => {
    const { id } = await params;
    const submission = await getSubmissionById(id);

    // Parse team members (assuming comma-separated or JSON string)
    const teamMembers = parseJsonArray(submission.submission_team_members ?? "");

    // Format dates
    const submissionDate = formatDate(submission.created_at);
    const contestEndDate = formatDate(submission.contest_end_date, FormatType.dateWithTime);
    const lastUpdated = formatDate(submission.updated_at, FormatType.dateWithTime);

    return (
        <div className="mx-auto w-full max-w-4xl space-y-6">
            {/* Header Card */}
            <Card>
                <CardHeader className="relative">
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="text-2xl">{submission.contest_title}</CardTitle>
                        </div>
                        <div className="flex flex-col text-right space-y-1">
                            <span className="text-sm text-muted-foreground">
                                Last Updated:
                            </span>
                            <span className="text-sm text-muted-foreground">
                                {lastUpdated}
                            </span>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Left Column: Team and Submission Info */}
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-base font-medium flex items-center gap-2 mb-2">
                                    <Users className="h-4 w-4" /> Team Members
                                </h3>
                                <p className="text-base">
                                    {teamMembers.length > 0
                                        ? teamMembers.join(', ')
                                        : 'Individual Submission'}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-base font-medium flex items-center gap-2 mb-2">
                                    <Clock className="h-4 w-4" /> Submission Date
                                </h3>
                                <p className="text-base">{submissionDate}</p>
                            </div>
                        </div>

                        {/* Right Column: Contest Deadline and Edit Button */}
                        <div className="flex flex-col items-end space-y-4">
                            <div className="text-right">
                                <span className="font-medium block">Contest Deadline</span>
                                <span>{contestEndDate}</span>
                            </div>
                            <Link href={`/submissions/edit/${submission.submission_id}`}>
                                <Button variant="default">Edit Submission</Button>
                            </Link>
                        </div>
                    </div>

                    {/* Contest Banner */}
                    {submission.contest_banner_url && (
                        <div className="mt-8 border-t pt-4">
                            <Image
                                src={submission.contest_banner_url}
                                alt={`${submission.contest_title} Banner`}
                                width={800}
                                height={200}
                                className="rounded-lg w-full"
                            />
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Submission Details */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                        <FileText className="h-5 w-5" /> Submission Details
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Description */}
                    <div>
                        <h3 className="text-lg font-medium mb-2">Description</h3>
                        <p className="text-base">{submission.description ?? 'No description provided.'}</p>
                    </div>

                    {/* Links */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">Project Links</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            {submission.source_code_link && (
                                <div>
                                    <h4 className="font-medium flex items-center gap-2 mb-1">
                                        <Code className="h-4 w-4" /> Source Code
                                    </h4>
                                    <Link
                                        href={submission.source_code_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1 hover:underline"
                                    >
                                        View Source Code <ExternalLink className="h-4 w-4" />
                                    </Link>
                                </div>
                            )}

                            {submission.deployment_link && (
                                <div>
                                    <h4 className="font-medium flex items-center gap-2 mb-1">
                                        <ExternalLink className="h-4 w-4" /> Deployment
                                    </h4>
                                    <Link
                                        href={submission.deployment_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1 hover:underline"
                                    >
                                        View Deployment <ExternalLink className="h-4 w-4" />
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default SubmissionDetails;