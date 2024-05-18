export type TodoItem = {
  id: number;
  name: string;
  description?: string;
  priority: string;
  due: string;
  is_complete: boolean;
  inserted_at: Date;
};
