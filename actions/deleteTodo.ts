"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

const supabase = createClient();
export default async function deleteTodo(todoId: number) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User is not logged in");
  }
  if (!todoId) {
    throw new Error("Todo id should be specified");
  }

  // Delete todo item from supabase database
  const { data, error } = await supabase
    .from("todos")
    .delete()
    .eq("id", todoId);

  console.log("data", data);
  console.log("error", error);

  if (error) {
    console.error("Error deleting todo:", error);
    return;
  }

  console.log("Deleted todo:", data);

  revalidatePath("/todo");
}
