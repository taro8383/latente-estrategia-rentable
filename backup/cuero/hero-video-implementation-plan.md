# Hero Image Video Playback Implementation Plan

## Overview
This plan outlines the implementation of making the hero section image clickable to play a Streamable video in a modal dialog overlay.

## Technical Requirements
- Make the hero image clickable with a play button overlay
- Open Streamable video (https://streamable.com/ku7cqt) in a modal dialog
- Use existing UI components (Dialog, Button) from the project
- Ensure responsive behavior across all devices
- Maintain the current design aesthetic

## Implementation Steps

### 1. Create VideoPlayerModal Component
**File**: `src/components/VideoPlayerModal.tsx`

```typescript
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface VideoPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
}

export const VideoPlayerModal = ({ isOpen, onClose, videoUrl }: VideoPlayerModalProps) => {
  // Extract shortcode from full URL
  const getEmbedUrl = (url: string) => {
    const shortcode = url.split('/').pop() || '';
    return `https://streamable.com/e/${shortcode}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full p-0 overflow-hidden">
        <div className="relative aspect-video">
          <iframe
            src={getEmbedUrl(videoUrl)}
            className="w-full h-full border-0"
            allowFullScreen
            allow="autoplay; fullscreen; picture-in-picture"
          />
          <button
            onClick={onClose}
            className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
```

### 2. Modify Hero Component
**File**: `src/components/Hero.tsx`

**Changes needed**:
1. Import Play icon and useState
2. Add modal state management
3. Make image container clickable
4. Add play button overlay
5. Include VideoPlayerModal component

```typescript
// Add these imports
import { Play } from "lucide-react";
import { useState } from "react";
import { VideoPlayerModal } from "@/components/VideoPlayerModal";

// Add state in Hero component
const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
const videoUrl = "https://streamable.com/ku7cqt";

// Modify the image container (around line 83-94)
<div className="order-2 md:order-2">
  <div 
    className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-strong aspect-[4/5] sm:aspect-[3/4] md:aspect-[5/4] lg:aspect-[4/3] cursor-pointer group"
    onClick={() => setIsVideoModalOpen(true)}
  >
    <img
      src={heroLeader}
      alt="Empresario de cuero visionario y exitoso"
      className="w-full h-full object-cover object-center"
      loading="eager"
      fetchpriority="high"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
    
    {/* Play Button Overlay */}
    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <div className="bg-accent/90 rounded-full p-4 sm:p-6 shadow-strong transform scale-95 group-hover:scale-100 transition-transform">
        <Play className="h-8 w-8 sm:h-10 sm:w-10 text-white fill-white" />
      </div>
    </div>
  </div>
</div>

// Add VideoPlayerModal at the end of component (before closing section)
<VideoPlayerModal
  isOpen={isVideoModalOpen}
  onClose={() => setIsVideoModalOpen(false)}
  videoUrl={videoUrl}
/>
```

### 3. Styling Considerations

#### Play Button Overlay
- Semi-transparent background with accent color
- Smooth hover transitions
- Proper scaling on hover
- Centered positioning

#### Modal Dialog
- Maximum width of 4xl for large screens
- 16:9 aspect ratio for video
- Close button in top-right corner
- Fullscreen capability for iframe

#### Responsive Behavior
- Play button size adjusts for mobile (h-8 w-8 on mobile, h-10 w-10 on larger screens)
- Modal width adapts to screen size
- Touch-friendly click targets

### 4. User Experience Enhancements

#### Hover Effects
- Image slightly brightens on hover
- Play button fades in smoothly
- Cursor changes to pointer

#### Loading States
- Video iframe loads with proper attributes
- Smooth modal open/close animations

#### Accessibility
- Proper ARIA labels for play button
- Keyboard navigation support
- Focus management in modal

### 5. Technical Implementation Details

#### Streamable Embedding
- Use format: `https://streamable.com/e/{shortcode}`
- Extract shortcode from full URL: `ku7cqt`
- Enable fullscreen and autoplay permissions

#### State Management
- Local state in Hero component
- Simple boolean for modal open/close
- Clean onClose handler

#### Component Structure
- Reusable VideoPlayerModal component
- Props-based configuration
- Clean separation of concerns

### 6. Testing Checklist

#### Functionality
- [ ] Click on image opens modal
- [ ] Video plays correctly in modal
- [ ] Close button works properly
- [ ] Clicking outside modal closes it

#### Responsive Behavior
- [ ] Works on mobile devices
- [ ] Proper sizing on tablets
- [ ] Correct display on desktop
- [ ] Touch interactions work

#### Performance
- [ ] Image loading remains optimized
- [ ] Modal opens smoothly
- [ ] Video loads without issues

### 7. Files to Modify

1. **New File**: `src/components/VideoPlayerModal.tsx`
2. **Modified**: `src/components/Hero.tsx`

### 8. Dependencies

All required dependencies are already installed:
- `@radix-ui/react-dialog` (for Dialog component)
- `lucide-react` (for Play and X icons)
- Existing styling utilities

## Implementation Priority

1. **High Priority**: Basic functionality (click to open modal, play video)
2. **Medium Priority**: Styling and responsive behavior
3. **Low Priority**: Advanced UX enhancements and animations

## Success Criteria

- User can click on hero image to open video
- Video plays in a properly sized modal
- Experience is smooth and responsive
- Implementation follows project's design patterns
- Code is maintainable and reusable