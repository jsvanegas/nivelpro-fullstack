const express = require('express');
const exphbs = require('express-handlebars');

const MongoClient = require('mongodb').MongoClient;
let libDb = null;

const fileManager = require('./file-manager');

const app = express();

app.engine('hbs', exphbs({extname: 'hbs', defaultLayout: null }));
app.set('view engine', 'hbs');


app.get('/authors', (req,res) => {
    //Consultar los datos desde la BD

    const authorsCol = libDb.collection('authors');

    authorsCol.find({}, (err, cursor) => {
        if(err){
            console.log(err);
            res.status(500).send({err:err.message });
            return;
        }

        //ToArray para obterner los datos en forma de arreglo en JS

        cursor.toArray((parseError, result) => {
            if(err){
                console.log(parseError);
                res.status(500).send({error:parseError.message });
                return;
            }

            res.status(200).send(result);
    
        });

    });
});









app.get('/author-books/:author', (req,res) => {
    const books = fileManager.listBooks(req.params.author);
    res.status(200)
        .render('books', {title: 'Página de libros', books: books});
});

app.get('/books', (req,res) => {
    const author = req.query.author;

    res.status(200)
        .send(fileManager.listBooks(author));

});


app.get('/books/:author', (req,res) => {
    const author = req.params.author;

    res.status(200)
        .send(fileManager.listBooks(author));

});

app.get('/add-books', (req,res) => {
    const {author, title} = req.query;

    res.status(200)
        .send(fileManager.addBook(author,title));

});



app.listen(9090, () => {
    console.log('Server is running on port 9090');

    const mongoDbPath = 'mongodb://localhost:27017';
    const mongoConf = { useNewUrlParser: true, useUnifiedTopology: true};
    MongoClient.connect(mongoDbPath, mongoConf, (err, client) => {

        if(err){
            console.log('Error connecting to Database: ', err);
            return;
        }

        console.log('Connection State: ', client.isConnected());
        libDb = client.db('library');

    });
});

