// Require
const express = require('express');
const housingsRoutes = require('./routes/housings');
const authRoutes = require('./routes/auth');
const matchRoutes = require('./routes/matching');
//const filterRoutes = require('./routes/housings/filtered');
const db = require('./utils/database');
require('dotenv').config();


// Initiate express
const app = express();
app.use(express.json());




// Adding routes
app.use('/api/housings', housingsRoutes);
app.use('/api/users', authRoutes);
app.use('/api/filter', matchRoutes);


// Run app
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
