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
    author.books.push({id: author.books.length+1, title: bookName});
    fs.writeFileSync(path, JSON.stringify(lib));
}

function listBooks(authorIndex) {
    const lib = readFile();
    const author = lib[authorIndex];
    console.log(`************\n\tBooks from ${author.author}\n`)
    if (!Array.isArray(author.books)) {
        console.log('\t0 Books');
        return;
    }
    author.books.forEach( (book, index) => {
        console.log(`\t${index + 1}. ${book.title}`);
    });
}

function removeBook(authorIndex, bookIndex) {
    let list = readFile();
    // Ejercicio :D 

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
    listBooks
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