"use client";

import React from "react";
import { Card } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Trophy, Users, Calendar } from "lucide-react";
import { cn } from "~/lib/utils";
import { useRouter } from "next/navigation";

type DifficultyLevel =
  | "Complexity: Easy"
  | "Complexity: Medium"
  | "Complexity: Hard"
  | "Complexity: Pro";

interface Contest {
  id: number;
  title: string;
  description: string;
  image: string;
  daysLeft: number;
  prize: number;
  participants: number;
  dates: string;
  difficulty: DifficultyLevel;
  badges: Array<{
    type: "technology" | "category" | "sponsor";
    label: string;
  }>;
}

interface ContestCardProps {
  contest: Contest;
}

const ContestCard: React.FC<ContestCardProps> = ({ contest }) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/contest/${contest.id}`);
  };

  return (
    <Card
      onClick={handleCardClick}
      className="overflow-hidden transition-shadow hover:shadow-lg"
    >
      {/* Mobile Layout (stacked layout for smaller screens) */}

      {/* Desktop Layout (side-by-side layout for larger screens) */}
      <div className="flex-row items-start gap-4 p-4 md:flex">
        {/* Left image section */}
        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
          <img
            src={contest.image || "/api/placeholder/96/96"}
            alt={contest.title}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Content section */}
        <div className="flex-1 space-y-3">
          <div>
            <div className="mb-2 flex items-start justify-between">
              <h3 className="text-lg font-semibold">{contest.title}</h3>
              <Badge variant="outline">{contest.difficulty}</Badge>
            </div>
            <p className="text-sm text-secondary">{contest.description}</p>
          </div>

          <div className="flex items-center gap-6 text-sm text-secondary">
            <div className="flex items-center gap-1">
              <Trophy className="h-4 w-4" />
              <span>${contest.prize.toLocaleString()} in prizes</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{contest.participants.toLocaleString()} participants</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{contest.dates}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {contest.badges.map((badge, index) => (
              <Badge
                key={index + 1}
                variant="outline"
                className={cn("rounded-full px-3 py-1 text-xs font-medium")}
              >
                {badge.label}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

const ContestList = () => {
  const contests: Contest[] = [
    {
      title: "Winter Coding Challenge 2024",
      id: 1,
      description: "Build innovative solutions using cutting-edge technologies",
      image: "/api/placeholder/400/200",
      daysLeft: 29,
      prize: 170000,
      participants: 2007,
      dates: "Oct 15 - Dec 10, 2024",
      difficulty: "Complexity: Medium",
      badges: [
        { type: "technology", label: "DevOps" },
        { type: "technology", label: "Machine Learning/AI" },
        { type: "category", label: "Productivity" },
        { type: "sponsor", label: "En-gage" },
      ],
    },
    {
      title: "Web3 Hackathon",
      id: 2,
      description: "Create decentralized applications for the future",
      image: "/api/placeholder/400/200",
      daysLeft: 15,
      prize: 50000,
      participants: 1500,
      dates: "Nov 1 - Dec 15, 2024",
      difficulty: "Complexity: Hard",
      badges: [
        { type: "technology", label: "Blockchain" },
        { type: "technology", label: "Smart Contracts" },
        { type: "category", label: "DeFi" },
      ],
    },
  ];

  return (
    <div className="mx-auto max-w-4xl space-y-4 p-4">
      {contests.map((contest, index) => (
        <ContestCard key={index + 1} contest={contest} />
      ))}
    </div>
  );
};

export default ContestList;
