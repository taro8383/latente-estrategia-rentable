# Personalization System Architecture Diagram

## System Flow

```mermaid
flowchart TD
    A[Cold Email with Personalized Link] --> B[User Clicks Link]
    B --> C[Landing Page Loads]
    C --> D[URL Parameter Detection]
    D --> E{Has data parameter?}
    E -->|Yes| F[Parse Base64 Data]
    E -->|No| G[Use Default Values]
    F --> H[Decode JSON]
    H --> I[Validate Data Structure]
    I --> J[Create Personalization Context]
    G --> J
    J --> K[Render Components]
    K --> L[Variable Replacement Engine]
    L --> M[Display Personalized Content]
    
    style A fill:#e1f5fe
    style B fill:#f3e5f5
    style C fill:#e8f5e8
    style M fill:#fff3e0
```

## Component Architecture

```mermaid
graph TD
    subgraph "App Layer"
        APP[App.tsx]
        PP[PersonalizationProvider]
    end
    
    subgraph "Core Engine"
        VR[VariableReplacer]
        UP[usePersonalization Hook]
        PT[PersonalizedText Component]
    end
    
    subgraph "Landing Page Components"
        HERO[Hero Component]
        PROB[Problems Component]
        SOL[Solution Component]
        CTA[FinalCTA Component]
    end
    
    subgraph "Data Flow"
        URL[URL Parameters]
        JSON[Personalization JSON]
        CTX[React Context]
    end
    
    APP --> PP
    PP --> UP
    PP --> VR
    UP --> PT
    PT --> HERO
    PT --> PROB
    PT --> SOL
    PT --> CTA
    
    URL --> PP
    JSON --> PP
    PP --> CTX
    CTX --> UP
    
    style APP fill:#e3f2fd
    style PP fill:#f3e5f5
    style VR fill:#e8f5e8
    style PT fill:#fff3e0
```

## Data Structure Flow

```mermaid
graph LR
    subgraph "Email Campaign"
        EMAIL[Email Template]
        DATA[Personalization Data]
    end
    
    subgraph "URL Generation"
        ENCODE[Base64 Encoding]
        URL_GEN[URL Creation]
    end
    
    subgraph "Landing Page"
        PARAMS[URL Parameters]
        DECODE[JSON Decode]
        VALIDATE[Data Validation]
        CONTEXT[Context Creation]
    end
    
    subgraph "Component Rendering"
        REPLACE[Variable Replacement]
        RENDER[Component Render]
    end
    
    EMAIL --> DATA
    DATA --> ENCODE
    ENCODE --> URL_GEN
    URL_GEN --> PARAMS
    PARAMS --> DECODE
    DECODE --> VALIDATE
    VALIDATE --> CONTEXT
    CONTEXT --> REPLACE
    REPLACE --> RENDER
    
    style EMAIL fill:#e1f5fe
    style URL_GEN fill:#f3e5f5
    style CONTEXT fill:#e8f5e8
    style RENDER fill:#fff3e0
```

## Variable Replacement Process

```mermaid
sequenceDiagram
    participant User
    participant URL as URL Parser
    participant Provider as PersonalizationProvider
    participant Component as React Component
    participant Replacer as VariableReplacer
    participant UI as Final UI
    
    User->>URL: Visits personalized URL
    URL->>Provider: Extracts data parameter
    Provider->>Provider: Parses and validates JSON
    Provider->>Component: Provides personalization context
    Component->>Replacer: Sends text with [variables]
    Replacer->>Replacer: Replaces [brand name] with actual value
    Replacer->>Replacer: Replaces [reader name] with actual value
    Replacer->>Replacer: Replaces [industry keywords] with actual values
    Replacer->>Component: Returns personalized text
    Component->>UI: Renders personalized content
    UI->>User: Shows tailored landing page
```

## Error Handling Flow

```mermaid
flowchart TD
    START[Page Load] --> CHECK{Has URL data?}
    CHECK -->|No| DEFAULTS[Use Default Values]
    CHECK -->|Yes| DECODE[Decode Base64]
    DECODE --> VALID{Valid JSON?}
    VALID -->|No| ERROR_LOG[Log Error + Fallback]
    VALID -->|Yes| STRUCTURE{Valid Structure?}
    STRUCTURE -->|No| PARTIAL[Use Valid Parts + Defaults]
    STRUCTURE -->|Yes| FULL[Use Full Data]
    
    DEFAULTS --> RENDER[Render Page]
    ERROR_LOG --> RENDER
    PARTIAL --> RENDER
    FULL --> RENDER
    
    style ERROR_LOG fill:#ffebee
    style DEFAULTS fill:#fff3e0
    style FULL fill:#e8f5e8
```

## Implementation Timeline

```mermaid
gantt
    title Personalization Implementation Timeline
    dateFormat  YYYY-MM-DD
    section Phase 1: Core Infrastructure
    TypeScript Interfaces     :done, interfaces, 2024-01-01, 1d
    VariableReplacer Utility  :active, replacer, after interfaces, 2d
    PersonalizationProvider  :provider, after replacer, 2d
    usePersonalization Hook   :hook, after provider, 1d
    
    section Phase 2: Component Integration
    PersonalizedText Component :text-comp, after hook, 1d
    Hero Component Update      :hero, after text-comp, 2d
    Problems Component Update   :problems, after hero, 2d
    Solution Component Update  :solution, after problems, 2d
    FinalCTA Component Update :cta, after solution, 2d
    
    section Phase 3: Tools & Testing
    URL Generator Tool        :url-tool, after cta, 2d
    Testing & Debugging       :testing, after url-tool, 3d
    Documentation             :docs, after testing, 2d
```

## Key Benefits

1. **Scalability**: Easy to add new variables without changing core logic
2. **Maintainability**: Centralized personalization logic
3. **Performance**: One-time parsing, cached results
4. **Flexibility**: Support for nested data structures
5. **Reliability**: Graceful fallbacks and error handling
6. **Security**: Input validation and sanitization

## Success Metrics

- **Conversion Rate**: Measure improvement in conversion rates with personalized vs. non-personalized pages
- **Engagement**: Track time on page, scroll depth, and interaction rates
- **Lead Quality**: Monitor lead quality and sales team feedback
- **A/B Testing**: Compare different personalization strategies
- **Email Performance**: Measure email click-through rates with personalized links

## Next Steps

1. Review and approve the implementation plan
2. Set up development environment
3. Begin Phase 1 implementation
4. Regular progress reviews
5. User acceptance testing
6. Production deployment
7. Performance monitoring and optimization