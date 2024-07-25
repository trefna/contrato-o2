import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SignaturePad from 'react-signature-canvas';
import './ClientForm.css';

function ClientForm() {
  const { contractId } = useParams();
  const [contractData, setContractData] = useState(null);
  const [bankDetails, setBankDetails] = useState('');
  const [sigPad, setSigPad] = useState({});

  useEffect(() => {
    const fetchContractData = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/contracts/${contractId}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setContractData(data);
    };
    fetchContractData();
  }, [contractId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sigData = sigPad.getTrimmedCanvas().toDataURL('image/png');
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/contracts/sign`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contractId, bankDetails, signature: sigData }),
    });
    const data = await response.json();
    if (data.success) {
      alert('Contract signed and sent!');
    } else {
      alert('Error signing contract.');
    }
  };

  if (!contractData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="contract-container">
      <h1>O2</h1>
      <h2>CONTRATO DEL SERVICIO DE TELECOMUNICACIONES 02 FIBRA Y MÓVIL</h2>
      <p>{contractData.descripcion}</p>
      <h3>INFORMACIÓN BÁSICA DEL CONTRATO</h3>
      <p><strong>Fecha y hora de la contratación:</strong> {contractData.fechaContratacion}</p>
      <p><strong>Modalidad y Producto contratado:</strong> {contractData.modalidadProducto}</p>
      <p><strong>Cuota mensual:</strong> {contractData.cuotaMensual}</p>
      <p><strong>Líneas Móviles Adicionales:</strong> {contractData.lineasAdicionales}</p>
      <p><strong>Tipo de Número de la Línea Portabilidad Móvil Principal:</strong> {contractData.tipoNumeroMovil}</p>
      <p><strong>Tipo de Número de la Línea Alta Fija:</strong> {contractData.tipoNumeroFijo}</p>
      <p><strong>Compromiso de permanencia:</strong> {contractData.permanencia}</p>
      <h3>DATOS IDENTIFICATEOS DEL CLIENTE</h3>
      <p><strong>Nombre completo del cliente:</strong> {contractData.nombreCliente}</p>
      <p><strong>Tipo y número de Documento Identifcativo:</strong> {contractData.documentoIdentificativo}</p>
      <p><strong>Nacionalidad:</strong> {contractData.nacionalidad}</p>
      <p><strong>Teléfono de contacto y E-mail:</strong> {contractData.telefonoEmail}</p>
      <p><strong>Dirección de instalación:</strong> {contractData.direccion}</p>
      <h3>DATOS DE FACTURACIÓN DEL CLIENTE</h3>
      <p><strong>Titular de la cuenta:</strong> {contractData.titularCuenta}</p>
      <form onSubmit={handleSubmit} className="client-form">
        <label>
          <strong>Domiciliación bancaria:</strong>
          <input type="text" value={bankDetails} onChange={(e) => setBankDetails(e.target.value)} required />
        </label>
        <label>
          <strong>Firma del cliente:</strong>
          <SignaturePad
            ref={(ref) => setSigPad(ref)}
            canvasProps={{ className: 'signatureCanvas' }}
          />
        </label>
        <button type="submit">Enviar Contrato Firmado</button>
      </form>
      <h3>DATOS DE SOLICITUD DE PORTABILIDAD DE LÍNEA MÓVIL PRINCIPAL</h3>
      <p><strong>Número de teléfono a portar como Línea Móvil Principal:</strong> {contractData.numeroPortabilidad}</p>
      <p><strong>Operador donante:</strong> {contractData.operadorDonante}</p>
      <p><strong>Fecha deseada para portar:</strong> {contractData.fechaPortabilidad}</p>
      <p><strong>La firma del documento acredita la contratación...</strong></p>
    </div>
  );
}

export default ClientForm;
