import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Task, TaskStatus, TaskPriority } from '@/types';
import * as taskService from '@/services/taskService';

interface TaskFilters {
  status?: TaskStatus;
  priority?: TaskPriority;
  assigneeId?: string;
  search?: string;
}

/**
 * Hook to fetch all tasks with optional filters
 */
export function useTasks(filters?: TaskFilters) {
  return useQuery({
    queryKey: ['tasks', filters],
    queryFn: async () => {
      const { data, error } = await taskService.getTasks(filters);
      if (error) throw error;
      return data;
    },
  });
}

/**
 * Hook to fetch a single task by ID
 */
export function useTask(id: string) {
  return useQuery({
    queryKey: ['tasks', id],
    queryFn: async () => {
      const { data, error } = await taskService.getTaskById(id);
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
}

/**
 * Hook to fetch tasks by assignee
 */
export function useTasksByAssignee(assigneeId: string) {
  return useQuery({
    queryKey: ['tasks', 'assignee', assigneeId],
    queryFn: async () => {
      const { data, error } = await taskService.getTasksByAssignee(assigneeId);
      if (error) throw error;
      return data;
    },
    enabled: !!assigneeId,
  });
}

/**
 * Hook to get task statistics
 */
export function useTaskStats() {
  return useQuery({
    queryKey: ['tasks', 'stats'],
    queryFn: async () => {
      const { data, error } = await taskService.getTaskStats();
      if (error) throw error;
      return data;
    },
  });
}

/**
 * Hook to create a new task
 */
export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
      const { data, error } = await taskService.createTask(task);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}

/**
 * Hook to update a task
 */
export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Omit<Task, 'id' | 'createdAt'>> }) => {
      const { data, error } = await taskService.updateTask(id, updates);
      if (error) throw error;
      return data;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['tasks', id] });
    },
  });
}

/**
 * Hook to update task status
 */
export function useUpdateTaskStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: TaskStatus }) => {
      const { data, error } = await taskService.updateTaskStatus(id, status);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}

/**
 * Hook to delete a task
 */
export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await taskService.deleteTask(id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}
