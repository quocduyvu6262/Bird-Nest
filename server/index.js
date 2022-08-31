// Require
const express = require('express');
const housingsRoutes = require('./routes/housings');
const authRoutes = require('./routes/auth');
const matchRoutes = require('./routes/matching');
const nohousingRoutes = require('./routes/nohousing');
const historyRoutes = require('./routes/history');
const chatRoutes = require('./routes/chat')
const imagesRoutes = require('./routes/images');
const notificationsRoutes = require('./routes/notifications');


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
app.use('/api/chat',chatRoutes);
app.use('/api/images', imagesRoutes);
app.use('/api/notifications', notificationsRoutes);







// Run app
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
