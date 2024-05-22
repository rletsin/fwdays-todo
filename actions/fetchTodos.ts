"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export default async function fetchTodos() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User is not logged in");
  }

  // Save todo item to supabase database
  const { data, error } = await supabase.from("todos").select();

  if (data) {
    console.log("data", data);
    return data;
  }
  console.log("error", error);

  revalidatePath("/");
}
