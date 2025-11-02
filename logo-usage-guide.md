# Company Logo Usage Guide

## Overview
The personalization system now supports company logos in addition to text personalization. This guide explains how to use this feature effectively.

## How Logo Integration Works

### 1. URL Generator Tool
The `public/url-generator.html` tool includes:
- **Logo Upload Section**: File input for company logos (PNG, JPG, etc.)
- **Live Preview**: Shows uploaded logo with proper scaling
- **Remove Option**: Button to remove uploaded logo
- **Data Integration**: Logo data is included in the generated URL

### 2. Data Structure
Company logos are stored as base64-encoded data in the URL:
```json
{
  "brandInfo": {
    "name": "Coach",
    "industry": "luxury-fashion"
  },
  "companyLogo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
}
```

### 3. Landing Page Integration
The landing page can display company logos in two ways:
- **Header Logo**: In the Hero component or header section
- **Sidebar Logo**: In navigation or side panels
- **Background Logo**: As a watermark or background element

## Step-by-Step Usage

### 1. Generate URL with Logo
1. Open `public/url-generator.html`
2. Fill in brand information
3. Click "📷 Subir logo" button
4. Select company logo file (PNG, JPG, etc.)
5. Click "🚀 Generar URL Personalizada"
6. Copy the generated URL

### 2. Test Logo Display
1. Navigate to the generated URL
2. Verify the company logo appears in the landing page
3. Check that the logo scales properly on different screen sizes

### 3. Troubleshooting Logo Issues

#### Logo Not Displaying
- **Check URL Structure**: Ensure the URL contains the `data` parameter
- **Verify Data Encoding**: Confirm the logo data is properly base64-encoded
- **Browser Console**: Check for JavaScript errors related to logo parsing

#### Logo Display Issues
- **File Size**: Optimize logo files under 500KB for faster loading
- **File Format**: Use PNG or JPG for best compatibility
- **Aspect Ratio**: Ensure logo has appropriate dimensions (recommend 1:1 or 4:3)

## Technical Implementation Details

### Logo Data Storage
```javascript
// Logo data is stored as base64 in the personalization data
const dataWithExpiration = {
  brandInfo: { /* ... */ },
  companyLogo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..." // Base64 encoded image
};
```

### Logo Display Component
```jsx
// Example component for displaying company logo
const CompanyLogoDisplay = () => {
  const { data } = usePersonalization();
  
  if (!data?.companyLogo) return null;
  
  return (
    <div className="company-logo-container">
      <img 
        src={data.companyLogo} 
        alt="Company Logo" 
        className="company-logo"
      />
    </div>
  );
};
```

### CSS for Logo Styling
```css
.company-logo-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.company-logo {
  max-height: 80px;
  max-width: 200px;
  object-fit: contain;
}
```

## Best Practices

### Logo Guidelines
1. **File Format**: PNG for transparency, JPG for photographs
2. **File Size**: Keep under 500KB for optimal loading
3. **Dimensions**: Minimum 200x200px, maximum 400x400px
4. **Background**: Use transparent backgrounds for PNG files
5. **Quality**: High resolution (300 DPI) for professional appearance

### URL Generator Usage
1. **Test Different Logos**: Verify various logo files work correctly
2. **Check Responsive Design**: Ensure logo display works on mobile
3. **Validate Data**: Test with and without logo data
4. **Monitor Performance**: Check impact on page load times

### Landing Page Integration
1. **Strategic Placement**: Place logos where they enhance brand recognition
2. **Consistent Sizing**: Maintain logo proportions across pages
3. **Fallback Handling**: Provide default display when no logo is available
4. **Loading States**: Show loading indicators while logos are being fetched

## Advanced Features

### Multiple Logo Support
The system can be extended to support:
- **Primary Logo**: Main company logo
- **Secondary Logo**: Alternative logo for dark themes
- **Brand Colors**: Extract brand colors from logo for UI theming
- **Logo Variations**: Different logos for different campaigns

### Dynamic Logo Selection
```javascript
// Example of dynamic logo selection based on campaign
const getLogoForCampaign = (campaignType) => {
  switch (campaignType) {
    case 'luxury':
      return data.companyLogoLuxury;
    case 'premium':
      return data.companyLogoPremium;
    default:
      return data.companyLogo;
  }
};
```

## Testing Checklist

### ✅ Logo Functionality
- [ ] Logo uploads correctly in URL generator
- [ ] Generated URLs contain logo data
- [ ] Landing page displays logos correctly
- [ ] Logo scaling works on all devices
- [ ] Fallback handling works when no logo
- [ ] Performance impact is minimal

### ✅ User Experience
- [ ] Clear upload instructions in URL generator
- [ ] Visual feedback for successful uploads
- [ ] Easy logo removal option
- [ ] Professional logo preview
- [ ] Responsive design on all screen sizes

## Troubleshooting Guide

### Common Issues

#### Logo Not Appearing
1. **Check URL Parameter**: Ensure `data` parameter is present
2. **Verify Base64 Encoding**: Confirm logo data is properly encoded
3. **Check Network Tab**: Verify image loads without errors
4. **Test Different Browsers**: Chrome, Firefox, Safari compatibility

#### Logo Display Problems
1. **CSS Conflicts**: Check for conflicting styles
2. **JavaScript Errors**: Look for console errors
3. **Image Loading**: Verify image path is accessible
4. **Responsive Issues**: Test on mobile devices

### Debug Tools
```javascript
// Add to browser console for debugging
console.log('Personalization data:', personalizationData);
console.log('Company logo data:', personalizationData.companyLogo);
```

## Security Considerations

### File Upload Security
1. **File Type Validation**: Only accept image files
2. **Size Limits**: Restrict file size to prevent abuse
3. **Content Scanning**: Validate image content
4. **Rate Limiting**: Prevent excessive upload attempts

### Data Protection
1. **Input Sanitization**: Clean all user inputs
2. **XSS Prevention**: Escape HTML content properly
3. **Data Validation**: Verify data structure integrity
4. **Error Handling**: Graceful degradation for invalid data

## Performance Optimization

### Image Optimization
1. **Compression**: Use optimized image formats
2. **Caching**: Cache logos for repeat visits
3. **Lazy Loading**: Load logos only when needed
4. **CDN Delivery**: Serve images from CDN for speed

### Code Optimization
1. **Minimal JavaScript**: Efficient logo handling code
2. **CSS Optimization**: Use hardware acceleration
3. **Bundle Size**: Minimize impact on page load
4. **Render Optimization**: Avoid unnecessary re-renders

## Analytics Integration

### Tracking Logo Usage
```javascript
// Track logo display and interaction
analytics.track('logo_displayed', {
  hasLogo: !!companyLogo,
  logoSize: companyLogo.length,
  brandName: brandInfo.name
});

analytics.track('logo_uploaded', {
  brandName: brandInfo.name,
  fileSize: uploadedLogoSize,
  uploadTime: new Date().toISOString()
});
```

## Support Information

For technical assistance with logo functionality:
- **Documentation**: `logo-usage-guide.md`
- **URL Generator**: `public/url-generator.html`
- **Example Implementations**: Available in component files
- **Testing Tools**: `test-personalization.html`

## Future Enhancements

### Planned Features
1. **Logo Library**: Pre-approved company logo options
2. **Dynamic Logo Selection**: Campaign-based logo variants
3. **Logo Analytics**: Track logo performance and engagement
4. **Advanced Styling**: Logo effects and animations
5. **Brand Color Extraction**: Automatic theme generation from logos

---
*Last Updated: October 27, 2024*