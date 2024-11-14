import React from "react";
import { Card, CardHeader } from "~/components/ui/card";

import { Trophy, Medal, Gift, Star, Award } from "lucide-react";

interface Prizes {
  name: string;
  experiencePoints: number;

  swags: string[];
}

const PrizesPage = () => {
  const winners: Prizes[] = [
    {
      name: "1st Prize",
      experiencePoints: 15000,


      swags: ["Premium Hoodie", "Mechanical Keyboard", "Dev Pack"],
    },
    {
      name: "2nd Prize",
      experiencePoints: 10000,
 

      swags: ["Hoodie", "Tech Pack"],
    },
    {
      name: "3rd Prize",
      experiencePoints: 5000,
    

      swags: ["T-Shirt", "Notebook", "Sticker Pack"],
    },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 0:
        return <Trophy className="h-10 w-10 text-yellow-500" />;
      case 1:
        return <Award className="h-10 w-10 text-gray-400" />;
      case 2:
        return <Award className="h-10 w-10 text-amber-600" />;
      default:
        return <Trophy className="h-10 w-10 text-gray-400" />;
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-4 p-4">
      

      {winners.map((winner, index) => (
        <Card key={index+1} className="transition-shadow hover:shadow-lg">
          <CardHeader>
            <div className="flex items-start gap-4">
              {/* Rank Icon */}
              <div className="flex h-20 w-20 items-center justify-center">
                {getRankIcon(index)}
              </div>

              {/* Content */}
              <div className="flex-1 space-y-3">
                {/* Name and Project */}

                <div className="mb-1 flex items-center gap-2">
                  <h3 className="text-lg font-semibold">{winner.name}</h3>
                </div>

                {/* Rewards */}
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-1 text-purple-600">
                    <Star className="h-4 w-4" />
                    <span>{winner.experiencePoints.toLocaleString()} XP</span>
                  </div>
                  <div className="flex items-center gap-1 text-green-600">
               
          
                  </div>
                  <div className="flex items-center gap-1 text-blue-600">
                    <Gift className="h-4 w-4" />
                    <span>Swag Bags</span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default PrizesPage;
