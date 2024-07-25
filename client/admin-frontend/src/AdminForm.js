import React, { useState } from 'react';

function AdminForm() {
  const [contractData, setContractData] = useState({
    nombreCliente: '',
    documentoIdentificativo: '',
    // otros campos del contrato
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContractData({ ...contractData, [name]: value });
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
      const data = await response.json();
      if (data.success) {
        alert('Contract generated successfully!');
      } else {
        alert('Failed to generate contract.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error generating contract.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="nombreCliente" value={contractData.nombreCliente} onChange={handleChange} placeholder="Nombre del Cliente" required />
      <input type="text" name="documentoIdentificativo" value={contractData.documentoIdentificativo} onChange={handleChange} placeholder="Documento Identificativo" required />
      {/* otros campos del formulario */}
      <button type="submit">Generar Contrato</button>
    </form>
  );
}

export default AdminForm;
