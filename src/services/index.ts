/**
 * Services Index
 * 
 * Export all services from this file for easy importing.
 */

export * from './api';
export * from './employeeService';
export * from './taskService';

/**
 * DATABASE INTEGRATION GUIDE
 * =========================
 * 
 * To connect your own database:
 * 
 * 1. Update API_CONFIG in ./api.ts:
 *    - Set useMockData to false
 *    - Configure your API baseUrl and apiKey
 * 
 * 2. Replace the mock implementations in each service:
 *    - employeeService.ts - Employee CRUD operations
 *    - taskService.ts - Task CRUD operations
 * 
 * 3. Example database schemas:
 * 
 *    -- Employees table
 *    CREATE TABLE employees (
 *      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *      name VARCHAR(255) NOT NULL,
 *      email VARCHAR(255) UNIQUE NOT NULL,
 *      department VARCHAR(100),
 *      position VARCHAR(100),
 *      avatar VARCHAR(500),
 *      joined_at TIMESTAMP DEFAULT NOW(),
 *      created_at TIMESTAMP DEFAULT NOW(),
 *      updated_at TIMESTAMP DEFAULT NOW()
 *    );
 * 
 *    -- Tasks table
 *    CREATE TABLE tasks (
 *      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *      title VARCHAR(255) NOT NULL,
 *      description TEXT,
 *      status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'in-progress', 'completed')),
 *      priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
 *      assignee_id UUID REFERENCES employees(id) ON DELETE SET NULL,
 *      due_date DATE,
 *      created_at TIMESTAMP DEFAULT NOW(),
 *      updated_at TIMESTAMP DEFAULT NOW()
 *    );
 * 
 * 4. If using Supabase, uncomment the example code in each service
 *    and import the supabase client:
 *    import { supabase } from '@/integrations/supabase/client';
 */
