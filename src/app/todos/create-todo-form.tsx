"use client";

import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase-config";

import * as React from "react";

import { cn, TodoStateType } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  text: z.string().min(5, {
    message: "Text must be at least 5 characters.",
  }),
});

const DEFAULT_TODO_STATE: TodoStateType = "NOT-COMPLETED";

export default function CreateTodoForm({
  className,
}: React.ComponentProps<"form">) {
  const [submitting, setSubmitting] = React.useState(false);

  const email = localStorage.getItem("email");

  const { refresh } = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!email) {
      toast.error("Please login first");
    } else {
      setSubmitting(true);
      addDoc(collection(db, "todos"), {
        text: values.text,
        createdBy: email,
        state: DEFAULT_TODO_STATE,
      })
        .then(() => {
          console.log("Done");
          toast.success("Todo created");
          refresh();
        })
        .catch((error: Error) => {
          console.log(error);
          toast.error("Something went wrong.");
        })
        .finally(() => setSubmitting(false));
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("grid items-start gap-4", className)}
      >
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text</FormLabel>
              <FormControl>
                <Input placeholder="Do the laundaries" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={submitting}>
          {submitting ? "Creating..." : "Done"}
        </Button>
      </form>
    </Form>
  );
}
