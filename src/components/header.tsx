"use client";

import Link from "next/link";
import { IoHelpCircleOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";
import ThemeToggle from "./theme-toggle";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const { refresh } = useRouter();

  const [name, setName] = useState("");

  function removeLogin() {
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("permissions");
    refresh();
  }

  useEffect(() => {
    const n = localStorage.getItem("name");
    if (n) {
      setName(n);
    }
  }, []);
  return (
    <header className="border-b bg-background/90 backdrop-filter backdrop-blur-sm w-full sticky top-0 inset-x-0 z-50 h-14">
      <div className="w-full h-full flex items-center justify-between horizontal-padding max-w-screen-2xl">
        <Link href="/" className="font-semibold">
          RDAC System
        </Link>
        <div className="flex items-center gap-5">
          {pathname !== "/" && (
            <Link href="/">
              <IoHelpCircleOutline className="size-7" />
            </Link>
          )}
          {/* <ThemeToggle /> */}
          {name && pathname === "/todos" && (
            <>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => removeLogin()}
              >
                Logout
              </Button>
              <p className="capitalize">{name}</p>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
