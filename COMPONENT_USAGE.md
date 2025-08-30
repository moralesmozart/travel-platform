# SeasonSelector Component - Guía de Uso

## 📋 Descripción

El componente `SeasonSelector` es una interfaz moderna y elegante para seleccionar estaciones de viaje. Está diseñado para ser parte de un flujo de múltiples pasos en una aplicación de viajes.

## 🚀 Instalación

```bash
npm install lucide-react styled-components @types/styled-components
```

## 📦 Importación

```tsx
import SeasonSelector from './components/SeasonSelector';
```

## 🎯 Uso Básico

```tsx
import React, { useState } from 'react';
import SeasonSelector from './components/SeasonSelector';

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSeason, setSelectedSeason] = useState<string>('');

  const handleSeasonSelect = (season: string) => {
    setSelectedSeason(season);
    console.log('Estación seleccionada:', season);
  };

  const handleContinue = () => {
    if (selectedSeason) {
      setCurrentStep(prev => prev + 1);
      // Lógica para continuar al siguiente paso
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <SeasonSelector
      currentStep={currentStep}
      totalSteps={5}
      onSeasonSelect={handleSeasonSelect}
      onContinue={handleContinue}
      onBack={handleBack}
    />
  );
}
```

## 🌍 Uso Multiidioma

```tsx
import React, { useState } from 'react';
import SeasonSelector from './components/SeasonSelector';
import { SEASON_CONFIGURATIONS, Language } from './types/SeasonSelector.types';

function MultiLanguageApp() {
  const [language, setLanguage] = useState<Language>('spanish');
  const config = SEASON_CONFIGURATIONS[language];

  return (
    <SeasonSelector
      currentStep={1}
      totalSteps={5}
      title={config.title}
      subtitle={config.subtitle}
      continueText={config.continueText}
      onSeasonSelect={(season) => console.log(season)}
      onContinue={() => console.log('Continuar')}
      onBack={() => console.log('Atrás')}
    />
  );
}
```

## 🎨 Personalización Avanzada

### Cambiar Colores

```tsx
// Puedes personalizar los colores modificando el componente
const CustomSeasonSelector = styled(SeasonSelector)`
  --primary-color: #FF6B6B;
  --secondary-color: #4ECDC4;
  --background-color: #f8f9fa;
`;
```

### Integración con Formularios

```tsx
import React, { useState } from 'react';
import SeasonSelector from './components/SeasonSelector';

function TravelForm() {
  const [formData, setFormData] = useState({
    season: '',
    destination: '',
    dates: ''
  });

  const handleSeasonSelect = (season: string) => {
    setFormData(prev => ({ ...prev, season }));
  };

  const handleContinue = () => {
    if (formData.season) {
      // Validar y enviar formulario
      console.log('Datos del formulario:', formData);
    }
  };

  return (
    <div>
      <SeasonSelector
        currentStep={1}
        totalSteps={3}
        onSeasonSelect={handleSeasonSelect}
        onContinue={handleContinue}
        title="¿Cuándo quieres viajar?"
        subtitle="Elige la estación ideal"
      />
      
      {/* Otros pasos del formulario */}
    </div>
  );
}
```

## 🔧 Props Detalladas

### Props Requeridas

No hay props requeridas, todas son opcionales con valores por defecto.

### Props Opcionales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `currentStep` | `number` | `1` | Paso actual del proceso |
| `totalSteps` | `number` | `5` | Total de pasos en el proceso |
| `onSeasonSelect` | `(season: string) => void` | - | Callback cuando se selecciona una estación |
| `onContinue` | `() => void` | - | Callback cuando se presiona continuar |
| `onBack` | `() => void` | - | Callback cuando se presiona atrás |
| `title` | `string` | `"Quando você quer viajar?"` | Título principal |
| `subtitle` | `string` | `"Escolha a estação ideal para sua escapada"` | Subtítulo |
| `continueText` | `string` | `"Continuar"` | Texto del botón continuar |

## 🎨 Estilos y Temas

### Variables CSS Personalizables

```css
:root {
  --primary-color: #4CAF50;
  --secondary-color: #45a049;
  --background-color: #f0f9f0;
  --text-color: #333;
  --border-color: #e0e0e0;
  --hover-color: #f5f5f5;
}
```

### Responsive Design

El componente es completamente responsive y se adapta a:
- Móviles (320px+)
- Tablets (768px+)
- Desktop (1024px+)

## 🔄 Estados del Componente

### Estados Internos

- **Seleccionado**: Una estación está seleccionada
- **Hover**: El usuario está sobre una tarjeta
- **Loading**: Estado de carga (futuro)
- **Error**: Estado de error (futuro)

### Estados de Validación

```tsx
const handleContinue = () => {
  if (!selectedSeason) {
    // Mostrar error o alerta
    alert('Por favor selecciona una estación');
    return;
  }
  
  // Continuar con la lógica
  onContinue?.();
};
```

## 🧪 Testing

### Ejemplo de Test

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import SeasonSelector from './SeasonSelector';

test('renders season selector with correct title', () => {
  render(<SeasonSelector title="Test Title" />);
  expect(screen.getByText('Test Title')).toBeInTheDocument();
});

test('calls onSeasonSelect when season is clicked', () => {
  const mockOnSeasonSelect = jest.fn();
  render(<SeasonSelector onSeasonSelect={mockOnSeasonSelect} />);
  
  fireEvent.click(screen.getByText('Primavera'));
  expect(mockOnSeasonSelect).toHaveBeenCalledWith('spring');
});
```

## 🚀 Optimización

### Lazy Loading

```tsx
import React, { lazy, Suspense } from 'react';

const SeasonSelector = lazy(() => import('./components/SeasonSelector'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SeasonSelector />
    </Suspense>
  );
}
```

### Memoización

```tsx
import React, { useMemo } from 'react';
import SeasonSelector from './components/SeasonSelector';

function OptimizedApp() {
  const seasonConfig = useMemo(() => ({
    title: "¿Cuándo quieres viajar?",
    subtitle: "Elige la estación ideal",
    continueText: "Continuar"
  }), []);

  return <SeasonSelector {...seasonConfig} />;
}
```

## 🐛 Solución de Problemas

### Problemas Comunes

1. **Los iconos no se muestran**
   - Verifica que `lucide-react` esté instalado
   - Asegúrate de importar los iconos correctamente

2. **Los estilos no se aplican**
   - Verifica que `styled-components` esté instalado
   - Asegúrate de que el ThemeProvider esté configurado

3. **El componente no es responsive**
   - Verifica que no haya CSS global que interfiera
   - Asegúrate de que el viewport meta tag esté configurado

### Debug

```tsx
// Añade logs para debug
const handleSeasonSelect = (season: string) => {
  console.log('Season selected:', season);
  console.log('Current step:', currentStep);
  onSeasonSelect?.(season);
};
```

## 📚 Recursos Adicionales

- [Documentación de Styled Components](https://styled-components.com/docs)
- [Documentación de Lucide React](https://lucide.dev/guide/packages/lucide-react)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
