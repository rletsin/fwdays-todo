import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import AddNewTask from "../AddNewTask";

export type TodoItem = {
  id: string;
  name: string;
  description: string;
  priority: string;
  due: string;
};

export default function TodoList({ items }: { items: TodoItem[] }) {
  return (
    <>
      <AddNewTask />
      <div className="space-y-4">
        {items.map((item) => {
          return (
            <Card key={item.id} className="w-[800px]">
              <CardContent className="flex items-center gap-4 pt-4">
                <Checkbox className="h-5 w-5 rounded-full" id="task1" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <label className="text-base font-medium" htmlFor="task1">
                      {item.name}
                    </label>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}
