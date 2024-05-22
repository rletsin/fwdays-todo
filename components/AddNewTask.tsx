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
import { Calendar as CalendarIcon, CirclePlus as PlusIcon } from "lucide-react";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import addTodo from "../actions/addTodo";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { convertDate } from "@/lib/utils";

export default function AddNewTask() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-green-50 hover:bg-green-400 hover:text-white w-[800px] mb-4"
        >
          <PlusIcon className="text-green-300 hover:text-white mr-2" />
          Add task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create new task</DialogTitle>
          <DialogDescription>
            Please fill in the form to add a new task
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
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
              <RadioGroupItem
                id="priority-low"
                checked={priority === "low"}
                value="low"
              />
              <Label htmlFor="priority-low">Low</Label>

              <RadioGroupItem
                id="priority-medium"
                checked={priority === "medium"}
                value="medium"
              />
              <Label htmlFor="priority-medium">Medium</Label>

              <RadioGroupItem
                id="priority-high"
                checked={priority === "high"}
                value="high"
              />
              <Label htmlFor="priority-high">High</Label>
            </RadioGroup>
          </div>
          <DialogClose>
            <Button
              className="bg-green-400 hover:bg-green-700 text-white hover:text-white w-full"
              variant="outline"
              type="submit"
              onClick={async () => {
                const todoItem = {
                  name: name ?? "",
                  description: description ?? "",
                  due: date ? convertDate(date) : "",
                  priority: priority ?? "",
                };

                await addTodo(todoItem);
                setName("");
                setDescription("");
              }}
            >
              Add Task
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
