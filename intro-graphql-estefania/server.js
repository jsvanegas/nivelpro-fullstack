const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');
const { SchemaMetaFieldDef } = require('graphql');

const app = express();

app.use('/graphql', graphqlHTTP)({
    graphiql: true,
    schema: Schema
});


