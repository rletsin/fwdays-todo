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
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { format, compareAsc } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn, convertDate } from "@/lib/utils";

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
    date: "All",
  });

  return (
    <div className="flex justify-between gap-4">
      <Card className="w-80 h-fit">
        <CardContent className="pt-4">
          <Filters filters={filters} setFilters={setFilters} />
        </CardContent>
      </Card>
      <div className="w-[800px]">
        <AddNewTask />
        <div className="space-y-4">
          {items
            .filter(STATUS_FILTER[filters.status])
            .filter(PRIORITY_FILTER[filters.priority])
            .filter((item) => {
              if (filters.date !== "All" && item?.due) {
                return (
                  compareAsc(new Date(item.due), new Date(filters.date)) >= 0
                );
              } else {
                return true;
              }
            })
            .map((item) => {
              return <TaskCard key={item.id} todoItem={item} />;
            })}
        </div>
      </div>
    </div>
  );
}

function TaskCard({ todoItem }: { todoItem: TodoItem }) {
  return (
    <Card key={todoItem.id} className="w-full">
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
            {todoItem.due && (
              <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800">
                {todoItem.due}
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
  const [calendarFilterOpen, setCalendarFilterOpen] = useState<boolean>(false);
  const statusFilter = filters.status;
  const priorityFilter = filters.priority;
  const dateFilter = filters.date;

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
      <Label htmlFor="filter-due-date">Filter by due date:</Label>
      <Popover open={calendarFilterOpen} onOpenChange={setCalendarFilterOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !dateFilter && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateFilter && dateFilter !== "All" ? (
              format(dateFilter, "PPP")
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={dateFilter}
            onSelect={(e) => {
              const selectedDate = e as Date;
              if (selectedDate) {
                setFilters({
                  ...filters,
                  date: convertDate(selectedDate),
                });
              }
              setCalendarFilterOpen(false);
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
