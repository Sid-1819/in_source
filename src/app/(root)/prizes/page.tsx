import React from "react";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Trophy, Medal, Gift } from "lucide-react";

interface Prize {
  rank: number;
  awards: Array<{
    item: string;
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
    <Card className="my-4 flex flex-row shadow-none hover:shadow-md">
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          {getRankBadge(prize.rank)}

        </div>
      </CardHeader>
      <CardContent className=" ml-8 p-2 font-semibold">
        {prize.awards.map((award, index) => (
          <div key={index + 1} className=" text-lg mt-2">
            {award.item}
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
          item: "MacBook Air",
        },
      ],
    },
    {
      rank: 2,
      awards: [
        {
          item: "iPhone",
        },
      ],
    },
    {
      rank: 3,
      awards: [
        {
          item: "iPhone",
        },
      ],
    },
    {
      rank: 4,
      awards: [
        {
          item: "Mac Mini",
        },
      ],
    },
    {
      rank: 5,
      awards: [
        {
          item: "Mac Mini",
        },
      ],
    },
    ...Array.from({ length: 5 }, (_, i) => ({
      rank: i + 6,
      awards: [
        {
          item: "Bose Headphones (Moment)",
        },
      ],
    })),
    ...Array.from({ length: 5 }, (_, i) => ({
      rank: i + 11,
      awards: [
        {
          item: "Fossil Grant Watch",
        },
      ],
    })),
    ...Array.from({ length: 5 }, (_, i) => ({
      rank: i + 16,
      awards: [
        {
          item: "Samsonite Laptop Bag",
        },
      ],
    })),
  ];

  return (
    <div className="mx-auto max-w-4xl ">
      <div className="mb-6 flex items-center gap-2">
        <Gift className="h-6 w-6 text-purple-500" />
        <h1 className="text-2xl font-bold">Season Prizes (Dec&apos;24 - Dec&apos;25)</h1>
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
