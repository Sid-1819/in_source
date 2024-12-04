import React from "react";
import { JSONContent } from "@tiptap/core";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import WinnersList from "./winners/page";
import InformationPage from "./information/page";
import PrizesPage from "./prizes/page";
import { getUserIdByEmail } from "~/server/queries";
import ApplicantsList from "./participants/page";
import Image from 'next/image';
import { FileText, Info, Trophy, Users } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import JoinButton from "./join-button";
import { handleAddParticipation, isUserJoined } from "~/lib/actions"
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { getContestById } from "~/actions/contest";
import { addParticipation } from "~/actions/participations";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic"

interface TabContentProps {
  output: string;
}

interface AddParticipation {
  contest_id: string;
  user_id: string;
  start_date: string;
  end_date: string;
  participation_date: string
}

const TabContent: React.FC<TabContentProps> = ({ output }) => {
  return (
    <div className="mx-auto w-full">
      {/* Description Tab Content */}
      <TabsContent value="description">
        <div
          className="prose w-full leading-relaxed"
          dangerouslySetInnerHTML={{ __html: output }}
        />
      </TabsContent>

      {/* Info Tab Content */}
      <TabsContent value="info">
        <h2 className="mb-4 text-xl font-medium">Contest Information</h2>
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 font-medium">Important Dates</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">
                      Registration Opens:
                    </span>
                    <span>Oct 15, 2024</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">
                      Submission Deadline:
                    </span>
                    <span>Dec 10, 2024</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">
                      Winners Announced:
                    </span>
                    <span>Dec 20, 2024</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mb-2 font-medium">Rules</h3>
                <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                  <li>Must be original work</li>
                  <li>Individual or team participation allowed</li>
                  <li>Follow submission guidelines</li>
                  <li>Adhere to code of conduct</li>
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 font-medium">Resources</h3>
                <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                  <li>API Documentation</li>
                  <li>Starter Templates</li>
                  <li>Tutorial Videos</li>
                  <li>Support Forums</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-2 font-medium">Contact</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>Discord Community Channel</li>
                  <li>Email Support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>

      {/* Participants Tab Content */}
      <TabsContent value="participants">
        <h2 className="mb-4 text-xl font-medium">Participants</h2>
        <div className="text-muted-foreground">
          Participants list will be displayed here...
        </div>
      </TabsContent>

      {/* Winners Tab Content */}
      <TabsContent value="winners">
        <h2 className="mb-4 text-xl font-medium">Winners</h2>
        <div className="text-muted-foreground">
          Winners will be announced after the contest...
        </div>
      </TabsContent>
    </div>
  );
};

const HackathonTabs: React.FC<TabContentProps> = ({ output }) => {

  return (
    <div className="mx-auto w-full max-w-3xl">
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="mb-8 grid w-full grid-cols-5">
          <TabsTrigger value="description" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="text-xs sm:text-sm">Description</span>
          </TabsTrigger>
          <TabsTrigger value="prizes" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            <span className="text-xs sm:text-sm">Prizes</span>
          </TabsTrigger>
          <TabsTrigger value="info" className="flex items-center gap-2">
            <Info className="h-4 w-4" />
            <span className="text-xs sm:text-sm">Info</span>
          </TabsTrigger>
          <TabsTrigger value="participants" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="text-xs sm:text-sm">Participants</span>
          </TabsTrigger>
          <TabsTrigger value="winners" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            <span className="text-xs sm:text-sm">Winners</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="description">
          <TabContent output={output} />
        </TabsContent>

        <TabsContent value="prizes">
          <PrizesPage />
        </TabsContent>

        <TabsContent value="info">
          <InformationPage />
        </TabsContent>

        <TabsContent value="participants">
          <ApplicantsList />
        </TabsContent>

        <TabsContent value="winners">
          <WinnersList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default async function ContestDetailsContent(props: Readonly<{ id: string }>) {
  const filterOutImages = (content: JSONContent): JSONContent => {
    if (!content) return content;

    // Filter out image nodes from content array
    if (Array.isArray(content.content)) {
      content.content = content.content.filter(node => node.type !== 'image');
      // Recursively filter nested content
      content.content = content.content.map(node => filterOutImages(node));
    }

    return content;
  };

  const contestId = props.id;
  const contestById = await getContestById(contestId);

  const tagArray = contestById?.tags?.split(",").map((tag) => tag.trim());
  const descriptionHTML = contestById?.description ?? "";

  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress ?? "john@example.com";
  const userId = await getUserIdByEmail(email) ?? "65";

  const isAlreadyParticipated = await isUserJoined(userId, contestId)

  return (
    <>
      {/* Header Card */}
      <Card className="mx-auto my-8 w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="mb-2 text-xl">
            {contestById?.title}
          </CardTitle>
          <p className="text-base text-muted-foreground">
            {contestById?.subTitle}
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="flex-col justify-start">
                  <div className="text-base font-medium">
                    Who can participate
                  </div>
                  <div className=" text-base">
                    - CMSS Employees
                  </div>
                </div>
                <div className="flex-col justify-start">
                  <div className="text-base font-medium">Deadline</div>
                  <div className="text-base">4 Dec 2024 @ 1:15pm</div>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-4">
                <div className="flex flex-col">
                  <span className="text-right font-medium ">Participation</span>
                  <span className="text-right">5,227 participants</span>

                </div>
                {!isAlreadyParticipated ? (
                  <form action={handleAddParticipation}>
                    <input
                      type="hidden"
                      name="contestId"
                      value={contestId}
                    />
                    <input
                      type="hidden"
                      name="userId"
                      value={userId}
                    />
                    <JoinButton
                      contestId={contestId}
                      userId={userId}
                    />
                  </form>
                ) : (
                  <Link
                    href={`/user/create-submission?contestId=${contestId}&userId=${userId}`}
                  >
                    <Button
                      variant="default"
                      type="submit"
                    >
                      Submit
                    </Button>

                  </Link>
                )}
              </div>
            </div>
            <div className="mt-8 flex-col space-y-8 items-center justify-between border-t pt-4">
              <div className="flex-1 space-x-2">
                {tagArray?.map((badge, index) => (
                  <Badge key={index + 1} variant="outline">
                    {badge}
                  </Badge>
                ))}
              </div>
              <Image
                src={contestById?.bannerUrl ?? ""}
                alt={contestById?.title ?? ""}
                width={800}
                height={200} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Description */}
      <div className="mx-auto w-full max-w-3xl">
        <HackathonTabs output={descriptionHTML} />
      </div>
    </>
  );
}
