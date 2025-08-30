# Travel Platform - Season Selector Component

Un componente moderno y elegante para selección de estaciones de viaje, construido con React, TypeScript y styled-components.

## 🚀 Características

- **Diseño Moderno**: Interfaz limpia y atractiva con gradientes y animaciones suaves
- **Totalmente Responsive**: Se adapta a diferentes tamaños de pantalla
- **TypeScript**: Tipado completo para mejor desarrollo y mantenimiento
- **Personalizable**: Props para personalizar textos, colores y comportamiento
- **Accesible**: Navegación por teclado y semántica HTML correcta
- **Iconos**: Iconos hermosos de Lucide React para cada estación

## 📦 Instalación

```bash
npm install
npm start
```

## 🎯 Uso del Componente

```tsx
import SeasonSelector from './components/SeasonSelector';

function App() {
  const handleSeasonSelect = (season: string) => {
    console.log('Estación seleccionada:', season);
  };

  const handleContinue = () => {
    console.log('Continuando...');
  };

  return (
    <SeasonSelector
      currentStep={1}
      totalSteps={5}
      onSeasonSelect={handleSeasonSelect}
      onContinue={handleContinue}
      title="¿Cuándo quieres viajar?"
      subtitle="Elige la estación ideal para tu escapada"
    />
  );
}
```

## 🔧 Props Disponibles

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

## 🎨 Estaciones Disponibles

- **Primavera**: Flores y clima ameno
- **Verano**: Sol y piscinas  
- **Otoño**: Vendimia y colores
- **Invierno**: Chimenea y acogida

## 🛠️ Tecnologías Utilizadas

- React 18
- TypeScript
- Styled Components
- Lucide React (iconos)

## 📱 Características del Diseño

- Barra de progreso animada
- Tarjetas seleccionables con hover effects
- Iconos coloridos para cada estación
- Botón de continuar con animación
- Diseño mobile-first
- Paleta de colores verde suave

## 🔄 Estado del Componente

El componente maneja internamente:
- Estación seleccionada
- Estados de hover
- Animaciones de transición

## 📝 Próximos Pasos

- [ ] Añadir más idiomas
- [ ] Temas de colores personalizables
- [ ] Animaciones más avanzadas
- [ ] Integración con formularios
- [ ] Tests unitarios

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.
