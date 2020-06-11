< !DOCTYPE html>
    <html>

    <head>
        <title> </title>
    </head>

    <body>
        <h1>

        </h1>

        <script type="text/javascript">
            // JS No es fuertemente tipado, tipos dinamicos
            var x = 1; // int
            var y = 'hola'; // string -- 'abc' = "abc" = ´abc´
            var z = true; // bool
            var a = 5.6; // float
            var arr = []; // Array
            var obj = {}; // Object
            /*
            if (1 == '1' && 'a' !== 'b' || true && !true) {
                        // ...
                    } else if () {
                        // ...
                    } else {
                        // ...
                    }

            // Condiciones:
            var resultado = 0;
            if (cantidad > 0) {
                        resultado = cantidad * precio;
            } else {
                        resultado = cantidadStock * precio;
            }
            // lo anterior es lo mismo que hacer lo siguiente:
            // OPERADOR TERNARIO
            resultado = (cantidad > 0) ? cantidad * precio : cantidadStock * precio;

            // Switch case
            var valor = 'x';
            switch (valor) {
                case 'x':
                    // ...
                    break;
                case 'y':
                    // ...
                    break;
                default:
                    // ...
                    break;
            }

            // Ciclos
            for (var i = 0; i < 10; i++) {

                    }

            while (condicion) {

                    }

            // Funciones

            function saludar(quien) {
                        console.log('Hola, ' + quien);
            }

            var saludar = function(quien) {
                        console.log('Hola, ' + quien);
                }
                // no hay ninguna diferencia entre las dos anteriores formas de definir las funciones
                */
            // Funcion de flecha
            var saludar = (quien) => console.log('Hola, ' + quien);
            saludar('Eliana');
            // Objetos
            // JSON: JavaScript Object Notation
            var persona = {
                // llave: valor
                nombre: 'Eliana',
                apellido: 'Torres',
                empresa: 'Cadena',
                intereses: ['estudiar', 'leer mucho', 'estudiar más'],
                madre: {
                    nombre: 'Maria',
                    apellido: 'Gomez'
                },
                estudios: [{
                        area: {
                            nombre: 'basico',
                            nivel: 'bachiller academico'
                        },
                        institucion: 'Colegio',
                        graduacion: 2008
                    },
                    {
                        nivel: 'Universitario',
                        institucion: 'Universidad',
                        graduacion: 2013
                    }
                ]
            };
            // Acceder a las propiedades de un JSON
            persona.estudios[1].institucion
            persona['estudios'][1]['institucion']
            // Agregar un valor en el JSON
            persona.estudios.push({
                nivel: 'maestria',
                institucion: 'UNAD',
                graduacion: 2015
            })
            persona.estudios[4] = {
                nivel: 'maestria',
                institucion: 'UNAD',
                graduacion: 2015
            }
            // Recorrer los estudios para mostrar los niveles
            persona.estudios.foreach(estudio => console.log(estudio.nivel))
            // Recorrer los estudios, validar si el estudio existe y si es así entonces muestra en consola el area.nivel
            persona.estudios.foreach(estudio => estudio && console.log(estudio.area.nivel))
            //STRING TEMPLATE
            persona.estudios.foreach(estudio => estudio && console.log(´nivel: $ {
                estudio.area.nivel
            }´))
            // NaN
            var x = 'abc';
            var y = 2;
            x * y // es NaN - No a Number
            z = x * y;
            isNaN(z); // retorna true
            !isNaN(z); // retorna false
            typeof x // retorna string
            typeof y // retorna Number
            typeof persona // retorna Object
            typeof persona.estudios // retorna object aunque es un arreglo
            Array.isArray(persona.estudios) // retorna true
        </script>
    </body>

    </html>