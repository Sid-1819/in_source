"use client";

import React, { useState, useCallback, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  FormProvider,
  Controller,
  useFieldArray,
  useFormContext
} from "react-hook-form";
import * as z from "zod";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "~/components/ui/select";  // Changed from Radix to shadcn/ui
import {
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { UploadButton } from "~/utils/uploadthing";
import Image from "next/image";
import { Award, Plus, Trash2, Trophy, Check } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/utils";
import { toast } from "~/hooks/use-toast"
import Editor from "~/components/editor";
import { extensions, generateHTML, JSONContent } from "@tiptap/core";
import { defaultExtensions } from "~/components/editor/extensions";


// Comprehensive form schema with detailed validations
const contestFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  subtitle: z.string().optional(),
  difficultyLevel: z.enum(["Easy", "Medium", "Hard"]),
  description: z.string().min(10, "Description must be at least 10 characters"),
  customPages: z.array(
    z.object({
      title: z.string().min(3, "Page title must be at least 3 characters"),
      content: z.string(),
      displayOrder: z.number().min(1, "Display order must be at least 1")
    })
  ).optional(),
  banner: z.string().optional(),
  referenceLinks: z.array(z.string().url("Invalid URL")).optional(),
  badges: z.string().optional(),
  rewards: z.array(
    z.object({
      expPoints: z.number().nullable().optional(),
      cashPrize: z.number().nullable().optional(),
      swagCount: z.number().nullable().optional()
    })
  ).optional()
});

const defaultValue = { type: "doc", content: [{ type: "paragraph" }] }

type ContestFormValues = z.infer<typeof contestFormSchema>;


// Default values for consistent initialization
const DEFAULT_VALUES: Partial<ContestFormValues> = {
  title: "",
  subtitle: "",
  difficultyLevel: "Medium",
  description: JSON.stringify(defaultValue),
  customPages: [],
  referenceLinks: [],
  rewards: [{
    expPoints: null,
    cashPrize: null,
    swagCount: null
  }]
};

// Enhanced Stepper with more visual feedback
const Stepper = ({
  steps,
  currentStep,
  completedSteps
}: {
  steps: Array<{ title: string }>,
  currentStep: number,
  completedSteps: number[]
}) => {
  return (
    <div className="flex justify-between items-center mb-6 space-x-2">
      {steps.map((step, index) => (
        <div
          key={index + 1}
          className={cn(
            "flex-1 flex items-center",
            index > currentStep && "opacity-50"
          )}
        >
          <div
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center mr-2 transition-all duration-300",
              index === currentStep
                ? "bg-primary text-primary-foreground scale-110"
                : completedSteps.includes(index)
                  ? "bg-green-500 text-white"
                  : "bg-muted text-muted-foreground"
            )}
          >
            {completedSteps.includes(index) ? (
              <Check size={16} />
            ) : (
              index + 1
            )}
          </div>
          <span className="text-sm font-medium">{step.title}</span>
        </div>
      ))}
    </div>
  );
};


const CreateContestStepper: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Comprehensive form methods with detailed configuration
  const methods = useForm<ContestFormValues>({
    resolver: zodResolver(contestFormSchema),
    defaultValues: DEFAULT_VALUES,
    mode: 'onChange',
    reValidateMode: 'onChange'
  });


  // Step configuration with associated validation fields
  const steps = useMemo(
    () => [
      {
        title: "Basic Information",
        component: BasicInfoStep,
        validationFields: ['title', 'subtitle', 'difficultyLevel', 'description'] as const,
      },
      {
        title: "Custom Pages",
        component: CustomPagesStep,
        validationFields: ['customPages'] as const,
      },
      {
        title: "Rewards",
        component: RewardsStep,
        validationFields: ['rewards'] as const,
      },
      {
        title: "Metadata",
        component: MetadataStep,
        validationFields: ['banner', 'badges', 'referenceLinks'] as const,
      },
    ],
    []
  );

  // Enhanced step navigation with comprehensive validation
  const navigateStep = useCallback(
    async (direction: 'next' | 'prev') => {
      const currentStepConfig = steps[currentStep];

      if (!currentStepConfig) {
        // Safeguard against undefined currentStepConfig
        return;
      }

      if (direction === 'next') {
        const isValid = await methods.trigger(currentStepConfig.validationFields);

        if (!isValid) {
          toast({
            title: "Validation Error",
            description: "Please complete all required fields.",
            variant: "destructive",
          });
          return;
        }

        // Only add to completed steps if not already completed
        if (!completedSteps.includes(currentStep)) {
          setCompletedSteps((prev) => [...prev, currentStep]);
        }

        // Move to next step or stay on the same step for the last page
        if (currentStep < steps.length - 1) {
          setCurrentStep((prev) => prev + 1);
        }
      } else {
        if (currentStep > 0) {
          setCurrentStep((prev) => prev - 1);
        }
      }
    },
    [currentStep, steps, methods, completedSteps]
  );


  // Final submission handler
  const onSubmit = useCallback((values: ContestFormValues) => {
    console.log("Full Contest Submission:", values);
    toast({
      title: "Contest Created",
      description: "Your contest has been successfully submitted.",
      variant: "default"
    });
    // Implement actual submission logic here
  }, []);


  const CurrentStepComponent = steps[currentStep]?.component;

  if (!CurrentStepComponent) {
    // Handle the case where the component is undefined
    return <div>Error: Invalid step.</div>;
  }


  function isLastPage(i: number, j: number) {
    console.log("current steps: ", i, "steps.length: ", j)
    const res = i - 1 !== j;
    console.log("res: ", res);
    return res;
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="mx-auto max-w-3xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold mb-4">
            Create New Contest
          </CardTitle>
          <Stepper
            steps={steps}
            currentStep={currentStep}
            completedSteps={completedSteps}
          />
        </CardHeader>
        <CardContent>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit, (errors) => {
                console.error("Form Validation Errors:", errors);
                toast({
                  title: "Submission Error",
                  description: "Please review and correct form errors.",
                  variant: "destructive"
                });
              })}
              className="space-y-8"
            >
              <CurrentStepComponent />


              <div className="flex justify-end space-x-2">
                {currentStep > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigateStep('prev')}
                  >
                    Previous
                  </Button>
                )}
                {currentStep + 1 < steps.length && (
                  <Button
                    type="button"
                    variant="default"
                    onClick={() => navigateStep('next')}
                  >
                    Next
                  </Button>
                )}

                {currentStep + 1 == steps.length && (
                  <Button type="submit">Create Contest</Button>
                )}
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
};


const BasicInfoStep = () => {
  const { control } = useFormContext<ContestFormValues>();

  return (
    <div className="space-y-6">
      {/* Title */}
      <Controller
        name="title"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <FormItem>
            <FormLabel>Contest Title</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter contest title"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Give your contest a clear and engaging title.
            </FormDescription>
            {error && <FormMessage>{error.message}</FormMessage>}
          </FormItem>
        )}
      />

      {/* Subtitle */}
      <Controller
        name="subtitle"
        control={control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Subtitle</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter a brief subtitle"
                {...field}
              />
            </FormControl>
            <FormDescription>
              A short description that appears under the title.
            </FormDescription>
          </FormItem>
        )}
      />

      {/* Difficulty Level */}
      <Controller
        name="difficultyLevel"
        control={control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Difficulty Level</FormLabel>
            <FormControl>
              <Select
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormDescription>
              Choose the complexity level of the contest.
            </FormDescription>
          </FormItem>
        )}
      />

      {/* Rest of the component remains the same */}
      {/* Description */}
      <Controller
        name="description"
        control={control}
        render={({ field, fieldState: { error } }) => {
          let initialValue;
          try {
            initialValue = JSON.parse(field.value ?? JSON.stringify(defaultValue)) as JSONContent;
          } catch {
            initialValue = defaultValue;
          }

          return (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Editor
                  initialValue={initialValue}
                  placeholder="Enter contest description..."
                  {...field}
                  onChange={(value) => field.onChange(JSON.stringify(value))}
                />
              </FormControl>
              <FormDescription>
                Provide detailed information about your contest, including
                rules, requirements, and judging criteria.
              </FormDescription>
              {error && <FormMessage>{error.message}</FormMessage>}
            </FormItem>
          );
        }}
      />
    </div>
  );
};


const CustomPagesStep = () => {
  const { control, setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "customPages",
  });

  // Initialize with one page by default
  useEffect(() => {
    if (fields.length === 0) {
      setValue("customPages", [
        {
          title: "",
          content: defaultValue,
          displayOrder: 1,
        },
      ]);
    }
  }, [fields, setValue]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Custom Pages</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            append({
              title: "",
              content: defaultValue,
              displayOrder: fields.length + 1,
            })
          }
          className="flex items-center gap-2"
        >
          <Plus size={16} /> Add Page
        </Button>
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="space-y-4 relative">
          {fields.length > 1 && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => remove(index)}
              className="absolute right-0 top-0 z-10"
            >
              <Trash2 size={16} className="text-destructive" />
            </Button>
          )}

          {/* Page Title */}
          <Controller
            name={`customPages.${index}.title`}
            control={control}
            render={({ field: titleField, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>Page Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter page title"
                    {...titleField}
                  />
                </FormControl>
                {error && <FormMessage>{error.message}</FormMessage>}
              </FormItem>
            )}
          />

          {/* Page Content */}
          <Controller
            name={`customPages.${index}.content`}
            control={control}
            render={({ field: contentField }) => (
              <FormItem>
                <FormLabel>Page Content</FormLabel>
                <FormControl>
                  <Editor
                    initialValue={defaultValue}
                    placeholder="Enter page content..."
                    {...contentField}
                  />
                </FormControl>
                <FormDescription>
                  Provide detailed content for this custom page.
                </FormDescription>
              </FormItem>
            )}
          />

          {/* Display Order */}
          <Controller
            name={`customPages.${index}.displayOrder`}
            control={control}
            render={({ field: orderField, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>Display Order</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter display order"
                    {...orderField}
                    onChange={(e) =>
                      orderField.onChange(Number(e.target.value))
                    }
                  />
                </FormControl>
                <FormDescription>
                  Determine the order this page appears in the contest.
                </FormDescription>
                {error && <FormMessage>{error.message}</FormMessage>}
              </FormItem>
            )}
          />
        </div>
      ))}
    </div>
  );
};


const RewardsStep = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "rewards"
  });


  // Function to render the appropriate icon based on position
  const renderPositionIcon = (index: number) => {
    if (fields.length > 0) {
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


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Contest Rewards</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({
            expPoints: null,
            cashPrize: null,
            swagCount: null
          })}
          className="flex items-center gap-2"
        >
          <Plus size={16} /> Add Reward
        </Button>
      </div>


      {fields.map((field, index) => (
        <div key={field.id} className="relative space-y-4">
          {fields.length > 1 && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => remove(index)}
              className="absolute right-0 top-0 z-10"
            >
              <Trash2 size={16} className="text-destructive" />
            </Button>
          )}


          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Experience Points */}
            <Controller
              name={`rewards.${index}.expPoints`}
              control={control}
              render={({ field: expField }) => (
                <FormItem>
                  <FormLabel>Experience Points</FormLabel>
                  <FormControl>
                    <div className="flex items-center">
                      {renderPositionIcon(index)}
                      <Input
                        type="number"
                        placeholder="Enter XP points"
                        {...expField}
                        value={expField.value as string ?? ''}
                        onChange={(e) => {
                          const value = e.target.value;
                          expField.onChange(
                            value === '' ? null : Number(value)
                          );
                        }}
                        className="pr-12"
                      />
                      <span className="ml-[-40px] text-sm text-muted-foreground">
                        XP
                      </span>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Experience points awarded for this position.
                  </FormDescription>
                </FormItem>
              )}
            />


            {/* Cash Prize */}
            <Controller
              name={`rewards.${index}.cashPrize`}
              control={control}
              render={({ field: cashField }) => (
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
                        {...cashField}
                        value={cashField.value as string ?? ''}
                        onChange={(e) => {
                          const value = e.target.value;
                          cashField.onChange(
                            value === '' ? null : Number(value)
                          );
                        }}
                        className="pl-7"
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Monetary prize for this position.
                  </FormDescription>
                </FormItem>
              )}
            />


            {/* Swag Count */}
            <Controller
              name={`rewards.${index}.swagCount`}
              control={control}
              render={({ field: swagField }) => (
                <FormItem>
                  <FormLabel>Number of Swags</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter swag count"
                      {...swagField}
                      value={swagField.value as string ?? ''}
                      onChange={(e) => {
                        const value = e.target.value;
                        swagField.onChange(
                          value === '' ? null : Number(value)
                        );
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Number of swag items awarded.
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>
        </div>
      ))}


      {fields.length === 0 && (
        <div className="text-center text-muted-foreground">
          No rewards added. Click &quot;Add Reward&quot; to create prize tiers.
        </div>
      )}
    </div>
  );
};


const MetadataStep = () => {
  const { control, setValue } = useFormContext();
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const { fields: referenceLinks, append, remove } = useFieldArray({
    control,
    name: "referenceLinks",
  });

  // State to track input fields for reference links
  const [newReferenceLink, setNewReferenceLink] = useState<string>("");

  const handleAddReferenceLink = () => {
    if (newReferenceLink.trim()) {
      append({ url: newReferenceLink });
      setNewReferenceLink(''); // Clear the input field after adding
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner Upload */}
      <Controller
        name="banner"
        control={control}
        render={() => (
          <FormItem>
            <FormLabel>Banner Image</FormLabel>
            <FormControl>
              <div className="space-y-4">
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    const uploadedUrl = res?.[0]?.url ?? '';
                    setValue('banner', uploadedUrl);
                    setBannerPreview(uploadedUrl);
                  }}
                  onUploadError={(error: Error) => {
                    console.error("Banner upload error:", error);
                  }}
                />

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
          </FormItem>
        )}
      />

      {/* Badges/Tags */}
      <Controller
        name="badges"
        control={control}
        render={({ field }) => {
          const badges = field.value as string || "";
          return (
            <FormItem>
              <FormLabel>Badges/Tags</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  <Input
                    placeholder="Enter badges separated by commas (e.g., React, TypeScript, Web)"
                    {...field}
                  />
                  <div className="flex flex-wrap gap-2">
                    {badges
                      .split(",")
                      .map((badge: string) => badge.trim())
                      .filter((badge: string) => badge !== "")
                      .map((badge: string, index: number) => (
                        <Badge key={index + 1} variant="default">
                          {badge}
                        </Badge>
                      ))}
                  </div>
                </div>
              </FormControl>
              <FormDescription>
                Add relevant tags for your contest (e.g., technologies, categories)
              </FormDescription>
            </FormItem>
          );
        }}
      />

      {/* Reference Links */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Reference Links</h3>
        </div>

        {/* New Reference Link Input Field */}
        <div className="flex space-x-2">
          <Input
            placeholder="Enter reference link"
            value={newReferenceLink}
            onChange={(e) => setNewReferenceLink(e.target.value)}
          />
          <Button
            type="button"
            variant="outline"
            onClick={handleAddReferenceLink}
            className="flex items-center gap-2"
          >
            <Plus size={16} /> Add
          </Button>
        </div>

        {referenceLinks.length === 0 && (
          <div className="text-center text-muted-foreground">
            No reference links added. Click &quot;Add&quot; to include resources.
          </div>
        )}

        {referenceLinks.map((field, index) => (
          <div
            key={field.id}
            className="relative flex items-center justify-between border rounded-md p-2"
          >
            {referenceLinks.length > 0 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => remove(index)}
                className="absolute right-0 top-0 z-10"
              >
                <Trash2 size={16} className="text-destructive" />
              </Button>
            )}

            <Controller
              name={`referenceLinks.${index}.url`}
              control={control}
              render={({ field: urlField }) => (
                <a
                  href={urlField.value as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline truncate max-w-[80%]"
                >
                  {urlField.value}
                </a>
              )}
            />
          </div>
        ))}

      </div>
    </div>
  );
};

export default CreateContestStepper;