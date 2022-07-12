const express = require('express');
const housingsRoutes = require('./routes/housings');
const authRoutes = require('./routes/auth');

require('dotenv').config();


const app = express();

app.use(express.json());
const verifyToken = require('./routes/verifyToken');

app.use('/api/housings', housingsRoutes);
app.use('/api/users', authRoutes);




app.get('/', (req, res) => {
    res.send('Welcome to BirdNest');
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
