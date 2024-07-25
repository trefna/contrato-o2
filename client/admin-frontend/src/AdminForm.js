import React, { useState } from 'react';

function AdminForm() {
  const [contractData, setContractData] = useState({
    nombreCliente: '',
    fechaContratacion: '',
    modalidadProducto: '',
    cuotaMensual: '',
    lineasAdicionales: '',
    tipoNumeroMovil: '',
    tipoNumeroFijo: '',
    permanencia: '',
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
    setContractData({
      ...contractData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/contracts/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contractData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Contract generated:', data);
      // Handle success (e.g., show a success message or redirect)
    } catch (error) {
      console.error('Failed to generate contract:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre del Cliente:
        <input
          type="text"
          name="nombreCliente"
          value={contractData.nombreCliente}
          onChange={handleChange}
        />
      </label>
      {/* Add other form fields similarly */}
      <button type="submit">Generar y Enviar Contrato</button>
    </form>
  );
}

export default AdminForm;
