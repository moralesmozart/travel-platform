import React, { useEffect } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import { initHotjar } from './config/hotjar';
import HotjarWidget from './components/HotjarWidget';

function App() {
  useEffect(() => {
    // Inicializar Hotjar solo en producción
    if (process.env.NODE_ENV === 'production') {
      initHotjar();
    }
  }, []);

  return (
    <div className="App">
      <Navigation />
      <HotjarWidget />
    </div>
  );
}

export default App;
