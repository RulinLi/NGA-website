const express = require('express');
const mysql = require('mysql');
var cors = require('cors')


const routes = require('./routes')
const config = require('./config.json')

const app = express();

// whitelist localhost 3000
app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));

// Route 1 - register as GET 
app.get('/hello', routes.hello)

// Route 2 - register as GET 
app.get('/artworks/:classification', routes.all_artworks)

// Route 3 - register as GET 
app.get('/artists', routes.all_artists)

// Route 4 - register as GET 
app.get('/artworkDetail/:artworkID', routes.artworkDetail)

// Route 5 - register as GET 
app.get('/artist', routes.artist)

// Route 6 - register as GET //haven't change yet
app.get('/search/artworks', routes.search_artworks)

// Route 7 - register as GET 
app.get('/search/artists', routes.search_artists)





app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;
