import AuthButton from "@/components/AuthButton";
import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import todoIcon from "./todo_icon.svg";
import TodoList from "@/components/todoList/todoList";
import { redirect } from "next/navigation";
import fetchTodos from "@/actions/fetchTodos";

export default async function Index() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const todos = await fetchTodos();

  // Handle null case for todos
  const todoItems = todos || [];

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="w-full">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-6xl flex justify-between items-center p-3 text-sm">
            <Image src={todoIcon} height={48} alt="Application logo" />
            <AuthButton />
          </div>
        </nav>
      </div>

      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-6xl px-3">
        <main className="w-full max-w-6xl flex-1 flex flex-col gap-6">
          <TodoList items={todoItems} />
        </main>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Powered by{" "}
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Supabase
          </a>
        </p>
      </footer>
    </div>
  );
}
