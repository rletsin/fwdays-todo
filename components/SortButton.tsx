import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SortButton({
  setSelectedSort,
}: {
  setSelectedSort: (value: string) => void;
}) {
  return (
    <div className="flex gap-4 items-center place-content-end my-4">
      <Label>Sort by:</Label>
      <Select onValueChange={setSelectedSort}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select option" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="priority-asc">Priority: Low to High</SelectItem>
            <SelectItem value="priority-desc">Priority: High to Low</SelectItem>
            <SelectItem value="due-date-asc">Due date: Low to High</SelectItem>
            <SelectItem value="due-date-desc">Due date: High to Low</SelectItem>
            <SelectItem value="recenntly-created">Recently created</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
