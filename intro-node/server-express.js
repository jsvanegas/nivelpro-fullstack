const express = require('express');
const exphbs = require('express-handlebars');

const fileManager = require('./file-manager');

const app = express();

app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: null }));
app.set('view engine', 'hbs');



app.get('/author-books/:author', (req, res) => {
    const books = fileManager.listBooks(req.params.author);
    res.status(200)
        .render('books', { books: books })
});


app.get('/books', (req, res) => {
    const author = req.query.author;
    res.status(200)
        .send(fileManager.listBooks(author));
});

app.get('/books/:author', (req, res) => {
    const author = req.params.author;
    res.status(200)
        .send(fileManager.listBooks(author));
});

app.get('/add-books', (req, res) => {
    const { author, title } = req.query;
    res.status(200)
        .send(fileManager.addBook(author, title));
});


app.listen(9090, () => {
    console.log('Server is running on port 9090');
});