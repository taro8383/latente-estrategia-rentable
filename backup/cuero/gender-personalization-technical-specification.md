# Gender Personalization Technical Specification

## File-by-File Implementation Details

### 1. Type Definitions (`src/types/personalization.ts`)

#### Changes Required:
```typescript
// Add new type definitions
export type Gender = 'male' | 'female';

export interface GenderInfo {
  gender: Gender;
  genderSpecificText: Record<string, string>;
}

// Update PersonalizationData interface
export interface PersonalizationData {
  // ... existing properties
  genderInfo?: GenderInfo;
}

// Update PersonalizationContextType
export interface PersonalizationContextType {
  // ... existing properties
  gender?: Gender;
}
```

### 2. Variable Replacer (`src/utils/variableReplacer.ts`)

#### Changes Required:

##### 2.1 Add Gender Mapping Constants
```typescript
// Add at class level
private static readonly GENDER_MAPPINGS: Record<string, Record<Gender, string>> = {
  "estimado empresario": {
    male: "estimado empresario",
    female: "estimada empresaria"
  },
  "el que se declara rey": {
    male: "el que se declara rey",
    female: "quien se declara líder absoluta"
  },
  "está listo para tomar ese lugar": {
    male: "está listo para tomar ese lugar",
    female: "está lista para tomar ese lugar"
  },
  "Estás listo para actuar": {
    male: "Estás listo para actuar",
    female: "Estás lista para actuar"
  },
  "Padecés el 'Síndrome del Fundador Prisionero'": {
    male: "Padecés el 'Síndrome del Fundador Prisionero'",
    female: "Padecés el 'Síndrome de la Fundadora Prisionera'"
  },
  "te convirtió en el mejor bombero": {
    male: "te convirtió en el mejor bombero",
    female: "te convirtió en la mejor bombera"
  },
  "Ahora eres el estratega, no el bombero": {
    male: "Ahora eres el estratega, no el bombero",
    female: "Ahora sos la estratega, no la bombera"
  },
  "son la moneda de cambio de los perdedores": {
    male: "son la moneda de cambio de los perdedores",
    female: "son la moneda de cambio de quienes pierden"
  },
  "'¡El rey ha vuelto!'": {
    male: "'¡El rey ha vuelto!'",
    female: "'¡La reina ha vuelto!'"
  },
  "No estás quemado - estás estratégicamente hambriento": {
    male: "No estás quemado - estás estratégicamente hambriento",
    female: "No estás quemada - estás estratégicamente hambrienta"
  },
  "hay un rey en vos esperando salir": {
    male: "hay un rey en vos esperando salir",
    female: "hay una reina en vos esperando salir"
  },
  "Y el mercado ya tiene un nuevo rey": {
    male: "Y el mercado ya tiene un nuevo rey",
    female: "Y el mercado ya tiene una nueva reina"
  },
  "Ese rey sos vos": {
    male: "Ese rey sos vos",
    female: "Esa reina sos vos"
  },
  "a los débiles": {
    male: "a los débiles",
    female: "a quienes no califican"
  },
  "eres campeón": {
    male: "eres campeón",
    female: "sos campeona"
  },
  "ser el próximo rey": {
    male: "ser el próximo rey",
    female: "ser la próxima reina"
  },
  "si eres seleccionado": {
    male: "si eres seleccionado",
    female: "si sos seleccionada"
  },
  "Los reyes no se paralizan": {
    male: "Los reyes no se paralizan",
    female: "Las reinas no se paralizan"
  },
  "El próximo rey será decidido": {
    male: "El próximo rey será decidido",
    female: "La próxima reina será decidida"
  }
};
```

##### 2.2 Add Gender Processing Method
```typescript
private applyGenderReplacements(text: string): string {
  const gender = (this.data.genderInfo?.gender) || 'male';
  
  let result = text;
  
  // Apply gender-specific replacements
  Object.entries(VariableReplacer.GENDER_MAPPINGS).forEach(([maleText, genderMap]) => {
    const replacement = genderMap[gender];
    if (replacement && result.includes(maleText)) {
      result = result.replace(new RegExp(this.escapeRegExp(maleText), 'g'), replacement);
    }
  });
  
  return result;
}

private escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
```

##### 2.3 Update Main Replace Method
```typescript
replace(text: string): string {
  if (!text) return text;
  
  // Apply gender replacements first
  let processedText = this.applyGenderReplacements(text);
  
  // Then apply existing variable replacements
  processedText = processedText.replace(/\[([^\]]+)\]/g, (match, variablePath) => {
    // ... existing replacement logic
  });
  
  return processedText;
}
```

### 3. URL Generator (`public/url-generator.html`)

#### Changes Required:

##### 3.1 Add Gender Selector to Basic Information Section
```html
<!-- Add after readerName field, around line 436 -->
<div class="field-group">
    <label>
        Género del Lector <span class="required">*</span>
    </label>
    <div class="gender-selector" style="display: flex; gap: 20px; margin-top: 10px;">
        <label style="display: flex; align-items: center; cursor: pointer;">
            <input type="radio" name="gender" value="male" checked style="margin-right: 8px;">
            <span>Masculino</span>
        </label>
        <label style="display: flex; align-items: center; cursor: pointer;">
            <input type="radio" name="gender" value="female" style="margin-right: 8px;">
            <span>Femenino</span>
        </label>
    </div>
    <div class="field-preview">Seleccione el género para adaptar el contenido</div>
</div>
```

##### 3.2 Update VARIABLE_CONFIG Array
```javascript
// Add to VARIABLE_CONFIG array, around line 708
{
    id: 'gender',
    label: 'Género del Lector',
    type: 'radio',
    section: 'basic',
    order: 1.5, // Insert between readerName and company
    required: true,
    values: ['male', 'female'],
    errorMessage: 'Debe seleccionar un género'
},
```

##### 3.3 Update collectFormData Function
```javascript
// Modify collectFormData function, around line 1677
function collectFormData() {
    const formData = {};
    
    VARIABLE_CONFIG.forEach(config => {
        if (config.id === 'gender') {
            // Special handling for radio buttons
            const selectedGender = document.querySelector('input[name="gender"]:checked');
            if (selectedGender) {
                formData[config.id] = selectedGender.value;
            }
        } else {
            const field = document.getElementById(config.id);
            if (field) {
                formData[config.id] = field.value.trim();
            }
        }
    });
    
    return formData;
}
```

##### 3.4 Update EnhancedURLGenerator Class
```javascript
// Modify generatePersonalizedUrl method, around line 1122
const enhancedData = {
    // ... existing properties
    
    // Add gender information
    genderInfo: {
        gender: formData.gender || 'male',
        genderSpecificText: {}
    },
    
    // ... rest of existing properties
};
```

##### 3.5 Update Preview Functions
```javascript
// Update generateHeroPreview, generateProblemsPreview, generateSolutionPreview
// to show gender-adapted content in real-time preview

function generateHeroPreview(formData) {
    const gender = formData.gender || 'male';
    const historia = formData.historia || '[historia]';
    const readerName = formData.readerName || '[reader name]';
    const referenciaDeIndustria = formData.referenciaDeIndustria || '[referencia de industria]';
    const calificador = formData.calificador || '[calificador]';
    
    // Apply gender-specific text to preview content
    let greeting = gender === 'female' ? 'estimada empresaria' : 'estimado empresario';
    let kingText = gender === 'female' ? 'quien se declara líder absoluta' : 'el que se declara rey';
    
    return `
        <div class="hero-preview">
            <p><strong>Invitación Exclusiva:</strong><br>
            "Menos del 0.01% de las ${calificador} reciben esta invitación"</p>
            
            <p><strong>Cita Principal:</strong><br>
            "${historia}"</p>
            
            <p><strong>Personalización:</strong><br>
            "Si estás leyendo esto, ${readerName}, es porque ves algo que el 99.7% de tus competidores todavía se niegan a ver, pero vos con tu instinto, <strong>lo sentiste incluso antes de abrir el email que te envié</strong>."</p>
            
            <p><strong>Mensaje de Mercado:</strong><br>
            "El mercado no recompensa la calidad. Recompensa al <strong>${kingText}</strong>, y está ${gender === 'female' ? 'lista' : 'listo'} para tomar ese lugar."</p>
            
            <p><strong>Potencial:</strong><br>
            "Sospechas que tu empresa de ${referenciaDeIndustria} tiene lo necesario para ser la <strong>#1 absoluta</strong>. Tienes razón. El problema no es tu potencial... es el camino."</p>
        </div>
    `;
}
```

### 4. Personalization Provider (`src/context/PersonalizationProvider.tsx`)

#### Changes Required:

##### 4.1 Update Context Value
```typescript
// Update value object, around line 176
const value: PersonalizationContextType = {
    data,
    replacer: replacer || new VariableReplacer({}),
    isPersonalized,
    isExpired,
    timeRemaining,
    isLoading,
    uniqueCode,
    gender: data.genderInfo?.gender, // Add gender to context
    // ... rest of existing properties
};
```

### 5. CSS Updates for Gender Selector

#### Add to `public/url-generator.html` style section
```css
/* Add to existing styles, around line 398 */
.gender-selector {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    padding: 15px;
    border: 1px solid #444;
}

.gender-selector label:hover {
    background: rgba(79, 70, 229, 0.1);
    border-radius: 4px;
    padding: 5px 10px;
}

.gender-selector input[type="radio"]:checked + span {
    color: #4f46e5;
    font-weight: 600;
}

.gender-selector input[type="radio"] {
    accent-color: #4f46e5;
}

@media (max-width: 600px) {
    .gender-selector {
        flex-direction: column;
        gap: 10px;
    }
    
    .gender-selector label {
        width: 100%;
        padding: 10px;
        border: 1px solid #444;
        border-radius: 4px;
    }
}
```

## Implementation Testing Strategy

### 1. Unit Testing
- Test gender mapping accuracy
- Verify VariableReplacer gender processing
- Test form validation with gender selection

### 2. Integration Testing
- End-to-end URL generation with gender
- Landing page content display verification
- Mobile compatibility testing

### 3. Regression Testing
- Ensure existing functionality remains intact
- Verify backward compatibility
- Test performance impact

## Deployment Considerations

### 1. Backward Compatibility
- Default to male content for existing URLs
- Graceful degradation for missing gender data
- No breaking changes to existing API

### 2. Performance Impact
- Optimize gender replacement with caching
- Minimize additional processing overhead
- Monitor bundle size impact

### 3. SEO Implications
- Ensure search engines can index both gender versions
- Maintain consistent URL structure
- Consider canonical URLs for duplicate content

## Rollout Plan

### Phase 1: Development (Days 1-2)
1. Implement type definitions
2. Update VariableReplacer class
3. Modify URL generator form
4. Test basic functionality

### Phase 2: Integration (Days 2-3)
1. Update PersonalizationProvider
2. Test landing page integration
3. Verify mobile compatibility
4. Performance testing

### Phase 3: Testing & Documentation (Days 3-4)
1. Comprehensive testing
2. Documentation updates
3. User acceptance testing
4. Production deployment

## Success Metrics

### Technical Metrics
- [ ] All 19 gender replacements working correctly
- [ ] Form validation includes gender selection
- [ ] URL generation includes gender data
- [ ] Landing page displays gender-appropriate content
- [ ] Mobile design works properly

### User Experience Metrics
- [ ] Gender selector is intuitive and accessible
- [ ] Content feels natural for each gender
- [ ] No performance degradation
- [ ] Backward compatibility maintained

## Future Enhancements

### Short-term (Next Sprint)
1. Add gender-neutral option
2. Improve mobile selector design
3. Add analytics tracking for gender selection

### Long-term (Future Sprints)
1. Dynamic gender detection
2. Advanced content adaptation
3. A/B testing framework
4. Personalization analytics dashboard

## Conclusion

This technical specification provides a detailed roadmap for implementing gender-based personalization while maintaining system integrity and performance. The modular approach ensures easy maintenance and future enhancements.