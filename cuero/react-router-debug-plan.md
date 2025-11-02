# React Router Debug Plan

## Error Analysis
The error `useNavigate() may be used only in a context of a <Router> component` indicates that `useNavigate` is being called outside of a Router context.

## Error Location
Based on the stack trace, the error is occurring in:
- `PersonalizationProvider@http://localhost:8081/src/context/PersonalizationProvider.tsx:36:40`

## Possible Root Causes

### 1. Component Using useNavigate Outside Router
- **Issue**: Component is calling `useNavigate()` without being wrapped in `<Router>`
- **Location**: Could be any component that imports navigation hooks
- **Symptoms**: Error occurs when component renders

### 2. Router Configuration Issue
- **Issue**: Router not properly configured at app root
- **Location**: Missing Router wrapper in App.tsx
- **Symptoms**: Navigation hooks unavailable to child components

### 3. Context Provider Issue
- **Issue**: PersonalizationProvider might be calling navigation internally
- **Location**: Navigation logic inside context provider
- **Symptoms**: Context access triggers navigation error

### 4. Import/Export Issue
- **Issue**: Incorrect import of navigation hooks
- **Location**: Components importing hooks directly
- **Symptoms**: Hooks not properly connected to Router

## Debugging Steps

### Step 1: Identify Problem Component
1. **Check Component Imports**: Look for components importing `useNavigate`
2. **Check Navigation Usage**: Find where `useNavigate()` is being called
3. **Check Router Context**: Verify component is inside Router context
4. **Check Context Providers**: Look for navigation in context providers

### Step 2: Fix Router Configuration
1. **Verify App.tsx**: Ensure proper Router setup
2. **Check Router Wrapping**: All navigation users must be inside `<BrowserRouter>`
3. **Check Route Definitions**: Verify routes are properly defined
4. **Check Navigation Context**: Ensure navigation context is available

### Step 3: Fix Component Issues
1. **Remove Direct Navigation**: Replace `useNavigate()` calls with proper navigation
2. **Add Error Boundaries**: Wrap components with error boundaries
3. **Check Context Access**: Ensure components access context properly
4. **Update Component Structure**: Fix component hierarchy issues

### Step 4: Add Error Handling
1. **Try-Catch Blocks**: Add error handling around navigation
2. **Fallback Navigation**: Provide alternative navigation methods
3. **Error Logging**: Add comprehensive error logging
4. **Graceful Degradation**: Handle navigation failures gracefully

## Implementation Strategy

### 1. Router Context Fix
```typescript
// App.tsx - Ensure proper Router setup
<BrowserRouter basename={import.meta.env.PROD ? "/latente-estrategia-rentable/" : "/"}>
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/invite/:uniqueCode" element={<Index />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>
```

### 2. Navigation Hook Usage
```typescript
// Component using navigation properly
import { useNavigate } from 'react-router-dom';

const MyComponent = () => {
  const navigate = useNavigate(); // Only inside Router context
  
  const handleClick = () => {
    navigate('/some-path'); // Proper usage
  };
  
  return <button onClick={handleClick}>Navigate</button>;
};
```

### 3. Error Boundary Addition
```typescript
// Error boundary to catch navigation errors
import React from 'react';

class NavigationErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Navigation error:', error, errorInfo);
    this.setState({ error });
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Navigation Error</h2>
          <p>Sorry, there was a navigation error.</p>
          <details>
            <summary>Error Details</summary>
            <pre>{this.state.error?.toString()}</pre>
          </details>
        </div>
      );
    }
    
    return this.props.children;
  }
}

// Usage
<NavigationErrorBoundary>
  <App />
</NavigationErrorBoundary>
```

### 4. Debugging Tools
1. **React DevTools**: Check component hierarchy and context
2. **Console Logging**: Add comprehensive logging for navigation
3. **Component Inspector**: Use React DevTools Profiler
4. **Network Tab**: Check for failed resource loads

## Specific Files to Check

### High Priority
1. **`src/App.tsx`**: Router configuration and context setup
2. **`src/context/PersonalizationProvider.tsx`**: Context provider implementation
3. **`src/pages/Index.tsx`**: Main page component (uses navigation?)
4. **`src/components/`**: All components (check for navigation usage)

### Medium Priority
1. **`src/hooks/useExpirationCheck.ts`**: Custom hooks (might use navigation)
2. **`src/utils/`**: Utility functions (might trigger navigation)
3. **`src/main.tsx`**: Application entry point

## Testing Strategy

### 1. Isolated Testing
- Test navigation in isolation
- Verify Router context availability
- Check component rendering order

### 2. Integration Testing
- Test full application flow
- Verify navigation between routes
- Check error boundary behavior

### 3. Error Simulation
- Trigger navigation errors intentionally
- Test error handling and recovery
- Verify graceful degradation

## Prevention Measures

### 1. Code Review
- Review all navigation usage
- Check Router context compliance
- Verify component hierarchy

### 2. Testing Requirements
- Add navigation tests to test suite
- Include error boundary testing
- Test edge cases and error scenarios

### 3. Documentation
- Document proper navigation patterns
- Create troubleshooting guide
- Add best practices guide

## Expected Outcome

After implementing these fixes:
- ✅ **No Navigation Errors**: `useNavigate` works properly
- ✅ **Proper Context**: All components have access to Router context
- ✅ **Error Handling**: Graceful handling of navigation failures
- ✅ **Stable Application**: No more navigation-related crashes

## Timeline

### Phase 1: Analysis (Immediate)
- Identify exact error location
- Review component usage patterns
- Check Router configuration

### Phase 2: Implementation (Short-term)
- Fix Router context issues
- Add error boundaries
- Update component structure

### Phase 3: Testing (Medium-term)
- Comprehensive navigation testing
- Error scenario testing
- Integration verification

### Phase 4: Prevention (Long-term)
- Code review processes
- Testing requirements
- Documentation updates

This debugging plan should help identify and fix the React Router navigation issue systematically.