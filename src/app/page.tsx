import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Gift, Star, Trophy, Users, Calendar } from "lucide-react";
import { cn } from "~/lib/utils";
import Link from "next/link";
import { getContestOnHome } from "~/server/queries";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs";
import Image from "next/image";

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
  start_date: string;
  end_date: string;
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
  const tagArray = contest.tags?.split(",").map((tag) => tag.trim());

  return (
    <Link href={`/contest/1`}>
      <Card className="mb-4 overflow-hidden transition-shadow hover:shadow-lg">
        {/* Mobile Layout (stacked layout for smaller screens) */}
        <div className="block md:hidden">
          {/* Image */}
          <div className="h-48 w-full overflow-hidden">
            <img
              src={contest.banner_url ?? ""}
              alt={contest.title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="space-y-3 p-4">
            <div>
              <div className="mb-2 flex items-start justify-between">
                <h3 className="text-lg font-semibold text-primary">
                  {contest.title}
                </h3>
                <Badge
                  variant="outline"
                  className={cn(
                    "rounded-full border px-2 py-1 text-xs font-medium",
                  )}
                >
                  {contest.difficulty_level}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">{contest.sub_title}</p>
            </div>

            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                {contest.cash_awards &&
                  <>
                    <Trophy className="w-4 h-4" />
                    <span>{new Intl.NumberFormat('en-IN', {
                      style: 'currency',
                      currency: 'INR',
                      maximumFractionDigits: 0
                    }).format(contest.cash_awards)} </span>
                  </>
                }
                {contest.points_awards &&
                  <>
                    <Star className="w-4 h-4" />
                    <span>{contest.points_awards} </span>
                  </>
                }

                {contest.swag_awards &&
                  <>
                    <Gift className="w-4 h-4" />
                    <span>{contest.swag_awards} </span>
                  </>
                }
              </div>
              <span>in prizes</span>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{contest.participants} participants</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{contest.start_date}</span>
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
        <div className="block md:hidden">
          {/* Image */}
          <div className="h-48 w-full overflow-hidden">
            <img
              src={contest.banner_url ?? ""}
              alt={contest.title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="space-y-3 p-4">
            <div>
              <div className="mb-2 flex items-start justify-between">
                <h3 className="text-lg font-semibold text-primary">
                  {contest.title}
                </h3>
                <Badge
                  variant="outline"
                  className={cn(
                    "rounded-full border px-2 py-1 text-xs font-medium",
                  )}
                >
                  {contest.difficulty_level}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">{contest.sub_title}</p>
            </div>

            <div className="flex flex-col space-y-2 text-sm text-gray-600">

              <div className="flex items-center gap-1">

                {contest.cash_awards &&
                  <>
                    <Trophy className="w-4 h-4" />
                    <span> {new Intl.NumberFormat('en-IN', {
                      style: 'currency',
                      currency: 'INR',
                      maximumFractionDigits: 0
                    }).format(contest.cash_awards)} </span>
                  </>
                }
                {contest.points_awards &&
                  <>
                    <Star className="w-4 h-4" />
                    <span>{contest.points_awards} </span>
                  </>
                }

                {contest.swag_awards &&
                  <>
                    <Gift className="w-4 h-4" />
                    <span>{contest.swag_awards} </span>
                  </>
                }
                <span>in prizes</span>

              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{contest.participants} participants</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{contest.start_date}</span>
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

      </Card>
    </Link>
  );
};

const ContestList = async () => {
  const contests = await getContestOnHome("A");
  const currentDate = new Date();

  // Filter contests based on dates
  const upcomingContests = contests.filter(
    (contest) => new Date(contest.start_date) > currentDate,
  );

  const ongoingContests = contests.filter((contest) => {
    const startDate = new Date(contest.start_date);
    const endDate = new Date(contest.end_date);
    return startDate <= currentDate && currentDate <= endDate;
  });

  const endedContests = contests.filter(
    (contest) => new Date(contest.end_date) < currentDate,
  );

  return (
    <>
      <SignedOut>
        <div className="flex h-full items-center justify-center bg-background">
          <div className="w-full max-w-md px-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-xl font-medium">
                  You are not signed in
                </CardTitle>
              </CardHeader>

              <CardContent className="flex flex-col items-center px-0">
                <div className="flex w-full flex-col items-center gap-8">
                  <div className="text-lg font-semibold text-primary">
                    CMackathon
                  </div>

                  <div className="flex justify-center">
                    <Image
                      src="/logo.svg"
                      alt="logo"
                      height={100}
                      width={100}
                      className="h-24 w-24"
                    />
                  </div>

                  <div className="flex justify-center">
                    <SignInButton>
                      <button className="rounded-md bg-primary px-8 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90">
                        Sign In
                      </button>
                    </SignInButton>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
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
                  <div className="text-center text-gray-500">
                    No upcoming contests
                  </div>
                ) : (
                  upcomingContests.map((contest, index) => (
                    <ContestCard
                      key={index + 1}
                      contest={{
                        ...contest,
                        tags: contest.tags,
                        cash_awards: contest.cash_awards,
                        points_awards: contest.points_awards,
                        swag_awards: contest.swag_awards,
                        participants: contest.participants ?? 0,
                      }}
                    />
                  ))
                )}
              </TabsContent>

              <TabsContent value="ongoing" className="mt-4">
                {ongoingContests.length === 0 ? (
                  <div className="text-center text-gray-500">
                    No ongoing contests
                  </div>
                ) : (
                  ongoingContests.map((contest, index) => (
                    <ContestCard
                      key={index + 1}
                      contest={{
                        ...contest,
                        tags: contest.tags,
                        cash_awards: contest.cash_awards,
                        points_awards: contest.points_awards,
                        swag_awards: contest.swag_awards,
                        participants: contest.participants ?? 0,
                      }}
                    />
                  ))
                )}
              </TabsContent>

              <TabsContent value="ended" className="mt-4">
                {endedContests.length === 0 ? (
                  <div className="text-center text-gray-500">
                    No ended contests
                  </div>
                ) : (
                  endedContests.map((contest, index) => (
                    <ContestCard
                      key={index + 1}
                      contest={{
                        ...contest,
                        tags: contest.tags,
                        cash_awards: contest.cash_awards,
                        points_awards: contest.points_awards,
                        swag_awards: contest.swag_awards,
                        participants: contest.participants ?? 0,
                      }}
                    />
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
