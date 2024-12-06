/**
 * Admin contests page to show all the contest (upcoming, live, ended, archived)
 * 
 */

"use client"

import { Menu, Plus, X } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { getAllContestDetailsOnAdminDashboard } from '~/actions/admin/dashboard';
import type { AllContestAdminDashboard } from '~/types/admin/dashboard/types';
import { Button } from '~/components/ui/button';
import NoContestCard from './NoContestCard';
import ContestsCard from './ContestCard';

// Define Contest Status Tabs
const ContestStatusTabs = ['Upcoming', 'Ongoing', 'Completed', 'Archived'] as const;
export type ContestStatus = typeof ContestStatusTabs[number];

const getCurrentContestStatus = (contest: AllContestAdminDashboard): string => {
    const now = new Date();
    const startDate = new Date(contest.start_date);
    const endDate = new Date(contest.end_date);

    // If the contest is explicitly archived
    if (contest.status === 'A') return 'Archived';

    // If the contest hasn't started yet
    if (startDate > now) return 'Upcoming';

    // If the contest is currently ongoing (now is between start and end dates)
    if (now >= startDate && now <= endDate) return 'Ongoing';

    // If the contest has ended (now is after the end date)
    if (now > endDate) return 'Completed';

    // Fallback
    return 'Unknown';
};

const filterContestsByStatus = (
    contests: AllContestAdminDashboard[],
    status: string
): AllContestAdminDashboard[] => {
    if (!contests) return [];

    return contests.filter(contest => {
        const contestStatus = getCurrentContestStatus(contest);

        switch (status) {
            case 'Upcoming':
                return contestStatus === 'Upcoming';
            case 'Ongoing':
                return contestStatus === 'Ongoing';
            case 'Completed':
                return contestStatus === 'Completed';
            case 'Archived':
                return contestStatus === 'Archived';
            default:
                return true;
        }
    });
};

const AllContestPageForAdmin: React.FC = () => {
    const [allContests, setAllContests] = useState<AllContestAdminDashboard[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<ContestStatus>('Upcoming');
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        void (async () => {
            try {
                setIsLoading(true);
                const contests = await getAllContestDetailsOnAdminDashboard();
                if (contests.length > 0)
                    setAllContests(contests);
                console.log("contests: ", contests);

            } catch (error) {
                console.error("Error fetching contests:", error);
                // Optionally, you could set an error state here
            } finally {
                setIsLoading(false);
            }
        })();

    }, []);

    // Filtered contests based on selected status
    const filteredContests = useMemo(() => {
        return filterContestsByStatus(allContests, selectedStatus);
    }, [allContests, selectedStatus]);

    // Mobile Sidebar Toggle
    const toggleMobileSidebar = () => {
        setIsMobileSidebarOpen(prev => !prev);
    };

    // Sidebar Component
    const Sidebar = () => (
        <>
            {/* Mobile Overlay */}
            {isMobileSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={toggleMobileSidebar}
                />
            )}

            {/* Sidebar Content */}
            <div className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-gray-100 transform transition-transform duration-300 ease-in-out
                lg:relative lg:translate-x-0 lg:block
                ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="p-4">
                    {/* Mobile Close Button */}
                    <Button
                        onClick={toggleMobileSidebar}
                        variant="outline"
                        className="lg:hidden absolute top-4 right-4"
                    >
                        <X size={24} />
                    </Button>

                    <h2 className="text-xl font-bold mb-6 mt-4 lg:mt-0">Contest Status</h2>
                    <div className="space-y-2">
                        {ContestStatusTabs.map((status) => (
                            <Button
                                key={status}
                                variant="default"
                                onClick={() => {
                                    setSelectedStatus(status);
                                    setIsMobileSidebarOpen(false);
                                }}
                                className={`w-full text-left px-4 py-2 rounded ${selectedStatus === status
                                    ? 'text-white'
                                    : 'hover:bg-gray-500'
                                    }`}
                            >
                                {status} Contests
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );

    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
            {/* Mobile Header with Sidebar Toggle */}
            <div className="lg:hidden bg-white shadow-md p-4 flex justify-between items-center">
                <h1 className="text-xl font-bold">Contest Management</h1>
                <Button
                    variant="outline"
                    onClick={toggleMobileSidebar}
                >
                    <Menu />
                </Button>
            </div>

            {/* Sidebar for Desktop and Mobile */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-grow p-4 lg:p-6 bg-white">
                {/* Create Contest Button - Top Right (Desktop) */}
                <div className="hidden lg:block absolute top-4 right-4">

                    <Button
                        variant="default"
                        className=" text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center space-x-2">
                        <Plus />
                        <span>Create Contest</span>
                    </Button>
                </div>

                {/* Page Title - Desktop */}
                <h1 className="hidden lg:block text-2xl font-bold mb-6 pr-40">Contest Management</h1>

                {/* Create Contest Button - Mobile */}
                <div className="lg:hidden mb-4">
                    <Button
                        variant="default"
                        className="w-full text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center justify-center space-x-2">
                        <Plus />
                        <span>Create Contest</span>
                    </Button>
                </div>

                {/* Contests Section */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">{selectedStatus} Contests</h2>
                    {isLoading ? (
                        <div className="text-center py-4">Loading contests...</div>
                    ) : filteredContests.length > 0 ? (
                        <div className="space-y-4">
                            {filteredContests.map((contest) => (
                                <ContestsCard key={contest.contest_id} contest={contest} />
                            ))}
                        </div>
                    ) : (
                        <NoContestCard />
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllContestPageForAdmin;