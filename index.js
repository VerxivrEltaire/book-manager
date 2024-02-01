require('dotenv').config()
require('express-async-errors');

const express = require('express')
const app = express()
const connectDB = require('./db/connect');
app.use(express.json())

const notFoundMiddleware = require('./middleware/not-found/not-found')
const errorMiddleware = require('./middleware/error/error-handler')

//region routes and routes middleware
const bookRoutes = require('./routes/bookRoute')

app.use('/api/v1/books', bookRoutes)

//endregion

// middleware
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 9000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => console.log(`Server is listening port ${port}...`));
    } catch (error) {
        console.log(error);
    }
};

start();


