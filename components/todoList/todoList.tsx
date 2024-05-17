"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { XCircle } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import AddNewTask from "../AddNewTask";
import updateTodoStatus from "../../actions/updateTodo";
import deleteTodo from "@/actions/deleteTodo";
import { Label } from "@/components/ui/label";

export type TodoItem = {
  id: number;
  name: string;
  description?: string;
  priority?: string;
  due?: string;
  is_complete: boolean;
};

const STATUS_FILTER: { [key: string]: (task: TodoItem) => boolean } = {
  All: () => true,
  Active: (task: TodoItem) => !task.is_complete,
  Completed: (task: TodoItem) => task.is_complete,
};

const PRIORITY_FILTER: { [key: string]: (task: TodoItem) => boolean } = {
  All: () => true,
  High: (task: TodoItem) => task.priority === "high",
  Medium: (task: TodoItem) => task.priority === "medium",
  Low: (task: TodoItem) => task.priority === "low",
};

const STATUS_FILTER_NAMES = Object.keys(STATUS_FILTER);
const PRIORITY_FILTER_NAMES = Object.keys(PRIORITY_FILTER);

export default function TodoList({ items }: { items: TodoItem[] }) {
  const [filters, setFilters] = useState({
    status: "All",
    priority: "All",
  });

  return (
    <>
      <AddNewTask />
      <Filters filters={filters} setFilters={setFilters} />
      <div className="space-y-4">
        {items
          .filter(STATUS_FILTER[filters.status])
          .filter(PRIORITY_FILTER[filters.priority])
          .map((item) => {
            return <TaskCard key={item.id} todoItem={item} />;
          })}
      </div>
    </>
  );
}

function TaskCard({ todoItem }: { todoItem: TodoItem }) {
  return (
    <Card key={todoItem.id} className="w-[800px]">
      <CardContent className="flex items-center gap-4 pt-4">
        <Checkbox
          className="h-5 w-5 rounded-full"
          id="task1"
          checked={todoItem.is_complete}
          onClick={async () => {
            await updateTodoStatus(todoItem.id, !todoItem.is_complete);
          }}
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium" htmlFor="task1">
              {todoItem.name}
            </Label>
            {todoItem.priority && (
              <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800">
                {todoItem.priority}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {todoItem.description}
          </p>
        </div>
        <XCircle
          className="h-5 w-5 hover:text-red-600 cursor-pointer self-baseline"
          onClick={async () => {
            await deleteTodo(todoItem.id);
          }}
        />
      </CardContent>
    </Card>
  );
}

function Filters({ filters, setFilters }: { filters: any; setFilters: any }) {
  const statusFilter = filters.status;
  const priorityFilter = filters.priority;

  return (
    <div className="flex flex-col gap-4 ">
      <Label htmlFor="filter-completed">Filter by priority:</Label>
      <RadioGroup
        className="flex items-center gap-4"
        defaultValue="All"
        value={priorityFilter}
        onValueChange={(e) =>
          setFilters({
            ...filters,
            priority: e as keyof typeof PRIORITY_FILTER,
          })
        }
        id="filter-priority"
      >
        {PRIORITY_FILTER_NAMES.map((name, index) => (
          <div key={index} className="flex items-center gap-2">
            <RadioGroupItem checked={name === priorityFilter} value={name} />
            <Label htmlFor={`priority-${name}`}>{name}</Label>
          </div>
        ))}
      </RadioGroup>
      <Label htmlFor="filter-completed">Filter by status:</Label>
      <RadioGroup
        className="flex items-center gap-4"
        defaultValue="All"
        value={statusFilter}
        onValueChange={(e) =>
          setFilters({ ...filters, status: e as keyof typeof STATUS_FILTER })
        }
        id="filter-completed"
      >
        {STATUS_FILTER_NAMES.map((name, index) => (
          <div key={index} className="flex items-center gap-2">
            <RadioGroupItem checked={name === statusFilter} value={name} />
            <Label htmlFor={`status-${name}`}>{name}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
