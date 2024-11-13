import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Trophy, Medal } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";

interface Participant {
  id: string;
  name: string;
  username: string;
  avatar: string;
  contestsWon: number;
  expPoints: number;
}

const getRankBadge = (rank: number) => {
  switch (rank) {
    case 1:
      return (
        <div className="flex items-center gap-1">
          <Trophy className="h-5 w-5 text-yellow-500" fill="currentColor" />
          <span className="font-bold text-yellow-500">1st</span>
        </div>
      );
    case 2:
      return (
        <div className="flex items-center gap-1">
          <Medal className="h-5 w-5 text-gray-400" fill="currentColor" />
          <span className="font-bold text-gray-400">2nd</span>
        </div>
      );
    case 3:
      return (
        <div className="flex items-center gap-1">
          <Medal className="h-5 w-5 text-amber-600" fill="currentColor" />
          <span className="font-bold text-amber-600">3rd</span>
        </div>
      );
    default:
      return <span className="font-medium text-gray-500">#{rank}</span>;
  }
};

const LeaderboardList = () => {
  const participants: Participant[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      username: "sarahj",
      avatar: "/api/placeholder/32/32",
      contestsWon: 5,
      expPoints: 15000,
    },
    {
      id: "2",
      name: "Michael Chen",
      username: "mikechen",
      avatar: "/api/placeholder/32/32",
      contestsWon: 4,
      expPoints: 12000,
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      username: "emilyrod",
      avatar: "/api/placeholder/32/32",
      contestsWon: 3,
      expPoints: 10000,
    },
    {
      id: "4",
      name: "David Kim",
      username: "davidk",
      avatar: "/api/placeholder/32/32",
      contestsWon: 2,
      expPoints: 8000,
    },
    {
      id: "5",
      name: "Lisa Wang",
      username: "lisaw",
      avatar: "/api/placeholder/32/32",
      contestsWon: 2,
      expPoints: 7500,
    },
  ];

  // Sort participants by experience points
  const sortedParticipants = [...participants].sort((a, b) => b.expPoints - a.expPoints);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Trophy className="h-6 w-6 text-yellow-500" />
            Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Table Headers */}
          <div className="grid grid-cols-[auto_1fr_auto_auto] items-center px-4 py-2 border-b">
            <div className="w-[60px] font-medium">Rank</div>
            <div className="font-medium">Participants</div>
            <div className="text-right font-medium px-4 hidden md:block">Wins</div>
            <div className="text-right font-medium w-[100px]">XP Points</div>
          </div>

          {/* Participant Rows */}
          <div className="divide-y">
            {sortedParticipants.map((participant, index) => (
              <div
                key={participant.id}
                className="grid grid-cols-[auto_1fr_auto_auto] items-center px-4 py-3 hover:bg-accent/50 transition-colors"
              >
                <div className="w-[60px]">
                  {getRankBadge(index + 1)}
                </div>
                
                <div className="flex items-center gap-3 min-w-0">
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarImage src={participant.avatar} />
                    <AvatarFallback>{participant.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="truncate">
                    <div className="font-medium text-sm truncate">
                      {participant.name}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      @{participant.username}
                    </div>
                  </div>
                </div>

                <div className="hidden md:block px-4">
                  <Badge variant="outline" className="font-medium">
                    {participant.contestsWon}
                  </Badge>
                </div>

                <div className="font-medium text-right w-[100px]">
                  {participant.expPoints.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaderboardList;