"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import getVideoId from "get-video-id";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitVideoRequest } from "@/lib/videoRequest";
import { toast } from "sonner";

const videoSchema = z.object({
  link: z.string().min(2, { message: "Cannot be empty" }).max(80),
});

export default function VideoInput() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      link,
      youtube_id,
    }: {
      link: string;
      youtube_id: string;
    }) => {
      return await submitVideoRequest(link, youtube_id);
    },
    onSuccess: async () => {
      form.reset();
      toast.success("Video submitted successfully!");
      queryClient.invalidateQueries({ queryKey: ["metrics"] });
      queryClient.invalidateQueries({ queryKey: ["requests"] });
    },
    onError: (error) => {
      console.error("Failed to submit video:", error);
      toast.error("Something went wrong. Please try again.");
    },
  });

  const form = useForm<z.infer<typeof videoSchema>>({
    resolver: zodResolver(videoSchema),
    defaultValues: {
      link: "",
    },
  });

  function onSubmit(values: z.infer<typeof videoSchema>) {
    const { id: youtube_id, service } = getVideoId(values.link);

    if (!service || service !== "youtube") {
      form.setError("link", {
        type: "manual",
        message: "Only YouTube video links are allowed.",
      });
      return;
    }

    if (!youtube_id) {
      form.setError("link", {
        type: "manual",
        message: "No youtube ID found in the link.",
      });
      return;
    }

    mutate({ link: values.link, youtube_id });
  }

  return (
    <Card className="shadow-none border-none bg-transparent text-secondary">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-4xl font-bold">
          Submit Videos
        </CardTitle>
        <p className="text-muted-foreground tracking-wide">
          Submit a YouTube video URL to start tracking its title and thumbnail
          changes over time
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex w-full md:max-w-xl xl:max-w-3xl items-center gap-2 relative mx-auto">
                      <Input
                        placeholder={`Paste youtube video link...`}
                        className="p-6 rounded-full pr-24"
                        disabled={isPending}
                        {...field}
                      />
                      <Button
                        type="submit"
                        variant="outline"
                        disabled={isPending}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full shadow-none border-none cursor-pointer bg-black text-white hover:bg-black hover:text-white"
                      >
                        {isPending ? "Loading..." : "Submit"}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage className="mx-auto" />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
