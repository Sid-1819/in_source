import React, { useState } from 'react';
import {
    Calendar,
    Trophy,
    Star,
    Gift,
    Users,
    PlusCircle,
    Edit,
    Trash2,
    Filter
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Badge } from '~/components/ui/badge';
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent
} from '~/components/ui/tabs';
import { cn } from '~/lib/utils';

// Types for Contest
interface Contest {
    contest_id: string;
    title: string;
    sub_title: string;
    banner_url?: string;
    difficulty_level: 'Easy' | 'Medium' | 'Hard';
    status: 'Live' | 'Upcoming' | 'Ended';
    start_date: string;
    end_date: string;
    participants: number;
    max_participants?: number;
    cash_awards?: number;
    points_awards?: number;
    swag_awards?: string;
    tags?: string;
}

// Sample Contest Data
const SAMPLE_CONTESTS: Contest[] = [
    {
        contest_id: '1',
        title: 'Summer Coding Challenge',
        sub_title: 'Build innovative solutions',
        banner_url: '/contest-banner-1.jpg',
        difficulty_level: 'Medium',
        status: 'Live',
        start_date: '2024-06-01',
        end_date: '2024-07-15',
        participants: 250,
        max_participants: 500,
        cash_awards: 50000,
        points_awards: 1000,
        tags: 'Web Development, AI, Machine Learning'
    },
    {
        contest_id: '2',
        title: 'Blockchain Innovation Hackathon',
        sub_title: 'Revolutionize blockchain technology',
        banner_url: '/contest-banner-2.jpg',
        difficulty_level: 'Hard',
        status: 'Upcoming',
        start_date: '2024-08-15',
        end_date: '2024-09-30',
        participants: 0,
        max_participants: 300,
        cash_awards: 100000,
        tags: 'Blockchain, Cryptocurrency, Web3'
    },
    {
        contest_id: '3',
        title: 'Data Science Masters',
        sub_title: 'Advanced data analysis competition',
        banner_url: '/contest-banner-3.jpg',
        difficulty_level: 'Hard',
        status: 'Ended',
        start_date: '2024-03-01',
        end_date: '2024-05-15',
        participants: 450,
        cash_awards: 75000,
        points_awards: 2500,
        tags: 'Data Science, Machine Learning, Python'
    }
];

const ContestCard: React.FC<{ contest: Contest, onEdit: (id: string) => void, onDelete: (id: string) => void }> = ({
    contest,
    onEdit,
    onDelete
}) => {
    const tagArray = contest.tags?.split(",").map((tag) => tag.trim());

    return (
        <Card className="mb-4 overflow-hidden transition-shadow hover:shadow-lg relative">
            <div className="absolute top-2 right-2 z-10 flex gap-2">
                <Button
                    size="icon"
                    variant="outline"
                    onClick={(e) => {
                        e.preventDefault();
                        onEdit(contest.contest_id);
                    }}
                >
                    <Edit className="h-4 w-4" />
                </Button>
                <Button
                    size="icon"
                    variant="destructive"
                    onClick={(e) => {
                        e.preventDefault();
                        onDelete(contest.contest_id);
                    }}
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>

            <div className="h-48 w-full overflow-hidden">
                <img
                    src={contest.banner_url ?? "./logo.svg"}
                    alt={contest.title}
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="space-y-3 p-4">
                <div className="flex items-start justify-between">
                    <h3 className="text-lg font-semibold text-primary">
                        {contest.title}
                    </h3>
                    <Badge
                        variant="outline"
                        className={cn(
                            "rounded-full border px-2 py-1 text-xs font-medium",
                            contest.difficulty_level === 'Easy' && 'bg-green-100',
                            contest.difficulty_level === 'Medium' && 'bg-yellow-100',
                            contest.difficulty_level === 'Hard' && 'bg-red-100'
                        )}
                    >
                        {contest.difficulty_level}
                    </Badge>
                </div>

                <p className="text-sm text-gray-600">{contest.sub_title}</p>

                <div className="flex flex-col space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>
                            {contest.participants}
                            {contest.max_participants && ` / ${contest.max_participants} participants`}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                            {contest.start_date} - {contest.end_date}
                        </span>
                    </div>

                    {(contest.cash_awards || contest.points_awards || contest.swag_awards) && (
                        <div className="flex flex-wrap items-center gap-2">
                            {contest.cash_awards && (
                                <div className="flex items-center gap-1">
                                    <Trophy className="w-4 h-4" />
                                    <span>
                                        {new Intl.NumberFormat('en-IN', {
                                            style: 'currency',
                                            currency: 'INR',
                                            maximumFractionDigits: 0
                                        }).format(contest.cash_awards)}
                                    </span>
                                </div>
                            )}
                            {contest.points_awards && (
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4" />
                                    <span>{contest.points_awards} points</span>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="flex flex-wrap gap-2 mt-2">
                        {tagArray?.map((badge, index) => (
                            <Badge key={index} variant="outline">
                                {badge}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>

            <div className="absolute bottom-2 right-2">
                <Badge
                    variant="secondary"
                    className={cn(
                        "px-2 py-1 text-xs",
                        contest.status === 'Live' && 'bg-green-100 text-green-800',
                        contest.status === 'Upcoming' && 'bg-blue-100 text-blue-800',
                        contest.status === 'Ended' && 'bg-red-100 text-red-800'
                    )}
                >
                    {contest.status}
                </Badge>
            </div>
        </Card>
    );
};

const AdminContestDashboard: React.FC = () => {
    const [contests, setContests] = useState<Contest[]>(SAMPLE_CONTESTS);
    const [activeTab, setActiveTab] = useState<Contest['status']>('Live');

    const handleEdit = (id: string) => {
        // Implement edit logic
        console.log(`Editing contest ${id}`);
    };

    const handleDelete = (id: string) => {
        // Implement delete logic
        setContests(contests.filter(contest => contest.contest_id !== id));
    };

    const filteredContests = contests.filter(contest => contest.status === activeTab);

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Contest Management</h1>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" /> Create New Contest
                </Button>
            </div>

            <Tabs value={activeTab} onValueChange={(value: Contest['status']) => setActiveTab(value)}>
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="Live">Live Contests</TabsTrigger>
                    <TabsTrigger value="Upcoming">Upcoming Contests</TabsTrigger>
                    <TabsTrigger value="Ended">Ended Contests</TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredContests.length > 0 ? (
                            filteredContests.map(contest => (
                                <ContestCard
                                    key={contest.contest_id}
                                    contest={contest}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-8 text-gray-500">
                                No {activeTab.toLowerCase()} contests found
                            </div>
                        )}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default AdminContestDashboard;