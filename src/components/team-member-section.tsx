import React from "react";
import { Trash2, Plus } from "lucide-react";
import { FormItem, FormLabel, FormControl } from "./ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ControllerRenderProps, UseFormReturn, Path } from "react-hook-form";

// Define the form schema interface
interface FormSchema {
    sourceCodeLink: string;
    teamMembers?: string[];
    description?: string;
    deploymentLink?: string;
}

// Define a more specific prop type for the form
interface TeamMemberSectionProps {
    teamMembers: string[];
    setTeamMembers: React.Dispatch<React.SetStateAction<string[]>>;
    form: UseFormReturn<FormSchema>;
}

const TeamMemberSection: React.FC<TeamMemberSectionProps> = ({
    teamMembers,
    setTeamMembers,
    form
}) => {
    const addTeamMember = () => {
        setTeamMembers([...teamMembers, ""]);
    };

    const removeTeamMember = (indexToRemove: number) => {
        const updatedTeamMembers = teamMembers.filter((_, index) => index !== indexToRemove);
        setTeamMembers(updatedTeamMembers);

        // Safely update form value with type checking
        form.setValue("teamMembers", updatedTeamMembers);
    };

    return (
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
                <div key={index} className="relative">
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
                    <div className="space-y-2">
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

                                        // Safely update form value with type checking
                                        form.setValue("teamMembers", newTeamMembers);
                                    }}
                                />
                            </FormControl>
                        </FormItem>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TeamMemberSection;