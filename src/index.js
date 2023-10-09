const express = require('express');
const dotenv = require('dotenv');
const apiRoutes = require('./routes/index');
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use('/api',apiRoutes);

app.listen(PORT,()=>{
    console.log('server listening to port',PORT);
})