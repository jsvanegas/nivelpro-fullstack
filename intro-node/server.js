const http = require('http');

const fileManager = require('./file-manager');

function parseParams(url, props) {
    const params = url.split('?')[1].split('&');
    let parsedParams = {};
    props.forEach(prop => {
        const paramIndex = params.findIndex(p => p.indexOf(prop) > -1);
        if (paramIndex !== -1) {
            parsedParams[prop] = params[paramIndex].split('=')[1].replace(/%20/g, ' ');
        }
    });
    return parsedParams;
}

const server = http.createServer((request, response) => {
    const url = request.url;
    console.log('URL: ', url);

    if (url.startsWith('/books')) {
        // /books?author=1
        const params = parseParams(url, ['author']);
        console.log('Using /books with param ', params.author);
        const books = fileManager.listBooks(params.author);

        response.write(JSON.stringify(books));
        response.end();
        return;
    }

    if (url.startsWith('/add-books')) {
        // /add-books?author=1&title=Las%20cenizas%20de%20angela
        const params = parseParams(url, ['author', 'title']);
        const newBook = fileManager.addBook(params.author, params.title);
        response.write(JSON.stringify(newBook));
        response.end();
        return;
    }

    response.write(request.url);
    response.end();
});

server.listen(9090);
console.log('Server is running on port 9090');