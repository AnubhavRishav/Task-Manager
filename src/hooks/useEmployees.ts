import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Employee } from '@/types';
import * as employeeService from '@/services/employeeService';

/**
 * Hook to fetch all employees
 */
export function useEmployees() {
  return useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      const { data, error } = await employeeService.getEmployees();
      if (error) throw error;
      return data;
    },
  });
}

/**
 * Hook to fetch a single employee by ID
 */
export function useEmployee(id: string) {
  return useQuery({
    queryKey: ['employees', id],
    queryFn: async () => {
      const { data, error } = await employeeService.getEmployeeById(id);
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
}

/**
 * Hook to create a new employee
 */
export function useCreateEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (employee: Omit<Employee, 'id'>) => {
      const { data, error } = await employeeService.createEmployee(employee);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
  });
}

/**
 * Hook to update an employee
 */
export function useUpdateEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Employee> }) => {
      const { data, error } = await employeeService.updateEmployee(id, updates);
      if (error) throw error;
      return data;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      queryClient.invalidateQueries({ queryKey: ['employees', id] });
    },
  });
}

/**
 * Hook to delete an employee
 */
export function useDeleteEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await employeeService.deleteEmployee(id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
  });
}
