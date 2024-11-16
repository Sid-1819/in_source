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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";

interface Participant {
  id: string;
  name: string;
  username: string;
  avatar: string;
  contestsWon: number;
  qualifiedSubmissions: number;
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
      qualifiedSubmissions: 8,
      expPoints: 15000,
    },
    {
      id: "2",
      name: "Michael Chen",
      username: "mikechen",
      avatar: "/api/placeholder/32/32",
      contestsWon: 4,
      qualifiedSubmissions: 8,
      expPoints: 12000,
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      username: "emilyrod",
      avatar: "/api/placeholder/32/32",
      contestsWon: 3,
      qualifiedSubmissions: 8,
      expPoints: 10000,
    },
    {
      id: "4",
      name: "David Kim",
      username: "davidk",
      avatar: "/api/placeholder/32/32",
      contestsWon: 2,
      qualifiedSubmissions: 8,
      expPoints: 8000,
    },
    {
      id: "5",
      name: "Lisa Wang",
      username: "lisaw",
      avatar: "/api/placeholder/32/32",
      contestsWon: 2,
      qualifiedSubmissions: 8,
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
            Leaderboard (Dec&apos;24 - Dec&apos;25)
          </CardTitle>
        </CardHeader>
        <CardContent>
        <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60px]">Rank</TableHead>
                <TableHead>Participant</TableHead>
                <TableHead className="text-right  md:table-cell">Wins</TableHead>
                <TableHead className="text-right  md:table-cell">Submissions</TableHead>
                <TableHead className="text-right">XP Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedParticipants.map((participant, index) => (
                <TableRow 
                  key={participant.id}
                  className="hover:bg-accent/50 transition-colors"
                >
                  <TableCell className="w-[60px]">
                    {getRankBadge(index + 1)}
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="truncate">
                        <div className="font-medium text-sm">
                          {participant.name}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell className="text-right  md:table-cell">
                    <Badge variant="outline" className="font-medium">
                      {participant.contestsWon}
                    </Badge>
                  </TableCell>
                  
                  <TableCell className="text-right  md:table-cell">
                    <Badge 
                      variant="outline" 
                      className="font-medium bg-blue-50 text-blue-700 hover:bg-blue-100"
                    >
                      {participant.qualifiedSubmissions}
                    </Badge>
                  </TableCell>
                  
                  <TableCell className="text-right font-medium">
                    {participant.expPoints.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaderboardList;