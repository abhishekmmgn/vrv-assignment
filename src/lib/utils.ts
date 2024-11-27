import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export type PermissionType = "CREATE" | "READ" | "UPDATE" | "DELETE";

export const PERMISSIONS: PermissionType[] = [
  "CREATE",
  "READ",
  "UPDATE",
  "DELETE",
] as const;

export type StatusType = "ACTIVE" | "INACTIVE";

export const STATUSES: StatusType[] = ["ACTIVE", "INACTIVE"] as const;

export type RoleType = {
  name: string;
  permissions: PermissionType[];
};

export type UserType = {
  id: string;
  name: string;
  email: string;
  role: PermissionType;
  status: StatusType;
};

export type TodoStateType = "NOT-COMPLETED" | "COMPLETED";

export const TODOSTATES: TodoStateType[] = [
  "NOT-COMPLETED",
  "COMPLETED",
] as const;

export type TodoType = {
  id: string;
  text: string;
  createdBy: string;
  state: TodoStateType;
};
