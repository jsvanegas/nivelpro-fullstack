const http = require('http');

const fileManager = require('./file-manager');

function parseParams(url, props){
    const params = url.split('?')[1].split('&');

    let parsedParams = {};

    props.forEach(prop => {
        const paramIndex = params.findIndex( p => p.indexOf(prop) > -1);
        if(paramIndex !== -1){
            parseParams[prop] = params[paramIndex].split('=')[1].replace(/%20/g, ' ');
        }
    });

    return parseParams;


    // const authorParam = params[1];
    // const authorIndex = authorParam.substring(authorParam.indexOf('=')+1, authorParam.length);
    // return authorIndex;
}

const server = http.createServer( (request, response) => {
    const url = request.url;
    console.log('URL: ', url);

    if(url.startsWith('/books')){
        // /books?author=1
        const params = parseParams(url, ['author']);
        const books = fileManager.listBooks(params.author);
        response.write(JSON.stringify(books));
        response.end();
        return;
    }

    if(url.startsWith('/add-books')){
        // /add-books?author=1&title=Las%20cenizas%20de%20Angela
        const params = parseParams(url, ['author', 'title']);
        const book = fileManager.addBook(params.author, params.title);
        response.write(JSON.stringify(book));
        response.end();
        return;
    }

    response.write(url);
    response.end();
});

server.listen(9090);
console.log('Server is running on port 9090');