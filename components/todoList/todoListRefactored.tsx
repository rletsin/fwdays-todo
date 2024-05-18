import { useState, useMemo } from "react";

const filterByStatus = (status) => (item) => item.status === status;
const filterByPriority = (priority) => (item) => item.priority === priority;

const compareDates = (dateA, dateB) => new Date(dateA) - new Date(dateB);

function useFilteredItems(items, filters) {
  const filteredItems = useMemo(() => {
    return items
      .filter(filterByStatus(filters.status))
      .filter(filterByPriority(filters.priority))
      .filter((item) => {
        if (filters.date !== "All" && item?.due) {
          return compareDates(item.due, filters.date) >= 0;
        }
        return true;
      });
  }, [items, filters]);
  return filteredItems;
}

function useSortedItems(filteredItems, sortBy) {
  const priorityOrder = { low: 0, medium: 1, high: 2 };
  const sortedItems = useMemo(() => {
    return filteredItems.slice().sort((a, b) => {
      switch (sortBy) {
        case "priority-asc":
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        case "priority-desc":
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case "due-date-asc":
          return compareDates(a.due, b.due);
        case "due-date-desc":
          return compareDates(b.due, a.due);
        default:
          return compareDates(a.inserted_at, b.inserted_at);
      }
    });
  }, [filteredItems, sortBy]);
  return sortedItems;
}

export default function TodoList({ items }) {
  const [filters, setFilters] = useState({
    status: "All",
    priority: "All",
    date: "All",
  });
  const [sortBy, setSortBy] = useState("");

  const filteredItems = useFilteredItems(items, filters);
  const sortedItems = useSortedItems(filteredItems, sortBy);

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
          {sortedItems.map((item) => (
            <TaskCard key={item.id} todoItem={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
