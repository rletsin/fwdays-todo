import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export type TodoItem = {
  id: string;
  name: string;
  description: string;
  priority: string;
  due: string;
};

export default function TodoList({ items }: { items: TodoItem[] }) {
  return (
    <ul>
      {items.map((item) => {
        return (
          <li key={item.id}>
            <Card>
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Priority: {item.priority}</p>
                <p>Due: {item.due}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Complete</Button>
              </CardFooter>
            </Card>
          </li>
        );
      })}
    </ul>
  );
}
