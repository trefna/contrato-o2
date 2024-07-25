import React, { useState } from 'react';
import './AdminForm.css';

function AdminForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
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

  const apiUrl = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/api/contracts/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        alert('Contract generated successfully!');
      } else {
        alert('Failed to generate contract.');
      }
    } catch (error) {
      console.error('Error generating contract:', error);
      alert('Error generating contract.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Renderiza los campos de formulario aquí y asocia onChange={handleChange} */}
      <button type="submit">Generate Contract</button>
    </form>
  );
}

export default AdminForm;
