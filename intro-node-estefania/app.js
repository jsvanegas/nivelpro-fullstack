// import React from 'react';   ---> ES6 :: Transpiladores
const yargs = require('yargs');
const fs = require('fs');


console.log('Iniciando');

// fs.writeFile('test.txt', 'Text de Prueba', () => {
//     console.log('Archivo terminado');
// });

yargs.command(
    {
        command: 'add',
        describe: 'Add a new file in the FS',
        builder: {
            name: {
                describe: 'File name',
                type: 'string',
                demandOption: true // Obligatorio
            },
            body: {
                describe: 'The content of the file',
                type: 'string',
                demandOption: true // Obligatorio
            }
        },
        handler: function(argv) {
            fs.writeFileSync(argv.name, argv.body);
            console.log('HANDLER ', argv);
        }
    }
)

console.log(yargs.argv);
// Ejecutar para utilizar yargs:  node app.js  add --name=lista.txt --body="Item 1"




// Funcion sincrona, detine la ejecución del resto
// fs.writeFileSync(process.argv[2], process.argv[3]);
 // Ejecutar node app.js nuevo.txt contenido_nuevo

 console.log('Log despues de writeFile');





