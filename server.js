
const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()

const port = process.env.PORT || 3000

require('dotenv').config({
    path: './secrets/.env'
  })

  //local
// const connectionString = process.env.MONGO_URL

//heroku
const connectionString = process.env.MONGODB_URI;

MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('hp-quotes')
        const quotesCollection = db.collection('quotes')

        // Middlewares
        app.set('view engine', 'ejs')
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(bodyParser.json())
        app.use(express.static('public'))


        // Routes
        app.get('/', (req, res) => {
            db.collection('quotes').find().toArray()
                .then(quotes => {
                    res.render('index.ejs', { quotes: quotes })
                })
                .catch(error => console.error(error))
        })

        app.post('/quotes', (req, res) => {
            quotesCollection.insertOne(req.body)
                .then(result => {
                    res.redirect('/')
                })
                .catch(error => console.error(error))
        })

        app.put('/quotes', (req, res) => {
            quotesCollection.findOneAndUpdate(
                { name: 'Voldemort' },
                {
                    $set: {
                        name: req.body.name,
                        quote: req.body.quote
                    }
                },
                {
                    upsert: true
                }
            )
                .then(result => res.json('Success'))
                .catch(error => console.error(error))
        })

        app.delete('/quotes', (req, res) => {
            quotesCollection.deleteOne(
                { name: req.body.name }
            )
                .then(result => {
                    if (result.deletedCount === 0) {
                        return res.json('No quote to delete')
                    }
                    res.json('Deleted Harry Potter\'s quote')
                })
                .catch(error => console.error(error))
        })


        // Listen
        const isProduction = process.env.NODE_ENV === 'production'
        const port = isProduction ? 7500 : 3000
        app.listen(port, function () {
            console.log(`listening on ${port}`)
        })
    })
    .catch(console.error)


