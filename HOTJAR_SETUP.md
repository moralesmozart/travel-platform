# 🔥 Hotjar Integration - Travel Platform

## 📊 **Configuración de Hotjar**

### **1. Obtener ID de Hotjar**

1. Ve a [Hotjar.com](https://hotjar.com) y crea una cuenta
2. Crea un nuevo sitio web
3. Copia tu **Site ID** (número de 6-8 dígitos)

### **2. Configurar Variables de Entorno**

Crea o edita el archivo `.env.local`:

```bash
# Hotjar Configuration
REACT_APP_HOTJAR_ID=1234567
```

### **3. Funcionalidades Implementadas**

#### **📈 Heatmaps**
- **Click maps**: Ver dónde hacen clic los usuarios
- **Move maps**: Ver el movimiento del mouse
- **Scroll maps**: Ver hasta dónde scrollean

#### **🎥 Grabación de Sesiones**
- **Session recordings**: Grabar sesiones completas
- **Privacy settings**: Campos sensibles enmascarados
- **Admin exclusion**: No grabar páginas de administración

#### **📝 Encuestas y Feedback**
- **Feedback widget**: Botón flotante para opiniones
- **Survey triggers**: Encuestas automáticas
- **Custom events**: Eventos personalizados

### **4. Eventos Personalizados Trackeados**

#### **🔍 Búsqueda de Masías**
```javascript
trackEvent('masia_search_started', {
  page: 'home',
  timestamp: '2025-01-XX'
});
```

#### **🌤️ Selección de Temporadas**
```javascript
trackEvent('season_selected', {
  season: 'Verano',
  step: 1,
  timestamp: '2025-01-XX'
});
```

#### **📅 Reservas**
```javascript
trackEvent('masia_booking_started', {
  masiaId: 'masia_123',
  timestamp: '2025-01-XX'
});
```

#### **🏠 Envío de Masías**
```javascript
trackEvent('masia_submitted', {
  masiaName: 'Masía Can Soler',
  location: 'Barcelona',
  timestamp: '2025-01-XX'
});
```

#### **👨‍💼 Login de Administrador**
```javascript
trackEvent('admin_login_success', {
  email: 'admin@example.com',
  timestamp: '2025-01-XX'
});
```

### **5. Widget de Feedback**

#### **Características:**
- **Botón flotante**: Esquina inferior derecha
- **Feedback directo**: Opiniones de usuarios
- **Encuestas rápidas**: Preguntas específicas
- **Solo producción**: No aparece en desarrollo

#### **Funcionalidades:**
- **Trigger automático**: Integrado con Hotjar
- **Event tracking**: Registra interacciones
- **Diseño responsive**: Adaptado a móviles

### **6. Configuración de Privacidad**

#### **Protecciones Implementadas:**
- **Mask inputs**: Campos de contraseña ocultos
- **Admin exclusion**: No grabar páginas admin
- **Sensitive data**: Datos personales protegidos
- **GDPR compliant**: Cumple regulaciones

### **7. Dashboard de Hotjar**

#### **Métricas Disponibles:**
- **User behavior**: Comportamiento de usuarios
- **Conversion funnels**: Embudos de conversión
- **Heatmaps**: Mapas de calor
- **Session recordings**: Grabaciones de sesión
- **Feedback analysis**: Análisis de feedback

### **8. Configuración Avanzada**

#### **Personalización de Eventos:**
```javascript
// Identificar usuarios
identifyUser('user_123', {
  name: 'Juan Pérez',
  email: 'juan@example.com',
  userType: 'owner'
});

// Variables personalizadas
setCustomVariables({
  currentPage: 'home',
  userSegment: 'premium'
});
```

#### **Triggers Personalizados:**
```javascript
// Trigger encuesta después de 5 minutos
setTimeout(() => {
  if (typeof window !== 'undefined' && window.hj) {
    window.hj('trigger', 'post_visit_survey');
  }
}, 300000);
```

### **9. Troubleshooting**

#### **Problemas Comunes:**

1. **Hotjar no carga**
   - Verificar ID en variables de entorno
   - Comprobar que esté en producción
   - Revisar consola del navegador

2. **Eventos no aparecen**
   - Verificar función `trackEvent`
   - Comprobar que Hotjar esté inicializado
   - Revisar configuración de eventos

3. **Widget no aparece**
   - Verificar `NODE_ENV === 'production'`
   - Comprobar CSS y z-index
   - Revisar permisos de Hotjar

### **10. Próximos Pasos**

#### **Optimizaciones Sugeridas:**
- **A/B Testing**: Integrar con Hotjar
- **Conversion tracking**: Seguimiento de conversiones
- **User segmentation**: Segmentación de usuarios
- **Custom surveys**: Encuestas personalizadas
- **Funnel analysis**: Análisis de embudos

---

**¡Hotjar está configurado y listo para analizar el comportamiento de tus usuarios!** 🔥📊
