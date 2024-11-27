"use client";

import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase-config";

import * as React from "react";

import { cn, PERMISSIONS, RoleType } from "@/lib/utils";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  role: z.string().min(1, {
    message: "Please select a role.",
  }),
  email: z.string().email(),
});

export default function CreateUserForm({
  roles,
  className,
}: {
  roles: RoleType[];
  className?: string;
}) {
  const [submitting, setSubmitting] = React.useState(false);

  const { refresh } = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      role: "",
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmitting(true);
    setDoc(doc(db, "users", values.email), {
      name: values.name.toLowerCase(),
      email: values.email,
      role: values.role,
      status: "ACTIVE",
    })
      .then(() => {
        console.log("Done");
        refresh();
      })
      .catch((error: Error) => console.log(error))
      .finally(() => setSubmitting(false));
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("grid items-start gap-4", className)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Jack Daniels" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="jack.daniels@proton.me" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder="Assign a role"
                      className="capitalize"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem
                      value={role.name}
                      className="capitalize"
                      key={role.name}
                    >
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={submitting}>
          {submitting ? "Submitting..." : "Done"}
        </Button>
      </form>
    </Form>
  );
}
