"use client"

import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '~/components/ui/table';
import {
    PlusCircle,
    Edit,
    Trash2,
    Eye
} from 'lucide-react';

// Enhanced Contest Interface
interface Contest {
    id: string;
    title: string;
    subtitle?: string;
    status: 'upcoming' | 'active' | 'ended' | 'archived';
    startDate: string;
    endDate: string;
    totalSubmissions: number;
    maxParticipants?: number;
    difficulty?: 'Easy' | 'Medium' | 'Hard';
    bannerUrl?: string;
    cashPrize?: number;
    pointsPrize?: number;
    tags?: string[];
}

// Enhanced Submission Interface
interface Submission {
    id: string;
    contestId: number;
    contestTitle: string;
    submitterName: string;
    submissionDate: string;
    status: 'pending' | 'accepted' | 'rejected';
    submissionDetails?: string;
}

// Mock data with enhanced details
const mockContests: Contest[] = [
    {
        id: "1",
        title: 'Summer Coding Challenge',
        subtitle: 'Innovate and Transform',
        status: 'upcoming',
        startDate: '2024-07-01',
        endDate: '2024-08-31',
        totalSubmissions: 0,
        maxParticipants: 500,
        difficulty: 'Medium',
        bannerUrl: '/summer-coding-banner.jpg',
        cashPrize: 50000,
        pointsPrize: 1000,
        tags: ['Web Development', 'AI', 'Machine Learning']
    },
    {
        id: '2',
        title: 'AI Innovation Contest',
        subtitle: 'Push the Boundaries of AI',
        status: 'active',
        startDate: '2024-05-15',
        endDate: '2024-06-30',
        totalSubmissions: 42,
        difficulty: 'Hard',
        bannerUrl: '/ai-innovation-banner.jpg',
        cashPrize: 100000,
        tags: ['Machine Learning', 'Data Science']
    },
    {
        id: '3',
        title: 'Design Hackathon 2023',
        subtitle: 'Creative Solutions Unleashed',
        status: 'ended',
        startDate: '2023-11-01',
        endDate: '2023-11-15',
        totalSubmissions: 75,
        difficulty: 'Easy',
        bannerUrl: '/design-hackathon-banner.jpg',
        pointsPrize: 500,
        tags: ['UI/UX', 'Design Thinking']
    }
];

const mockSubmissions: Submission[] = [
    {
        id: '1',
        contestId: 2,
        contestTitle: 'AI Innovation Contest',
        submitterName: 'John Doe',
        submissionDate: '2024-06-15',
        status: 'pending'
    },
    {
        id: '2',
        contestId: 2,
        contestTitle: 'AI Innovation Contest',
        submitterName: 'Jane Smith',
        submissionDate: '2024-06-20',
        status: 'accepted'
    }
];

const AdminDashboard = () => {
    // const [activeTab, setActiveTab] = useState<'contests' | 'submissions'>('contests');
    const [contests, setContests] = useState<Contest[]>(mockContests);
    const [submissions, setSubmissions] = useState<Submission[]>(mockSubmissions);

    // const getStatusBadgeVariant = (status: string) => {
    //     const variants: Record<string, string> = {
    //         'upcoming': 'secondary',
    //         'active': 'success',
    //         'ended': 'destructive',
    //         'archived': 'outline',
    //         'pending': 'secondary',
    //         'accepted': 'success',
    //         'rejected': 'destructive'
    //     };
    //     return variants[status] ?? 'default';
    // };

    // const handleDeleteContest = (contestId: number) => {
    //     setContests(contests.filter(contest => contest.id !== contestId));
    // };

    const ContestsTab = () => (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Contests</h2>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" /> Create New Contest
                </Button>
            </div>

            {['upcoming', 'active', 'ended', 'archived'].map(status => (
                <Card key={status} className="w-full">
                    <CardHeader>
                        <CardTitle className="capitalize flex justify-between items-center">
                            {status} Contests
                            {/* <Badge variant={getStatusBadgeVariant(status)} className="capitalize"> */}
                            {contests.filter(c => c.status === status).length} Contests
                            {/* </Badge> */}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Difficulty</TableHead>
                                    <TableHead>Date Range</TableHead>
                                    <TableHead>Submissions</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {contests
                                    .filter(contest => contest.status === status)
                                    .map(contest => (
                                        <TableRow key={contest.id}>
                                            <TableCell>
                                                <div className="flex items-center space-x-3">
                                                    {contest.bannerUrl && (
                                                        <img
                                                            src={contest.bannerUrl}
                                                            alt={contest.title}
                                                            className="w-12 h-8 object-cover rounded"
                                                        />
                                                    )}
                                                    <div>
                                                        <div className="font-medium">{contest.title}</div>
                                                        <div className="text-xs text-muted-foreground">
                                                            {contest.subtitle}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        contest.difficulty === 'Easy' ? 'outline' :
                                                            contest.difficulty === 'Medium' ? 'secondary' :
                                                                'destructive'
                                                    }
                                                >
                                                    {contest.difficulty}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {contest.startDate} - {contest.endDate}
                                            </TableCell>
                                            <TableCell>
                                                {contest.totalSubmissions}
                                                {contest.maxParticipants &&
                                                    ` / ${contest.maxParticipants}`}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex space-x-2">
                                                    <Button variant="outline" size="sm">
                                                        <Eye className="mr-2 h-4 w-4" /> View
                                                    </Button>
                                                    <Button variant="outline" size="sm">
                                                        <Edit className="mr-2 h-4 w-4" /> Edit
                                                    </Button>
                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                    // onClick={() => handleDeleteContest(contest.id)}
                                                    >
                                                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            ))}
        </div>
    );

    const SubmissionsTab = () => (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Submissions</h2>
            <Card>
                <CardContent className="pt-6">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Contest</TableHead>
                                <TableHead>Submitter</TableHead>
                                <TableHead>Submission Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {submissions.map(submission => (
                                <TableRow key={submission.id}>
                                    <TableCell>{submission.contestTitle}</TableCell>
                                    <TableCell>{submission.submitterName}</TableCell>
                                    <TableCell>{submission.submissionDate}</TableCell>
                                    <TableCell>
                                        {/* <Badge variant={getStatusBadgeVariant(submission.status)}> */}
                                        {submission.status}
                                        {/* </Badge> */}
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="outline" size="sm">
                                            <Eye className="mr-2 h-4 w-4" /> View Submission
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );

    return (
        // <div className="p-6 bg-background">
        //     <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        //     <Tabs
        //         value={activeTab}
        //         // onValueChange={(value: 'contests' | 'submissions') => setActiveTab(value)}
        //         className="w-full"
        //     >
        //         <TabsList className="grid w-full grid-cols-2">
        //             <TabsTrigger value="contests">Contests</TabsTrigger>
        //             <TabsTrigger value="submissions">Submissions</TabsTrigger>
        //         </TabsList>
        //         <TabsContent value="contests">
        //             <ContestsTab />
        //         </TabsContent>
        //         <TabsContent value="submissions">
        //             <SubmissionsTab />
        //         </TabsContent>
        //     </Tabs>
        // </div>
        <div>Dashboard</div>
    );
};

export default AdminDashboard;