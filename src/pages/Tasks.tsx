import { useState, useMemo } from 'react';
import { Layout } from '@/components/layout/Layout';
import { TaskCard } from '@/components/tasks/TaskCard';
import { TaskForm } from '@/components/tasks/TaskForm';
import { TaskFilters } from '@/components/tasks/TaskFilters';
import { useEmployees } from '@/hooks/useEmployees';
import { useTasks, useCreateTask, useUpdateTask, useUpdateTaskStatus, useDeleteTask } from '@/hooks/useTasks';
import { Task, TaskStatus, TaskPriority } from '@/types';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

export default function Tasks() {
  const { toast } = useToast();
  const { data: employees = [] } = useEmployees();
  const { data: tasks = [], isLoading } = useTasks();
  
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const updateTaskStatus = useUpdateTaskStatus();
  const deleteTask = useDeleteTask();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | 'all'>('all');
  const [assigneeFilter, setAssigneeFilter] = useState('all');

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
      const matchesAssignee = assigneeFilter === 'all' || task.assigneeId === assigneeFilter;

      return matchesSearch && matchesStatus && matchesPriority && matchesAssignee;
    });
  }, [tasks, search, statusFilter, priorityFilter, assigneeFilter]);

  const handleCreateTask = async (data: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      await createTask.mutateAsync(data);
      toast({ title: 'Task created successfully' });
    } catch (error) {
      toast({ title: 'Failed to create task', variant: 'destructive' });
    }
  };

  const handleUpdateTask = async (data: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!editingTask) return;
    try {
      await updateTask.mutateAsync({ id: editingTask.id, updates: data });
      setEditingTask(null);
      toast({ title: 'Task updated successfully' });
    } catch (error) {
      toast({ title: 'Failed to update task', variant: 'destructive' });
    }
  };

  const handleStatusChange = async (taskId: string, status: TaskStatus) => {
    try {
      await updateTaskStatus.mutateAsync({ id: taskId, status });
      toast({ title: `Task marked as ${status}` });
    } catch (error) {
      toast({ title: 'Failed to update status', variant: 'destructive' });
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask.mutateAsync(taskId);
      toast({ title: 'Task deleted successfully', variant: 'destructive' });
    } catch (error) {
      toast({ title: 'Failed to delete task', variant: 'destructive' });
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const clearFilters = () => {
    setSearch('');
    setStatusFilter('all');
    setPriorityFilter('all');
    setAssigneeFilter('all');
  };

  if (isLoading) {
    return (
      <Layout title="Tasks" subtitle="Manage and track all tasks">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="flex flex-wrap items-center gap-3">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
          <Skeleton className="h-10 w-28" />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-44 rounded-xl" />
          ))}
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Tasks" subtitle="Manage and track all tasks">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <TaskFilters
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          priorityFilter={priorityFilter}
          onPriorityFilterChange={setPriorityFilter}
          assigneeFilter={assigneeFilter}
          onAssigneeFilterChange={setAssigneeFilter}
          employees={employees}
          onClearFilters={clearFilters}
        />
        <Button onClick={() => { setEditingTask(null); setIsFormOpen(true); }} className="shrink-0">
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            assignee={employees.find(e => e.id === task.assigneeId)}
            onStatusChange={handleStatusChange}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-lg font-medium text-foreground">No tasks found</p>
          <p className="text-sm text-muted-foreground mt-1">
            {tasks.length === 0 ? 'Create your first task to get started' : 'Try adjusting your filters'}
          </p>
        </div>
      )}

      <TaskForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        employees={employees}
        task={editingTask}
        onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
      />
    </Layout>
  );
}
