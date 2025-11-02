# Personalization Implementation Plan

## Overview
This document outlines the implementation of personalization variables to replace hardcoded text in the application, allowing for dynamic content based on URL parameters.

## Completed Tasks

### 1. Hero Component - [industria] Variable
- **Location**: `src/components/Hero.tsx`
- **Change**: Replaced hardcoded "cuero" with `[industria]` variable
- **Implementation**: Wrapped with `PersonalizedText` component
- **Status**: ✅ Completed

### 2. Problems Component - [ubicacion] Variable
- **Location**: `src/components/Problems.tsx` (line 14)
- **Change**: Replaced hardcoded "Palermo" with `[ubicacion]` variable
- **Implementation**: Wrapped with `PersonalizedText` component
- **Status**: ✅ Completed

### 3. Problems Component - [inovacion] Variable
- **Location**: `src/components/Problems.tsx` (line 28)
- **Change**: Replaced hardcoded "cuero reciclado" with `[inovacion]` variable
- **Implementation**: Wrapped with `PersonalizedText` component
- **Status**: ✅ Completed

### 4. Problems Component - [posicionamiento] Variable
- **Location**: `src/components/Problems.tsx` (line 41)
- **Change**: Replaced hardcoded "Calidad' y 'artesanal'" with `[posicionamiento]` variable
- **Implementation**: Wrapped with `PersonalizedText` component
- **Status**: ✅ Completed

### 5. Problems Component - [Rolls-Royce] Variable
- **Location**: `src/components/Problems.tsx` (line 42)
- **Change**: Replaced hardcoded "Rolls-Royce del cuero sudamericano" with `[Rolls-Royce]` variable
- **Implementation**: Wrapped with `PersonalizedText` component
- **VariableReplacer Update**: Added `'Rolls-Royce': 'Rolls-Royce del [industria]'` to defaults
- **Status**: ✅ Completed

## Pending Tasks

### 6. Problems Component - [frase descriptiva] Variable
- **Location**: `src/components/Problems.tsx` (line 70)
- **Change**: Replace hardcoded "cuero premium en Argentina" with `[frase descriptiva]` variable
- **Implementation**: 
  1. Add `'frase descriptiva': '[industria] premium en [location]'` to VariableReplacer defaults
  2. Replace hardcoded text with `[frase descriptiva]`
  3. Ensure text is wrapped with `PersonalizedText` component
- **Status**: ⏳ Pending

## VariableReplacer Class Updates

The `src/utils/variableReplacer.ts` file has been updated with the following new default variables:
- `'inovacion': 'innovación'`
- `'posicionamiento': 'posicionamiento estratégico'`
- `'Rolls-Royce': 'Rolls-Royce del [industria]'`

## Testing Plan

Once all implementations are complete, testing should verify:
1. Variables are properly replaced in the UI
2. URL parameters correctly populate the personalization data
3. Default values are used when no parameters are provided
4. Nested variable replacement works (e.g., `[Rolls-Royce]` → `Rolls-Royce del [industria]` → `Rolls-Royce del cuero`)

## URL Generator Integration

The `public/url-generator.html` file already includes:
- Industry field for `[industria]` variable
- Location field for `[ubicacion]` variable
- Keywords field that populates `[inovacion]`, `[posicionamiento]`, etc.
- Proper encoding/decoding of personalization data

## Next Steps

1. Complete the [frase descriptiva] variable implementation
2. Test all personalization variables with different URL parameters
3. Verify the personalization works correctly across all components
4. Update documentation with new personalization capabilities

## Implementation Notes

- All personalization variables use the `[variable_name]` syntax
- The `PersonalizedText` component handles the variable replacement
- The `VariableReplacer` class provides default values and replacement logic
- Variables can reference other variables (nested replacement)
- The URL generator creates properly encoded data for all variables