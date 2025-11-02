const fs = require('fs');

// Simulate the environment variables from the workflow
process.env.MAPPINGS = '{"mappings": {}, "lastUpdated": 0, "version": "1.0", "statistics": {"totalMappings": 0, "activeMappings": 0, "expiredMappings": 0}}';
process.env.SHORT_CODE = 'test123';
process.env.LONG_URL = 'https://example.com/test';
process.env.EXPIRES_AT = Date.now() + (72 * 60 * 60 * 1000);
process.env.METADATA = '{"test": true}';

console.log('DEBUG: Starting Node.js processing');

let mappings, metadata;

try {
  mappings = JSON.parse(process.env.MAPPINGS);
  console.log('DEBUG: Successfully parsed MAPPINGS');
} catch (error) {
  console.error('ERROR: Failed to parse MAPPINGS:', error.message);
  process.exit(1);
}

try {
  metadata = JSON.parse(process.env.METADATA || '{}');
  console.log('DEBUG: Successfully parsed METADATA');
} catch (error) {
  console.log('DEBUG: JSON parse failed, trying JavaScript evaluation');
  console.log('DEBUG: Metadata input:', process.env.METADATA);

  try {
    // Use Function constructor for safer evaluation
    const jsObject = new Function('return ' + process.env.METADATA)();
    metadata = jsObject;
    console.log('DEBUG: Successfully evaluated metadata as JavaScript object');
  } catch (fallbackError) {
    console.log('WARNING: Could not parse metadata, using empty object');
    console.log('DEBUG: Original METADATA value:', process.env.METADATA);
    metadata = {};
  }
}

const shortCode = process.env.SHORT_CODE;
const longUrl = process.env.LONG_URL;
const expiresAt = parseInt(process.env.EXPIRES_AT);

console.log('DEBUG: Processing mapping for short code:', shortCode);
console.log('DEBUG: Long URL:', longUrl);
console.log('DEBUG: Expires at:', new Date(expiresAt).toISOString());
console.log('DEBUG: Metadata:', JSON.stringify(metadata));

// Add new mapping
mappings.mappings[shortCode] = {
  shortCode: shortCode,
  longUrl: longUrl,
  createdAt: Date.now(),
  expiresAt: expiresAt,
  metadata: metadata
};
mappings.lastUpdated = Date.now();

// Update statistics
const now = Date.now();
let activeCount = 0;
let expiredCount = 0;

Object.values(mappings.mappings).forEach(mapping => {
  if (now > mapping.expiresAt) {
    expiredCount++;
  } else {
    activeCount++;
  }
});

mappings.statistics = {
  totalMappings: Object.keys(mappings.mappings).length,
  activeMappings: activeCount,
  expiredMappings: expiredCount
};

// Write updated mappings
const outputPath = 'public/url-mappings.json';
fs.writeFileSync(outputPath, JSON.stringify(mappings, null, 2));

console.log('URL mapping stored successfully to:', outputPath);
console.log('Short code:', shortCode);
console.log('Long URL:', longUrl);
console.log('Total mappings:', Object.keys(mappings.mappings).length);
console.log('Active mappings:', activeCount);