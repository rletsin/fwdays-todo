"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

const supabase = createClient();
export default async function addTodo(todo: {
  name: string;
  description: string;
  due: string;
  priority: string;
}) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User is not logged in");
  }
  if (!todo) {
    throw new Error("Todo item is required");
  }

  // Save todo item to supabase database
  const { data, error } = await supabase.from("todos").insert({
    name: todo.name,
    description: todo.description,
    due: todo.due,
    priority: todo.priority,
    user_id: user.id,
  });

  console.log("data", data);
  console.log("error", error);

  revalidatePath("/todo");
}
