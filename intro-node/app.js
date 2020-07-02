// import React from 'react';  --->  ES6 :: Transpiladores
const yargs = require('yargs');
const fs = require('fs');

console.log('Iniciando');


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
);



console.log(yargs.argv);

// fs.writeFileSync(process.argv[2], process.argv[3]);

console.log('Log Despues de writeFile');