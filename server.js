
const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()

const connectionString = 'mongodb+srv://adminQuote:mongo712;@cluster0.nnlhd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const port = process.env.PORT || 3000



MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('hp-quotes')
        const quotesCollection = db.collection('quotes')


        app.use(bodyParser.urlencoded({ extended: true }))
        app.set('view engine', 'ejs')
        app.use(express.static('public'))
        app.use(bodyParser.json())


        app.post('/quotes', (req, res) => {
            quotesCollection.insertOne(req.body)
                .then(result => {
                    res.redirect('/')
                })
                .catch(error => console.error(error))
        })

        app.get('/', (req, res) => {
            db.collection('quotes').find().toArray()
                .then(results => {
                    // console.log(results)
                    // res.sendFile('/Users/admin/Downloads/beforeGit/crud-quotes' + '/index.html')
                    res.render('index.ejs', { quotes: results })
                })
                .catch(error => console.error(error))

        })

        app.put('/quotes', (req, res) => {
            console.log(req.body)
            // quotesCollection.findOneAndUpdate(
            //     { name: 'Harry Potter' },
            //     {
            //       $set: {
            //         name: req.body.name,
            //         quote: req.body.quote
            //       }
            //     },
            //     {
            //       upsert: true
            //     }
            //   )
            //   .then(result => {
            //     console.log(result)
            //    })
            //     .catch(error => console.error(error))
        })


        app.listen(port, () => {
            console.log('Server is up on port ' + port)
        })

    })
    .catch(error => console.error(error))


