import fs from "fs"
import path from "path"

console.log('🔧 Starting runtime config injection...');

// Get values from environment (Netlify provides these)
const VITE_API_URL = process.env.VITE_API_URL;
const NODE_ENV = process.env.NODE_ENV || 'production';
const BUILD_TIME = new Date().toISOString();

// Validate
if (!VITE_API_URL) {
  console.error('❌ ERROR: VITE_API_URL environment variable is not set!');
  console.error('   Please set it in Netlify dashboard:');
  console.error('   Site Settings → Environment Variables');
  process.exit(1);
}

console.log(`✅ Using VITE_API_URL: ${VITE_API_URL}`);
console.log(`✅ Environment: ${NODE_ENV}`);

// Read template
const templatePath = path.join(__dirname, '../public/runtime-config.template.js');
const template = fs.readFileSync(templatePath, 'utf8');

// Replace placeholders
const injected = template
  .replace('"__VITE_API_URL__"', JSON.stringify(VITE_API_URL))
  .replace('"__NODE_ENV__"', JSON.stringify(NODE_ENV))
  .replace('"__BUILD_TIME__"', JSON.stringify(BUILD_TIME));

// Write to public folder
const outputPath = path.join(__dirname, '../public/runtime-config.js');
fs.writeFileSync(outputPath, injected);

console.log('✅ Runtime config injected to:', outputPath);
console.log('✅ Build time:', BUILD_TIME);