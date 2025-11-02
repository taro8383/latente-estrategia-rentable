# PersonalizedWelcomeModal Architecture Diagram

## Component Relationship Flow

```mermaid
graph TD
    A[Index Page] --> B[PersonalizationProvider]
    B --> C[useExpirationCheck Hook]
    B --> D[PersonalizedWelcomeModal]
    D --> E[CompanyLogo]
    D --> F[EnhancedUrgencyTimer]
    F --> C
    
    G[Hero Component] --> B
    G -.-> E
    G -.-> F
    
    H[2s Delay Timer] --> D
    A --> H
    
    style D fill:#e1f5fe
    style E fill:#f3e5f5
    style F fill:#fff3e0
    style H fill:#e8f5e8
```

## Data Flow Architecture

```mermaid
sequenceDiagram
    participant User
    participant Index
    participant PersonalizationProvider
    participant DelayTimer
    participant WelcomeModal
    participant CompanyLogo
    participant UrgencyTimer
    participant ExpirationHook

    User->>Index: Page Load
    Index->>PersonalizationProvider: Initialize
    PersonalizationProvider->>ExpirationHook: Check personalization
    ExpirationHook-->>PersonalizationProvider: Return data
    PersonalizationProvider-->>Index: isPersonalized = true
    
    Index->>DelayTimer: Start 2s timer
    DelayTimer-->>Index: Timer complete
    
    Index->>WelcomeModal: setShowModal(true)
    WelcomeModal->>CompanyLogo: Display logo
    WelcomeModal->>UrgencyTimer: Display timer
    UrgencyTimer->>ExpirationHook: Get time with seconds
    ExpirationHook-->>UrgencyTimer: Return formatted time
    
    User->>WelcomeModal: Close modal
    WelcomeModal-->>Index: Modal closed
```

## Component Structure Diagram

```mermaid
graph LR
    subgraph "New Components"
        A[PersonalizedWelcomeModal]
        B[EnhancedUrgencyTimer]
    end
    
    subgraph "Modified Components"
        C[Index.tsx]
        D[Hero.tsx]
        E[useExpirationCheck.ts]
    end
    
    subgraph "Existing Components"
        F[CompanyLogo]
        G[PersonalizationProvider]
    end
    
    A --> F
    A --> B
    B --> E
    C --> A
    C --> G
    D -.-> F
    D -.-> B
    
    style A fill:#ffeb3b
    style B fill:#ffeb3b
    style C fill:#4caf50
    style D fill:#4caf50
    style E fill:#4caf50
```

## Modal State Management Flow

```mermaid
stateDiagram-v2
    [*] --> Loading: Page Load
    Loading --> Checking: PersonalizationProvider Ready
    Checking --> NonPersonalized: isPersonalized = false
    Checking --> WaitingDelay: isPersonalized = true
    WaitingDelay --> ModalVisible: 2s delay complete
    ModalVisible --> ModalClosed: User closes
    ModalVisible --> ModalClosed: Auto-dismiss
    ModalClosed --> [*]
    NonPersonalized --> [*]
    
    note right of ModalVisible
        Display CompanyLogo
        Display EnhancedUrgencyTimer
        Show seconds countdown
        Smooth animations
    end note
```

## File Structure Changes

```mermaid
graph TD
    A[src/components/] --> B[PersonalizedWelcomeModal.tsx - NEW]
    A --> C[EnhancedUrgencyTimer.tsx - NEW]
    A --> D[UrgencyTimer.tsx - KEEP]
    A --> E[Hero.tsx - MODIFY]
    
    F[src/hooks/] --> G[useExpirationCheck.ts - MODIFY]
    
    H[src/pages/] --> I[Index.tsx - MODIFY]
    
    style B fill:#4caf50
    style C fill:#4caf50
    style E fill:#ff9800
    style G fill:#ff9800
    style I fill:#ff9800
    style D fill:#9e9e9e
```

## Animation Timeline

```mermaid
gantt
    title Modal Animation Timeline
    dateFormat X
    axisFormat %s
    
    section Page Load
    Page Initialize    :0, 1s
    Personalization Check :1, 2s
    
    section Modal Trigger
    2s Delay          :2, 4s
    
    section Modal Display
    Fade In Animation :4, 4.5s
    Scale Animation   :4, 4.3s
    Content Display   :4.3, 5s
    
    section User Interaction
    Modal Active      :5, 30s
    User Close/Dismiss:30, 30.5s
```

## Responsive Design Breakpoints

```mermaid
graph LR
    subgraph "Mobile (< 640px)"
        A[Modal Width: 90%]
        B[Logo Size: Small]
        C[Timer Font: Medium]
    end
    
    subgraph "Tablet (640px - 1024px)"
        D[Modal Width: 80%]
        E[Logo Size: Medium]
        F[Timer Font: Large]
    end
    
    subgraph "Desktop (> 1024px)"
        G[Modal Width: 50%]
        H[Logo Size: Large]
        I[Timer Font: Extra Large]
    end
    
    style A fill:#ff5722
    style D fill:#2196f3
    style G fill:#4caf50