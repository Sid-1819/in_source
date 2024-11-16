
import React from "react";
import { Card } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Trophy, Users, Calendar } from "lucide-react";
import { cn } from '~/lib/utils';
import Link from 'next/link';
import { getContestList, getContestOnHome } from '~/server/queries';
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs";

export type Contest = {
  contest_id: number;
  title: string;
  sub_title: string;
  tags: string;
  participants: number | null;
  cash_awards: number | null;
  swag_awards: number | null;
  points_awards: number | null;
  banner_url: string | null;
  difficulty_level: string | null;
  end_date: string;
  start_date:string;
};

interface Prizes {
  name: string;
  experiencePoints: number;
  cashPrize: number;
  swags: string[];
}

interface ContestCardProps {
  contest: Contest;
}

const ContestCard: React.FC<ContestCardProps> = ({ contest }) => {
  const tagArray = contest.tags?.split(',').map(tag => tag.trim());

  return (
    <Link href={`/contest/1`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow mb-4">
        {/* Mobile Layout (stacked layout for smaller screens) */}
        <div className="block md:hidden">
          {/* Image */}
          <div className="w-full h-48 overflow-hidden">
            <img
              src={contest.banner_url ?? ""}
              alt={contest.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-4 space-y-3">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg text-primary font-semibold">{contest.title}</h3>
                <Badge
                  variant="outline"
                  className={cn(
                    "rounded-full px-2 py-1 text-xs font-medium border",
                  )}
                >
                  {contest.difficulty_level}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">{contest.sub_title}</p>
            </div>

            <div className="flex flex-col space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Trophy className="w-4 h-4" />
                <span>{contest.cash_awards} in prizes</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{contest.participants} participants</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Starts: {new Date(contest.start_date).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {tagArray?.map((badge, index) => (
                <Badge
                  key={index + 1}
                  variant="outline"
                >
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Layout (side-by-side layout for larger screens) */}
        <div className="hidden md:flex flex-row items-start gap-4 p-4">
          {/* Left image section */}
          <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={contest.banner_url ?? "/api/placeholder/96/96"}
              alt={contest.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content section */}
          <div className="flex-1 space-y-3">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold">{contest.title}</h3>
                <Badge
                  variant="outline"
                  className={cn(
                    "rounded-full px-2 py-1 text-xs font-medium border",
                  )}
                >
                  {contest.difficulty_level}
                </Badge>
              </div>
              <p className="text-sm text-secondary">{contest.sub_title}</p>
            </div>

            <div className="flex items-center gap-6 text-sm text-secondary">
              <div className="flex items-center gap-1">
                {contest.cash_awards ??
                  <>
                    <Trophy className="w-4 h-4 ml-2" />
                    <span>{contest.cash_awards} in prizes</span>
                  </>
                }
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{contest.participants} participants</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Starts: {new Date(contest.start_date).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {tagArray?.map((badge, index) => (
                <Badge
                  key={index + 1}
                  variant="outline"
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-medium",
                  )}
                >
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

const ContestList = async () => {
  const contests = await getContestOnHome('a');
  const currentDate = new Date();

  // Filter contests based on dates
  const upcomingContests = contests.filter(contest => 
    new Date(contest.start_date) > currentDate
  );

  const ongoingContests = contests.filter(contest => {
    const startDate = new Date(contest.start_date);
    const endDate = new Date(contest.end_date);
    return startDate <= currentDate && currentDate <= endDate;
  });

  const endedContests = contests.filter(contest => 
    new Date(contest.end_date) < currentDate
  );

  return (
    <>
      <SignedOut>
        <div className="h-full w-full text-center text-2xl">
          Please sign in above
        </div>
      </SignedOut>
      <SignedIn>
        <div className="mx-auto max-w-4xl space-y-4 p-4">
          <div className="mb-8">
            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="upcoming">
                  Upcoming ({upcomingContests.length})
                </TabsTrigger>
                <TabsTrigger value="ongoing">
                  Ongoing ({ongoingContests.length})
                </TabsTrigger>
                <TabsTrigger value="ended">
                  Ended ({endedContests.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming" className="mt-4">
                {upcomingContests.length === 0 ? (
                  <div className="text-center text-gray-500">No upcoming contests</div>
                ) : (
                  upcomingContests.map((contest, index) => (
                    <ContestCard key={index + 1} contest={{
                      ...contest,
                      tags: contest.tags,
                      cash_awards: contest.cash_awards ?? 0,
                      points_awards: contest.points_awards ?? 0,
                      swag_awards: contest.swag_awards ?? 0,
                      participants: contest.participants ?? 0
                    }} />
                  ))
                )}
              </TabsContent>

              <TabsContent value="ongoing" className="mt-4">
                {ongoingContests.length === 0 ? (
                  <div className="text-center text-gray-500">No ongoing contests</div>
                ) : (
                  ongoingContests.map((contest, index) => (
                    <ContestCard key={index + 1} contest={{
                      ...contest,
                      tags: contest.tags,
                      cash_awards: contest.cash_awards ?? 0,
                      points_awards: contest.points_awards ?? 0,
                      swag_awards: contest.swag_awards ?? 0,
                      participants: contest.participants ?? 0
                    }} />
                  ))
                )}
              </TabsContent>

              <TabsContent value="ended" className="mt-4">
                {endedContests.length === 0 ? (
                  <div className="text-center text-gray-500">No ended contests</div>
                ) : (
                  endedContests.map((contest, index) => (
                    <ContestCard key={index + 1} contest={{
                      ...contest,
                      tags: contest.tags,
                      cash_awards: contest.cash_awards ?? 0,
                      points_awards: contest.points_awards ?? 0,
                      swag_awards: contest.swag_awards ?? 0,
                      participants: contest.participants ?? 0
                    }} />
                  ))
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </SignedIn>
    </>
  );
};

export default ContestList;
