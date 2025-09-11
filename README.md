# 🏠 Travel Platform - Plataforma de Masías Catalanas

Una plataforma web moderna y elegante para descubrir y reservar masías tradicionales en Cataluña, construida con React, TypeScript y styled-components.

## 🌟 Descripción

Travel Platform es una aplicación web completa que conecta viajeros con las masías más auténticas de Cataluña. Nuestra plataforma ofrece una experiencia de usuario intuitiva para encontrar la masía perfecta según la temporada, preferencias y necesidades específicas.

### 🎯 Características Principales

- **🏠 Catálogo de Masías**: Base de datos completa con masías auténticas catalanas
- **🌤️ Selector de Temporadas**: Interfaz intuitiva para elegir la época del año
- **🔍 Filtros Avanzados**: Búsqueda por características, servicios y ubicación
- **📱 Diseño Responsive**: Experiencia optimizada para móviles y desktop
- **👨‍💼 Panel de Administración**: Gestión completa de masías y reservas
- **📝 Formulario de Envío**: Los propietarios pueden añadir sus masías
- **🎨 UI Moderna**: Diseño elegante con animaciones suaves

## 🚀 Tecnologías Utilizadas

- **Frontend**: React 19 + TypeScript
- **Estilos**: Styled Components + CSS3
- **Iconos**: Lucide React
- **Despliegue**: GitHub Pages
- **Control de Versiones**: Git

## 📦 Instalación y Uso

### Requisitos Previos
- Node.js (versión 16 o superior)
- npm o yarn

### Instalación Local
```bash
# Clonar el repositorio
git clone https://github.com/moralesmozart/travel-platform.git
cd travel-platform

# Instalar dependencias
npm install

# Configurar variables de entorno (desarrollo local)
cp env.example .env.local
# Edita .env.local con tus credenciales de Supabase

# Ejecutar en modo desarrollo
npm start

# Crear build de producción
npm run build

# Desplegar a GitHub Pages
npm run deploy
```

## 🏗️ Estructura del Proyecto

```
travel-platform/
├── src/
│   ├── components/          # Componentes React
│   │   ├── HomePage.tsx     # Página principal
│   │   ├── ResultsPage.tsx  # Página de resultados
│   │   ├── AdminDashboard.tsx # Panel de administración
│   │   ├── SeasonSelector.tsx # Selector de temporadas
│   │   └── ...
│   ├── data/
│   │   └── masiasDatabase.ts # Base de datos de masías
│   └── types/
│       └── SeasonSelector.types.ts # Tipos TypeScript
├── public/                  # Archivos estáticos
└── package.json
```

## 🎨 Componentes Principales

### 🏠 HomePage
Página principal con el selector de temporadas y navegación intuitiva.

### 🔍 ResultsPage  
Muestra las masías filtradas con información detallada y opciones de reserva.

### 👨‍💼 AdminDashboard
Panel de administración para gestionar masías, usuarios y reservas.

### 🌤️ SeasonSelector
Componente elegante para seleccionar la temporada de viaje.

## 📊 Base de Datos

La aplicación incluye una base de datos local con masías reales de Cataluña, incluyendo:
- Información detallada de cada masía
- Servicios disponibles
- Ubicación y contacto
- Fotos y descripciones
- Precios y disponibilidad

## 🎯 Funcionalidades Destacadas

### 🌤️ Selección Inteligente de Temporadas
- Interfaz visual atractiva
- Información específica por temporada
- Recomendaciones personalizadas

### 🔍 Sistema de Filtros
- Filtrado por características
- Búsqueda por ubicación
- Filtros de precio y servicios

### 📱 Experiencia Mobile-First
- Diseño responsive completo
- Navegación táctil optimizada
- Carga rápida en dispositivos móviles

## 🚀 Despliegue

La aplicación está configurada para desplegarse automáticamente en GitHub Pages:

```bash
# Desplegar a producción
npm run deploy
```

**URL de Producción**: https://mozartmorales.github.io/travel-platform

## 🔧 Configuración de Desarrollo

### Variables de Entorno (Desarrollo Local)
```bash
# Crear archivo .env.local para configuraciones locales
REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key_here
REACT_APP_ADMIN_EMAIL=admin@masiaconnect.com
REACT_APP_ADMIN_PASSWORD=admin123
REACT_APP_ENVIRONMENT=development

# Hotjar Configuration
REACT_APP_HOTJAR_ID=your_hotjar_id_here
```

### ⚠️ Importante: Configuración de Producción
Para **GitHub Pages**, las credenciales de Supabase están configuradas en `src/config/config.ts`. 
No es necesario configurar variables de entorno adicionales.

**Ver archivo `CONFIGURATION.md` para detalles completos de configuración.**

### 🔒 Seguridad
- Las credenciales de administrador están configuradas en variables de entorno
- En producción, las credenciales de demo no se muestran
- Revisa el archivo `security.md` para más detalles de seguridad

### Scripts Disponibles
- `npm start` - Servidor de desarrollo
- `npm build` - Build de producción
- `npm test` - Ejecutar tests
- `npm run deploy` - Desplegar a GitHub Pages

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/NuevaFuncionalidad`)
3. Commit tus cambios (`git commit -m 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/NuevaFuncionalidad`)
5. Abre un Pull Request

## 🚨 Solución de Problemas

### Error: "No API key found in request"
Si encuentras este error al enviar una masía, significa que las credenciales de Supabase no están configuradas correctamente.

**Solución:**
1. **Desarrollo local**: Verifica tu archivo `.env.local`
2. **Producción**: Las credenciales están en `src/config/config.ts`
3. **Ver archivo `CONFIGURATION.md`** para solución completa

### Error: "new row violates row-level security policy"
Si encuentras este error después de resolver el problema de la API key, significa que las políticas de RLS en Supabase están bloqueando la inserción.

**Solución:**
1. **Ver archivo `RLS_FIX_INSTRUCTIONS.md`** para solución paso a paso
2. **Ejecutar script SQL** en Supabase Dashboard
3. **Usar `database/setup_rls_production.sql`** para configuración correcta

### Herramientas de Diagnóstico
```bash
# Verificar configuración
npm run check-config

# Test de Supabase (en consola del navegador)
window.testSupabase.runTest()
```

## 📝 Roadmap

### Próximas Funcionalidades
- [ ] Sistema de reservas online
- [ ] Integración con APIs de pago
- [ ] Sistema de reviews y calificaciones
- [ ] Chat en tiempo real
- [ ] App móvil nativa
- [ ] Integración con Google Maps
- [ ] Sistema de notificaciones

### Mejoras Técnicas
- [ ] Tests unitarios completos
- [ ] Optimización de rendimiento
- [ ] PWA (Progressive Web App)
- [ ] SEO avanzado
- [ ] Analytics y métricas

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

**¡Descubre las masías más auténticas de Cataluña con Travel Platform!** 🏠✨
