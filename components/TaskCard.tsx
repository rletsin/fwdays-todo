import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { XCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import updateTodoStatus from "@/actions/updateTodo";
import deleteTodo from "@/actions/deleteTodo";
import { TodoItem } from "@/lib/models";

export default function TaskCard({ todoItem }: { todoItem: TodoItem }) {
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
