import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ControlPanel from './pages/ControlPanel';
import Display from './pages/Display';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ControlPanel />} />
        <Route path="/display" element={<Display />} />
      </Routes>
    </Router>
  );
}

export default App; 