"use client";

import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase-config";

import * as React from "react";

import { cn, RoleType, STATUSES, UserType } from "@/lib/utils";
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
  status: z.string().min(1, {
    message: "Please select a role.",
  }),
});

export default function EditUserForm({
  roles,
  user,
  className,
}: {
  roles: RoleType[];
  user: UserType;
  className?: string;
}) {
  const [submitting, setSubmitting] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);

  const { refresh } = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name,
      role: user.role,
      status: user.status,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmitting(true);
    updateDoc(doc(db, "users", user.id), {
      name: values.name.toLowerCase(),
      role: values.role,
      status: values.status,
    })
      .then(() => {
        console.log("Done");
        refresh();
      })
      .catch((error: Error) => console.log(error))
      .finally(() => setSubmitting(false));
  }

  function deleteUser() {
    setDeleting(true);
    return deleteDoc(doc(db, "users", user.id))
      .then(() => {
        console.log("Done");
        refresh();
      })
      .catch((error: Error) => console.log(error))
      .finally(() => setDeleting(false));
  }
  return (
    <>
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
                  <Input
                    placeholder="Jack Daniels"
                    className="capitalize"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder="Update status"
                        className="capitalize"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {STATUSES.map((status) => (
                      <SelectItem
                        value={status}
                        className="capitalize"
                        key={status}
                      >
                        {status.toLowerCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
            Done
          </Button>
        </form>
      </Form>
      <Button
        type="submit"
        variant="destructive"
        disabled={deleting}
        onClick={() => deleteUser()}
      >
        {deleting ? "Deleting..." : "Delete user"}
      </Button>
    </>
  );
}
