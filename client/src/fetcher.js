import config from './config.json'

const getAllArtworks = async (page, pagesize, classification) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/artworks/${classification}?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getAllArtists = async (page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/artists?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getMatch = async (id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/match?id=${id}`, {
        method: 'GET',
    })
    return res.json()
}

const getArtist = async (id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/artist?id=${id}`, {
        method: 'GET',
    })
    return res.json()
}

const getMatchSearch = async (home, away, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/matches?Home=${home}&Away=${away}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getArtistSearch = async (name, nationality, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/artists?Name=${name}&Nationality=${nationality}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}




export {
    getAllArtworks,
    getAllArtists,
    getMatch,
    getArtist,
    getMatchSearch,
    getArtistSearch
}