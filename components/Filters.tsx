import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn, convertDate } from "@/lib/utils";
import { format } from "date-fns/format";
import {
  PRIORITY_FILTER,
  PRIORITY_FILTER_NAMES,
  STATUS_FILTER,
  STATUS_FILTER_NAMES,
} from "@/lib/filtersConstants";

export default function Filters({
  filters,
  setFilters,
}: {
  filters: any;
  setFilters: any;
}) {
  const [calendarFilterOpen, setCalendarFilterOpen] = useState<boolean>(false);
  const statusFilter = filters.status;
  const priorityFilter = filters.priority;
  const dateFilter = filters.date;

  return (
    <div className="flex flex-col gap-4">
      <Label htmlFor="filter-priority">Filter by priority:</Label>
      <RadioGroup
        className="flex items-center gap-4"
        defaultValue="All"
        value={priorityFilter}
        onValueChange={(value) =>
          setFilters({
            ...filters,
            priority: value as keyof typeof PRIORITY_FILTER,
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
        onValueChange={(value) =>
          setFilters({
            ...filters,
            status: value as keyof typeof STATUS_FILTER,
          })
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
            onSelect={(date) => {
              const selectedDate = date as Date;
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
