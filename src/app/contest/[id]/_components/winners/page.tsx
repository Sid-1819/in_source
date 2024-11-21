import React from 'react';
import {
  Card,
  CardHeader
} from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

import { Trophy, Star, Gift } from "lucide-react";
import { getContestWinners } from '~/server/queries';
import { modifyUsernames } from '~/utils';


interface Winner {
  username: string;
  points: number;
  swag_prize: number;
}

const WinnersList = async () => {

  let constestwinner: Winner[] = await getContestWinners(1);
  constestwinner = modifyUsernames(constestwinner);

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">


      {constestwinner.map((winner, index) => (
        <Card key={index + 1} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-start gap-4">
              {/* Profile */}
              <Avatar className="w-20 h-20">
                <AvatarImage alt={winner.username.charAt(0)} />
                <AvatarFallback className="text-xl">{winner.username.charAt(0)}</AvatarFallback>
              </Avatar>

              {/* Content */}
              <div className="flex-1 space-y-3">
                {/* Name and Project */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-lg">{winner.username}</h3>

                  </div>
                </div>

                {/* Rewards */}
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-1 text-purple-600">
                    <Star className="w-4 h-4" />
                    <span>{winner.points.toLocaleString()} XP</span>
                  </div>
                  <div className="flex items-center gap-1 text-green-600">

                  </div>

                  {/* issue with query, doesn't fetch swag bags for same user */}
                  {/* {winner.swag_prize > 0 && ( */}

                  <div className="flex items-center gap-1 text-blue-600">
                    <Gift className="w-4 h-4" />

                    {/* Hard Coding in query as 1 for time being */}
                    <span>{winner.swag_prize} Swag Bags</span>
                  </div>

                  {/* )} */}

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
