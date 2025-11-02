# Technical Context

## Technology Stack

### Core Technologies
- **React 18.3.1** - UI framework with hooks and functional components
- **TypeScript 5.8.3** - Type safety and enhanced developer experience
- **Vite 5.4.19** - Build tool and development server
- **Tailwind CSS 3.4.17** - Utility-first CSS framework

### UI Components
- **shadcn/ui** - Component library built on Radix UI primitives
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **class-variance-authority** - Component variant management

### Routing & State
- **React Router DOM 6.30.1** - Client-side routing
- **React Context API** - Global state management
- **Custom Hooks** - Reusable state logic

### Development Tools
- **ESLint 9.32.0** - Code linting and quality
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS compatibility

### Deployment
- **GitHub Pages** - Static site hosting
- **gh-pages 6.2.0** - Deployment automation

## Development Setup

### Build Configuration
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "deploy": "npm run build && npx gh-pages --remote origin --branch gh-pages --dist dist --add"
  }
}
```

### Path Aliases
- `@/` → `./src/` for clean imports

### Base Path Configuration
- Development: `/`
- Production: `/latente-estrategia-rentable/`

## Key Integrations

### Video Integration
- **Streamable** for video hosting and embedding
- Custom modal component for video playback

### Personalization System
- Base64 encoded URL parameters
- Variable replacement engine
- Logo storage and retrieval system
- Expiration-based access control