"use client";

import { useParams } from "next/navigation";
import { generateHTML } from "@tiptap/html";
import React, { useMemo } from "react";
import StarterKit from "@tiptap/starter-kit";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import TiptapLink from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TiptapUnderline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import { Markdown } from "tiptap-markdown";
import Highlight from "@tiptap/extension-highlight";
import { InputRule } from "@tiptap/core";
import Image from "@tiptap/extension-image";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import WinnersList from "./_components/winners/page";
import ApplicantsList from "./_components/participants/page";
import InformationPage from "./_components/information/page";
import PrizesPage from "./_components/prizes/page";

const defaultEditorContent = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: { level: 4 },
      content: [{ type: "text", text: "Novel Contest" }],
    },
    {
      type: "heading",
      attrs: { level: 2 },
      content: [{ type: "text", text: "Unleash Your Writing Prowess" }],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Welcome to the Novel Contest, an exciting opportunity for aspiring writers to showcase their literary talents. This contest invites you to submit your original novel manuscripts, where the winner will have the chance to work with our team of editors and see their work published. Get ready to embark on a thrilling journey of creativity, imagination, and literary excellence.",
        },
      ],
    }
  ],
};

const UpdatedImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
      },
      height: {
        default: null,
      },
    };
  },
});

const defaultExtensions = [
  StarterKit.configure({
    bulletList: {
      HTMLAttributes: {
        class: "list-disc list-outside leading-3 -mt-2",
      },
    },
    orderedList: {
      HTMLAttributes: {
        class: "list-decimal list-outside leading-3 -mt-2",
      },
    },
    listItem: {
      HTMLAttributes: {
        class: "leading-normal -mb-2",
      },
    },
    blockquote: {
      HTMLAttributes: {
        class: "border-l-4 border-stone-700",
      },
    },
    codeBlock: {
      HTMLAttributes: {
        class:
          "rounded-sm bg-stone-100 p-5 font-mono font-medium text-stone-800",
      },
    },
    code: {
      HTMLAttributes: {
        class:
          "rounded-md bg-stone-200 px-1.5 py-1 font-mono font-medium text-stone-900",
        spellcheck: "false",
      },
    },
    horizontalRule: false,
    dropcursor: {
      color: "#DBEAFE",
      width: 4,
    },
    gapcursor: false,
  }),
  HorizontalRule.extend({
    addInputRules() {
      return [
        new InputRule({
          find: /^(?:---|—-|___\s|\*\*\*\s)$/,
          handler: ({ state, range }) => {
            const attributes = {};
            const { tr } = state;
            const start = range.from;
            const end = range.to;
            tr.insert(start - 1, this.type.create(attributes)).delete(
              tr.mapping.map(start),
              tr.mapping.map(end),
            );
          },
        }),
      ];
    },
  }).configure({
    HTMLAttributes: {
      class: "mt-4 mb-6 border-t border-stone-300",
    },
  }),
  TiptapLink.configure({
    HTMLAttributes: {
      class:
        "text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer",
    },
  }),
  UpdatedImage.configure({
    HTMLAttributes: {
      class: "rounded-lg border border-stone-200",
    },
  }),
  Placeholder.configure({
    placeholder: ({ node }) => {
      if (node.type.name === "heading") {
        return `Heading ${node.attrs.level}`;
      }
      return "Press '/' for commands, or '++' for AI autocomplete...";
    },
    includeChildren: true,
  }),
  TiptapUnderline,
  TextStyle,
  Color,
  Highlight.configure({
    multicolor: true,
  }),
  TaskList.configure({
    HTMLAttributes: {
      class: "not-prose pl-2",
    },
  }),
  TaskItem.configure({
    HTMLAttributes: {
      class: "flex items-start my-4",
    },
    nested: true,
  }),
  Markdown.configure({
    html: false,
    transformCopiedText: true,
  }),
];

interface TabContentProps {
  output: string;
}

const TabContent: React.FC<TabContentProps> = ({ output }) => {
  return (
    <div className="mx-auto w-full">
      <TabsContent value="description">
        <div
          className="prose w-full leading-relaxed"
          dangerouslySetInnerHTML={{ __html: output }}
        />
      </TabsContent>

      <TabsContent value="info">
        <h2 className="mb-4 text-xl font-medium">Contest Information</h2>
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Important Dates</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Registration Opens:</span>
                    <span>Oct 15, 2024</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Submission Deadline:</span>
                    <span>Dec 10, 2024</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Winners Announced:</span>
                    <span>Dec 20, 2024</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">Rules</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Must be original work</li>
                  <li>Individual or team participation allowed</li>
                  <li>Follow submission guidelines</li>
                  <li>Adhere to code of conduct</li>
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Resources</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>API Documentation</li>
                  <li>Starter Templates</li>
                  <li>Tutorial Videos</li>
                  <li>Support Forums</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">Contact</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>Discord Community Channel</li>
                  <li>Email Support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="participants">
        <h2 className="mb-4 text-xl font-medium">Participants</h2>
        <div className="text-muted-foreground">
          Participants list will be displayed here...
        </div>
      </TabsContent>

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
        <TabsList className="grid w-full grid-cols-5 mb-8">
          <TabsTrigger value="description" className="flex items-center gap-2">
            <span className="inline">Description</span>
          </TabsTrigger>
          <TabsTrigger value="prizes" className="flex items-center gap-2">
            <span className="inline">Prizes</span>
          </TabsTrigger>
          <TabsTrigger value="info" className="flex items-center gap-2">
            <span className="inline">Info</span>
          </TabsTrigger>
          <TabsTrigger value="participants" className="flex items-center gap-2">
            <span className="inline">Participants</span>
          </TabsTrigger>
          <TabsTrigger value="winners" className="flex items-center gap-2">
            <span className="inline">Winners</span>
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

const ContestDetailsPage = () => {
  const { id } = useParams();

  console.log("id: ", id);

  const json = defaultEditorContent;

  const output = useMemo(() => {
    return generateHTML(json, defaultExtensions);
  }, [json]);

  return (
    <>
      <Card className="mx-auto my-8 w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="mb-2 text-xl">
            Google Chrome Built-in AI Challenge
          </CardTitle>
          <p className="text-base text-muted-foreground">
            Develop a web application or Chrome Extension that uses Chrome
            built-in AI APIs
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-base font-medium">
                    Who can participate
                  </span>
                  <span className="text-right text-base">
                    - Above legal age of majority in country of residence
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-base font-medium">Deadline</span>
                  <span className="text-base">4 Dec 2024 @ 1:15pm</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-base font-medium">Participation</span>
                  <span className="text-base">5,227 participants</span>
                </div>
              </div>
              <div className="space-y-4 text-right">
                <div className="flex flex-col space-y-2">
                  <span className="text-base font-medium">Prizes & Awards</span>
                  <span className="text-base">$650.00</span>
                  <span className="text-base">15 Exp points</span>
                </div>
              </div>
            </div>
            <div className="mt-8 flex items-center justify-between border-t pt-4">
              <div className="flex space-x-2">
                <Badge variant="default">Machine Learning/AI</Badge>
                <Badge variant="default">Web</Badge>
                <Badge variant="default">Beginner Friendly</Badge>
              </div>
              <Button
                variant="default"
                onClick={() => window.open("/join-hackathon")}
              >
                Join hackathon
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mx-auto w-full max-w-3xl">
        <HackathonTabs output={output} />
      </div>
    </>
  );
};

export default ContestDetailsPage;
