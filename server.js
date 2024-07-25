const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const contractRoutes = require('./server/routes/contractRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/contracts', contractRoutes);

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/admin-frontend/build')));

// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/admin-frontend/build/index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
