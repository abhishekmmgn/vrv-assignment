"use client";

import { deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { collection, query, getDocs, where } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Role name must be at least 2 characters.",
  }),
  permissions: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
});

export default function EditRoleForm({
  roles,
  className,
}: {
  roles: RoleType[];
  className?: string;
}) {
  const [submitting, setSubmitting] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);

  const { refresh } = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      permissions: [],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmitting(true);
    updateDoc(doc(db, "roles", values.name.toLowerCase()), {
      name: values.name.toLowerCase(),
      permissions: values.permissions,
    })
      .then(() => {
        console.log("Done");
        refresh();
        toast.success("Edited user information");
      })
      .catch((error: Error) => {
        console.log(error);
        toast.error("Something went wrong");
      })
      .finally(() => setSubmitting(false));
  }

  async function deleteRole() {
    const roleName = form.getValues("name");
    const users = [];

    if (roleName) {
      setDeleting(true);

      const q = query(collection(db, "users"), where("role", "==", roleName));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        users.push(true);
      });

      if (users.length) {
        toast.error("Remove the users with this role first");
        setDeleting(false);
        return;
      }

      deleteDoc(doc(db, "roles", form.getValues("name")))
        .then(() => {
          console.log("Done");
          toast.success("Role deleted");
          refresh();
        })
        .catch((error: Error) => {
          console.log(error);
          toast.error("Something went wrong");
        })
        .finally(() => setDeleting(false));
    } else {
      toast.error("Select the role first");
    }
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
                <FormLabel>Role Name</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
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
          <FormField
            control={form.control}
            name="permissions"
            render={() => (
              <FormItem>
                <FormLabel className="text-base">Permissions</FormLabel>
                {PERMISSIONS.map((item) => (
                  <FormField
                    key={item}
                    control={form.control}
                    name="permissions"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal capitalize">
                            {item}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Done"}
          </Button>
        </form>
      </Form>
      {roles.length > 0 && (
        <Button
          type="submit"
          variant="destructive"
          disabled={deleting}
          onClick={() => deleteRole()}
        >
          {deleting ? "Deleting..." : "Delete role"}
        </Button>
      )}
    </>
  );
}
