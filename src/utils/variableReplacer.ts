import { PersonalizationData, Gender } from '@/types/personalization';

export class VariableReplacer {
  private data: PersonalizationData;
  private defaults: Record<string, string>;

  // Gender mapping constants for the 20 specific replacements
  private static readonly GENDER_MAPPINGS: Record<string, Record<Gender, string>> = {
    "Bienvenido": {
      male: "Bienvenido",
      female: "Bienvenida"
    },
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
    "¿Eres campeón?": {
      male: "¿Eres campeón?",
      female: "¿Eres campeona?"
    },
    "ser el próximo rey": {
      male: "ser el próximo rey",
      female: "ser la próxima reina"
    },
    "podes ser el próximo rey": {
      male: "podes ser el próximo rey",
      female: "podes ser la próxima reina"
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
    },
    "a el que se declara rey": {
      male: "a el que se declara rey",
      female: "a la que se declara reina"
    },
    "convertirte en el #1 absoluto": {
      male: "convertirte en el #1 absoluto",
      female: "convertirte en la #1 absoluta"
    },
    "Tu oportunidad exclusiva de convertirte en el": {
      male: "Tu oportunidad exclusiva de convertirte en el",
      female: "Tu oportunidad exclusiva de convertirte en la"
    },
    "¿Tienes lo que se necesita para ser el #1 absoluto?": {
      male: "¿Tienes lo que se necesita para ser el #1 absoluto?",
      female: "¿Tienes lo que se necesita para ser la #1 absoluta?"
    },
    "Entonces… ¿Por qué seguís atrapado en el": {
      male: "Entonces… ¿Por qué seguís atrapado en el",
      female: "Entonces… ¿Por qué seguís atrapada en el"
    },
    "Sin este manual, estás condenado a jugar siempre a alcanzarlos.": {
      male: "Sin este manual, estás condenado a jugar siempre a alcanzarlos.",
      female: "Sin este manual, estás condenada a jugar siempre a alcanzarlos."
    },
    "Estás atrapado en la 'Trampa del Esfuerzo Lineal'": {
      male: "Estás atrapado en la 'Trampa del Esfuerzo Lineal'",
      female: "Estás atrapada en la 'Trampa del Esfuerzo Lineal'"
    },
    "¿Podrías construir esto solo?": {
      male: "¿Podrías construir esto solo?",
      female: "¿Podrías construir esto sola?"
    },
    "Quiero ser el #1 en mi mercado": {
      male: "Quiero ser el #1 en mi mercado",
      female: "Quiero ser la #1 en mi mercado"
    },
    "ser el #1 absoluto": {
      male: "ser el #1 absoluto",
      female: "ser la #1 absoluta"
    },
    "Quiero ser socio estratégico de Latente": {
      male: "Quiero ser socio estratégico de Latente",
      female: "Quiero ser socia estratégica de Latente"
    },
    "Y si estás listo para dejar de competir y empezar a dominar…": {
      male: "Y si estás listo para dejar de competir y empezar a dominar…",
      female: "Y si estás lista para dejar de competir y empezar a dominar…"
    }
  };

  constructor(data: PersonalizationData) {
    this.data = data;
    this.defaults = {
      'brand name': 'tu marca',
      'tu marca': 'tu marca', // Added mapping for [tu marca] variable
      'reader name': 'estimado empresario',
      'industry': 'tu industria',
      'inovacion': 'innovación',
      'posicionamiento': '[posicionamiento]',
      'malPosicionamiento': '[malPosicionamiento]',
      'mal posicionamiento': '[malPosicionamiento]',
      'Rolls-Royce': '[industria]',
      'frase descriptiva': '[frase descriptiva]',
      'avatar': '[avatar]',
      'propuesta pobre': '[propuesta pobre]',
      'propuesta buena': '[propuesta buena]',
      'automatizacion': '[automatizacion]',
      'trabajo de valor': '[trabajo de valor]',
      'proveedor': '[proveedor]',
      'infrautilizado': '[infrautilizado]',
      'membresia': '[membresia]',
      'metodo': '[metodo]',
      'historia': '[historia]',
      'calificador': '[calificador]',
      'product type': 'productos',
      'target audience': 'clientes',
      'company': 'tu empresa',
      'position': 'líder',
      'location': 'tu ciudad',
      'industry keyword 1': 'productos premium',
      'industry keyword 2': 'artesanía de calidad',
      'industry keyword 3': 'diseño exclusivo',
      'industry keywords': 'productos premium',
      // Gender-specific placeholder mappings
      'gender_estratega_bombero': 'Ahora eres el estratega, no el bombero',
      'gender_moneda_cambio_perdedores': 'son la moneda de cambio de los perdedores',
      'gender_rey_vuelto': "'¡El rey ha vuelto!'",
      'gender_no_estas_quemado': 'No estás quemado - estás estratégicamente hambriento',
      'gender_rey_sos_vos': 'Ese rey sos vos'
    };
  }

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

  replace(text: string): string {
    if (!text) return text;

    
    // Apply gender replacements first
    let processedText = this.applyGenderReplacements(text);
    
    // Then apply existing variable replacements
    processedText = processedText.replace(/\[([^\]]+)\]/g, (match, variablePath) => {
      const trimmedPath = variablePath.trim();

      // 1) Try structured lookup
      let value = this.getValue(trimmedPath);

      // 2) If not found, try flattened variables and a normalized fallback
      if (value === undefined || value === null) {
        const vars = this.getAvailableVariables();

        if (trimmedPath in vars) {
          value = vars[trimmedPath];
        } else {
          // Unicode-aware normalization: preserve letters (including accents) and numbers,
          // remove punctuation and whitespace for robust matching of keys like "ubicación"/"ubicacion".
          const normalize = (s: string) =>
            String(s || '')
              .toLocaleLowerCase('es-ES')
              .normalize('NFKC')
              .replace(/[^\p{L}\p{N}]/gu, '');
          const target = normalize(trimmedPath);
          for (const [k, v] of Object.entries(vars)) {
            if (normalize(k) === target) {
              value = v;
              break;
            }
          }
        }
      }

      const finalValue = value || this.defaults[trimmedPath] || undefined;
      return finalValue || `[${trimmedPath}]`;
    });
    
    return processedText;
  }

  replaceIndustryKeywords(text: string): string {
    if (!this.data.industryKeywords?.length) return text;
    
    const keywords = this.data.industryKeywords;
    let result = text;
    
    // Replace [industry keyword 1], [industry keyword 2], etc.
    keywords.forEach((keyword, index) => {
      const placeholder = `[industry keyword ${index + 1}]`;
      // Escape placeholder to build a safe RegExp (treat placeholder as literal)
      const escaped = placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const pattern = new RegExp(escaped, 'g');
      result = result.replace(pattern, keyword);
    });
    
    // Replace generic [industry keywords] with first keyword
    const escapedGeneric = '\\[industry keywords\\]';
    result = result.replace(new RegExp(escapedGeneric, 'g'), keywords[0] || 'productos premium');
    
    return result;
  }

  private getValue(path: string): string | undefined {
    if (!path) return undefined;

    // 1) Try dot-separated traversal (brandInfo.name)
    const parts = path.split('.');
    let current: any = this.data;
    
    for (const part of parts) {
      if (current && typeof current === 'object' && part in current) {
        current = current[part];
      } else {
        current = undefined;
        break;
      }
    }
    
    if (current !== undefined) {
      return typeof current === 'string' ? current : String(current);
    }

    // 2) Try matching against flattened available variables (normalizing keys)
    const vars = this.getAvailableVariables();
    const normalize = (s: string) =>
      String(s || '')
        .toLocaleLowerCase('es-ES')
        .normalize('NFKC')
        .replace(/[^\p{L}\p{N}]/gu, '');
    const target = normalize(path);
 
    for (const [k, v] of Object.entries(vars)) {
      if (normalize(k) === target) return v;
    }

    // 3) Heuristic: "reader name" -> try readerInfo.name
    const spaceParts = path.split(/\s+/);
    if (spaceParts.length === 2) {
      const attempt = `${spaceParts[0]}Info.${spaceParts[1]}`;
      const val = this.getValue(attempt);
      if (val) return val;
    }

    return undefined;
  }

  // Method to get all available variables for debugging
  getAvailableVariables(): Record<string, string> {
    const variables: Record<string, string> = {};
    
    // Extract brand info variables
    if (this.data.brandInfo) {
      Object.entries(this.data.brandInfo).forEach(([key, value]) => {
        variables[`brandInfo.${key}`] = String(value);
        variables[key] = String(value);
      });
      // Friendly keys for brand lookups
      if (this.data.brandInfo.name) {
        variables['brand name'] = String(this.data.brandInfo.name);
        variables['brand'] = String(this.data.brandInfo.name);
        variables['tu marca'] = String(this.data.brandInfo.name); // Map [tu marca] to brandName
      }
      // Spanish aliases for brand/industry
      if (this.data.brandInfo.industry) {
        variables['industria'] = String(this.data.brandInfo.industry);
      }
    }
    
    // Extract reader info variables
    if (this.data.readerInfo) {
      Object.entries(this.data.readerInfo).forEach(([key, value]) => {
        variables[`readerInfo.${key}`] = String(value);
        variables[key] = String(value);
      });
      // Friendly keys for common lookups like "[reader name]"
      if (this.data.readerInfo.name) {
        variables['reader name'] = String(this.data.readerInfo.name);
        variables['reader'] = String(this.data.readerInfo.name);
      }
      if (this.data.readerInfo.company) {
        variables['company'] = String(this.data.readerInfo.company);
        variables['empresa'] = String(this.data.readerInfo.company); // Spanish alias
      }
      if (this.data.readerInfo.location) {
        variables['location'] = String(this.data.readerInfo.location);
        variables['ubicacion'] = String(this.data.readerInfo.location); // Spanish alias
      }
    }
    
    // Extract industry keywords
    if (this.data.industryKeywords) {
      this.data.industryKeywords.forEach((keyword, index) => {
        variables[`industry keyword ${index + 1}`] = keyword;
      });
      variables['industry keywords'] = this.data.industryKeywords[0] || '';
      variables['inovacion'] = this.data.industryKeywords[0] || 'innovación';
    }
    
    // Extract custom messages
    if (this.data.customMessages) {
      Object.entries(this.data.customMessages).forEach(([key, value]) => {
        variables[`customMessages.${key}`] = String(value || '');
        variables[key] = String(value || '');
      });
    }

    // --- Root-level aliases: support generator payloads that use flat keys
    // Examples: readerName, company, referenciaDeIndustria, ubicacion, brandName
    if ((this.data as any).readerName) {
      const v = String((this.data as any).readerName);
      variables['reader name'] = v;
      variables['reader'] = v;
      variables['readerName'] = v;
    }
    if ((this.data as any).company) {
      const v = String((this.data as any).company);
      variables['company'] = v;
      variables['empresa'] = v;
    }
    if ((this.data as any).brandName) {
      const v = String((this.data as any).brandName);
      variables['brand name'] = v;
      variables['brand'] = v;
      variables['tu marca'] = v;
    }
    if ((this.data as any).referenciaDeIndustria) {
      const v = String((this.data as any).referenciaDeIndustria);
      variables['industria'] = v;
      variables['referenciaDeIndustria'] = v;
      // also populate industry generic alias
      variables['industry'] = v;
    }
    // Support legacy / flat "malPosicionamiento" key used by generator
    if ((this.data as any).malPosicionamiento) {
      const v = String((this.data as any).malPosicionamiento);
      variables['malPosicionamiento'] = v;
      variables['mal posicionamiento'] = v;
      // also populate generic positioning alias so templates using [posicionamiento] pick it up
      variables['posicionamiento'] = v;
    }
    if ((this.data as any).ubicacion) {
      const v = String((this.data as any).ubicacion);
      variables['ubicacion'] = v;
      variables['location'] = v;
      variables['ubicacion'] = v;
    }

    return variables;
  }
}