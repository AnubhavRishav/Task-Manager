import { TaskStatus, TaskPriority } from '@/types';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';

interface TaskFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: TaskStatus | 'all';
  onStatusFilterChange: (value: TaskStatus | 'all') => void;
  priorityFilter: TaskPriority | 'all';
  onPriorityFilterChange: (value: TaskPriority | 'all') => void;
  assigneeFilter: string;
  onAssigneeFilterChange: (value: string) => void;
  employees: { id: string; name: string }[];
  onClearFilters: () => void;
}

export function TaskFilters({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  priorityFilter,
  onPriorityFilterChange,
  assigneeFilter,
  onAssigneeFilterChange,
  employees,
  onClearFilters,
}: TaskFiltersProps) {
  const hasFilters = search || statusFilter !== 'all' || priorityFilter !== 'all' || assigneeFilter !== 'all';

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative flex-1 min-w-[200px] max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>

      <Select value={statusFilter} onValueChange={(v) => onStatusFilterChange(v as TaskStatus | 'all')}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="in-progress">In Progress</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
        </SelectContent>
      </Select>

      <Select value={priorityFilter} onValueChange={(v) => onPriorityFilterChange(v as TaskPriority | 'all')}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Priority</SelectItem>
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="high">High</SelectItem>
        </SelectContent>
      </Select>

      <Select value={assigneeFilter} onValueChange={onAssigneeFilterChange}>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Assignee" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Assignees</SelectItem>
          {employees.map((emp) => (
            <SelectItem key={emp.id} value={emp.id}>
              {emp.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={onClearFilters} className="text-muted-foreground">
          <X className="mr-1 h-4 w-4" />
          Clear
        </Button>
      )}
    </div>
  );
}
