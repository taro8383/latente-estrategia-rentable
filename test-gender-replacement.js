// Simple test for gender replacements
import { VariableReplacer } from './src/utils/variableReplacer';

// Test data with female gender
const femaleData = {
  genderInfo: {
    gender: 'female' as const,
    genderSpecificText: {}
  }
};

// Test data with male gender
const maleData = {
  genderInfo: {
    gender: 'male' as const,
    genderSpecificText: {}
  }
};

const femaleReplacer = new VariableReplacer(femaleData);
const maleReplacer = new VariableReplacer(maleData);

// Test texts that should be gender-specific
const testTexts = [
  "Bienvenido",
  "estimado empresario",
  "está listo para tomar ese lugar",
  "Recompensa al que se declara rey, y está listo para tomar ese lugar"
];

console.log("=== GENDER REPLACEMENT TEST ===");

testTexts.forEach(text => {
  const femaleResult = femaleReplacer.replace(text);
  const maleResult = maleReplacer.replace(text);

  console.log(`\nOriginal: ${text}`);
  console.log(`Male: ${maleResult}`);
  console.log(`Female: ${femaleResult}`);
  console.log(`Female different: ${femaleResult !== maleResult ? 'YES' : 'NO'}`);
});

console.log("\n=== END TEST ===");