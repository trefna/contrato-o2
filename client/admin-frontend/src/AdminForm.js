import React, { useState } from 'react';
import './AdminForm.css';

function AdminForm() {
  const [contractData, setContractData] = useState({
    fechaContratacion: '',
    modalidadProducto: '',
    cuotaMensual: '',
    lineasAdicionales: '',
    tipoNumeroMovil: '',
    tipoNumeroFijo: '',
    permanencia: '',
    nombreCliente: '',
    documentoIdentificativo: '',
    nacionalidad: '',
    telefonoEmail: '',
    direccion: '',
    titularCuenta: '',
    numeroPortabilidad: '',
    operadorDonante: '',
    fechaPortabilidad: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContractData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/contracts/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contractData),
      });

      if (!response.ok) {
        throw new Error('Failed to generate contract');
      }

      const data = await response.json();
      alert(`Contract generated! Link: ${data.contractLink}`);
    } catch (error) {
      console.error('Failed to generate contract:', error);
      alert('Failed to generate contract');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <h2>Generate Contract</h2>
      {Object.keys(contractData).map((key) => (
        <div key={key} className="form-group">
          <label>{key.replace(/([A-Z])/g, ' $1')}</label>
          <input
            type="text"
            name={key}
            value={contractData[key]}
            onChange={handleChange}
            required
          />
        </div>
      ))}
      <button type="submit">Generate</button>
    </form>
  );
}

export default AdminForm;
