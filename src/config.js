/**
 * Dynamic Environment Configuration
 * Priority: Window Config > Vite Env > Defaults
 */

// Runtime configuration (can be set by Netlify after deployment)
window.__APP_CONFIG = window.__APP_CONFIG || {};

const getConfig = () => {
  // Priority 1: Runtime config (set by Netlify via snippet)
  if (window.__APP_CONFIG.API_URL) {
    return {
      API_URL: window.__APP_CONFIG.API_URL,
      GOOGLE_CLIENT_ID: window.__APP_CONFIG.GOOGLE_CLIENT_ID,
      FIREBASE_API_KEY: window.__APP_CONFIG.FIREBASE_API_KEY,
      ENABLE_DEBUG: window.__APP_CONFIG.ENABLE_DEBUG || false,
      SOURCE: 'runtime'
    };
  }
  
  // Priority 2: Vite environment variables (local development)
  if (import.meta.env) {
    return {
      API_URL: import.meta.env.VITE_API_URL ,
      GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
      FIREBASE_API_KEY: import.meta.env.VITE_FIREBASE_API_KEY || '',
      ENABLE_DEBUG: import.meta.env.VITE_ENABLE_DEBUG === 'true',
      SOURCE: 'vite'
    };
  }
  
  // Priority 3: Defaults (fallback)
//   const isLocal = window.location.hostname === 'localhost' || 
//                   window.location.hostname === '127.0.0.1';
  
//   return {
//     API_URL: isLocal ? 'http://localhost:3000' : 'https://ph-a10-server-two.vercel.app',
//     GOOGLE_CLIENT_ID: '',
//     FIREBASE_API_KEY: '',
//     ENABLE_DEBUG: isLocal,
//     SOURCE: 'default'
//   };
};

// Export configuration
export const config = getConfig();

// Individual exports for convenience
export const API_URL = config.API_URL;
export const GOOGLE_CLIENT_ID = config.GOOGLE_CLIENT_ID;
export const FIREBASE_API_KEY = config.FIREBASE_API_KEY;
export const ENABLE_DEBUG = config.ENABLE_DEBUG;

// Debug function
export const debugConfig = () => {
//   console.group('🔧 Environment Configuration');
//   console.log('Source:', config.SOURCE);
//   console.log('API_URL:', API_URL);
//   console.log('Environment:', import.meta.env?.MODE || 'production');
//   console.log('Full config:', config);
//   console.groupEnd();
  return config;
};

// Auto-debug in development
if (import.meta.env?.DEV) {
  debugConfig();
}