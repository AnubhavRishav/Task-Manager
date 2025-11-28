import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { EmployeeCard } from '@/components/employees/EmployeeCard';
import { useEmployees } from '@/hooks/useEmployees';
import { useTasks } from '@/hooks/useTasks';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function Employees() {
  const [search, setSearch] = useState('');
  const { data: employees = [], isLoading: loadingEmployees } = useEmployees();
  const { data: tasks = [] } = useTasks();

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase()) ||
    emp.email.toLowerCase().includes(search.toLowerCase()) ||
    emp.department.toLowerCase().includes(search.toLowerCase())
  );

  const getTaskCount = (employeeId: string) => {
    return tasks.filter(t => t.assigneeId === employeeId).length;
  };

  if (loadingEmployees) {
    return (
      <Layout title="Employees" subtitle="Manage your team members">
        <div className="mb-6">
          <Skeleton className="h-10 w-64" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-56 rounded-xl" />
          ))}
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Employees" subtitle="Manage your team members">
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search employees..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredEmployees.map((employee) => (
          <EmployeeCard
            key={employee.id}
            employee={employee}
            taskCount={getTaskCount(employee.id)}
          />
        ))}
      </div>

      {filteredEmployees.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-lg font-medium text-foreground">No employees found</p>
          <p className="text-sm text-muted-foreground mt-1">Try adjusting your search</p>
        </div>
      )}
    </Layout>
  );
}
