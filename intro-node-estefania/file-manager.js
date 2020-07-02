const fs = require('fs');
const { Console } = require('console');

const path = 'library.txt';

function addAuthor(name){
    let lib = readFile();
    lib.push(
        {
            author: name
        }
    );

    fs.writeFileSync(path,JSON.stringify(lib));
    console.log('AUTHOR ADDED ', name);
}

function readFile(){
    const data = fs.readFileSync(path);
    console.log('read File ... ');
    return JSON.parse(data.toString());
}



function addBook(authorIndex, bookName){
    let lib = readFile();
    let author = lib[authorIndex];

    if(!Array.isArray(author.books)){
        author.books = [];
    }

    //author = {author.author, author.books.push({id: 1, title: bookName})};
    author.books.push({id: author.books.length+1, title: bookName});
    fs.writeFileSync(path,JSON.stringify(lib));

    //console.log(JSON.stringify(lib));
    console.log('Added book ' , bookName);
}


function listBooks(authorIndex){
    const lib = readFile();
    const author = lib[authorIndex];
    if(!Array.isArray(author.books)){
       console.log('El author ', author.author, ' have 0 Books');
    }else{
        console.log('******************\n\t Book\'s ', author.author, ': \n');
        for(let i = 0; i<author.books.length; i++){
            console.log(`\t ${i+1} - ${author.books[i].title}`);
        }
       
    } 

}

function removeBook(authorIndex, bookIndex){
    let lib = readFile();
    let author = lib[authorIndex];

    if(!Array.isArray(author.books)){
        console.log('El author no tiene libros');
    }else if(!author.books[bookIndex]){
        console.log('No existe el libro');    
    }else {
        console.log('Removed book ', author.books[bookIndex].title);
        author.books.splice(bookIndex, 1);
        fs.writeFileSync(path,JSON.stringify(lib));
    }

}






/* const fileManager = {
    addFile: () => {
        fs.writeFileSync(name, body);
        //console.log('HANDLER ', name, ' ', body);
    },
    readFile: () => {

    }
}

module.exports = fileManager; */
//ES6 :: export.default = fileManager


// OTRA FORMA DE REALIZARLO

function addFile(name, body){
    fs.writeFileSync(name, body);
    console.log('HANDLER ', name);
}



module.exports = {
    addAuthor,
    addBook,
    listBooks,
    removeBook
}






