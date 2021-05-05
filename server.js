
const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()

const connectionString = 'mongodb+srv://adminQuote:mongo712;@cluster0.nnlhd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const port = process.env.PORT || 3000


app.use(bodyParser.urlencoded({ extended: true }))


MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('hp-quotes')
        const quotesCollection = db.collection('quotes')

        app.get('/', (req, res) => {
            res.sendFile('/Users/admin/Downloads/beforeGit/crud-quotes' + '/index.html')
        })

        app.post('/quotes', (req, res) => {
            console.log(req.body)
        })

        app.listen(port, () => {
            console.log('Server is up on port ' + port)
        })

    })
    .catch(error => console.error(error))


