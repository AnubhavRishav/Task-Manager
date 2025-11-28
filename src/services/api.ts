/**
 * API Configuration
 * 
 * Replace these values with your actual database/API configuration
 * when connecting to your backend.
 */

export const API_CONFIG = {
  // TODO: Replace with your API base URL
  baseUrl: import.meta.env.VITE_API_BASE_URL || '',
  
  // TODO: Add your API key or auth token
  apiKey: import.meta.env.VITE_API_KEY || '',
  
  // Set to true when you have a real backend connected
  useMockData: true,
};

/**
 * Generic API request function
 * Replace this implementation with your actual API calls
 */
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ data: T | null; error: Error | null }> {
  try {
    // TODO: Implement actual API calls here
    // Example:
    // const response = await fetch(`${API_CONFIG.baseUrl}${endpoint}`, {
    //   ...options,
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${API_CONFIG.apiKey}`,
    //     ...options.headers,
    //   },
    // });
    // 
    // if (!response.ok) {
    //   throw new Error(`API Error: ${response.statusText}`);
    // }
    // 
    // const data = await response.json();
    // return { data, error: null };

    // For now, throw to indicate not implemented
    throw new Error('API not configured - using mock data');
  } catch (error) {
    return { data: null, error: error as Error };
  }
}
