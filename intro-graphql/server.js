const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');

const app = express();

app.use('/graphql', graphqlHTTP({
  graphiql: true, // Exponer la interfaz grafica de GraphiQL
  schema: schema
}));

app.listen(9090, () => {
  console.log('Escuchando en puerto 9090');
});