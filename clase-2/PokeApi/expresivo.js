const express = require('express')
const app = express()
app.disable('x-powered-by')

const PORT = process.env.PORT ?? 1234

const bulbasaurJSON = require('./pokemon/bulbasaur.json')
const charmanderJSON = require('./pokemon/charmander.json')
const squirtleJSON = require('./pokemon/squirtle.json')

app.get('/', (req, res) => {
    res.send(`
        <h1>Hello Express</h1>
        <h3>This is a web that serve you with the information of the initial pokemons of Kanto...</h3>
        <h3>Look for that info by clicking the pokemon name:</h3>
        <li><a href="http://localhost:${PORT}/bulbasaur">Bulbasaur</a></li>
        <br>
        <li><a href="http://localhost:${PORT}/charmander">Charmander</a></li>
        <br>
        <li><a href="http://localhost:${PORT}/squirtle">Squirtle</a></li>
        <br><br>
        <h4>You can also have access by typing "/pokemon_name_in_low_case" next to the URL.</h4>

        <style>
        * {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: #dadada;
        }
        body {
        background-color: #252525;
        }
        a {
        text-decoration: none;
        }
        </style>
        `)
})

app.get('/bulbasaur', (req, res) => {
    res.json(bulbasaurJSON)
})
app.get('/charmander', (req, res) => {
    res.json(charmanderJSON)
})
app.get('/squirtle', (req, res) => {
    res.json(squirtleJSON)
})

app.use((req, res) => {
    res.send(`
        <h1>404 not found</h1>
        <style>
        * {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: #dadada;
        }
        body {
        background-color: #252525;
        }
        </style>
        `)
})

app.listen(PORT, () => {
    console.log(`server listening at http://localhost:${PORT}`)
})