import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  iconClassName?: string;
}

export function StatsCard({ title, value, icon: Icon, trend, className, iconClassName }: StatsCardProps) {
  return (
    <div className={cn('rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:shadow-lg', className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-3xl font-bold text-foreground">{value}</p>
          {trend && (
            <p className={cn(
              'mt-2 text-sm font-medium',
              trend.isPositive ? 'text-green-600' : 'text-red-600'
            )}>
              {trend.isPositive ? '+' : ''}{trend.value}% from last month
            </p>
          )}
        </div>
        <div className={cn('rounded-lg p-3', iconClassName || 'bg-primary/10')}>
          <Icon className={cn('h-6 w-6', iconClassName ? 'text-current' : 'text-primary')} />
        </div>
      </div>
    </div>
  );
}
