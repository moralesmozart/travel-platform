// Tipos para el componente SeasonSelector

export interface Season {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

export interface SeasonSelectorProps {
  /** Paso actual del proceso (default: 1) */
  currentStep?: number;
  
  /** Total de pasos en el proceso (default: 5) */
  totalSteps?: number;
  
  /** Callback cuando se selecciona una estación */
  onSeasonSelect?: (season: string) => void;
  
  /** Callback cuando se presiona el botón continuar */
  onContinue?: () => void;
  
  /** Callback cuando se presiona el botón atrás */
  onBack?: () => void;
  
  /** Título principal del componente */
  title?: string;
  
  /** Subtítulo del componente */
  subtitle?: string;
  
  /** Texto del botón continuar */
  continueText?: string;
}

export interface SeasonConfig {
  title: string;
  subtitle: string;
  continueText: string;
  seasons: {
    [key: string]: {
      name: string;
      description: string;
    };
  };
}

export type Language = 'portuguese' | 'spanish' | 'english';

// Constantes para las estaciones
export const SEASON_IDS = {
  SPRING: 'spring',
  SUMMER: 'summer',
  AUTUMN: 'autumn',
  WINTER: 'winter'
} as const;

export type SeasonId = typeof SEASON_IDS[keyof typeof SEASON_IDS];

// Configuraciones predefinidas por idioma
export const SEASON_CONFIGURATIONS: Record<Language, SeasonConfig> = {
  portuguese: {
    title: "Quando você quer viajar?",
    subtitle: "Escolha a estação ideal para sua escapada",
    continueText: "Continuar",
    seasons: {
      spring: { name: "Primavera", description: "Flores e clima ameno" },
      summer: { name: "Verão", description: "Sol e piscinas" },
      autumn: { name: "Outono", description: "Vindimas e cores" },
      winter: { name: "Inverno", description: "Lareira e aconchego" }
    }
  },
  spanish: {
    title: "¿Cuándo quieres viajar?",
    subtitle: "Elige la estación ideal para tu escapada",
    continueText: "Continuar",
    seasons: {
      spring: { name: "Primavera", description: "Flores y clima templado" },
      summer: { name: "Verano", description: "Sol y piscinas" },
      autumn: { name: "Otoño", description: "Vendimia y colores" },
      winter: { name: "Invierno", description: "Chimenea y acogida" }
    }
  },
  english: {
    title: "When do you want to travel?",
    subtitle: "Choose the ideal season for your getaway",
    continueText: "Continue",
    seasons: {
      spring: { name: "Spring", description: "Flowers and mild weather" },
      summer: { name: "Summer", description: "Sun and pools" },
      autumn: { name: "Autumn", description: "Harvest and colors" },
      winter: { name: "Winter", description: "Fireplace and coziness" }
    }
  }
};

// Colores de las estaciones
export const SEASON_COLORS = {
  spring: '#FF69B4',
  summer: '#FFD700',
  autumn: '#8B4513',
  winter: '#87CEEB'
} as const;

// Eventos del componente
export interface SeasonSelectorEvents {
  onSeasonSelect: (seasonId: SeasonId) => void;
  onContinue: () => void;
  onBack: () => void;
}

// Estado interno del componente
export interface SeasonSelectorState {
  selectedSeason: SeasonId | null;
  isHovered: SeasonId | null;
}
