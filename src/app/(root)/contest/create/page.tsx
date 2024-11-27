"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Image from "next/image";
import { UploadButton } from "~/utils/uploadthing";
import { Badge } from "~/components/ui/badge";
import Editor from "~/components/editor";
import { formSchema } from "~/utils/validation";
import { Award, Plus, Trash2, Trophy } from "lucide-react";
// import { createContest } from "~/lib/actions";
// import { Contest, createContest } from "~/lib/actions";

const defaultValue = { "type": "doc", "content": [{ "type": "paragraph" }] }

export type RewardEntry = {
  expPoints?: number | null;
  cashPrize?: number | null;
  swagCount?: number | null;
};

const CreateContestForm = () => {
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [rewards, setRewards] = useState<RewardEntry[]>([{
    expPoints: null,
    cashPrize: null,
    swagCount: null
  }]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      description: "",
      banner: "",
      badges: "",
      rewards
    },
  });

  const addRewardEntry = () => {
    setRewards([
      ...rewards,
      { expPoints: null, cashPrize: null, swagCount: null }
    ]);
  };

  // Function to remove a reward entry
  const removeRewardEntry = (indexToRemove: number) => {
    if (rewards.length > 1) {
      setRewards(rewards.filter((_, index) => index !== indexToRemove));
    }
  };

  // Function to render the appropriate icon based on position
  const renderPositionIcon = (index: number) => {
    if (rewards.length > 0) {
      switch (index) {
        case 0:
          return <Trophy className="h-6 w-6 mr-1 text-yellow-500" />;
        case 1:
          return <Award className="h-6 w-6 text-amber-600" />;
        case 2:
          return <Award className="h-6 w-6 text-gray-400" />;
        default:
          return <Trophy className="h-6 w-6 text-gray-400" />;
      }
    }
    return null;
  };

  const uploadImageToStorage = async (file: File): Promise<string> => {
    // Simulate upload time
    // For demonstration, we just return a placeholder URL
    return URL.createObjectURL(file);
  };

  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Upload the file to storage
      try {
        const uploadedUrl = await uploadImageToStorage(file);
        form.setValue("banner", uploadedUrl); // Set the uploaded URL as the banner value
      } catch (error) {
        console.error("Failed to upload banner image:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  useEffect(() => {
    form.setValue("rewards", rewards.map(reward => ({
      expPoints: reward.expPoints ?? null,
      cashPrize: reward.cashPrize ?? null,
      swagCount: reward.swagCount ?? null
    })));
  }, [rewards, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Handle form submission
    const constestToBeInserted = {
      title: values.title,
      subTitle: values.subtitle,
      tags: values.badges,
      description: values.description,
      bannerUrl: values.banner,
      status: "A",
      difficultyLevel: "Medium",
      startDate: '01/02/2025',
      endDate: '01/04/2025'
    }
    // createContest(constestToBeInserted)
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="mx-auto max-w-3xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Create New Contest
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contest Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter contest title" {...field} />
                    </FormControl>
                    <FormDescription>
                      Give your contest a clear and engaging title.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Subtitle */}
              <FormField
                control={form.control}
                name="subtitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subtitle</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter a brief subtitle" {...field} />
                    </FormControl>
                    <FormDescription>
                      A short description that appears under the title.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Banner Upload */}
              <FormItem>
                <FormLabel>Banner Image</FormLabel>
                <FormControl>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleBannerUpload}
                        className="hidden"
                        id="banner-upload"
                      />
                      <Label
                        htmlFor="banner-upload"
                        className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <UploadButton
                          endpoint="imageUploader"
                          onClientUploadComplete={(res) => {
                            // Do something with the response

                            form.setValue('banner', (res?.[0]?.url ?? ''));
                          }}
                          onUploadError={(error: Error) => {
                            // console.log("Error: ", error) 
                          }}
                        />
                      </Label>
                    </div>
                    {bannerPreview && (
                      <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                        <Image
                          src={bannerPreview}
                          alt="Banner preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormDescription>
                  Upload a 1200x630px banner image.
                </FormDescription>
                <FormMessage />
              </FormItem>

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Editor initialValue={defaultValue}
                        placeholder="Enter contest description..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide detailed information about your contest, including
                      rules, requirements, and judging criteria.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="badges"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Badges</FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        <Input
                          placeholder="Enter badges separated by commas (e.g., React, TypeScript, Web)"
                          {...field}
                        />
                        <div className="flex flex-wrap gap-2">
                          {field.value
                            .split(",")
                            .map((badge) => badge.trim())
                            .filter((badge) => badge !== "")
                            .map((badge, index) => (
                              <Badge key={index + 1} variant="default">
                                {badge}
                              </Badge>
                            ))}
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription>
                      Add relevant tags for your contest (e.g., technologies,
                      categories)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Rewards Section with Dynamic Entries */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Rewards</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addRewardEntry}
                    className="flex items-center gap-2"
                  >
                    <Plus size={16} /> Add Reward
                  </Button>
                </div>
                {rewards.map((reward, index) => (
                  <div key={index + 1} className="relative">
                    {rewards.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeRewardEntry(index)}
                        className="absolute right-0 top-0 z-10"
                      >
                        <Trash2 size={16} className="text-destructive" />
                      </Button>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Experience Points */}
                      <FormItem>
                        <FormLabel>Experience Points</FormLabel>

                        <FormControl>
                          <div className="flex items-center">
                            {renderPositionIcon(index)}
                            <Input
                              type="number"
                              placeholder="Enter XP points"
                              value={reward.expPoints ?? ''}
                              onChange={(e) => {
                                const newRewards = [...rewards];
                                const value = e.target.value;
                                newRewards[index] = {
                                  ...newRewards[index],
                                  expPoints: value === '' ? null : Number(value)
                                };
                                setRewards(newRewards);
                              }}
                              className="pr-12"
                            />
                            <span className="ml-[-40px] text-sm text-muted-foreground">
                              XP
                            </span>
                          </div>
                        </FormControl>
                      </FormItem>

                      {/* Cash Prize */}
                      <FormItem>
                        <FormLabel>Cash Prize</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                              $
                            </span>
                            <Input
                              type="number"
                              placeholder="Enter amount"
                              value={reward.cashPrize ?? ''}
                              onChange={(e) => {
                                const newRewards = [...rewards];
                                const value = e.target.value;
                                newRewards[index] = {
                                  ...newRewards[index],
                                  cashPrize: value === '' ? null : Number(value)
                                };
                                setRewards(newRewards);
                              }}
                              className="pl-7"
                            />
                          </div>
                        </FormControl>
                      </FormItem>

                      {/* Swag Count */}
                      <FormItem>
                        <FormLabel>Number of Swags</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter swag count"
                            value={reward.swagCount ?? ''}
                            onChange={(e) => {
                              const newRewards = [...rewards];
                              const value = e.target.value;
                              newRewards[index] = {
                                ...newRewards[index],
                                swagCount: value === '' ? null : Number(value)
                              };
                              setRewards(newRewards);
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    </div>
                  </div>
                ))}
              </div>

              {/* Rest of the form remains the same */}
              <div className="flex justify-between gap-4">
                <Button variant="outline" type="button">
                  Cancel
                </Button>
                <Button type="submit">Create Contest</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateContestForm;
