import { Calendar, Pen, FileTextIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

interface AdminContestTypes {
    contest_id: string,
    title: string,
    sub_title: string,
    difficulty_level: string,
    banner_url: string,
    tags: string,
    participation_count: string,
    status: string,
    start_date: Date,
    end_date: Date,
}

function getBadgeClass(type: string): string {
    switch (type.toLowerCase()) {
        case "easy":
            return "bg-green-300";
        case "medium":
            return "bg-orange-300";
        case "hard":
            return "bg-red-300";
        default:
            return "bg-gray-300";
    }
}

const ContestsCard: React.FC<{ contest: AdminContestTypes }> = ({ contest }) => {

    return (
        <div className="border rounded-lg p-4 mb-4 flex flex-col sm:flex-row items-center hover:shadow-md transition">
            <div className="w-36 h-24 mb-4 sm:mb-0 sm:mr-4 rounded-lg overflow-hidden">
                <img
                    src={contest.banner_url || '/placeholder-contest.png'}
                    alt={contest.title}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="flex-grow w-full">
                <div className="flex flex-col sm:flex-row justify-between items-start">
                    <div>
                        <h3 className="text-lg font-semibold">{contest.title}</h3>
                        <h5 className="text-sm font-light line-clamp-2">{contest.sub_title}</h5>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 mt-1">
                            <span className="text-sm text-gray-500">
                                {contest.participation_count} Participants
                            </span>
                        </div>
                    </div>
                    <div
                        className={` rounded-md ${getBadgeClass(contest.difficulty_level)}`}
                    >
                        <span className='p-2'>{contest.difficulty_level}</span>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mt-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                        <Calendar className='w-4 h-4' />
                        <span>Start: {contest.start_date.toString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <Calendar className='w-4 h-4' />
                        <span>End: {contest.end_date.toString()}</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-row sm:flex-col space-x-2 sm:space-x-0 sm:space-y-2 mt-4 sm:mt-0 sm:ml-4">
                <Link
                    href={`/admin/edit-contest/${contest.contest_id}`}
                >
                    <button className="border px-3 py-1 rounded text-sm flex items-center justify-center space-x-1 hover:bg-gray-50 w-full">
                        <Pen className='w-4 h-4' />
                        <span>Edit</span>
                    </button>
                </Link>
                <Link
                    href={`/admin/contest-submissions?contestId=${contest.contest_id}`}
                >
                    <button className="border px-3 py-1 rounded text-sm flex items-center justify-center space-x-1 hover:bg-gray-50 w-full">
                        <FileTextIcon className='w-4 h-4' />
                        <span>Submission</span>
                    </button>
                </Link>
            </div>
        </div>)
};

export default ContestsCard;