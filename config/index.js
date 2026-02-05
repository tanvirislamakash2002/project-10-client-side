import devConfig from './build-time.js';
import { getRuntimeConfig } from './runtime.js';

class Config {
  constructor() {
    this._config = null;
    this._isDev = this.checkIfDevelopment();
  }
  
  checkIfDevelopment() {
    // Check multiple ways to detect dev environment
    try {
      // Method 1: Check import.meta.env (only works in dev)
      if (typeof import.meta !== 'undefined' && import.meta.env) {
        return import.meta.env.DEV === true;
      }
      
      // Method 2: Check URL
      if (typeof window !== 'undefined') {
        return window.location.hostname === 'localhost' || 
               window.location.hostname.includes('.netlify.app') === false;
      }
      
      return false;
    } catch {
      return false;
    }
  }
  
  async load() {
    if (this._config) return this._config;
    
    if (this._isDev) {
      // Development: Use Vite's import.meta.env
      this._config = {
        baseUrl: devConfig.baseUrl,
        environment: 'development',
        source: 'vite-dev'
      };
    } else {
      // Production: Use runtime config
      const runtime = getRuntimeConfig();
      this._config = {
        baseUrl: runtime.baseUrl,
        environment: runtime.environment,
        source: 'runtime-config'
      };
    }
    
    // Log for debugging (only in dev)
    if (this._isDev) {
      console.log('📦 Config loaded:', {
        source: this._config.source,
        baseUrl: this._config.baseUrl,
        environment: this._config.environment
      });
    }
    
    return this._config;
  }
  
  get baseUrl() {
    if (!this._config) {
      throw new Error('Config not loaded. Call load() first.');
    }
    return this._config.baseUrl;
  }
}

// Create and export singleton instance
export const config = new Config();

// Helper for immediate usage
export const getBaseUrl = () => {
  // For components that need immediate value
  if (config._config) {
    return config._config.baseUrl;
  }
  
  // Fallback logic
  if (window.__RUNTIME_CONFIG__?.baseUrl) {
    return window.__RUNTIME_CONFIG__.baseUrl;
  }
  
  // Final fallback
  return config._isDev ? 'http://localhost:3000' : 'https://ph-a10-server-two.vercel.app';
};