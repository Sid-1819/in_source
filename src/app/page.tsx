"use client"

import React from 'react';
import { Card } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Trophy, Users, Calendar } from "lucide-react";
import { cn } from '~/lib/utils';
import { useRouter } from 'next/navigation';

type DifficultyLevel = 'Difficulty Level: Beginner' | 'Difficulty Level: Intermediate' | 'Difficulty Level: Advanced' | 'Difficulty Level: All Levels';

interface Contest {
  id:number;
  title: string;
  description: string;
  image: string;
  daysLeft: number;
  prize: number;
  participants: number;
  dates: string;
  difficulty: DifficultyLevel;
  badges: Array<{
    type: 'technology' | 'category' | 'sponsor';
    label: string;
  }>;
}

interface ContestCardProps {
  contest: Contest;
}

const ContestCard: React.FC<ContestCardProps> = ({ contest }) => {
  const getBadgeStyle = (type: 'technology' | 'category' | 'sponsor') => {
    switch (type) {
      case 'technology':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'category':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
      case 'sponsor':
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyStyle = (difficulty: DifficultyLevel) => {
    switch (difficulty) {
      case 'Difficulty Level: Beginner':
      case 'Difficulty Level: Intermediate':
      case 'Difficulty Level: Advanced':
      case 'Difficulty Level: All Levels':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/contest/${contest.id}`);
  }

  return (
    
    <Card  onClick={handleCardClick} className="overflow-hidden hover:shadow-lg transition-shadow">
      {/* Mobile Layout (stacked layout for smaller screens) */}
      <div className="block md:hidden">
        {/* Image */}
        <div className="w-full h-48 overflow-hidden">
          <img 
            src={contest.image || "/api/placeholder/400/200"} 
            alt={contest.title} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <div>
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-semibold">{contest.title}</h3>
              <Badge 
                variant="secondary"
                className={cn(
                  "rounded-full px-2 py-1 text-xs font-medium border",
                  getDifficultyStyle(contest.difficulty)
                )}
              >
                {contest.difficulty}
              </Badge>
            </div>
            <p className="text-sm text-gray-600">{contest.description}</p>
          </div>

          <div className="flex flex-col space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Trophy className="w-4 h-4" />
              <span>${contest.prize.toLocaleString()} in prizes</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{contest.participants.toLocaleString()} participants</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{contest.dates}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {contest.badges.map((badge, index) => (
              <Badge 
                key={index} 
                variant="secondary"
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-medium",
                  getBadgeStyle(badge.type)
                )}
              >
                {badge.label}
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
            src={contest.image || "/api/placeholder/96/96"} 
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
                variant="secondary"
                className={cn(
                  "rounded-full px-2 py-1 text-xs font-medium border",
                  getDifficultyStyle(contest.difficulty)
                )}
              >
                {contest.difficulty}
              </Badge>
            </div>
            <p className="text-sm text-gray-600">{contest.description}</p>
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Trophy className="w-4 h-4" />
              <span>${contest.prize.toLocaleString()} in prizes</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{contest.participants.toLocaleString()} participants</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{contest.dates}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {contest.badges.map((badge, index) => (
              <Badge 
                key={index} 
                variant="secondary"
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-medium",
                  getBadgeStyle(badge.type)
                )}
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
      id:1,
      description: "Build innovative solutions using cutting-edge technologies",
      image: "/api/placeholder/400/200",
      daysLeft: 29,
      prize: 170000,
      participants: 2007,
      dates: "Oct 15 - Dec 10, 2024",
      difficulty: 'Difficulty Level: Intermediate',
      badges: [
        { type: 'technology', label: 'DevOps' },
        { type: 'technology', label: 'Machine Learning/AI' },
        { type: 'category', label: 'Productivity' },
        { type: 'sponsor', label: 'En-gage' }
      ]
    },
    {
      title: "Web3 Hackathon",
      id:2,
      description: "Create decentralized applications for the future",
      image: "/api/placeholder/400/200",
      daysLeft: 15,
      prize: 50000,
      participants: 1500,
      dates: "Nov 1 - Dec 15, 2024",
      difficulty: 'Difficulty Level: Advanced',
      badges: [
        { type: 'technology', label: 'Blockchain' },
        { type: 'technology', label: 'Smart Contracts' },
        { type: 'category', label: 'DeFi' }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-4 p-4">
      {contests.map((contest, index) => (
        <ContestCard key={index} contest={contest} />
      ))}
    </div>
  );
};

export default ContestList;
