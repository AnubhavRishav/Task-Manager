import { Layout } from '@/components/layout/Layout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { TaskCard } from '@/components/tasks/TaskCard';
import { useEmployees } from '@/hooks/useEmployees';
import { useTasks, useTaskStats } from '@/hooks/useTasks';
import { Users, CheckSquare, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function Dashboard() {
  const { data: employees = [], isLoading: loadingEmployees } = useEmployees();
  const { data: tasks = [], isLoading: loadingTasks } = useTasks();
  const { data: stats, isLoading: loadingStats } = useTaskStats();

  const recentTasks = tasks.slice(0, 4);
  const isLoading = loadingEmployees || loadingTasks || loadingStats;

  if (isLoading) {
    return (
      <Layout title="Dashboard" subtitle="Welcome back! Here's what's happening today.">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
        <div className="mt-8">
          <Skeleton className="h-6 w-32 mb-4" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-40 rounded-xl" />
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Dashboard" subtitle="Welcome back! Here's what's happening today.">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatsCard
          title="Total Employees"
          value={employees.length}
          icon={Users}
          trend={{ value: 12, isPositive: true }}
          iconClassName="bg-primary/10 text-primary"
        />
        <StatsCard
          title="Total Tasks"
          value={stats?.total || 0}
          icon={CheckSquare}
          iconClassName="bg-purple-500/10 text-purple-600"
        />
        <StatsCard
          title="Completed"
          value={stats?.completed || 0}
          icon={CheckCircle}
          trend={{ value: 8, isPositive: true }}
          iconClassName="bg-green-500/10 text-green-600"
        />
        <StatsCard
          title="In Progress"
          value={stats?.inProgress || 0}
          icon={Clock}
          iconClassName="bg-blue-500/10 text-blue-600"
        />
        <StatsCard
          title="Pending"
          value={stats?.pending || 0}
          icon={AlertCircle}
          iconClassName="bg-yellow-500/10 text-yellow-600"
        />
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Recent Tasks</h2>
          <a href="/tasks" className="text-sm font-medium text-primary hover:underline">
            View all
          </a>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {recentTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              assignee={employees.find(e => e.id === task.assigneeId)}
            />
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold text-foreground mb-4">Task Distribution by Status</h3>
          <div className="space-y-4">
            {stats && stats.total > 0 && (
              <>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Completed</span>
                    <span className="font-medium">{Math.round((stats.completed / stats.total) * 100)}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div 
                      className="h-full bg-green-500 rounded-full transition-all duration-500"
                      style={{ width: `${(stats.completed / stats.total) * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">In Progress</span>
                    <span className="font-medium">{Math.round((stats.inProgress / stats.total) * 100)}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full transition-all duration-500"
                      style={{ width: `${(stats.inProgress / stats.total) * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Pending</span>
                    <span className="font-medium">{Math.round((stats.pending / stats.total) * 100)}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div 
                      className="h-full bg-yellow-500 rounded-full transition-all duration-500"
                      style={{ width: `${(stats.pending / stats.total) * 100}%` }}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold text-foreground mb-4">Top Contributors</h3>
          <div className="space-y-3">
            {employees.slice(0, 4).map((employee) => {
              const taskCount = tasks.filter(t => t.assigneeId === employee.id).length;
              const completedCount = tasks.filter(t => t.assigneeId === employee.id && t.status === 'completed').length;
              return (
                <div key={employee.id} className="flex items-center gap-3">
                  <img 
                    src={employee.avatar} 
                    alt={employee.name}
                    className="h-10 w-10 rounded-full object-cover border-2 border-border"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{employee.name}</p>
                    <p className="text-xs text-muted-foreground">{completedCount}/{taskCount} tasks completed</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-foreground">{taskCount}</span>
                    <span className="text-xs text-muted-foreground ml-1">tasks</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
