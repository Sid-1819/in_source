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
import { useUser } from "@clerk/nextjs";
import { parseJsonArray } from "~/utils";
import { toast } from "~/hooks/use-toast";
import { ContestSumbmission, Submission } from "~/types/submission";
import { editSubmission } from "~/actions/submissions";
import { redirect } from "next/navigation";

interface Props {
    initialData?: Partial<Submission>;
    onSubmissionSuccess?: () => void;
}

interface FormFields {
    sourceCodeLink: string;
    teamMembers: string[];
    description: string;
    deploymentLink: string;
}

const EditForm: React.FC<Props> = ({ initialData, onSubmissionSuccess }) => {
    const { user } = useUser();
    if (!user) redirect("/");

    // Initialize form state with default or initial values
    const [formState, setFormState] = useState<FormFields>({
        sourceCodeLink: initialData?.source_code_link ?? "",
        teamMembers: initialData?.submission_team_members
            ? parseJsonArray(initialData.submission_team_members)
            : [""],
        description: initialData?.description ?? "",
        deploymentLink: initialData?.deployment_link ?? "",
    });

    const form = useForm<z.infer<typeof submissionSchema>>({
        resolver: zodResolver(submissionSchema),
        defaultValues: formState,
    });

    // Update form values when initial data changes
    useEffect(() => {
        if (initialData) {
            const updatedFormState = {
                sourceCodeLink: initialData.source_code_link ?? "",
                teamMembers: initialData.submission_team_members
                    ? parseJsonArray(initialData.submission_team_members)
                    : [""],
                description: initialData.description ?? "",
                deploymentLink: initialData.deployment_link ?? "",
            };
            setFormState(updatedFormState);
            form.reset(updatedFormState);
        }
    }, [initialData]);

    // Add a new team member input
    const addTeamMember = () => {
        const updatedTeamMembers = [...formState.teamMembers, ""];
        handleStateUpdate('teamMembers', updatedTeamMembers);
    };

    // Remove a team member input
    const removeTeamMember = (indexToRemove: number) => {
        const updatedTeamMembers = formState.teamMembers.filter((_, index) => index !== indexToRemove);
        handleStateUpdate('teamMembers', updatedTeamMembers);
    };

    // Generic state update method
    const handleStateUpdate = (
        field: keyof FormFields,
        value: string | string[]
    ) => {
        const newState = { ...formState, [field]: value };
        setFormState(newState);
        form.setValue(field, value);
    };

    // Handle team member name changes
    const handleTeamMemberChange = (index: number, value: string) => {
        const newTeamMembers = [...formState.teamMembers];
        newTeamMembers[index] = value;
        handleStateUpdate('teamMembers', newTeamMembers);
    };

    // Form submission handler
    async function onSubmit(values: z.infer<typeof submissionSchema>) {
        try {
            const formattedValues: ContestSumbmission = {
                description: values.description ?? "",
                sourceCodeLink: values.sourceCodeLink,
                deploymentLink: values.deploymentLink ?? "",
                teamMembers: JSON.stringify(formState.teamMembers),
                contestId: initialData?.contest_id ?? "",
                userId: initialData?.user_id ?? ""
            };

            await editSubmission(
                formattedValues,
                initialData?.submission_id ?? "",
            );

            toast({
                title: "Submission Updated",
                description: "Your submission has been successfully updated.",
            });

            onSubmissionSuccess?.();
        } catch (error) {
            console.error("Submission error:", error);
            toast({
                title: "Submission Failed",
                description: "There was an error updating your submission.",
                variant: "destructive"
            });
        }
    }

    // Reset form to initial state
    const handleReset = () => {
        setFormState({
            sourceCodeLink: "",
            teamMembers: [""],
            description: "",
            deploymentLink: "",
        });
        form.reset();
    };

    return (
        <div className="container mx-auto py-10">
            <Card className="mx-auto max-w-3xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">
                        {initialData?.submission_id ? 'Edit Submission' : 'Submit Submission'}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            onReset={(e) => {
                                e.preventDefault();
                                handleReset();
                            }}
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
                                                value={formState.sourceCodeLink}
                                                onChange={(e) => handleStateUpdate('sourceCodeLink', e.target.value)}
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
                                {formState.teamMembers.map((member, index) => (
                                    <div key={index + 1} className="relative">
                                        {formState.teamMembers.length > 1 && (
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
                                                    onChange={(e) => handleTeamMemberChange(index, e.target.value)}
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
                                                value={formState.description}
                                                onChange={(e) => handleStateUpdate('description', e.target.value)}
                                                className="w-full min-h-[100px] border rounded-md p-2"
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Provide a brief overview of your approach.
                                        </FormDescription>
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
                                            <Input
                                                placeholder="Enter live URL"
                                                {...field}
                                                value={formState.deploymentLink}
                                                onChange={(e) => handleStateUpdate('deploymentLink', e.target.value)}
                                            />
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
                                <Button variant="outline" type="reset">Reset</Button>
                                <Button type="submit">Update</Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

export default EditForm;