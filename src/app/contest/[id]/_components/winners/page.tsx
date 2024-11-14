import React from 'react';
import {
  Card,
  CardHeader
} from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

import { Trophy, Star, Gift } from "lucide-react";


interface Winner {
  name: string;

  profileImage: string;
  experiencePoints: number;
  swags: string[];
  projectTitle: string;
}

const WinnersList = () => {
  const winners: Winner[] = [
    {
      name: "Sarah Johnson",
      profileImage: "/api/placeholder/96/96",
      experiencePoints: 15000,
  
      projectTitle: "Google Chrome Built-in AI Challenge",
      swags: ["Premium Hoodie", "Mechanical Keyboard", "Dev Pack"]
    },
    {
      name: "Michael Chen",
      profileImage: "/api/placeholder/96/96",
      experiencePoints: 10000,

      projectTitle: "Google Chrome Built-in AI Challenge",
      swags: ["Hoodie", "Tech Pack"]
    },
    {
      name: "Emily Davis",
      profileImage: "/api/placeholder/96/96",
      experiencePoints: 5000,
      projectTitle: "Google Chrome Built-in AI Challenge",
      swags: ["T-Shirt", "Notebook", "Sticker Pack"]
    },
    
  ];

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">


      {winners.map((winner, index) => (
        <Card key={index + 1} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-start gap-4">
              {/* Profile */}
              <Avatar className="w-20 h-20">
                <AvatarImage src={winner.profileImage} alt={winner.name} />
                <AvatarFallback className="text-xl">{winner.name.charAt(0)}</AvatarFallback>
              </Avatar>

              {/* Content */}
              <div className="flex-1 space-y-3">
                {/* Name and Project */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-lg">{winner.name}</h3>

                  </div>
                  <p className="text-muted-foreground">{winner.projectTitle}</p>
                </div>

                {/* Rewards */}
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-1 text-purple-600">
                    <Star className="w-4 h-4" />
                    <span>{winner.experiencePoints.toLocaleString()} XP</span>
                  </div>
                  <div className="flex items-center gap-1 text-green-600">
                 
                  </div>
                  <div className="flex items-center gap-1 text-blue-600">
                    <Gift className="w-4 h-4" />
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

export default WinnersList;
