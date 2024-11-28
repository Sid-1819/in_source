import React from "react";
import { Trash2, Plus } from "lucide-react";
import { FormItem, FormLabel, FormControl } from "./ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface TeamMemberSectionProps {
    teamMembers: string[];
    setTeamMembers: React.Dispatch<React.SetStateAction<string[]>>;
    form: any; // Use the correct type for the form if available
}

const TeamMemberSection: React.FC<TeamMemberSectionProps> = ({ teamMembers, setTeamMembers, form }) => {
    const addTeamMember = () => {
        setTeamMembers([...teamMembers, ""]);
    };

    const removeTeamMember = (indexToRemove: number) => {
        const updatedTeamMembers = teamMembers.filter((_, index) => index !== indexToRemove);
        setTeamMembers(updatedTeamMembers);
        form.setValue("teamMembers", updatedTeamMembers); // Sync with form values
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
