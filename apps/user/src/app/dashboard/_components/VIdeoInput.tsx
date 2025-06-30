"use client";

import { useState, useTransition } from "react";
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
import { submitVideoRequest } from "@/actions/videoRequest";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const videoSchema = z.object({
  link: z.string().min(2, { message: "Cannot be empty" }).max(80),
});

export default function VideoInput() {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [loading, setLoading] = useState(false);

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

    startTransition(async () => {
      setLoading(true);
      setStatus("idle");
      await submitVideoRequest(values.link, youtube_id);
      setStatus("success");
      setLoading(false);
    });
  }

  return (
    <Card className="shadow-none border-none">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-4xl  font-bold">
          Dashboard
        </CardTitle>
        <p className="text-muted-foreground">
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
                        disabled={loading}
                        {...field}
                      />
                      <Button
                        type="submit"
                        variant="outline"
                        disabled={loading}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full shadow-none border-none cursor-pointer bg-black text-white hover:bg-black hover:text-white"
                      >
                        {loading ? "Loading..." : "Submit"}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage className="mx-auto" />
                  {status === "success" && (
                    <p className="text-green-500 text-sm ml-4 mt-2">
                      Video submitted successfully!
                    </p>
                  )}
                  {status === "error" && (
                    <p className="text-red-500 text-sm ml-4 mt-2">
                      Failed to submit video. Try again.
                    </p>
                  )}
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
