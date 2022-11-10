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

// Route 3 - register as GET 
app.get('/artworks/:classification', routes.all_artworks)

// Route 4 - register as GET 
app.get('/artists', routes.all_artists)

// Route 5 - register as GET 
app.get('/match', routes.match)

// Route 6 - register as GET 
app.get('/artist', routes.artist)

// Route 7 - register as GET 
app.get('/search/matches', routes.search_matches)

// Route 8 - register as GET 
app.get('/search/players', routes.search_players)





app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;
