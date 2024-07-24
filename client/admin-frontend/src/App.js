import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminForm from './AdminForm';
import ClientForm from './ClientForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Generador de Contratos O2</h1>
        </header>
        <Routes>
          <Route path="/" element={<AdminForm />} />
          <Route path="/contract/:contractId" element={<ClientForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
