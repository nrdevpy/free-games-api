const express = require('express')
const cors = require('cors')
const debug = require('debug')('app:free-games-api')
const app = express()

// Env environments
const PORT = process.env.PORT || 3000
const API_URL = process.env.API_URL
const API_HOST = process.env.API_HOST
const API_KEY = process.env.API_KEY

app.use(cors({
    origin: 'https://free-games-api.vercel.app/',
    optionsSuccessStatus: 200
}))

app.get('/api', async (req, res) => {
    const tag = req.query.tag || 'battle-royale'
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': API_HOST
        }
    }
    const response = await fetch(`${API_URL}/filter?tag=${tag}`, options)
    const data = await response.json()

    res.json(data)
})

app.get('/api/games', async (req, res) => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': API_HOST
        }
    }
    const sortByOption = req.query['sort-by'] || 'release-date'
    debug(sortByOption)
    const response = await fetch(`${API_URL}/games?sort-by=${sortByOption}`, options)
    const data = await response.json()
    res.json(data)
})

app.use(express.static('public'))
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
module.exports = app