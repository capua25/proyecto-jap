const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes/routes.js');

app.use(cors());
app.use(express.json());

app.use('/api', routes);

app.listen(3000, () => {
    console.log('Server is running on port 3000.');
});