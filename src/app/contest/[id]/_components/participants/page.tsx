import React from "react";
import { Card, CardHeader } from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

import { UsersRound, Calendar } from "lucide-react";

interface Applicant {
  name: string;
  experiencePoints: number;
}

const ApplicantsList = () => {
  const applicants: Applicant[] = [
    {
      name: "Sarah Johnson",
      experiencePoints: 15000,
    },
    {
      name: "Michael Chen",
      experiencePoints: 12000,
    },
    {
      name: "Emily Davis",
      experiencePoints: 11000,
    },
    {
      name: "James Lee",
      experiencePoints: 14000,
    },
    {
      name: "Sophia Patel",
      experiencePoints: 13000,
    },
    {
      name: "David Kim",
      experiencePoints: 16000,
    },
  ];

  return (
    <div className="mx-auto max-w-3xl space-y-4 p-4">


      {applicants.map((applicant, index) => (
        <Card key={index + 1} className="transition-shadow hover:shadow-lg">
          <CardHeader>
            <div className="flex items-start gap-4">
              {/* Profile */}
              <Avatar className="h-20 w-20">
                <AvatarImage
                  // src={applicant.profileImage}
                  alt={applicant.name}
                />
                <AvatarFallback className="text-xl">
                  {applicant.name.charAt(0)}
                </AvatarFallback>
              </Avatar>

              {/* Content */}
              <div className="flex-1 space-y-3">
                {/* Name and Project */}
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <h3 className="text-lg font-semibold">{applicant.name}</h3>
                  </div>
                </div>

                {/* Rewards */}
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="space-between flex gap-1 text-blue-600">
                    <Calendar className="h-4 w-4" />
                    <span>Date applied: {`11 th Nov, 2024`}</span>
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

export default ApplicantsList;
