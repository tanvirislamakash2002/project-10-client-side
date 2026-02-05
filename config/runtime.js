// This file reads from window.__RUNTIME_CONFIG__ in production
// It's safe to use in both dev and prod

let runtimeConfig = null;

const loadRuntimeConfig = () => {
  if (runtimeConfig) return runtimeConfig;
  
  // Priority 1: Window runtime config (injected during build)
  if (window.__RUNTIME_CONFIG__) {
    runtimeConfig = window.__RUNTIME_CONFIG__;
  } 
  // Priority 2: Default fallback (should never happen if build is correct)
  else {
    runtimeConfig = {
      baseUrl: 'https://ph-a10-server-two.vercel.app',
      environment: 'production',
      version: '1.0.0'
    };
  }
  
  return runtimeConfig;
};

export const getRuntimeConfig = () => loadRuntimeConfig();