import { Trophy, Link } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

export default function NoSubmissionsCard() {

    return (
        <Card className="w-full">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-gray-100 p-4 mb-4">
                    <Trophy className="w-8 h-8 text-gray-400" />
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No Contest Submissions Yet
                </h3>

                <p className="text-gray-500 mb-6 max-w-md">
                    You haven&apos;t made any contest submissions. Start participating and showcase your skills!
                </p>

                <Link href="/contests">
                    <Button className="flex items-center gap-2">
                        Browse Contests
                    </Button>
                </Link>
            </CardContent>
        </Card>
    );
}