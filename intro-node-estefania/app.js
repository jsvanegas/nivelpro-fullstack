// import React from 'react';   ---> ES6 :: Transpiladores
const yargs = require('yargs');
const fs = require('fs');

// Acceder a un archivo en el mismo path
const fileManager = require('./file-manager');


console.log('Starting');

// fs.writeFile('test.txt', 'Text de Prueba', () => {
//     console.log('Archivo terminado');
// });


yargs.command(
        {
            command: 'add-author',
            describe: 'Add a new Author',
            builder: {
                name: {
                    describe: 'Author\'s name',
                    type: 'string',
                    demandOption: true // Obligatorio
                }
            },
            handler: function(argv) {
                fileManager.addAuthor(argv.name)
            }
        }
    )


    yargs.command(
        {
            command: 'add-book',
            describe: 'Add a new Book',
            builder: {
                author: {
                    describe: 'Author\'s position',
                    type: 'int',
                    demandOption: true // Obligatorio
                },
                title: {
                    describe: 'Title',
                    type: 'string',
                    demandOption: true // Obligatorio
                }
            },
            handler: function(argv) {
                fileManager.addBook(argv.author, argv.title)
            }
        }
    )

    yargs.command(
        {
            command: 'list-books',
            describe: 'Displays the list of a given author',
            builder: {
                author: {
                    describe: 'Author\'s position',
                    type: 'int',
                    demandOption: true // Obligatorio
                }
            },
            handler: function(argv) {
                fileManager.listBooks(argv.author)
            }
        }
    )

    yargs.command(
        {
            command: 'remove-book',
            describe: 'Remove a new Book',
            builder: {
                author: {
                    describe: 'Author\'s position',
                    type: 'int',
                    demandOption: true // Obligatorio
                },
                book: {
                    describe: 'Book',
                    type: 'int',
                    demandOption: true // Obligatorio
                }
            },
            handler: function(argv) {
                fileManager.removeBook(argv.author, argv.book)
            }
        }
    )






// yargs.command(
//     {
//         command: 'add',
//         describe: 'Add a new file in the FS',
//         builder: {
//             name: {
//                 describe: 'File name',
//                 type: 'string',
//                 demandOption: true // Obligatorio
//             },
//             body: {
//                 describe: 'The content of the file',
//                 type: 'string',
//                 demandOption: true // Obligatorio
//             }
//         },
//         handler: function(argv) {
//             fileManager.addFile(argv.name, argv.body)
//         }
//     }
// )

// Se utiliza para leer los parametros que se envian por consola
yargs.parse();

//console.log(yargs.argv);
// Ejecutar para utilizar yargs:  node app.js  add --name=lista.txt --body="Item 1"




// Funcion sincrona, detine la ejecución del resto
// fs.writeFileSync(process.argv[2], process.argv[3]);
 // Ejecutar node app.js nuevo.txt contenido_nuevo

 console.log('Closing');




 /*

Tarea:

OK => Agregar Autores
OK => Agregar Libros por Autor
OK => Consultar Libros por Autor
OK => Borrar un libro de un autor

------------------------------------------------

Como gestionar los datos si son JSON?
Como acceder al archivo, como leerlo?
Como borrar un libro de un autor especifico?
Como insertar un libro de un autor?



 */





