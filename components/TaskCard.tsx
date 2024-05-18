import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { XCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import updateTodoStatus from "@/actions/updateTodo";
import deleteTodo from "@/actions/deleteTodo";
import { TodoItem } from "@/lib/models";

export default function TaskCard({ todoItem }: { todoItem: TodoItem }) {
  const badgeColor: { [key: string]: string } = {
    high: "bg-red-200",
    medium: "bg-yellow-200",
    low: "bg-green-200",
  };

  return (
    <Card key={todoItem.id} className="w-full">
      <CardContent className="flex items-center gap-4 pt-4">
        <Checkbox
          className="h-5 w-5 rounded-full data-[state=checked]:bg-green-700 data-[state=checked]:border-green-700"
          id="task1"
          checked={todoItem.is_complete}
          onClick={async () => {
            await updateTodoStatus(todoItem.id, !todoItem.is_complete);
          }}
        />
        <div className="flex-1">
          <Label className="text-base font-medium">{todoItem.name}</Label>
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
      <CardFooter className="flex gap-4 place-content-end">
        <span className="font-light text-xs">
          Due date:{" "}
          {todoItem.due && <Badge variant="outline">{todoItem.due}</Badge>}
        </span>
        <span className="font-light text-xs">
          Priority:{" "}
          {todoItem.priority && (
            <Badge variant="outline" className={badgeColor[todoItem.priority]}>
              {todoItem.priority}
            </Badge>
          )}
        </span>
      </CardFooter>
    </Card>
  );
}
