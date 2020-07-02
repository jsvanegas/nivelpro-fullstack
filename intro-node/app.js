// import React from 'react';  --->  ES6 :: Transpiladores
const yargs = require('yargs');
const fs = require('fs');

// acceder a un archivo en el mismo path
const fileManager = require('./file-manager');

console.log('Starting');

yargs.command(
    {
        command: 'add-author',
        describe: 'Add a new Author',
        builder: {
            name: {
                describe: 'Author\'s Name',
                type: 'string',
                demandOption: true // Obligatorio
            }
        },
        handler: function(argv) {
            fileManager.addAuthor(argv.name);
        }
    }
);

yargs.command(
    {
        command: 'add-book',
        describe: 'Add a new Book of a given Author',
        builder: {
            author: {
                describe: 'Author Position',
                type: 'int',
                demandOption: true
            },
            title: {
                describe: 'Title',
                type: 'string',
                demandOption: true
            }
        },
        handler: function(argv) {
            fileManager.addBook(argv.author, argv.title);
        }
    }
);

yargs.command(
    {
        command: 'list-books',
        describe: 'Displays the list of a given author',
        builder: {
            author: {
                describe: 'Author Position',
                type: 'int',
                demandOption: true
            }
        },
        handler: function(argv) {
            fileManager.listBooks(argv.author);
        }
    }
);

yargs.command(
    {
        command: 'remove-book',
        describe: 'Remove a Book of a given Author',
        builder: {
            author: {
                describe: 'Author Position',
                type: 'int',
                demandOption: true
            },
            book: {
                describe: 'Book Position',
                type: 'int',
                demandOption: true
            },
        },
        handler: function(argv) {
            fileManager.removeBook(argv.author, argv.title);
        }
    }
);

// Leer los parametros que vienen de la consola
yargs.parse();
console.log('Closing');



/**
 * Tasks:
 * 
 * Agregar Autores / OK
 * Agregar Libros por Autor / OK
 * Consultar Libros por Autor / OK
 * Borrar un libro de un autor
 * 
 * **********************
 * 
 * Cómo gestionar los datos sin son un JSON?
 * Cómo acceder al archivo, cómo leerlo?
 * Cómo borrar un libro de un autor?
 * Cómo insertar un libro de un autor?
 * 
 * 
 */