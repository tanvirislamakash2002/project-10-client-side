// This file is ONLY for development
// It reads from import.meta.env during dev
const devConfig = {
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  environment: import.meta.env.MODE || 'development',
  
  // Safely check if we're in dev mode
  isDevelopment: () => {
    try {
      return import.meta.env.DEV === true;
    } catch {
      return false;
    }
  }
};

export default devConfig;