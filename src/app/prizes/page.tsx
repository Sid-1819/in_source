import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Trophy, Medal, Gift } from "lucide-react";

interface Prize {
  rank: number;
  awards: Array<{
    item: string;
    description: string;
  }>;
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
      return (
        <div className="flex items-center gap-1">
          <Medal className="h-5 w-5 text-blue-500" fill="currentColor" />
          <span className="font-bold text-blue-500">{rank}th</span>
        </div>
      );
  }
};

const PrizeCard: React.FC<{ prize: Prize }> = ({ prize }) => {
  return (
    <Card className="hover:shadow-md transition-shadow my-4 flex flex-row">
      <CardHeader>
        <div className="flex items-center justify-between">
          {getRankBadge(prize.rank)}
          {/* <Gift className="h-5 w-5 text-purple-500" /> */}
        </div>
      </CardHeader>
      <CardContent>
        {prize.awards.map((award, index) => (
          <div key={index} className=" py-4">
            <Badge
              variant="secondary"
              className="w-fit text-sm"
            >
              {award.item}
            </Badge>
            <p className="text-sm text-muted-foreground">
              {award.description}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

const PrizesList = () => {
  const prizes: Prize[] = [
    {
      rank: 1,
      awards: [
        {
          item: "MacBook Pro M2",
          description: "14-inch, 16GB RAM, 512GB SSD"
        }
      ]
    },
    {
      rank: 2,
      awards: [
        {
          item: "iPad Pro",
          description: "12.9-inch, 256GB with Apple Pencil"
        }
      ]
    },
    {
      rank: 3,
      awards: [
        {
          item: "Surface Laptop Go",
          description: "13.5-inch, 8GB RAM, 256GB SSD"
        }
      ]
    },
    ...Array.from({ length: 7 }, (_, i) => ({
      rank: i + 4,
      awards: [
        {
          item: "Smart Watch",
          description: "Fitness & Health Tracking"
        }
      ]
    })),
    ...Array.from({ length: 10 }, (_, i) => ({
      rank: i + 11,
      awards: [
        {
          item: "Wireless Earbuds",
          description: "Premium Audio Quality"
        }
      ]
    }))
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center gap-2 mb-6">
        <Gift className="h-6 w-6 text-purple-500" />
        <h1 className="text-2xl font-bold">Season Prizes</h1>
      </div>
      
      <div className="flex-col gap-4">
        {prizes.map((prize) => (
          <PrizeCard key={prize.rank} prize={prize} />
        ))}
      </div>
    </div>
  );
};

export default PrizesList;