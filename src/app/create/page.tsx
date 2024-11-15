"use client";

import React, { useState } from "react";
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

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  subtitle: z.string().min(10, {
    message: "Subtitle must be at least 10 characters.",
  }),
  description: z.string().min(50, {
    message: "Description must be at least 50 characters.",
  }),
  banner: z.string().optional(),
  badges: z.string(), // For the comma-separated badges input
  expPoints: z.number().nullable(),
  cashPrize: z.number().nullable(),
  swagCount: z.number().nullable(),
});

const defaultValue = { "type": "doc", "content": [{ "type": "paragraph" }] }

const CreateContestForm = () => {
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [content, setContent] = useState<string>('')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      description: content,
      banner: "",
      badges: "",
      expPoints: null,
      cashPrize: null,
      swagCount: null,

    },
  });

  const uploadImageToStorage = async (file: File): Promise<string> => {
    // Simulate upload time
    await new Promise((resolve) => setTimeout(resolve, 2000));
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("clicked");

    console.log(values);
    // Handle form submission
  }

  console.log("description: ", content);

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
                            console.log("Files: ", res);
                          }}
                          onUploadError={(error: Error) => { console.log("Error: ", error) }}
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
                        onChange={setContent}
                        placeholder="Enter contest description..."
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
                          onChange={(e) => {
                            field.onChange(e);
                            // Update badges preview
                            const badgeValues = e.target.value
                              .split(",")
                              .map((badge) => badge.trim())
                              .filter((badge) => badge !== "");
                          }}
                        />
                        <div className="flex flex-wrap gap-2">
                          {field.value
                            .split(",")
                            .map((badge) => badge.trim())
                            .filter((badge) => badge !== "")
                            .map((badge, index) => (
                              <Badge key={index + 1} variant="secondary">
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

              {/* Rewards Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Rewards</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Experience Points */}
                  <FormField
                    control={form.control}
                    name="expPoints"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Experience Points</FormLabel>
                        <FormControl>
                          <div className="flex items-center">
                            <Input
                              type="number"
                              placeholder="Enter XP points"
                              {...field}
                              value={field.value ?? ''}
                              onChange={(e) => {
                                const value = e.target.value;
                                field.onChange(value === '' ? null : Number(value));
                              }}
                              className="pr-12"
                            />
                            <span className="ml-[-40px] text-sm text-muted-foreground">
                              XP
                            </span>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Cash Prize */}
                  <FormField
                    control={form.control}
                    name="cashPrize"
                    render={({ field }) => (
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
                              {...field}
                              value={field.value
                                ?? ''}
                              onChange={(e) => {
                                const value = e.target.value;
                                field.onChange(value === '' ? null : Number(value));
                              }}
                              className="pl-7"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Swag Count */}
                  <FormField
                    control={form.control}
                    name="swagCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Swags</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter swag count"
                            {...field}
                            value={field.value ?? ''}
                            onChange={(e) => {
                              const value = e.target.value;
                              field.onChange(value === '' ? null : Number(value));
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="outline" type="button">
                  Cancel
                </Button>
                <Button type="submit" onClick={() => { console.log("cileicekjflasf") }}>Create Contest</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateContestForm;
