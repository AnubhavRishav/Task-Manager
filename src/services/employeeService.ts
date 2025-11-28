import { Employee } from '@/types';
import { API_CONFIG } from './api';
import { mockEmployees } from '@/data/mockData';

/**
 * Employee Service
 * 
 * This service handles all employee-related database operations.
 * Replace the mock implementations with actual database calls.
 */

// Simulated delay to mimic API calls
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fetch all employees
 * TODO: Replace with actual database query
 * 
 * Example with Supabase:
 * const { data, error } = await supabase.from('employees').select('*');
 * 
 * Example with REST API:
 * const response = await fetch(`${API_CONFIG.baseUrl}/employees`);
 */
export async function getEmployees(): Promise<{ data: Employee[]; error: Error | null }> {
  try {
    if (API_CONFIG.useMockData) {
      await delay(300); // Simulate network delay
      return { data: mockEmployees, error: null };
    }

    // TODO: Add your database query here
    // Example:
    // const { data, error } = await supabase.from('employees').select('*');
    // if (error) throw error;
    // return { data, error: null };

    throw new Error('Database not configured');
  } catch (error) {
    console.error('Error fetching employees:', error);
    return { data: [], error: error as Error };
  }
}

/**
 * Fetch a single employee by ID
 * TODO: Replace with actual database query
 */
export async function getEmployeeById(id: string): Promise<{ data: Employee | null; error: Error | null }> {
  try {
    if (API_CONFIG.useMockData) {
      await delay(200);
      const employee = mockEmployees.find(e => e.id === id) || null;
      return { data: employee, error: null };
    }

    // TODO: Add your database query here
    // Example:
    // const { data, error } = await supabase
    //   .from('employees')
    //   .select('*')
    //   .eq('id', id)
    //   .maybeSingle();
    // if (error) throw error;
    // return { data, error: null };

    throw new Error('Database not configured');
  } catch (error) {
    console.error('Error fetching employee:', error);
    return { data: null, error: error as Error };
  }
}

/**
 * Create a new employee
 * TODO: Replace with actual database insert
 */
export async function createEmployee(
  employee: Omit<Employee, 'id'>
): Promise<{ data: Employee | null; error: Error | null }> {
  try {
    if (API_CONFIG.useMockData) {
      await delay(300);
      const newEmployee: Employee = {
        ...employee,
        id: String(Date.now()),
      };
      // Note: In mock mode, this won't persist
      return { data: newEmployee, error: null };
    }

    // TODO: Add your database insert here
    // Example:
    // const { data, error } = await supabase
    //   .from('employees')
    //   .insert(employee)
    //   .select()
    //   .single();
    // if (error) throw error;
    // return { data, error: null };

    throw new Error('Database not configured');
  } catch (error) {
    console.error('Error creating employee:', error);
    return { data: null, error: error as Error };
  }
}

/**
 * Update an existing employee
 * TODO: Replace with actual database update
 */
export async function updateEmployee(
  id: string,
  updates: Partial<Employee>
): Promise<{ data: Employee | null; error: Error | null }> {
  try {
    if (API_CONFIG.useMockData) {
      await delay(300);
      const employee = mockEmployees.find(e => e.id === id);
      if (!employee) throw new Error('Employee not found');
      const updated = { ...employee, ...updates };
      return { data: updated, error: null };
    }

    // TODO: Add your database update here
    // Example:
    // const { data, error } = await supabase
    //   .from('employees')
    //   .update(updates)
    //   .eq('id', id)
    //   .select()
    //   .single();
    // if (error) throw error;
    // return { data, error: null };

    throw new Error('Database not configured');
  } catch (error) {
    console.error('Error updating employee:', error);
    return { data: null, error: error as Error };
  }
}

/**
 * Delete an employee
 * TODO: Replace with actual database delete
 */
export async function deleteEmployee(id: string): Promise<{ error: Error | null }> {
  try {
    if (API_CONFIG.useMockData) {
      await delay(300);
      return { error: null };
    }

    // TODO: Add your database delete here
    // Example:
    // const { error } = await supabase
    //   .from('employees')
    //   .delete()
    //   .eq('id', id);
    // if (error) throw error;
    // return { error: null };

    throw new Error('Database not configured');
  } catch (error) {
    console.error('Error deleting employee:', error);
    return { error: error as Error };
  }
}
