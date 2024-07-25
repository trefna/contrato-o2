import React, { useState } from 'react';

const AdminForm = () => {
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
    bancoDetails: '',
    numeroPortabilidad: '',
    operadorDonante: '',
    fechaPortabilidad: '',
    signature: ''
  });

  const API_URL = process.env.REACT_APP_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContractData({
      ...contractData,
      [name]: value
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_URL}/contracts/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contractData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Contract generated:', data);
    } catch (error) {
      console.error('Failed to generate contract:', error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <label>
        Fecha de Contratación:
        <input type="text" name="fechaContratacion" value={contractData.fechaContratacion} onChange={handleChange} />
      </label>
      <label>
        Modalidad y Producto Contratado:
        <input type="text" name="modalidadProducto" value={contractData.modalidadProducto} onChange={handleChange} />
      </label>
      <label>
        Cuota Mensual:
        <input type="text" name="cuotaMensual" value={contractData.cuotaMensual} onChange={handleChange} />
      </label>
      <label>
        Líneas Adicionales:
        <input type="text" name="lineasAdicionales" value={contractData.lineasAdicionales} onChange={handleChange} />
      </label>
      <label>
        Tipo de Número de la Línea Portabilidad Móvil Principal:
        <input type="text" name="tipoNumeroMovil" value={contractData.tipoNumeroMovil} onChange={handleChange} />
      </label>
      <label>
        Tipo de Número de la Línea Alta Fija:
        <input type="text" name="tipoNumeroFijo" value={contractData.tipoNumeroFijo} onChange={handleChange} />
      </label>
      <label>
        Compromiso de Permanencia:
        <input type="text" name="permanencia" value={contractData.permanencia} onChange={handleChange} />
      </label>
      <label>
        Nombre Completo del Cliente:
        <input type="text" name="nombreCliente" value={contractData.nombreCliente} onChange={handleChange} />
      </label>
      <label>
        Documento Identificativo:
        <input type="text" name="documentoIdentificativo" value={contractData.documentoIdentificativo} onChange={handleChange} />
      </label>
      <label>
        Nacionalidad:
        <input type="text" name="nacionalidad" value={contractData.nacionalidad} onChange={handleChange} />
      </label>
      <label>
        Teléfono de Contacto y E-mail:
        <input type="text" name="telefonoEmail" value={contractData.telefonoEmail} onChange={handleChange} />
      </label>
      <label>
        Dirección de Instalación:
        <input type="text" name="direccion" value={contractData.direccion} onChange={handleChange} />
      </label>
      <label>
        Titular de la Cuenta:
        <input type="text" name="titularCuenta" value={contractData.titularCuenta} onChange={handleChange} />
      </label>
      <label>
        Detalles del Banco:
        <input type="text" name="bancoDetails" value={contractData.bancoDetails} onChange={handleChange} />
      </label>
      <label>
        Número de Portabilidad:
        <input type="text" name="numeroPortabilidad" value={contractData.numeroPortabilidad} onChange={handleChange} />
      </label>
      <label>
        Operador Donante:
        <input type="text" name="operadorDonante" value={contractData.operadorDonante} onChange={handleChange} />
      </label>
      <label>
        Fecha de Portabilidad:
        <input type="text" name="fechaPortabilidad" value={contractData.fechaPortabilidad} onChange={handleChange} />
      </label>
      <label>
        Firma:
        <input type="text" name="signature" value={contractData.signature} onChange={handleChange} />
      </label>
      <button type="submit">Generar y Enviar Contrato</button>
    </form>
  );
};

export default AdminForm;
