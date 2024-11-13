
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Trophy, Medal, Gift, Laptop, Headphones, Watch, Monitor } from "lucide-react";

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
      return <span className="font-medium text-gray-500">#{rank}</span>;
  }
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
        },
      
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
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Gift className="h-6 w-6 text-purple-500" />
            Contest Prizes
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Table Headers */}
          <div className="grid grid-cols-[auto_1fr] items-center px-4 py-2 border-b">
            <div className="w-[60px] font-medium">Rank</div>
            <div className="font-medium pl-4">Awards</div>
          </div>

          {/* Prize Rows */}
          <div className="divide-y">
            {prizes.map((prize) => (
              <div
                key={prize.rank}
                className="grid grid-cols-[auto_1fr] items-start px-4 py-3 hover:bg-accent/50 transition-colors"
              >
                <div className="w-[60px] pt-1">
                  {getRankBadge(prize.rank)}
                </div>

                <div className="pl-4 space-y-2">
                  {prize.awards.map((award, index) => (
                    <div 
                      key={index} 
                      className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2"
                    >
                      <Badge
                        variant="secondary"
                        className="w-fit text-sm"
                      >
                        {award.item}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {award.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrizesList;