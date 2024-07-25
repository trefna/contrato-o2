const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

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

    // Log the contract generation
    console.log(`Generating contract with ID: ${contractId}`);
    console.log(`Contracts directory path: ${contractsDir}`);
    console.log(`Contract saved at: ${contractFile}`);

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

    doc.fontSize(14).text('DATOS DE FACTURACIÓN DEL CLIENTE');
    doc.fontSize(12).text(`Titular de la cuenta: ${contractData.titularCuenta}`);
    doc.text(`Domiciliación bancaria: ${bankDetails}`);
    doc.moveDown();

    doc.fontSize(14).text('DATOS DE SOLICITUD DE PORTABILIDAD DE LÍNEA MÓVIL PRINCIPAL');
    doc.fontSize(12).text(`Número de teléfono a portar como Línea Móvil Principal: ${contractData.numeroPortabilidad}`);
    doc.text(`Operador donante: ${contractData.operadorDonante}`);
    doc.text(`Fecha deseada para portar: ${contractData.fechaPortabilidad}`);
    doc.moveDown();

    doc.fontSize(12).text(`La firma del documento acredita la contratación por el cliente de los servicios arriba referenciados, cuya prestación está en el caso de la línea telefónica fija con Banda Ancha, no obstante, supeditada a la disponibilidad y cobertura del servicio de Fibra en el domicilio del cliente. El firmante declara que los datos incorporados a este contrato son correctos y autoriza a 02 a la verificación de los mismos. Asimismo, el cliente declara conocer y aceptaren su totalidad las Condiciones de contratación y prestación de los servicios y las tarifas aplicables a los mismos como parte integrante de este contrato y que, además de estar a su disposición en el apartado de “Condiciones legales" de www.o2online.es, le son facilitadas en este momento. Ambas partes, en prueba de conformidad, firman el presente contrato.`);
    doc.moveDown();

    doc.text('Firma del cliente:', { continued: true }).moveDown(6);
    doc.image(signature, { fit: [250, 100], align: 'center' });
    doc.text('Firma apoderado 02:').image(path.join(__dirname, '../assets/signature.png'), { fit: [100, 50], align: 'center' });

    doc.end();

    // Send the signed contract via email
    let transporter = nodemailer.createTransport({
      service: 'hotmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'movistar.o2@infocliente.es',
      subject: 'Contrato Firmado',
      text: 'Por favor, encuentre adjunto el contrato firmado.',
      attachments: [
        {
          filename: 'contract-signed.pdf',
          path: fileName
        }
      ]
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).send({ success: false, message: error.toString() });
      } else {
        res.status(200).send({ success: true, message: 'Contract sent!' });
      }
    });
  } catch (error) {
    console.error('Error signing contract:', error);
    res.status(500).send({ success: false, message: error.toString() });
  }
};

const getContract = async (req, res) => {
  try {
    const contractId = req.params.contractId;
    const contr
