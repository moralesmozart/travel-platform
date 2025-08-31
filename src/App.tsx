import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';

function App() {
  return (
    <Router basename="/travel-platform">
      <div className="App">
        <Navigation />
      </div>
    </Router>
  );
}

export default App;
