const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const util = require('./util');

const { MongoClient, ObjectId } = require('mongodb');


const app = express();

// Para poder usar parametros que vienen por POST
app.use(bodyParser.urlencoded({ extended: true, encoded: true }));
app.use(bodyParser.json());

// Configurar Handlebars y sus helpers
const hbs = exphbs.create({
  extname: 'hbs',
  helpers: {
    setRadioState: (value, current) => ((value == current) ? 'checked' : '')
  }
});


app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

var libDb = null;

// Routes
app.get('/index', renderIndex);
app.get('/author/:author_id', renderAuthor);

app.get('/remove', removeBook);
app.post('/add-book', addBook);
app.get('/authors', renderSearchAuthors);
app.post('/search-authors', searchAuthors);

function renderSearchAuthors(req, res) {
  res.render('search');
}

function renderIndex(req, res) {
  libDb.collection('authors').find({}, { projection: { name: 1 } }, (err, cursor) => {
    if (err) return handleError(res, err);
    cursor.toArray((err, data) => {
      console.log(data);
      res.render('index', { authors: data });
    });
  });
}

function renderAuthor(req, res) {
  const authorId = req.params.author_id;
  // TODO: Verificar cuando no hay parametro
  libDb.collection('authors').findOne({ _id: new ObjectId(authorId) }, (err, author) => {
    if (err) return handleError(res, err);
    res.render('author', { author: author });
  });
}

async function searchAuthors(req, res) {

  const { author, nobel, dead, country } = req.body;
  let query = {};

  if (util.validateString(author)) {
    query.name = { $regex: new RegExp(author, 'i') };
  }

  if (nobel === '1' || nobel === '0') {
    query.nobel = { $exists: parseInt(nobel) }
  }

  if (dead === '1' || dead === '0') {
    query.died = { $exists: parseInt(dead) }
  }

  if (util.validateString(country)) {
    query.countries = { $in: [new RegExp(country, 'i')] };
    // query.countries = { $regex: new RegExp(country, 'i') };;
  }

  try {
    const cursor = await libDb.collection('authors').find(query);
    const data = await cursor.toArray();
    console.log(data);
    res.status(200).render('search', {
      authors: data,
      state: { author, nobel, dead, country }
    });
  } catch (err) {
    return handleError(res, err);
  }
}


async function addBook(req, res) {
  const { title, year, lang, tags, pages, author } = req.body; // Parametros que vienen por POST
  const newBook = {
    title, // es igual a -- title: title
    lang,
    pages,
    author,
    publicationYear: year,
    tags: tags.split(',')
  }

  const query = { _id: new ObjectId(author) };
  const update = { $addToSet: { books: newBook } };

  try {
    // updateMany :: Multiples ediciones || No usar update
    await libDb.collection('authors').updateOne(query, update);
    res.status(200).redirect('/author/' + author);
  } catch (err) {
    return handleError(res, err);
  }
}

function removeBook(req, res) {
  const { author, title } = req.query;
  const query = { _id: new ObjectId(author) };

  const update = {
    $pull: { books: { title: title } } // remover el objeto del arreglo, donde title sea el parametro de la url
  };

  libDb.collection('authors').updateOne(query, update, (err, result) => {
    if (err) return handleError(res, err);
    res.status(200).redirect('/author/' + author);
  });
}

function handleError(res, err) {
  console.log('Error: ', err);
  res.status(500).send(err);
}


app.listen(9090, () => {
  console.log('Server running in port, 9090');

  //Setup MongoDB Connection
  // 'mongodb://localhost:27017'
  const cnnPath = 'mongodb://jsvanegas:123@ds225028.mlab.com:25028/tiendalibros';
  const cnnConf = { useNewUrlParser: true, useUnifiedTopology: true };
  MongoClient.connect(cnnPath, cnnConf, (err, client) => {

    if (err) {
      console.log('Error connecting to Database: ', err);
      return;
    }

    console.log('Connection State: ', client.isConnected());
    libDb = client.db('tiendalibros');
  });


});


/*

Tareas:

 - /index
  - Consultar la lista de Autores (Nombres)
  - Cada autor será un link a la Bibliografía del Autor

-  /author/(ID_AUTOR)
  - Visualizar la lista de libros
  - Agregar nuevos libros al autor
  - Eliminar libros de un autor

- /search :: Nueva pagina
  - Buscar Autores por coincidencia de nombre
  - Buscar Autores que tengan un nobel  (RadioButton | Select)
  - Buscar Autores Muertos              (RadioButton | Select)
  - Buscar Autores por Pais


  >> nombre: jos  &&  pais: Mex

*/
