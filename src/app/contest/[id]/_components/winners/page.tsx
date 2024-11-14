import React from 'react';
import {
  Card,
  CardHeader
} from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

import { Trophy, Star, Gift} from "lucide-react";


interface Winner {
  name: string;
 
  profileImage: string;
  experiencePoints: number;
  cashPrize: number;
  swags: string[];
  projectTitle: string;
}

const WinnersList = () => {
  const winners: Winner[] = [
    {
      name: "Sarah Johnson",
      profileImage: "/api/placeholder/96/96",
      experiencePoints: 15000,
      cashPrize: 10000,
      projectTitle: "AI-Powered Code Review Assistant",
      swags: ["Premium Hoodie", "Mechanical Keyboard", "Dev Pack"]
    },
    {
      name: "Michael Chen",
      profileImage: "/api/placeholder/96/96",
      experiencePoints: 12000,
      cashPrize: 5000,
      projectTitle: "Smart Home Automation System",
      swags: ["Hoodie", "Tech Pack"]
    },
    {
      name: "Emily Davis",
      profileImage: "/api/placeholder/96/96",
      experiencePoints: 11000,
      cashPrize: 3000,
      projectTitle: "Blockchain-Based Voting System",
      swags: ["T-Shirt", "Notebook", "Sticker Pack"]
    },
    {
      name: "James Lee",
      profileImage: "/api/placeholder/96/96",
      experiencePoints: 14000,
      cashPrize: 7500,
      projectTitle: "Health Monitoring Wearable Device",
      swags: ["Premium Hoodie", "Water Bottle", "Fitness Tracker"]
    },
    {
      name: "Sophia Patel",
      profileImage: "/api/placeholder/96/96",
      experiencePoints: 13000,
      cashPrize: 6000,
      projectTitle: "Real-Time Language Translator",
      swags: ["Cap", "Phone Stand", "Tech Pack"]
    },
    {
      name: "David Kim",
      profileImage: "/api/placeholder/96/96",
      experiencePoints: 16000,
      cashPrize: 12000,
      projectTitle: "Augmented Reality Shopping App",
      swags: ["Premium Jacket", "Bluetooth Speaker", "Gift Card"]
    }
  ];
  
  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
     

      {winners.map((winner, index) => (
        <Card key={index+1} className="hover:shadow-lg transition-shadow">
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
                    <Trophy className="w-4 h-4" />
                    <span>${winner.cashPrize.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1 text-blue-600">
                    <Gift className="w-4 h-4" />
                    <span>{winner.swags.join(", ")}</span>
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
