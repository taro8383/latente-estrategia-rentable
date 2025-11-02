# Development Tasks and Procedures

## Common Development Workflows

### Build Process
```bash
npm run build          # Production build
npm run dev            # Development server
npm run deploy          # Build and deploy to GitHub Pages
```

### JSX Syntax Debugging
When encountering JSX syntax errors:
1. Check for mismatched opening/closing tags
2. Verify proper nesting hierarchy
3. Ensure self-closing tags use `/>` syntax
4. Validate React component imports and exports

### Personalization Testing
1. Generate personalized URL using URL generator
2. Test with different brand and reader data
3. Verify logo replacement functionality
4. Check variable replacement in all text content
5. Validate expiration timer behavior

## Component Development Patterns

### New Component Structure
```typescript
interface ComponentProps {
  // Define props with TypeScript
}

export const Component = ({ prop }: ComponentProps) => {
  const { data } = usePersonalization(); // Access personalization
  
  return (
    <div className="tailwind-classes">
      {/* Component JSX */}
    </div>
  );
};
```

### Adding Personalization
1. Use `usePersonalization()` hook to access data
2. Implement `PersonalizedText` component for dynamic content
3. Add personalization data to TypeScript interfaces
4. Test with URL parameters

### Video Integration
1. Use `VideoPlayerModal` component for video content
2. Provide Streamable URL as videoUrl prop
3. Handle modal state with `useState`
4. Ensure proper accessibility attributes

## Important Procedures

### Deployment Process
1. Run `npm run build` to verify no errors
2. Test production build locally with `npm run preview`
3. Execute `npm run deploy` for GitHub Pages
4. Verify deployment at production URL

### Debugging Personalization Issues
1. Check browser console for debug logs
2. Verify URL parameters are being parsed
3. Confirm personalization data structure
4. Test variable replacement engine
5. Validate logo storage and retrieval

### Performance Optimization
1. Use `useMemo` for expensive computations
2. Implement proper loading states
3. Optimize image loading with `fetchpriority`
4. Minimize re-renders with proper dependency arrays

## Common Issues and Solutions

### JSX Syntax Errors
- **Issue**: Mismatched tags causing build failures
- **Solution**: Carefully check opening/closing tag pairs
- **Prevention**: Use IDE with JSX linting and auto-closing tags

### Personalization Not Working
- **Issue**: Data not loading or displaying
- **Solution**: Check URL parameter parsing and context provider
- **Prevention**: Test with different data combinations

### Video Modal Not Opening
- **Issue**: Modal state management problems
- **Solution**: Verify useState implementation and event handlers
- **Prevention**: Test modal triggers in different scenarios

## CLI Commands Reference

### Development
```bash
npm run dev              # Start development server
npm run build            # Production build
npm run preview          # Preview production build
npm run lint             # Run ESLint
```

### Deployment
```bash
npm run deploy            # Build and deploy to GitHub Pages
npm run deploy:safe       # Force deploy to GitHub Pages
```

## File Modification Patterns

### When Adding New Components
1. Create component file in `src/components/`
2. Add to appropriate index if needed
3. Update TypeScript interfaces
4. Add responsive design classes
5. Test with personalization data

### When Updating Personalization
1. Modify `src/types/personalization.ts`
2. Update `VariableReplacer` class
3. Test with URL generator
4. Update documentation
5. Verify all components still work

## Gotchas to Remember

- Always check JSX tag matching when editing components
- Test personalization with different data combinations
- Verify responsive design at all breakpoints
- Ensure proper TypeScript typing for all props
- Check browser console for runtime errors
- Validate build process before deployment