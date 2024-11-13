import React from 'react';
import {
  Card,
  CardHeader
} from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

import { UsersRound, Star, Calendar } from "lucide-react";


interface Applicant {
  name: string;
  profileImage: string;
  experiencePoints: number;
}

const ApplicantsList = () => {
  const applicants: Applicant[] = [
    {
      name: "Sarah Johnson",
      profileImage: "/api/placeholder/96/96",
      experiencePoints: 15000
    },
    {
      name: "Michael Chen",
      profileImage: "/api/placeholder/96/96",
      experiencePoints: 12000
    },
    {
      name: "Emily Davis",
      profileImage: "/api/placeholder/96/96",
      experiencePoints: 11000
    },
    {
      name: "James Lee",
      profileImage: "/api/placeholder/96/96",
      experiencePoints: 14000
    },
    {
      name: "Sophia Patel",
      profileImage: "/api/placeholder/96/96",
      experiencePoints: 13000
    },
    {
      name: "David Kim",
      profileImage: "/api/placeholder/96/96",
      experiencePoints: 16000
    }
  ];


  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <UsersRound className="w-8 h-8 text-black" />
        <h1 className="text-3xl font-bold">Applicants</h1>
      </div>

      {applicants.map((applicant, index) => (
        <Card key={index + 1} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-start gap-4">
              {/* Profile */}
              <Avatar className="w-20 h-20">
                <AvatarImage src={applicant.profileImage} alt={applicant.name} />
                <AvatarFallback className="text-xl">{applicant.name.charAt(0)}</AvatarFallback>
              </Avatar>

              {/* Content */}
              <div className="flex-1 space-y-3">
                {/* Name and Project */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-lg">{applicant.name}</h3>
                  </div>
                </div>

                {/* Rewards */}
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-1 text-purple-600">
                    <Star className="w-4 h-4" />
                    <span>{applicant.experiencePoints.toLocaleString()} XP</span>
                  </div>
                  <div className="flex space-between gap-1 text-blue-600">
                    <Calendar className="w-4 h-4" />
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