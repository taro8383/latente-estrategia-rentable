# System Architecture

The application follows a component-based React architecture with TypeScript and Tailwind CSS for styling.

## Core Architecture Patterns

### Component Structure
- Functional components with hooks for state management
- Context API for global personalization state
- Custom hooks for reusable logic (expiration checking, personalization)
- shadcn/ui component library for consistent design system

### Data Flow
1. URL parameters → PersonalizationProvider → Component props
2. Personalization data stored in context and accessed via custom hook
3. Variable replacement system processes dynamic content
4. Component re-rendering triggered by personalization state changes

### Key Components
- **PersonalizationProvider**: Global state management for personalization data
- **Hero**: Main landing section with personalized content and video integration
- **VideoPlayerModal**: Modal component for video playback
- **PersonalizedText**: Text component with variable replacement
- **CompanyLogo**: Dynamic logo display based on personalization data

### Integration Points
- Streamable video integration for marketing content
- Logo storage system for brand personalization
- URL parameter parsing for personalization data
- GitHub Pages deployment with SPA routing

## Technical Decisions

- **Vite** for build tooling and development server
- **React Router** for client-side routing
- **Tailwind CSS** for utility-first styling
- **TypeScript** for type safety
- **shadcn/ui** for component design system