 import fs from 'fs';
 import path from 'path';

// Get environment variables (from Netlify or local)
const API_URL = process.env.VITE_API_URL || 'https://ph-a10-server-two.vercel.app';
const NODE_ENV = process.env.NODE_ENV || 'development';
const BUILD_TIME = new Date().toISOString();

console.log('🔧 Injecting runtime configuration:');
console.log('   API_URL:', API_URL);
console.log('   NODE_ENV:', NODE_ENV);

// Read template
const templatePath = path.join(__dirname, '../public/runtime-config.template.js');
let content = fs.readFileSync(templatePath, 'utf8');

// Replace placeholders
content = content
  .replace('"__API_URL__"', JSON.stringify(API_URL))
  .replace('"__ENVIRONMENT__"', JSON.stringify(NODE_ENV))
  .replace('"__BUILD_TIME__"', JSON.stringify(BUILD_TIME));

// Write to public folder
const outputPath = path.join(__dirname, '../public/runtime-config.js');
fs.writeFileSync(outputPath, content);

console.log('✅ Runtime config injected successfully!');