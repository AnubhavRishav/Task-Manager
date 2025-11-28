import { Task, TaskStatus, TaskPriority } from '@/types';
import { API_CONFIG } from './api';
import { mockTasks } from '@/data/mockData';

/**
 * Task Service
 * 
 * This service handles all task-related database operations.
 * Replace the mock implementations with actual database calls.
 */

// Simulated delay to mimic API calls
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// In-memory store for mock data (allows CRUD operations in demo)
let tasksStore = [...mockTasks];

/**
 * Fetch all tasks with optional filters
 * TODO: Replace with actual database query
 * 
 * Example with Supabase:
 * let query = supabase.from('tasks').select('*');
 * if (filters.status) query = query.eq('status', filters.status);
 * const { data, error } = await query;
 */
export async function getTasks(filters?: {
  status?: TaskStatus;
  priority?: TaskPriority;
  assigneeId?: string;
  search?: string;
}): Promise<{ data: Task[]; error: Error | null }> {
  try {
    if (API_CONFIG.useMockData) {
      await delay(300);
      let filtered = [...tasksStore];

      if (filters?.status) {
        filtered = filtered.filter(t => t.status === filters.status);
      }
      if (filters?.priority) {
        filtered = filtered.filter(t => t.priority === filters.priority);
      }
      if (filters?.assigneeId) {
        filtered = filtered.filter(t => t.assigneeId === filters.assigneeId);
      }
      if (filters?.search) {
        const searchLower = filters.search.toLowerCase();
        filtered = filtered.filter(t => 
          t.title.toLowerCase().includes(searchLower) ||
          t.description.toLowerCase().includes(searchLower)
        );
      }

      return { data: filtered, error: null };
    }

    // TODO: Add your database query here
    // Example:
    // let query = supabase.from('tasks').select('*');
    // if (filters?.status) query = query.eq('status', filters.status);
    // if (filters?.priority) query = query.eq('priority', filters.priority);
    // if (filters?.assigneeId) query = query.eq('assignee_id', filters.assigneeId);
    // if (filters?.search) query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    // const { data, error } = await query;
    // if (error) throw error;
    // return { data, error: null };

    throw new Error('Database not configured');
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return { data: [], error: error as Error };
  }
}

/**
 * Fetch a single task by ID
 * TODO: Replace with actual database query
 */
export async function getTaskById(id: string): Promise<{ data: Task | null; error: Error | null }> {
  try {
    if (API_CONFIG.useMockData) {
      await delay(200);
      const task = tasksStore.find(t => t.id === id) || null;
      return { data: task, error: null };
    }

    // TODO: Add your database query here
    // Example:
    // const { data, error } = await supabase
    //   .from('tasks')
    //   .select('*')
    //   .eq('id', id)
    //   .maybeSingle();
    // if (error) throw error;
    // return { data, error: null };

    throw new Error('Database not configured');
  } catch (error) {
    console.error('Error fetching task:', error);
    return { data: null, error: error as Error };
  }
}

/**
 * Fetch tasks by assignee
 * TODO: Replace with actual database query
 */
export async function getTasksByAssignee(assigneeId: string): Promise<{ data: Task[]; error: Error | null }> {
  try {
    if (API_CONFIG.useMockData) {
      await delay(200);
      const tasks = tasksStore.filter(t => t.assigneeId === assigneeId);
      return { data: tasks, error: null };
    }

    // TODO: Add your database query here
    // Example:
    // const { data, error } = await supabase
    //   .from('tasks')
    //   .select('*')
    //   .eq('assignee_id', assigneeId);
    // if (error) throw error;
    // return { data, error: null };

    throw new Error('Database not configured');
  } catch (error) {
    console.error('Error fetching tasks by assignee:', error);
    return { data: [], error: error as Error };
  }
}

/**
 * Create a new task
 * TODO: Replace with actual database insert
 */
export async function createTask(
  task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>
): Promise<{ data: Task | null; error: Error | null }> {
  try {
    if (API_CONFIG.useMockData) {
      await delay(300);
      const newTask: Task = {
        ...task,
        id: String(Date.now()),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      tasksStore = [newTask, ...tasksStore];
      return { data: newTask, error: null };
    }

    // TODO: Add your database insert here
    // Example:
    // const { data, error } = await supabase
    //   .from('tasks')
    //   .insert({
    //     ...task,
    //     assignee_id: task.assigneeId, // Map to DB column name if different
    //     due_date: task.dueDate,
    //   })
    //   .select()
    //   .single();
    // if (error) throw error;
    // return { data, error: null };

    throw new Error('Database not configured');
  } catch (error) {
    console.error('Error creating task:', error);
    return { data: null, error: error as Error };
  }
}

/**
 * Update an existing task
 * TODO: Replace with actual database update
 */
export async function updateTask(
  id: string,
  updates: Partial<Omit<Task, 'id' | 'createdAt'>>
): Promise<{ data: Task | null; error: Error | null }> {
  try {
    if (API_CONFIG.useMockData) {
      await delay(300);
      const index = tasksStore.findIndex(t => t.id === id);
      if (index === -1) throw new Error('Task not found');
      
      const updated: Task = {
        ...tasksStore[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      tasksStore[index] = updated;
      return { data: updated, error: null };
    }

    // TODO: Add your database update here
    // Example:
    // const { data, error } = await supabase
    //   .from('tasks')
    //   .update({
    //     ...updates,
    //     updated_at: new Date().toISOString(),
    //   })
    //   .eq('id', id)
    //   .select()
    //   .single();
    // if (error) throw error;
    // return { data, error: null };

    throw new Error('Database not configured');
  } catch (error) {
    console.error('Error updating task:', error);
    return { data: null, error: error as Error };
  }
}

/**
 * Update task status
 * TODO: Replace with actual database update
 */
export async function updateTaskStatus(
  id: string,
  status: TaskStatus
): Promise<{ data: Task | null; error: Error | null }> {
  return updateTask(id, { status });
}

/**
 * Delete a task
 * TODO: Replace with actual database delete
 */
export async function deleteTask(id: string): Promise<{ error: Error | null }> {
  try {
    if (API_CONFIG.useMockData) {
      await delay(300);
      tasksStore = tasksStore.filter(t => t.id !== id);
      return { error: null };
    }

    // TODO: Add your database delete here
    // Example:
    // const { error } = await supabase
    //   .from('tasks')
    //   .delete()
    //   .eq('id', id);
    // if (error) throw error;
    // return { error: null };

    throw new Error('Database not configured');
  } catch (error) {
    console.error('Error deleting task:', error);
    return { error: error as Error };
  }
}

/**
 * Get task statistics
 * TODO: Replace with actual database aggregation
 */
export async function getTaskStats(): Promise<{
  data: {
    total: number;
    completed: number;
    pending: number;
    inProgress: number;
  };
  error: Error | null;
}> {
  try {
    if (API_CONFIG.useMockData) {
      await delay(200);
      return {
        data: {
          total: tasksStore.length,
          completed: tasksStore.filter(t => t.status === 'completed').length,
          pending: tasksStore.filter(t => t.status === 'pending').length,
          inProgress: tasksStore.filter(t => t.status === 'in-progress').length,
        },
        error: null,
      };
    }

    // TODO: Add your database aggregation here
    // You might want to use a database function or RPC for this
    // Example:
    // const { data, error } = await supabase.rpc('get_task_stats');
    // if (error) throw error;
    // return { data, error: null };

    throw new Error('Database not configured');
  } catch (error) {
    console.error('Error fetching task stats:', error);
    return {
      data: { total: 0, completed: 0, pending: 0, inProgress: 0 },
      error: error as Error,
    };
  }
}
