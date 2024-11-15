// "use client"

import React from "react";
import { Card } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Trophy, Users, Calendar } from "lucide-react";
import { cn } from '~/lib/utils';
// import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getContestList } from '~/server/queries';



export type Contest = {
  contestId: number;
  title: string;
  subTitle: string;
  description: string | null;
  tags: string;
  participantCount: string | null;
  prizes: string | null;
  bannerUrl: string | null;
  startDate: string;
  difficultyLevel: string | null;
  endDate: string;
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

  // const getDifficultyStyle = (difficulty: DifficultyLevel) => {
  //   switch (difficulty) {
  //     case 'Complexity: Easy':
  //     case 'Complexity: Medium':
  //     case 'Complexity: Hard':
  //     case 'Complexity: Pro':
  //       return 'bg-indigo-100 text-indigo-800 border-indigo-200';
  //     default:
  //       return 'bg-gray-100 text-gray-800 border-gray-200';
  //   }
  // };

  // const router = useRouter();

  // const handleCardClick = () => {
  //   router.push(`/contest/${contest.id}`);
  // }

  return (

    <Link href={`/contest/1`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow mb-4">
        {/* Mobile Layout (stacked layout for smaller screens) */}
        <div className="block md:hidden">
          {/* Image */}
          <div className="w-full h-48 overflow-hidden">
            <img
              src={contest.bannerUrl ?? ""}
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
                   {contest.difficultyLevel}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">{contest.subTitle}</p>
            </div>

            <div className="flex flex-col space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Trophy className="w-4 h-4" />
                <span>{(contest.prizes??'NA').replaceAll('S','SWAG').replaceAll('P','XP-Points').replaceAll('C-0,','').replaceAll('C','$')} in prizes</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{contest.participantCount} participants</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>4th Jan, 2025</span>
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
              src={contest.bannerUrl ?? "/api/placeholder/96/96"}
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
                {contest.difficultyLevel}
                </Badge>
              </div>
              <p className="text-sm text-secondary">{contest.subTitle}</p>
            </div>

            <div className="flex items-center gap-6 text-sm text-secondary">
              <div className="flex items-center gap-1">
                <Trophy className="w-4 h-4" />
                <span>{(contest.prizes??'NA').replaceAll('S','SWAG').replaceAll('P','XP-Points').replaceAll('C-0,','').replaceAll('C','$')} in prizes</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{contest.participantCount} participants</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>4th Jan, 2025</span>
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

  const contests = await getContestList('a');

  console.log(contests);

  // const contests: Contest[] = [
  //   {
  //     title: "Winter Coding Challenge 2024",
  //     id: 1,
  //     description: "Build innovative solutions using cutting-edge technologies",
  //     image: "/api/placeholder/400/200",
  //     daysLeft: 29,
  //     prize: 170000,
  //     participants: 2007,
  //     dates: "Oct 15 - Dec 10, 2024",
  //     difficulty: 'Complexity: Medium',
  //     badges: [
  //       { type: 'technology', label: 'DevOps' },
  //       { type: 'technology', label: 'Machine Learning/AI' },
  //       { type: 'category', label: 'Productivity' },
  //       { type: 'sponsor', label: 'En-gage' }
  //     ]
  //   },
  //   {
  //     title: "Web3 Hackathon",
  //     id: 2,
  //     description: "Create decentralized applications for the future",
  //     image: "/api/placeholder/400/200",
  //     daysLeft: 15,
  //     prize: 50000,
  //     participants: 1500,
  //     dates: "Nov 1 - Dec 15, 2024",
  //     difficulty: 'Complexity: Hard',
  //     badges: [
  //       { type: 'technology', label: 'Blockchain' },
  //       { type: 'technology', label: 'Smart Contracts' },
  //       { type: 'category', label: 'DeFi' }
  //     ]
  //   }
  // ];

  return (
    <div className="mx-auto max-w-4xl space-y-4 p-4">
      {contests.map((contest, index) => (
        <ContestCard key={index + 1} contest={{
          ...contest,
          tags: contest.tags ?? '',
        }} />
      ))}
    </div>
  );
};

export default ContestList;
