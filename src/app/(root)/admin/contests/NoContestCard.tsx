import { Trophy } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { Button } from '~/components/ui/button';

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
                You haven&apos;t created any contests yet. Start by creating a new contest!
            </p>
            <Link href={`/admin/contests/create`}>
                <Button variant="default" className="text-white px-4 py-2 rounded transition">
                    Create New Contest
                </Button>
            </Link>
        </div>
    )
};