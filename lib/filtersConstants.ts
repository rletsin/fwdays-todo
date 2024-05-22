import { TodoItem } from "@/lib/models";

export const STATUS_FILTER: Record<string, (task: TodoItem) => boolean> = {
  All: () => true,
  Active: (task) => !task.is_complete,
  Completed: (task) => task.is_complete,
};

export const PRIORITY_FILTER: Record<string, (task: TodoItem) => boolean> = {
  All: () => true,
  High: (task) => task.priority === "high",
  Medium: (task) => task.priority === "medium",
  Low: (task) => task.priority === "low",
};

export const STATUS_FILTER_NAMES = Object.keys(STATUS_FILTER);
export const PRIORITY_FILTER_NAMES = Object.keys(PRIORITY_FILTER);
