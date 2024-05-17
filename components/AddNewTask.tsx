"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import addTodo from "../actions/addTodo";

export default function AddNewTask() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Todo List</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Please fill in the form to add a new task
        </p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="task">Task</Label>
          <Input
            id="task"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your task"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="task">Description</Label>
          <Input
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the task"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="due-date">Due Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="w-full justify-start text-left font-normal"
                variant="outline"
              >
                <CalendarIcon className="mr-1 h-4 w-4 -translate-x-1" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto p-0">
              <Calendar
                initialFocus
                mode="single"
                selected={date}
                onSelect={setDate}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-2">
          <Label htmlFor="priority">Priority</Label>
          <RadioGroup
            className="flex items-center gap-2"
            defaultValue="low"
            value={priority}
            onValueChange={(e) => setPriority(e)}
            id="priority"
          >
            <Label htmlFor="priority-low">
              <RadioGroupItem
                id="priority-low"
                checked={priority === "low"}
                value="low"
              />
              Low
            </Label>
            <Label htmlFor="priority-medium">
              <RadioGroupItem
                id="priority-medium"
                checked={priority === "medium"}
                value="medium"
              />
              Medium
            </Label>
            <Label htmlFor="priority-high">
              <RadioGroupItem
                id="priority-high"
                checked={priority === "high"}
                value="high"
              />
              High
            </Label>
          </RadioGroup>
        </div>
        <Button
          className="w-full"
          type="submit"
          onClick={async () => {
            const todoItem = {
              name: name ?? "",
              description: description ?? "",
              due: date ? date.toISOString().slice(0, 10) : "",
              priority: priority ?? "",
            };

            await addTodo(todoItem);
            setName("");
            setDescription("");
          }}
        >
          Add Task
        </Button>
      </div>
    </div>
  );
}
