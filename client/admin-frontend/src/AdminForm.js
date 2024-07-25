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
    fechaPortabilidad: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContractData({ ...contractData, [name]: value });
  };

  const onSubmit = async (e) => {
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
        throw new Error('Error: ' + response.statusText);
      }
      const data = await response.json();
      alert('Contract generated successfully: ' + data.contractLink);
    } catch (error) {
      console.error('Failed to generate contract:', error);
      alert('Failed to generate contract: ' + error.message);
    }
  };

  return (
    <div className="admin-form-container">
      <form onSubmit={onSubmit} className="admin-form">
        {/* Campos del formulario para ingresar los datos del contrato */}
        <label>
          Fecha de contratación:
          <input type="datetime-local" name="fechaContratacion" value={contractData.fechaContratacion} onChange={handleChange} required />
        </label>
        {/* Agrega más campos según sea necesario */}
        <button type="submit">Generar y enviar contrato</button>
      </form>
    </div>
  );
}

export default AdminForm;
