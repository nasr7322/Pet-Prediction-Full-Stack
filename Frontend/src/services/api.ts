const getBaseURL = (): string => {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  if (!baseURL) {
    throw new Error('VITE_API_BASE_URL environment variable is not defined');
  }
  return baseURL;
};

export const BASE_URL = getBaseURL();

export class APIError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'APIError';
  }
}

export const handleResponse = async (response: Response) => {
  if (!response.ok) {
    let errorMessage = 'An error occurred';
    try {
      const errorData = await response.json();
      errorMessage = errorData.detail || errorMessage;
    } catch {
      errorMessage = response.statusText || errorMessage;
    }
    throw new APIError(errorMessage, response.status);
  }
  return response.json();
};