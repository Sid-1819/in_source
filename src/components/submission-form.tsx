// components/SubmissionForm.tsx

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "~/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { submissionSchema } from "~/utils/validation";
import { ContestSumbmission } from "~/app/types";
import TeamMemberSection from "./team-member-section";

interface SubmissionFormProps {
    initialData?: ContestSumbmission;
    onSubmit: (data: ContestSumbmission) => void;
}

const SubmissionForm: React.FC<SubmissionFormProps> = ({ initialData, onSubmit }) => {
    const [teamMembers, setTeamMembers] = useState<string[]>(initialData?.teamMembers ? JSON.parse(initialData.teamMembers) : [""]);

    const form = useForm<z.infer<typeof submissionSchema>>({
        resolver: zodResolver(submissionSchema),
        defaultValues: {
            sourceCodeLink: initialData?.sourceCodeLink ?? "",
            description: initialData?.description ?? "",
            deploymentLink: initialData?.deploymentLink ?? "",
            teamMembers: teamMembers,
        },
    });

    const handleSubmit = (values: z.infer<typeof submissionSchema>) => {
        const formattedValues: ContestSumbmission = {
            description: values.description ?? "NULL",
            sourceCodeLink: values.sourceCodeLink,
            deploymentLink: values.deploymentLink ?? "NULL",
            teamMembers: teamMembers ? JSON.stringify(teamMembers) : "NULL",
            contestId: initialData?.contestId ?? 1,
            userId: initialData?.userId ?? 65,
        };

        onSubmit(formattedValues);
    };

    return (
        <div className="container mx-auto py-10">
            <Card className="mx-auto max-w-3xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">
                        {initialData ? "Edit Submission" : "Create Submission"}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                            {/* Source Code Link */}
                            <FormField
                                control={form.control}
                                name="sourceCodeLink"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Source Code Link</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter GitHub/GitLab/Drive link" {...field} />
                                        </FormControl>
                                        <FormDescription>Provide a link to source code.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Team Members Section */}
                            <TeamMemberSection
                                teamMembers={teamMembers}
                                setTeamMembers={setTeamMembers}
                                form={form}
                            />

                            {/* Description */}
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <textarea
                                                placeholder="Briefly describe your approach and key changes"
                                                {...field}
                                                className="w-full min-h-[100px] border rounded-md p-2"
                                            />
                                        </FormControl>
                                        <FormDescription>Provide a brief overview of your approach.</FormDescription>
                                    </FormItem>
                                )}
                            />

                            {/* Deployment Link */}
                            <FormField
                                control={form.control}
                                name="deploymentLink"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Deployment Link (Optional)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter live URL" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            If your code is deployed, provide the live URL.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Save Button */}
                            <div className="flex justify-between gap-4">
                                <Button variant="outline" type="reset">
                                    Reset
                                </Button>
                                <Button type="submit">Save</Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

export default SubmissionForm;
