const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
require('dotenv').config();  // Cargar las variables de entorno desde el archivo .env

const generateContract = async (req, res) => {
  try {
    const contractData = req.body;

    // Generate a unique ID for the contract
    const contractId = Date.now().toString();

    // Save the contract data to a JSON file for later use
    const contractsDir = path.join(__dirname, '../contracts');
    if (!fs.existsSync(contractsDir)) {
      fs.mkdirSync(contractsDir);
    }
    const contractFile = `${contractsDir}/${contractId}.json`;
    fs.writeFileSync(contractFile, JSON.stringify(contractData, null, 2));

    // Return the contract link to the client
    res.status(200).send({ success: true, contractLink: `${process.env.BASE_URL}/contract/${contractId}` });
  } catch (error) {
    console.error('Error generating contract:', error);
    res.status(500).send({ success: false, message: error.toString() });
  }
};

const signContract = async (req, res) => {
  try {
    const { contractId, bankDetails, signature } = req.body;
    console.log('Received data:', { contractId, bankDetails, signature });

    const contractsDir = path.join(__dirname, '../contracts');
    const contractFile = `${contractsDir}/${contractId}.json`;

    // Load the contract data
    if (!fs.existsSync(contractFile)) {
      return res.status(404).send({ success: false, message: 'Contract not found' });
    }
    const contractData = JSON.parse(fs.readFileSync(contractFile));
    console.log('Loaded contract data:', contractData);

    // Generate the PDF
    const fileName = `${contractsDir}/${contractId}-signed.pdf`;
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(fileName));

    doc.fontSize(20).text('O2', { align: 'center' });
    doc.fontSize(16).text('CONTRATO DEL SERVICIO DE TELECOMUNICACIONES 02 FIBRA Y MÓVIL', { align: 'center' });
    doc.moveDown();

    doc.fontSize(12).text(`El que suscribe contrata con Telefónica de España, S.A.U., con CIF A-82018474 y domicilio en Calle Gran Vía 28, C.P. 28013 de Madrid, España (en adelante, denominada por su marca “02”), y Telefónica Móviles España, S.A.U., con CIF A78923125 y domicilio en Ronda de la Comunicación s/n, Edificio Sur 3, C.P. 28050 de Madrid, España, la prestación de los servicios de telecomunicaciones fijos y móviles incluidos dentro del paquete 02 Fibra y Móvil, con las condiciones que se expresan a continuación:`, { align: 'center' });
    doc.moveDown();

    doc.fontSize(14).text('INFORMACIÓN BÁSICA DEL CONTRATO');
    doc.fontSize(12).text(`Fecha y hora de la contratación: ${contractData.fechaContratacion}`);
    doc.text(`Modalidad y Producto contratado: ${contractData.modalidadProducto}`);
    doc.text(`Cuota mensual: ${contractData.cuotaMensual}`);
    doc.text(`Líneas Móviles Adicionales: ${contractData.lineasAdicionales}`);
    doc.text(`Tipo de Número de la Línea Portabilidad Móvil Principal: ${contractData.tipoNumeroMovil}`);
    doc.text(`Tipo de Número de la Línea Alta Fija: ${contractData.tipoNumeroFijo}`);
    doc.text(`Compromiso de permanencia: ${contractData.permanencia}`);
    doc.moveDown();

    doc.fontSize(14).text('DATOS IDENTIFICATEOS DEL CLIENTE');
    doc.fontSize(12).text(`Nombre completo del cliente: ${contractData.nombreCliente}`);
    doc.text(`Tipo y número de Documento Identifcativo: ${contractData.documentoIdentificativo}`);
    doc.text(`Nacionalidad: ${contractData.nacionalidad}`);
    doc.text(`Teléfono de contacto y E-mail: ${contractData.telefonoEmail}`);
    doc.text(`Dirección de instalación: ${contractData.direccion}`);
    doc.moveDown();

    doc.fontSize(14).text('DATOS DE LA CUENTA DE CARGO');
    doc.fontSize(12).text(`Titular de la cuenta: ${contractData.titularCuenta}`);
    doc.text(`Número de cuenta (IBAN): ${bankDetails}`);
    doc.moveDown();

    doc.fontSize(14).text('DATOS DE LA PORTABILIDAD');
    doc.fontSize(12).text(`Número que solicita portabilidad: ${contractData.numeroPortabilidad}`);
    doc.text(`Operador donante: ${contractData.operadorDonante}`);
    doc.text(`Fecha en la que solicita la portabilidad: ${contractData.fechaPortabilidad}`);
    doc.moveDown();

    doc.fontSize(14).text('FIRMA');
    doc.fontSize(12).text(`Firma del cliente: ${signature}`);
    doc.moveDown();

    doc.fontSize(14).text('Confirmación y Envío del Contrato');
    doc.fontSize(12).text(`Confirmo que la información proporcionada es correcta y autorizo a O2 a proceder con la activación de los servicios contratados según los términos y condiciones especificados en este documento.`);
    doc.moveDown();

    doc.end();

    console.log('PDF generated at:', fileName);

    // Return success response
    res.status(200).send({ success: true, message: 'Contract signed successfully', pdfLink: `${process.env.BASE_URL}/contracts/${contractId}-signed.pdf` });
  } catch (error) {
    console.error('Error signing contract:', error);
    res.status(500).send({ success: false, message: error.toString() });
  }
};

const getContract = (req, res) => {
  const { contractId } = req.params;
  const contractPath = path.join(__dirname, '../contracts', `${contractId}.json`);

  if (!fs.existsSync(contractPath)) {
    return res.status(404).send({ success: false, message: 'Contract not found' });
  }

  const contractData = JSON.parse(fs.readFileSync(contractPath));
  res.status(200).send({ success: true, contractData });
};

module.exports = {
  generateContract,
  signContract,
  getContract,
};
