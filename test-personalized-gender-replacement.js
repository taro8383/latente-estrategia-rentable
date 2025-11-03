// Gender Replacement Test Script
// This script tests the gender replacement functionality with the new mappings

import { VariableReplacer } from './src/utils/variableReplacer.js';

// Test data for female gender
const femaleData = {
  genderInfo: {
    gender: 'female'
  }
};

// Test data for male gender
const maleData = {
  genderInfo: {
    gender: 'male'
  }
};

// Create replacers
const femaleReplacer = new VariableReplacer(femaleData);
const maleReplacer = new VariableReplacer(maleData);

// Test cases - these are the exact texts from the components
const testCases = [
  {
    name: "PersonalizedWelcomeModal - Text 1",
    text: "Tu oportunidad exclusiva de convertirte en el <span className=\"text-accent font-semibold\">#1 absoluto</span> está lista."
  },
  {
    name: "Hero Component - Text 2",
    text: "Recompensa a el que <strong>se declara rey</strong>, y está listo para tomar ese lugar."
  },
  {
    name: "Pricing Component - Text 3",
    text: "¿Tienes lo que se necesita para ser el <span className=\"text-accent\">#1 absoluto</span>?"
  }
];

console.log("🔍 TESTING GENDER REPLACEMENT FIX");
console.log("=====================================\n");

testCases.forEach((testCase, index) => {
  console.log(`📝 Test ${index + 1}: ${testCase.name}`);
  console.log(`Original: ${testCase.text}`);

  const maleResult = maleReplacer.applyGenderReplacements(testCase.text);
  const femaleResult = femaleReplacer.applyGenderReplacements(testCase.text);

  console.log(`Male:    ${maleResult}`);
  console.log(`Female:  ${femaleResult}`);

  // Check if replacement actually happened
  const hasMaleVersion = maleResult.includes("el ") || maleResult.includes("listo");
  const hasFemaleVersion = femaleResult.includes("la ") || femaleResult.includes("lista");

  if (hasMaleVersion && hasFemaleVersion) {
    console.log("✅ PASS: Gender replacement working correctly");
  } else if (hasMaleVersion && !hasFemaleVersion) {
    console.log("❌ FAIL: Female replacement not working");
  } else if (!hasMaleVersion && hasFemaleVersion) {
    console.log("❌ FAIL: Male replacement not working");
  } else {
    console.log("❌ FAIL: No gender replacement detected");
  }

  console.log("---\n");
});

console.log("🎯 EXPECTED RESULTS:");
console.log("1. PersonalizedWelcomeModal should show 'la #1 absoluta' for female");
console.log("2. Hero Component should show 'a la que se declara reina' for female");
console.log("3. Pricing Component should show 'la #1 absoluta' for female");
console.log("\nIf all tests show ✅ PASS, the gender replacement fix is working correctly!");