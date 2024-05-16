"use server";
import { TodoItem } from "@/components/todoList/todoList";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

const supabase = createClient();
export default async function addTodo(todo: TodoItem) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User is not logged in");
  }
  if (!todo) {
    throw new Error("Todo item is required");
  }
  console.log("Inserting todo item");
  console.log(todo);

  // Save todo item to supabase database
  const { data, error } = await supabase.from("todos").insert({
    name: todo.name,
    description: todo.description,
    due: todo.due,
    priority: todo.priority,
    user_id: user.id,
  });

  console.log(data);
  console.log(error);

  revalidatePath("/todo");
}
