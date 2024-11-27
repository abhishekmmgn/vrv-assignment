"use client";

import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase-config";

import * as React from "react";

import { cn } from "@/lib/utils";
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
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email(),
});

export default function LoginForm({ className }: React.ComponentProps<"form">) {
  const [submitting, setSubmitting] = React.useState(false);

  const { refresh } = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmitting(true);
    const docRef = doc(db, "users", values.email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { email, name, role } = docSnap.data();

      const roleDocRef = doc(db, "roles", role);
      const roleDocSnap = await getDoc(roleDocRef);

      if (roleDocSnap.exists()) {
        const { permissions } = roleDocSnap.data();

        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("permissions", permissions);
        setSubmitting(false);
        window.location.reload();
      } else {
        console.log("No such document!");
        form.setError("root", {
          type: "Custom",
          message: "Something went wrong",
        });
        setSubmitting(false);
      }
    } else {
      form.setError("email", { type: "Custom", message: "Email not found" });
      setSubmitting(false);
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="abc@xyz.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={submitting}>
          {submitting ? "Submitting..." : "Login"}
        </Button>
      </form>
    </Form>
  );
}
