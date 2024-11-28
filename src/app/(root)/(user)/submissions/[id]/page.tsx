import React from 'react';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { FileText, Users, Clock } from "lucide-react";
import { getSubmissionById } from '~/lib/actions';
import Link from 'next/link';
import { parseJsonArray } from '~/utils';

const SubmissionDetails = async ({ params }: { params: Promise<{ id: number }> }) => {
    const { id } = await params;

    const submission = await getSubmissionById(id)
    // console.log("sub card", submission);

    // Parse team members (assuming comma-separated or JSON string)
    const teamMembers = parseJsonArray(submission.submission_team_members ?? "");


    // Format dates
    const submissionDate = new Date(submission.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    const contestEndDate = new Date(submission.contest_end_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="mx-auto w-full max-w-3xl">
            {/* Header Card */}
            <Card className="mx-auto my-8 w-full">
                <CardHeader>
                    <CardTitle className="mb-2 text-xl">
                        {submission.contest_title}
                    </CardTitle>
                    <p className="text-base text-muted-foreground">
                        Submission Details
                    </p>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <div className="flex-col justify-start">
                                    <div className="text-base font-medium flex items-center gap-2">
                                        <Users className="h-4 w-4" /> Team Members
                                    </div>
                                    <div className="text-base">
                                        {teamMembers.length > 0
                                            ? teamMembers.join(', ')
                                            : 'Individual Submission'}
                                    </div>
                                </div>
                                <div className="flex-col justify-start">
                                    <div className="text-base font-medium flex items-center gap-2">
                                        <Clock className="h-4 w-4" /> Submission Date
                                    </div>
                                    <div className="text-base">{submissionDate}</div>
                                </div>
                            </div>
                            <div className="flex flex-col items-end space-y-4">
                                <div className="flex flex-col">
                                    <span className="text-right font-medium">Contest Deadline</span>
                                    <span className="text-right">{contestEndDate}</span>
                                </div>
                                <Link href={`/submissions/edit/${submission.submission_id}`}>
                                    <Button variant="default">
                                        Edit Submission
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        <div className="mt-8 flex-col space-y-8 items-center justify-between border-t pt-4">
                            {submission.contest_banner_url && (
                                <Image
                                    src={submission.contest_banner_url}
                                    alt={`${submission.contest_title} Banner`}
                                    width={800}
                                    height={200}
                                    className="rounded-lg"
                                />
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Submission Tabs */}
            <div className="mx-auto w-full max-w-3xl">
                <Tabs defaultValue="description" className="w-full">
                    <TabsList className="mb-8 grid w-full grid-cols-2">
                        <TabsTrigger value="description" className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            <span className="text-xs sm:text-sm">Description</span>
                        </TabsTrigger>
                        <TabsTrigger value="details" className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            <span className="text-xs sm:text-sm">Submission Details</span>
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="description">
                        <Card>
                            <CardContent className="pt-6">
                                {submission.description}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="details">
                        <Card>
                            <CardContent className="pt-6">
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-medium mb-2">Submission Metadata</h3>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <span className="font-medium">Submission ID:</span>
                                                <p>{submission.submission_id}</p>
                                            </div>
                                            <div>
                                                <span className="font-medium">Last Updated:</span>
                                                <p>{new Date(submission.updated_at).toLocaleString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default SubmissionDetails;