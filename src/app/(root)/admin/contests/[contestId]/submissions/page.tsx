
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import {
    Trophy,
    Users,
    CalendarDays,
    FileText
} from 'lucide-react';

// Mock data - in a real app, this would come from a database or API
const contestData = {
    id: 'hackathon-2024',
    name: 'Innovation Hackathon 2024',
    description: 'A global competition for groundbreaking tech solutions',
    startDate: '2024-01-15',
    endDate: '2024-02-15',
    totalSubmissions: 42,
    status: 'Completed'
};

const submissionsData = [
    {
        id: 'submission-1',
        projectName: 'EcoTrack',
        teamName: 'Green Innovators',
        submissionDate: '2024-02-10',
        teamMembers: [
            { name: 'Alice Johnson', role: 'Lead Developer', avatar: '/avatars/alice.png' },
            { name: 'Bob Smith', role: 'Designer', avatar: '/avatars/bob.png' }
        ],
        briefDescription: 'AI-powered sustainability tracking app',
        technologies: ['React', 'Machine Learning', 'Cloud']
    },
    {
        id: 'submission-2',
        projectName: 'MediConnect',
        teamName: 'HealthTech Squad',
        submissionDate: '2024-02-12',
        teamMembers: [
            { name: 'Charlie Brown', role: 'Product Manager', avatar: '/avatars/charlie.png' },
            { name: 'Diana Prince', role: 'Backend Developer', avatar: '/avatars/diana.png' }
        ],
        briefDescription: 'Telemedicine platform for rural areas',
        technologies: ['Next.js', 'GraphQL', 'WebRTC']
    }
];

const ContestSubmissions = () => {

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Contest Header */}
            <div className="mb-8 bg-white shadow-md rounded-lg p-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            {contestData.name}
                        </h1>
                        <p className="text-gray-600 mb-4">{contestData.description}</p>
                    </div>
                    <Badge variant={contestData.status === 'Completed' ? 'default' : 'outline'}>
                        {contestData.status}
                    </Badge>
                </div>

                <div className="grid md:grid-cols-4 gap-4 mt-4">
                    <div className="flex items-center space-x-2">
                        <CalendarDays className="text-blue-500" />
                        <span>Start: {contestData.startDate}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <CalendarDays className="text-red-500" />
                        <span>End: {contestData.endDate}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Trophy className="text-yellow-500" />
                        <span>Total Submissions: {contestData.totalSubmissions}</span>
                    </div>
                </div>
            </div>

            {/* Submissions Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {submissionsData.map((submission) => (
                    <Card key={submission.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle className="flex justify-between items-center">
                                {submission.projectName}
                                <Badge variant="secondary">{submission.teamName}</Badge>
                            </CardTitle>
                            <CardDescription>{submission.briefDescription}</CardDescription>
                        </CardHeader>

                        <CardContent>
                            <div className="flex flex-col space-y-4">
                                {/* Team Members */}
                                <div className="flex items-center space-x-2">
                                    <Users className="text-gray-500" />
                                    <div className="flex flex-wrap space-x-2">
                                        {submission.teamMembers.map((member) => (
                                            <span key={member.name} className="text-sm font-medium text-gray-700">
                                                {member.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Submission Details */}
                                <div className="flex items-center space-x-2">
                                    <CalendarDays className="text-gray-500" />
                                    <span>Submitted: {submission.submissionDate}</span>
                                </div>

                                {/* Technologies */}
                                <div className="flex items-center space-x-2">
                                    <FileText className="text-gray-500" />
                                    <div className="flex flex-wrap gap-2">
                                        {submission.technologies.map((tech) => (
                                            <Badge key={tech} variant="outline">{tech}</Badge>
                                        ))}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="mt-4">
                                    <Button variant="outline" className="w-full">
                                        View Submission Details
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ContestSubmissions;