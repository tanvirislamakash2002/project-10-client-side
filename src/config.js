/**
 * SMART Environment Configuration
 * Keeps .env.local for dev, works on Netlify
 */

// ========================
// 1. GLOBAL CONFIG OBJECT
// ========================
window.__APP_CONFIG = window.__APP_CONFIG || {};

// ========================
// 2. INTELLIGENT CONFIG GETTER
// ========================
const getConfig = () => {
  const hostname = window.location.hostname;
  const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
  const isNetlify = hostname.includes('netlify.app');
  
  // 🎯 STRATEGY 1: URL Parameters (Highest priority - for testing)
  const urlParams = new URLSearchParams(window.location.search);
  const urlApiUrl = urlParams.get('api_url');
  if (urlApiUrl) {
    console.log('🔧 Using URL parameter override');
    return {
      API_URL: urlApiUrl,
      GOOGLE_CLIENT_ID: urlParams.get('google_client_id') || '',
      FIREBASE_API_KEY: urlParams.get('firebase_key') || '',
      SOURCE: 'url-param',
      IS_PRODUCTION: false
    };
  }
  
  // 🎯 STRATEGY 2: Manual Window Config (For Netlify production)
  if (window.__APP_CONFIG.API_URL) {
    console.log('🔧 Using manual window config');
    return {
      API_URL: window.__APP_CONFIG.API_URL,
      GOOGLE_CLIENT_ID: window.__APP_CONFIG.GOOGLE_CLIENT_ID || '',
      FIREBASE_API_KEY: window.__APP_CONFIG.FIREBASE_API_KEY || '',
      SOURCE: 'window-manual',
      IS_PRODUCTION: !isLocalhost
    };
  }
  
  // 🎯 STRATEGY 3: On Netlify but no config? Use production URL!
  if (isNetlify) {
    // console.warn('⚠️  On Netlify but no window.__APP_CONFIG found!');
    // console.warn('   Using production URL as fallback.');
    
    return {
      API_URL: import.meta.env.VITE_API_VERCEL_URL, 
      GOOGLE_CLIENT_ID: '',
      FIREBASE_API_KEY: '',
      SOURCE: 'netlify-fallback',
      IS_PRODUCTION: true
    };
  }
  
  // 🎯 STRATEGY 4: Localhost - Use .env.local safely
  if (isLocalhost) {
    if (import.meta.env?.VITE_API_URL) {
      // console.log('🔧 Using .env.local on localhost');
      return {
        API_URL: import.meta.env.VITE_API_URL,
        GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
        FIREBASE_API_KEY: import.meta.env.VITE_FIREBASE_API_KEY || '',
        SOURCE: 'vite-local',
        IS_PRODUCTION: false
      };
    }
  }
  
  // 🎯 STRATEGY 5: Final fallback (should never reach here on Netlify)
  return {
    API_URL: isLocalhost ? import.meta.env.VITE_API_URL : import.meta.env.VITE_API_VERCEL_URL,
    GOOGLE_CLIENT_ID: '',
    FIREBASE_API_KEY: '',
    SOURCE: 'final-fallback',
    IS_PRODUCTION: !isLocalhost
  };
};

// ========================
// 3. EXPORT WITH SAFETY CHECKS
// ========================
export const config = getConfig();

// 🛡️ SAFETY: Never use localhost on Netlify
export const API_URL = (() => {
  const isNetlify = window.location.hostname.includes('netlify.app');
  const isLocalhostInUrl = config.API_URL.includes('localhost');
  
  if (isNetlify && isLocalhostInUrl) {
    console.error('🚨 CRITICAL: Localhost URL on Netlify! Overriding to production.');
    return import.meta.env.VITE_API_VERCEL_URL;
  }
  
  return config.API_URL;
})();

export const GOOGLE_CLIENT_ID = config.GOOGLE_CLIENT_ID;
export const FIREBASE_API_KEY = config.FIREBASE_API_KEY;
export const CONFIG_SOURCE = config.SOURCE;
export const IS_PRODUCTION = config.IS_PRODUCTION;



// ========================
// 4. INFORMATIVE DEBUG LOGS
// ========================
// console.group('🌍 Environment Configuration');
// console.log('🔗 API_URL:', API_URL);
// console.log('📦 Source:', CONFIG_SOURCE);
// console.log('🏠 Hostname:', window.location.hostname);
// console.log('📡 Is Production:', IS_PRODUCTION);
// console.log('🔧 Raw Config:', config);

// 🚨 WARNINGS
// if (window.location.hostname.includes('netlify.app')) {
//   if (API_URL.includes('localhost')) {
//     console.error('❌ ERROR: Using localhost on Netlify! This will break.');
//     console.info('💡 Solution: Add this to your index.html:');
//     console.info(`<script>
//       window.__APP_CONFIG = {
//         API_URL: 'https://ph-a10-server-two.vercel.app'
//       };
//     </script>`);
//   } else if (!window.__APP_CONFIG.API_URL) {
//     console.warn('⚠️  Warning: No window.__APP_CONFIG set on Netlify');
//     console.info('💡 Recommended: Set window.__APP_CONFIG in index.html');
//   }
// }
// console.groupEnd();