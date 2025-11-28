import { Employee } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Mail, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface EmployeeCardProps {
  employee: Employee;
  taskCount?: number;
  onClick?: () => void;
}

export function EmployeeCard({ employee, taskCount = 0, onClick }: EmployeeCardProps) {
  const initials = employee.name.split(' ').map(n => n[0]).join('');

  return (
    <div 
      onClick={onClick}
      className="group rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:border-primary/30 hover:shadow-lg cursor-pointer"
    >
      <div className="flex items-start gap-4">
        <Avatar className="h-14 w-14 border-2 border-border transition-all duration-200 group-hover:border-primary/30">
          <AvatarImage src={employee.avatar} alt={employee.name} />
          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">{employee.name}</h3>
          <p className="text-sm text-muted-foreground">{employee.position}</p>
          <Badge variant="secondary" className="mt-2">
            {employee.department}
          </Badge>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Mail className="h-4 w-4" />
          <span className="truncate">{employee.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Joined {format(new Date(employee.joinedAt), 'MMM d, yyyy')}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Assigned Tasks</span>
          <span className="text-sm font-semibold text-foreground">{taskCount}</span>
        </div>
      </div>
    </div>
  );
}
