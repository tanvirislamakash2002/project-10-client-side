/**
 * Universal config loader that works in ALL environments
 * Priority: Runtime config > Vite env vars > Defaults
 */

class AppConfig {
  constructor() {
    this._config = null;
  }

  async load() {
    if (this._config) return this._config;

    try {
      // Try runtime config first (from public/runtime-config.js)
      if (window.__APP_RUNTIME_CONFIG__) {
        this._config = window.__APP_RUNTIME_CONFIG__;
        console.log('📦 Using runtime configuration');
      } 
      // Fallback to Vite env vars (for local dev)
      else if (import.meta.env.VITE_API_URL) {
        this._config = {
          API_URL: import.meta.env.VITE_API_URL,
          ENVIRONMENT: import.meta.env.MODE || 'development',
          BUILD_TIME: new Date().toISOString()
        };
        console.log('🔧 Using Vite environment variables');
      }
      // Final fallback
      else {
        const isProduction = window.location.hostname !== 'localhost';
        this._config = {
          API_URL: isProduction 
            ? 'https://ph-a10-server-two.vercel.app'
            : 'http://localhost:3000',
          ENVIRONMENT: isProduction ? 'production' : 'development',
          BUILD_TIME: new Date().toISOString()
        };
        console.log('⚡ Using default configuration');
      }
    } catch (error) {
      console.error('Failed to load config:', error);
      this._config = this.getDefaults();
    }

    return this._config;
  }

  getDefaults() {
    return {
      API_URL: 'https://ph-a10-server-two.vercel.app',
      ENVIRONMENT: 'production',
      BUILD_TIME: new Date().toISOString()
    };
  }

  // Convenience getters
  get apiUrl() {
    return this._config?.API_URL || this.getDefaults().API_URL;
  }

  get environment() {
    return this._config?.ENVIRONMENT || this.getDefaults().ENVIRONMENT;
  }
}

// Singleton instance
export const appConfig = new AppConfig();

// Helper function for immediate use
export const getApiUrl = () => appConfig.apiUrl;