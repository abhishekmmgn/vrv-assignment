"use client";

import { TodoType } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { IoRadioButtonOff, IoTrashOutline } from "react-icons/io5";
import { toast } from "sonner";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase-config";

export default function Todo({ props }: { props: TodoType }) {
  const [deleted, setDeleted] = useState(false);
  const [permissions, setPermissions] = useState<Array<string>>([]);

  const { refresh } = useRouter();

  function deleteTodo() {
    setDeleted(true);
    deleteDoc(doc(db, "todos", props.id))
      .then(() => {
        console.log("Done");
        toast.success("Todo deleted");
        refresh();
      })
      .catch((error: Error) => {
        console.log(error);
        toast.error("Something went wrong");
        setDeleted(false);
      });
  }
  function checkTodo() {
    if (props.state !== "NOT-COMPLETED") {
      toast.error("Cannot check uncompleted todo");
    } else {
      updateDoc(doc(db, "todos", props.id), {
        state: "COMPLETED",
      })
        .then(() => {
          refresh();
          toast.success("Marked as complete");
        })
        .catch((error: Error) => {
          console.log(error);
          toast.error("Something went wrong");
        });
    }
  }

  useEffect(() => {
    const permissions = localStorage.getItem("permissions");

    if (permissions) {
      const permissionsArray = permissions
        ?.split(",")
        .map((perm) => perm.trim());
      setPermissions([...permissionsArray]);
    }
  }, []);

  console.log(permissions);

  if (deleted) {
    return <></>;
  }
  return (
    <div className="h-10 border-2 px-5 flex items-center justify-between gap-2 rounded-md">
      {props.state === "NOT-COMPLETED" && permissions?.includes("UPDATE") && (
        <IoRadioButtonOff
          className="cursor-pointer"
          onClick={() => checkTodo()}
        />
      )}
      <p className={`w-full ${props.state === "COMPLETED" && "line-through"}`}>
        {props?.text}
      </p>
      {props.state === "NOT-COMPLETED" && permissions?.includes("DELETE") && (
        <IoTrashOutline
          className="size-5 text-destructive hover:text-destructive/80 hover:cursor-pointer"
          onClick={() => deleteTodo()}
        />
      )}
    </div>
  );
}
