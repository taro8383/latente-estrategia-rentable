# Problems Component Text Color Fix Plan

## Current Issue Identified

In the `Problems` component (`src/components/Problems.tsx`), there are text elements using `text-destructive` class which creates red color instead of grey for better contrast.

## Required Changes

### 1. Fix Text Color in Problem Cards
**File**: `src/components/Problems.tsx`
**Lines to fix**:
- Line 136: `<p className="text-sm font-semibold text-destructive uppercase tracking-wider">Antes:</p>`
- Line 143: `<p className="text-sm font-semibold text-foreground uppercase tracking-wider">Después:</p>`
- Line 150: `<p className="text-sm font-semibold text-foreground uppercase tracking-wider">Resultado:</p>`

**Change**: Replace `text-destructive` with `text-muted-foreground` for better contrast and readability

### 2. Fix Text Color in Problem Descriptions
**File**: `src/components/Problems.tsx`
**Lines to fix**:
- Line 138: `{problem.before}`
- Line 145: `{problem.after}`
- Line 152: `{problem.result}`

**Change**: These are template literals that need to be checked for any styling issues

## Implementation Notes

- The issue is with text color contrast in the "Antes:" and "Después:" labels
- The template literals should be checked to ensure they don't have any styling issues
- The goal is to make the text more readable with better contrast against the background