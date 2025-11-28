import { Task, Employee, TaskStatus } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MoreVertical, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface TaskCardProps {
  task: Task;
  assignee?: Employee;
  onStatusChange?: (taskId: string, status: TaskStatus) => void;
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: string) => void;
}

const statusConfig = {
  'pending': { label: 'Pending', className: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20' },
  'in-progress': { label: 'In Progress', className: 'bg-blue-500/10 text-blue-600 border-blue-500/20' },
  'completed': { label: 'Completed', className: 'bg-green-500/10 text-green-600 border-green-500/20' },
};

const priorityConfig = {
  'low': { label: 'Low', className: 'bg-muted text-muted-foreground' },
  'medium': { label: 'Medium', className: 'bg-orange-500/10 text-orange-600' },
  'high': { label: 'High', className: 'bg-red-500/10 text-red-600' },
};

export function TaskCard({ task, assignee, onStatusChange, onEdit, onDelete }: TaskCardProps) {
  const status = statusConfig[task.status];
  const priority = priorityConfig[task.priority];
  const initials = assignee?.name.split(' ').map(n => n[0]).join('') || '?';

  return (
    <div className="group rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:border-primary/30 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className={cn('text-xs', status.className)}>
              {status.label}
            </Badge>
            <Badge variant="secondary" className={cn('text-xs', priority.className)}>
              {priority.label}
            </Badge>
          </div>
          <h3 className="font-semibold text-foreground line-clamp-2">{task.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{task.description}</p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit?.(task)}>
              Edit Task
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStatusChange?.(task.id, 'pending')}>
              Mark as Pending
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStatusChange?.(task.id, 'in-progress')}>
              Mark as In Progress
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStatusChange?.(task.id, 'completed')}>
              Mark as Completed
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onDelete?.(task.id)}
              className="text-destructive focus:text-destructive"
            >
              Delete Task
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="h-7 w-7 border border-border">
            <AvatarImage src={assignee?.avatar} />
            <AvatarFallback className="text-xs bg-muted">{initials}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">{assignee?.name || 'Unassigned'}</span>
        </div>

        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{format(new Date(task.dueDate), 'MMM d')}</span>
        </div>
      </div>
    </div>
  );
}
