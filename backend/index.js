const MONGO_URI = require('./config/settings.js')

const express = require('express');
const mongoose = require('mongoose');
const app = express();

const PORT = 8080;


// MongoDB connection, useNewUrlParser is for the latest url of mongoDB, useUnifiedTopology is for new control
// management in MongoDB
mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connection to MongoDB Successful'))
    .catch((err) => {
        console.log(err)
    });

// function for loading the initial job feeds to the database
// mostly a cron job - once mongodb connection is successful

// function cronJob(){}

// setting the default api endpoint
app.use('/api/news', routeForFeed);

app.use(express.json())
const editorRoutes = require('./editor/editorRequest')
const channelRoutes = require('./channel/channelRequest')
const filterRouters = require('./filter/filterRequest')
//app.use('/editor/:eId/channel/:cId',editorRoutes)
app.use('/editor',editorRoutes)
app.use('/channel',channelRoutes)
app.use('/filter',filterRouters)

// Starting the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
