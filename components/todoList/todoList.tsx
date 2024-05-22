"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import AddNewTask from "@/components/AddNewTask";
import Filters from "@/components/Filters";
import SortButton from "@/components/SortButton";
import TaskCard from "@/components/TaskCard";
import { compareAsc, compareDesc } from "date-fns";
import { TodoItem } from "@/lib/models";
import { PRIORITY_FILTER, STATUS_FILTER } from "@/lib/filtersConstants";

export default function TodoList({ items }: { items: TodoItem[] }) {
  const [filters, setFilters] = useState({
    status: "All",
    priority: "All",
    date: "All",
  });
  const [sortBy, setSortBy] = useState("");
  const priorityOrder: { [key: string]: number } = {
    low: 0,
    medium: 1,
    high: 2,
  };

  const filteredItems = items
    .filter(STATUS_FILTER[filters.status])
    .filter(PRIORITY_FILTER[filters.priority])
    .filter((item) => {
      if (filters.date !== "All" && item.due) {
        return compareDesc(new Date(item.due), new Date(filters.date)) >= 0;
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "priority-asc":
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        case "priority-desc":
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case "due-date-asc":
          return compareAsc(new Date(a.due), new Date(b.due));
        case "due-date-desc":
          return compareAsc(new Date(b.due), new Date(a.due));
        default:
          return compareAsc(new Date(b.inserted_at), new Date(a.inserted_at));
      }
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
        <SortButton setSelectedSort={setSortBy} />
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <TaskCard key={item.id} todoItem={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
