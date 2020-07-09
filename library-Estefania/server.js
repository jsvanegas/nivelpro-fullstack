const express = require('express');
const exphbs = require('express-handlebars');
const { MongoClient , ObjectId }  = require('mongodb');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true, encode: true}));
app.use(bodyParser.json());

app.engine('hbs', exphbs({extname: 'hbs', defaultLayout: null }));
app.set('view engine', 'hbs');

//Routes
app.get('/index', renderIndex);
app.get('/authors/:author_id', renderAuthor);
app.post('/add-book', addBook);
app.get('/remove', removeBook);
app.get('/search', renderSearch);
app.post('/search-authors', searchAuthors);

var libDB = null;



function renderIndex(req, res) {
    //console.log('renderIndex');

    libDb.collection('authors').find({},{projection: {name:1}}, (err, cursor) => {
        // TODO: Proyección de datos en la consulta

        if(err){
            handleError(res, err);
            return;
        }
        cursor.toArray((parseError, result) => {
            if(err){
                console.log(parseError);
               handleError(result, parseError);
                return;
            }

            res.render('index', {authors: result});
    
        });


    });
}

function renderAuthor(req, res) {
    //console.log('renderAuthor');
    const authorId = req.params.author_id;

    libDb.collection('authors').findOne({_id: new ObjectId(authorId)},(err, cursor) => {
        // TODO: Proyección de datos en la consulta

        if(err){
            handleError(res, err);
            return;
        }
        res.render('author', {author: cursor});



    });
}

async function addBook(req, res){
    const { title, year, lang, tags, pages, author } = req.body;
    const newBook = 
        {
            title,
            "publicationYear" : year,
            lang,
            "tags" : tags.split(','),
            pages
        }

        const query = { _id: new ObjectId(author) };
        const update = { $addToSet: {books: newBook}};

        try{
        const result = await libDb.collection('authors').updateOne(query, update);
        res.status(200).redirect('/authors/'+author);
        }catch(err){
            return handleError(res, err);
        }
    }

    function removeBook(req, res) {
        const {author, title } = req.query;
        const query = { _id: new ObjectId(author) };
        const update = { $pull : { books : { title: title}}}; // remover el objeto del arreglo donde title sea el parametro

        libDb.collection('authors').updateOne(query, update, (err, result) => {
            if(err){
                handleError(reult, err);
                return;
            }
            res.status(200).redirect('/authors/'+author);
        });
       

    }

function renderSearch(req, res) {
    res.render('search');
}

async function searchAuthors(req, res) {
    //console.log("Search Authors");
    const {name, nobel, dead, country } = req.body;
    //console.log("nobel: " + nobel);

    let query = {};

    if(name && name.trim().length >0) {
        query.name = {$regex: new RegExp(name, 'i')};
    }

    if(nobel=="true"){
        query.nobel = {$exists: true};
    }

    if(nobel=="false"){
        query.nobel = {$exists: false};
    }

    if(dead=="true"){
        query.died = {$exists: true};
    }

    if(dead=="false"){
        query.died = {$exists: false};
    }

    if(country && country.trim().length >0) {
        query.countries = { $in: [ new RegExp(country, 'i') ]};
    }

    const projection = {
        projection: {name: 1, born: 1, died: 1, nobel: 1, countries: 1}
    };

    try{
        const cursor = await libDb.collection('authors').find(query,projection);
    
        const data = await cursor.toArray();

        res.render('search', {authors: data});
    }catch (err){
        return handleError(res,err);
    }

}


function handleError(res, err){
    console.log("Error: ", err);
    res.status(500).send(err);
}


app.listen(9090, () => {
    console.log('Server is running on port 9090');

    // MongoDB connect
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


/*

    /index
    - Consultar la lista de autores (nombres)
    - Cada autor será un link a la Bibliografía del autor
    /author/:ID_AUTHOR:
    - Visualizar la lista de libros
    - Agregar nuevos libros al autor
    - Eliminar libros del autor

    /search Nueva Página - Tarea
    - OK Buscar por coincidencias de nombre (input txt)
    - OK que tengan un nobel (lista o radio)
    - OK autores que han muerto (lista o radio)
    - OK Buscar autores por Pais (input txt)


    Agregar autores
    Eliminar autores
    Añadir información a un autor (como paises)




*/