// Require
const express = require('express');
const housingsRoutes = require('./routes/housings');
const authRoutes = require('./routes/auth');
const matchRoutes = require('./routes/matching');
const nohousingRoutes = require('./routes/nohousing');
const historyRoutes = require('./routes/history');
const questionaireRoutes = require('./routes/questionaire');
require('dotenv').config();


// Initiate express
const app = express();
app.use(express.json());

// Adding routes
app.use('/api/housings', housingsRoutes);
app.use('/api/users', authRoutes);
app.use('/api/matching', matchRoutes);
app.use('/api/nohousing', nohousingRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/questionaire', questionaireRoutes);


// Run app
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
