import Titlebar from "@/components/titlebar";
import type { Metadata } from "next";
import SectionWrapper from "@/components/section-wrapper";
import TodoActions from "./actions";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase-config";
import { TodoType } from "@/lib/utils";
import Todo from "./todo";

export const metadata: Metadata = {
  title: "Todos",
};

export const dynamic = "force-dynamic";

export default async function Page() {
  const todos: Array<TodoType> = [];
  const querySnapshot = await getDocs(collection(db, "todos"));
  querySnapshot.forEach((doc) => {
    const id = doc.id;
    const { text, createdBy, state } = doc.data();
    todos.push({ id, text, createdBy, state });
  });
  return (
    <>
      <Titlebar title="Todos" actions={<TodoActions />} />
      <main className="horizontal-padding vertical-padding">
        <div className="grid gap-6 md:grid-cols-2">
          <Todos
            title="To Complete"
            todos={todos.filter((todo) => todo.state === "NOT-COMPLETED")}
          />
          <Todos
            title="Completed"
            todos={todos.filter((todo) => todo.state === "COMPLETED")}
          />
        </div>
      </main>
    </>
  );
}

function Todos({ title, todos }: { title: string; todos: TodoType[] }) {
  return (
    <>
      {todos.length > 0 && (
        <SectionWrapper title={title}>
          <div className="text-secondary-foreground space-y-4 max-w-prose">
            {todos.map((todo) => (
              <Todo props={todo} key={todo.id} />
            ))}
          </div>
        </SectionWrapper>
      )}
    </>
  );
}
