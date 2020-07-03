const fs = require('fs');

const path = 'library.txt';

function addAuthor(name) {
    let lib = readFile();
    lib.push({
        author: name
    });
    fs.writeFileSync(path, JSON.stringify(lib));
    console.log('AUTHOR ADDED ', name);
}

function addBook(authorIndex, bookName) {
    let lib = readFile();
    let author = lib[authorIndex];
    if (!Array.isArray(author.books)) {
        author.books = [];
    }
    const newBook = { id: author.books.length + 1, title: bookName };
    author.books.push(newBook);
    fs.writeFileSync(path, JSON.stringify(lib));
    return newBook;
}

function listBooks(authorIndex) {
    const lib = readFile();
    const author = lib[authorIndex];
    // console.log(`************\n\tBooks from ${author.author}\n`)
    // if (!Array.isArray(author.books)) {
    //     console.log('\t0 Books');
    //     return;
    // }
    // author.books.forEach((book, index) => {
    //     console.log(`\t${index + 1}. ${book.title}`);
    // });
    // API
    return (author && author.books) ? author.books : [];
}

function removeBook(authorIndex, bookIndex) {
    let list = readFile();
    let author = list[authorIndex];

    if (!Array.isArray(author.books)) {
        console.log('There are no books for this author');
        return;
    }

    if (!author.books[bookIndex]) {
        console.log('There was an error with the book index');
        return;
    }

    const removedBook = author.books.splice(bookIndex, 1);
    fs.writeFileSync(path, JSON.stringify(list));
    console.log(`The Book No. ${removedBook[0].id} - ${removedBook[0].title} was removed`);
}


function readFile() {
    const data = fs.readFileSync(path);
    console.log('Reading file...');
    return JSON.parse(data.toString());
}

// Private method
function checkFile(name) {

}

module.exports = {
    addAuthor,
    readFile,
    addBook,
    listBooks,
    removeBook
};



// const fileManager = {
//     addFile: (name, body) => {
//         fs.writeFile(name, body);
//         console.log('HANDLER ', argv);
//     },
//     readFile: () => {

//     }
// }

// module.exports = fileManager;
// ES6 :: export.default = fileManager