// Configuración de Hotjar
// Reemplaza HOTJAR_ID con tu ID real de Hotjar

export const HOTJAR_CONFIG = {
  // ID de Hotjar (reemplazar con tu ID real)
  hjid: process.env.REACT_APP_HOTJAR_ID || 'YOUR_HOTJAR_ID',
  
  // Versión de Hotjar
  hjsv: 6,
  
  // Configuración adicional
  config: {
    // Habilitar heatmaps
    heatmaps: true,
    
    // Habilitar grabación de sesiones
    recordings: true,
    
    // Habilitar encuestas
    surveys: true,
    
    // Habilitar feedback
    feedback: true,
    
    // Configuración de privacidad
    privacy: {
      // No grabar campos de contraseña
      maskAllInputs: true,
      
      // No grabar contenido sensible
      maskAllText: false,
      
      // No grabar en páginas de admin
      excludePages: ['/admin', '/admin-dashboard']
    }
  }
};

// Función para inicializar Hotjar
export const initHotjar = () => {
  if (typeof window !== 'undefined' && window.hj) {
    // Hotjar ya está cargado
    return;
  }

  // Crear script de Hotjar
  const script = document.createElement('script');
  script.innerHTML = `
    (function(h,o,t,j,a,r){
      h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
      h._hjSettings={hjid:${HOTJAR_CONFIG.hjid},hjsv:${HOTJAR_CONFIG.hjsv}};
      a=o.getElementsByTagName('head')[0];
      r=o.createElement('script');r.async=1;
      r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
      a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
  `;
  
  document.head.appendChild(script);
};

// Función para enviar eventos personalizados a Hotjar
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.hj) {
    window.hj!('event', eventName, properties);
  }
};

// Función para identificar usuarios
export const identifyUser = (userId: string, userProperties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.hj) {
    window.hj!('identify', userId, userProperties);
  }
};

// Función para configurar variables personalizadas
export const setCustomVariables = (variables: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.hj) {
    Object.entries(variables).forEach(([key, value]) => {
      window.hj!('stateChange', { [key]: value });
    });
  }
};

// Declaración de tipos para TypeScript
declare global {
  interface Window {
    hj?: (...args: any[]) => void;
  }
}
