import React, { useState } from 'react';
import './AdminForm.css';

function AdminForm() {
  const [contract, setContract] = useState({
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
    operadorDonante: '',
    fechaPortabilidad: '',
    firma: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContract({ ...contract, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('https://online-o2-firma-contratos-f4bbf86ac103.herokuapp.com/api/contracts/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contract),
    });
    const data = await response.json();
    if (data.success) {
      alert(`Contract link generated: ${data.contractLink}`);
    } else {
      alert('Error generating contract.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <label>
        Fecha y hora de la contratación:
        <input type="datetime-local" name="fechaContratacion" onChange={handleChange} required />
      </label>
      <label>
        Modalidad y Producto contratado:
        <input type="text" name="modalidadProducto" onChange={handleChange} required />
      </label>
      <label>
        Cuota mensual:
        <input type="text" name="cuotaMensual" onChange={handleChange} required />
      </label>
      <label>
        Líneas Móviles Adicionales:
        <input type="text" name="lineasAdicionales" onChange={handleChange} required />
      </label>
      <label>
        Tipo de Número de la Línea Portabilidad Móvil Principal:
        <input type="text" name="tipoNumeroMovil" onChange={handleChange} required />
      </label>
      <label>
        Tipo de Número de la Línea Alta Fija:
        <input type="text" name="tipoNumeroFijo" onChange={handleChange} required />
      </label>
      <label>
        Compromiso de permanencia:
        <input type="text" name="permanencia" onChange={handleChange} required />
      </label>
      <label>
        Nombre completo del cliente:
        <input type="text" name="nombreCliente" onChange={handleChange} required />
      </label>
      <label>
        Tipo y número de Documento Identifcativo:
        <input type="text" name="documentoIdentificativo" onChange={handleChange} required />
      </label>
      <label>
        Nacionalidad:
        <input type="text" name="nacionalidad" onChange={handleChange} required />
      </label>
      <label>
        Teléfono de contacto y E-mail:
        <input type="text" name="telefonoEmail" onChange={handleChange} required />
      </label>
      <label>
        Dirección de instalación:
        <input type="text" name="direccion" onChange={handleChange} required />
      </label>
      <label>
        Titular de la cuenta:
        <input type="text" name="titularCuenta" onChange={handleChange} required />
      </label>
      <label>
        Operador donante:
        <input type="text" name="operadorDonante" onChange={handleChange} required />
      </label>
      <label>
        Fecha deseada para portar:
        <input type="datetime-local" name="fechaPortabilidad" onChange={handleChange} required />
      </label>
      <button type="submit">Generar y Enviar Contrato</button>
    </form>
  );
}

export default AdminForm;
