import { Trophy } from 'lucide-react';
import React from 'react'

export default function NoContestCard() {
    return (
        <div className="border rounded-lg p-6 text-center">
            <div className="rounded-full bg-gray-100 p-4 mb-4 inline-block">
                <Trophy />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No Contests Found
            </h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
                You haven't created any contests yet. Start by creating a new contest!
            </p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                Create New Contest
            </button>
        </div>
    )
};