import React from "react";
import { Card, CardHeader } from "~/components/ui/card";

import { Trophy, IndianRupee, Gift, Star, Award } from "lucide-react";
import { getContestPizes } from "~/actions/contest";

interface Prizes {
  position_id: number;
  award_type: string;
  award_details: number;
}

interface Award {
  award_type: string;
  award_details: number;
}

type SuffixMap = Record<number, string>;

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

function getPositionString(position_id: number): string {
  const suffixes: SuffixMap = {
    1: 'st',
    2: 'nd',
    3: 'rd',
  };
  const lastDigit = position_id % 10;

  // Special case for 11, 12, and 13 since they don't follow the normal suffix pattern
  if (position_id >= 11 && position_id <= 13) {
    return `${position_id}th Prize`;
  }

  // Determine the suffix based on the last digit of the position_id
  const suffix = suffixes[lastDigit] ?? 'th';

  return `${position_id}${suffix} Prize`;
}

function insertIntoIndexedArray(prizesArray: Prizes[]): Award[][] {
  const result: Award[][] = [];

  prizesArray.forEach((prize) => {
    const index = prize.position_id - 1;
    while (result.length <= index) {
      result.push([]);
    }

    const award: Award = {
      award_type: prize.award_type,
      award_details: prize.award_details,
    };
    result[index]?.push(award);
  });

  return result;
}

const PrizesPage = async () => {

  const prizes = await getContestPizes(1);
  const prizesArray = insertIntoIndexedArray(prizes);

  return (
    <div className="mx-auto max-w-3xl space-y-4 p-4">


      {prizesArray.map((prize, index) => (

        <Card key={index + 1} className="transition-shadow hover:shadow-lg">
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
                  <h3 className="text-lg font-semibold">{getPositionString(index + 1)}</h3>
                </div>

                {/* Rewards */}
                <div className="flex flex-wrap gap-4 text-sm">
                  { /* Loop over prize array */}
                  {prize.map((award, idx) => (
                    <div key={idx + 1} className="flex items-center gap-1">
                      {award.award_type === "Cash Prize" && (
                        <React.Fragment >
                          <IndianRupee className="text-purple-600 h-4 w-4" />
                          <span className="text-purple-600">{award.award_details}</span>
                        </React.Fragment>
                      )}
                      {award.award_type === "Points" && (
                        <React.Fragment>
                          <Star className="text-green-600 h-4 w-4" />
                          <span className="text-green-600">{award.award_details} XP</span>
                        </React.Fragment>
                      )}
                      {award.award_type !== "Cash Prize" && award.award_type !== "Points" && (
                        <React.Fragment>
                          <Gift className="text-blue-600 h-4 w-4" />
                          <span className="text-blue-600">{award.award_details} - {award.award_type}</span>
                        </React.Fragment>
                      )}
                    </div>
                  ))}
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
