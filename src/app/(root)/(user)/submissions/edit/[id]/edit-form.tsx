"use client";

import React, { useEffect, useState } from "react";
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
import { Plus, Trash2 } from "lucide-react";
import { submissionSchema } from "~/utils/validation";
import { addSubmission } from "~/lib/actions";
import { ContestSumbmission, Submission } from "~/app/types";
import { useUser } from "@clerk/nextjs";
import { parseJsonArray } from "~/utils";

interface Props {
    initialData?: Submission;
}

const resetFormData: Submission = {
    source_code_link: "",
    submission_team_members: "[]",
    description: "",
    deployment_link: "",
    contest_banner_url: '',
    contest_end_date: '',
    contest_id: 1,
    contest_title: '',
    created_at: '',
    updated_at: '',
    submission_id: 0,
    user_id: 0,
}

const EditForm: React.FC<Props> = ({ initialData }) => {
    const [teamMembers, setTeamMembers] = useState<string[]>([""]);

    useEffect(() => {
        setTeamMembers(parseJsonArray(initialData?.submission_team_members ?? ""))
    }, [])

    const { user } = useUser();
    const email = user?.primaryEmailAddress?.emailAddress ?? "john@example.com";

    const form = useForm<z.infer<typeof submissionSchema>>({
        resolver: zodResolver(submissionSchema),
        defaultValues: {
            sourceCodeLink: initialData?.source_code_link ?? "",
            teamMembers,
            description: initialData?.description ?? "",
            deploymentLink: initialData?.deployment_link ?? "",
        },
    });

    console.log("form: ", form.getValues());

    const addTeamMember = () => {
        setTeamMembers([...teamMembers, ""]);
    };

    const removeTeamMember = (indexToRemove: number) => {
        const updatedTeamMembers = teamMembers.filter((_, index) => index !== indexToRemove);
        setTeamMembers(updatedTeamMembers);
        form.setValue("teamMembers", updatedTeamMembers); // Sync with form values
    };

    async function onSubmit(values: z.infer<typeof submissionSchema>) {
        const formattedValues: ContestSumbmission = {
            description: values.description ?? "",
            sourceCodeLink: values.sourceCodeLink,
            deploymentLink: values.deploymentLink ?? "",
            teamMembers: teamMembers ? JSON.stringify(teamMembers) : JSON.stringify([]),
            contestId: 1, // need to figure out how to get contest id
            userId: 65
        };

        console.log("formattedValues", formattedValues);
        await addSubmission(formattedValues, email);
    }

    return (
        <div className="container mx-auto py-10">
            <Card className="mx-auto max-w-3xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Edit Submission</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            onReset={(e) => { e.preventDefault(); initialData = resetFormData; return form.reset() }}
                            className="space-y-8"
                        >
                            {/* Source Code Link */}
                            <FormField
                                control={form.control}
                                name="sourceCodeLink"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Source Code Link</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter GitHub/GitLab/Drive link"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Provide a link to source code.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Team Members Section */}
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-medium">Team Members</h3>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={addTeamMember}
                                        className="flex items-center gap-2"
                                    >
                                        <Plus size={16} /> Add Team Member
                                    </Button>
                                </div>
                                {teamMembers.map((member, index) => (
                                    <div key={index + 1} className="relative">
                                        {teamMembers.length > 1 && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => removeTeamMember(index)}
                                                className="absolute right-0 top-0 z-10"
                                            >
                                                <Trash2 size={16} className="text-destructive" />
                                            </Button>
                                        )}
                                        <FormItem>
                                            <FormLabel>Team Member Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter team member name"
                                                    value={member}
                                                    onChange={(e) => {
                                                        const newTeamMembers = [...teamMembers];
                                                        newTeamMembers[index] = e.target.value;
                                                        setTeamMembers(newTeamMembers);
                                                        form.setValue('teamMembers', newTeamMembers);
                                                    }}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    </div>
                                ))}
                            </div>

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
        </div >
    );
};

export default EditForm;