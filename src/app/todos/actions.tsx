"use client";

import Login from "./login";
import CreateTodo from "./create-todo";
import { useEffect, useState } from "react";

export default function TodoActions() {
  const [permissions, setPermissions] = useState<Array<string>>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check if window is defined
      const perm = localStorage.getItem("permissions");

      if (perm) {
        const pA = perm?.split(",").map((perm) => perm.trim());
        setPermissions([...pA]);
      }
    }
  }, []);

  if (permissions.length === 0) {
    return <Login />;
  }

  if (permissions.includes("CREATE")) {
    return <CreateTodo />;
  }
  return <></>;
}
