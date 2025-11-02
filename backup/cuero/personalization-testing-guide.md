# Personalization System Testing Guide

## Overview
This guide provides comprehensive testing scenarios for the personalization system with URL expiration functionality.

## Testing URLs

### 1. Basic Personalization Test
```
https://your-domain.com/invite/test123?data=eyJicmFuZEluZm8iOnsibWUuIHRlc3VybmFtZSI6IkNvYWNoIiwiY29tcHJ5ZSI6IkpvaG4iLCJjb21wYW55IjoiTHV4eHkgSG9sZGluZ3MiLCJpbmR1c3R5ZSI6ImFmbHVudCBwcm9mZXNzaW9uYWxzIn19dfQ==
```

**Expected Result:**
- Brand name: "Coach"
- Reader name: "John"
- Industry: "luxury-fashion"
- Company: "Luxury Holdings"
- Position: "CEO"
- Location: "New York"

### 2. Full Personalization Test
```
https://your-domain.com/exclusive/abc789xyz?data=eyJicmFuZEluZm8iOnsibWUuIHRlc3VybmFtZSI6IkxvdWlzVnVpdG9uIiwiaW5kdXN5IjoiTHV4eHkgSG9sZGluZ3MiLCJpbmR1c3R5ZSI6ImFmbHVudCBwcm9mZXNzaW9uYWxzIiwiY29tcGFueSI6IlByZW1pdW0gSG9sZGluZ3MiLCJwb3NpdGlvbiI6Ik5ldW4gWW9yayIsImV4eW5yZSI6WyJwcmVtaXVtIGJhZ2d5LCJoYW5kY3JhZnRlZCBsZWF0dXJlIiwgImV4Y2x1c2l1dSBkZXNpZ25vIl19dfQ==
```

**Expected Result:**
- Brand name: "Louis Vuitton"
- Reader name: "Maria"
- Industry: "luxury-fashion"
- Company: "Premium Holdings"
- Position: "CEO"
- Location: "Buenos Aires"
- Industry Keywords: ["premium baggy", "handcrafted leather", "exclusive design"]

### 3. Expiration Test (Expired Link)
```
https://your-domain.com/strategy/expired123?data=eyJleHBpcmF0aW9uIjIyMDI0MS0xVDEwOjA6MDAiLCJleHBpcmVzQXQiOiIyMDI0MS0xVDEwOjA6MDAiLCJ1bmlxdWVDb2RlZSI6ImV4eGlyZWQxMjMifQ==
```

**Expected Result:**
- Should redirect to `/expired` page
- Show "Esta invitación ha expirado" message
- Offer contact support option

### 4. Edge Cases Test

#### Invalid JSON Data
```
https://your-domain.com/invite/test123?data=invalidjson
```
**Expected Result:**
- Should fallback to default values
- No personalization applied
- Console error logged

#### Missing Data Parameter
```
https://your-domain.com/invite/test123
```
**Expected Result:**
- Should use default values
- No personalization applied
- Normal landing page experience

#### Malformed Base64
```
https://your-domain.com/invite/test123?data=notbase64
```
**Expected Result:**
- Should fallback to defaults
- Console error logged
- Graceful degradation

## Manual Testing Steps

### 1. Test Personalization Variables
1. Open URL with personalization data
2. Verify brand name appears in Hero quote section
3. Verify reader name appears in personalized greeting
4. Verify industry keywords appear in Problems section
5. Check that UrgencyTimer shows correct countdown

### 2. Test Expiration Functionality
1. Create URL with expiration time in the past
2. Navigate to URL
3. Should redirect to expired page
4. Verify expired page shows correct messaging
5. Test contact support functionality

### 3. Test URL Generator Tool
1. Open `public/url-generator.html`
2. Fill in form with test data
3. Generate URL
4. Copy generated URL
5. Navigate to generated URL
6. Verify personalization works correctly

### 4. Test Responsive Design
1. Test on mobile devices
2. Test on tablet devices
3. Test on desktop
4. Verify personalization works across all screen sizes

### 5. Test Browser Compatibility
1. Chrome (latest version)
2. Firefox (latest version)
3. Safari (latest version)
4. Edge (latest version)

## Automated Testing Script

```javascript
// Test script for browser console
const testUrls = [
  {
    name: 'Basic Personalization',
    url: 'https://your-domain.com/invite/test123?data=eyJicmFuZEluZm8iOnsibWUuIHRlc3VybmFtZSI6IkNvYWNoIiwiY29tcHJ5ZSI6IkpvaG4iLCJjb21wYW55IjoiTHV4eHkgSG9sZGluZ3MiLCJpbmR1c3R5ZSI6ImFmbHVudCBwcm9mZXNzaW9uYWxzIn19dfQ==',
    expectedBrand: 'Coach',
    expectedReader: 'John'
  },
  {
    name: 'Full Personalization',
    url: 'https://your-domain.com/exclusive/abc789xyz?data=eyJicmFuZEluZm8iOnsibWUuIHRlc3VybmFtZSI6IkxvdWlzVnVpdG9uIiwiaW5kdXN5IjoiTHV4eHkgSG9sZGluZ3MiLCJpbmR1c3R5ZSI6ImFmbHVudCBwcm9mZXNzaW9uYWxzIiwiY29tcGFueSI6IlByZW1pdW0gSG9sZGluZ3MiLCJwb3NpdGlvbiI6Ik5ldW4gWW9yayIsImV4eW5yZSI6WyJwcmVtaXVtIGJhZ2d5LCJoYW5kY3JhZnRlZCBsZWF0dXJlIiwgImV4Y2x1c2l1dSBkZXNpZ25vIl19dfQ==',
    expectedBrand: 'Louis Vuitton',
    expectedReader: 'Maria'
  }
];

// Run tests
testUrls.forEach(test => {
  console.log(`Testing: ${test.name}`);
  // Open in new window and check results
  window.open(test.url, '_blank');
});
```

## Performance Testing

### 1. Load Time Testing
- Measure time to parse personalization data
- Check impact on page load performance
- Verify no blocking operations

### 2. Memory Usage
- Monitor memory consumption with large datasets
- Check for memory leaks
- Verify cleanup on unmount

### 3. Bundle Size Impact
- Measure JavaScript bundle size increase
- Check CSS impact
- Verify minimal performance degradation

## Security Testing

### 1. XSS Prevention
```javascript
// Test with malicious input
const maliciousData = {
  brandInfo: {
    name: '<script>alert("xss")</script>'
  }
};

const encodedData = btoa(JSON.stringify(maliciousData));
const url = `?data=${encodedData}`;

// Verify script tags are escaped, not executed
```

### 2. Data Validation
- Test with oversized payloads
- Test with malformed JSON
- Test with invalid base64
- Verify graceful error handling

## Accessibility Testing

### 1. Screen Reader Compatibility
- Test with NVDA
- Test with VoiceOver
- Verify personalization content is announced properly

### 2. Keyboard Navigation
- Test without mouse
- Verify all interactive elements accessible
- Check focus management

## Analytics Integration

### 1. Tracking Parameters
```javascript
// Example analytics tracking
const personalizationData = getPersonalizationData();
analytics.track('personalization_loaded', {
  hasPersonalization: !!personalizationData,
  brandName: personalizationData?.brandInfo?.name,
  industry: personalizationData?.brandInfo?.industry,
  uniqueCode: personalizationData?.expiration?.uniqueCode
});
```

### 2. Conversion Tracking
```javascript
// Track conversion events
analytics.track('cta_clicked', {
  personalization_used: true,
  time_to_conversion: getTimeOnPage(),
  brand_name: personalizationData?.brandInfo?.name
});
```

## Troubleshooting Guide

### Common Issues

#### Personalization Not Working
1. Check URL parameter is correctly named `data`
2. Verify base64 encoding is valid
3. Check browser console for errors
4. Verify PersonalizationProvider is wrapping components

#### Expiration Not Working
1. Check system time is correct
2. Verify expiration timestamp format
3. Check timezone considerations
4. Test with manual time manipulation

#### Styling Issues
1. Verify CSS classes are applied correctly
2. Check responsive breakpoints
3. Verify component hierarchy
4. Test with different themes

## Success Criteria

### ✅ Must Pass
- [ ] All personalization variables replaced correctly
- [ ] Expiration functionality works as expected
- [ ] Fallback values work when data missing
- [ ] URL generator creates valid URLs
- [ ] Expired page displays correctly
- [ ] No console errors in normal operation
- [ ] Responsive design works on all devices
- [ ] Performance impact is minimal
- [ ] Security measures prevent XSS attacks
- [ ] Accessibility standards are met

### 📊 Performance Targets
- [ ] Page load time < 2 seconds
- [ ] Bundle size increase < 50KB
- [ ] Memory usage increase < 10MB
- [ ] No layout shifts during personalization

## Launch Checklist

### Pre-Launch
- [ ] All tests pass in development environment
- [ ] Performance benchmarks met
- [ ] Security review completed
- [ ] Accessibility audit passed
- [ ] Documentation updated
- [ ] Marketing team trained on URL generator

### Post-Launch
- [ ] Monitor error rates
- [ ] Track conversion rates
- [ ] Collect user feedback
- [ ] Monitor performance metrics
- [ ] Plan for A/B testing variations

## Contact Information

For technical issues or questions about the personalization system:
- **Development Team**: [dev-team@yourcompany.com]
- **Marketing Team**: [marketing@yourcompany.com]
- **Support**: [support@yourcompany.com]

---
*Last Updated: October 27, 2024*