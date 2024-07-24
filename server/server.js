require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const contractRoutes = require('./routes/contractRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/contracts', contractRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
