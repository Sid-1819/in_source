import React from "react";
import { Trophy, Medal } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { getLeaderBoardList } from "~/actions/leaderboard";
import { getSeasonNameById } from "~/actions/season";

interface Participant {
  username: string;
  exp_points: number,
  no_of_wins: number,
  total_submissions: number
}

function generateNameFromUsername(user_name: string): string {
  return user_name
    .split('_') // Split the username by underscores
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
    .join(' '); // Join the words with spaces
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

const LeaderboardList = async () => {

  const season = await getSeasonNameById(1);
  const seasonName = season[0]?.season_name;

  const participants: Participant[] = await getLeaderBoardList(1);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Trophy className="h-6 w-6 text-yellow-500" />
            Leaderboard ({seasonName})
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
              {participants.map((participant, index) => (
                <TableRow
                  key={index + 1}
                  className="hover:bg-accent/50 transition-colors"
                >
                  <TableCell className="w-[60px]">
                    {getRankBadge(index + 1)}
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="truncate">
                        <div className="font-medium text-sm">
                          {generateNameFromUsername(participant.username)}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="text-right  md:table-cell">
                    <Badge variant="outline" className="font-medium">
                      {participant.no_of_wins}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right  md:table-cell">
                    <Badge
                      variant="outline"
                      className="font-medium bg-blue-50 text-blue-700 hover:bg-blue-100"
                    >
                      {participant.total_submissions}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right font-medium">
                    {participant.exp_points}
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