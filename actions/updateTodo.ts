"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

const supabase = createClient();

export default async function updateTodo(
  todoId: number,
  updatedCompleteStatus: boolean
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User is not logged in");
  }
  if (!todoId) {
    throw new Error("Todo id and status should be specified");
  }

  // Update todo item in supabase database
  const { data, error } = await supabase
    .from("todos")
    .update({
      is_complete: updatedCompleteStatus,
    })
    .eq("id", todoId);

  console.log("data", data);
  console.log("error", error);

  if (error) {
    console.error("Error updating todo:", error);
    return;
  }

  console.log("Updated todo:", data);

  revalidatePath("/todo");
}
