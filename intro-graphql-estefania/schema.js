const graphql = require('graphql');
const axios = require('axios');

const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList } = graphql;

const users = [
    {id: '1', name:  'Juan', email: 'juan@gmail.com'},
    {id: '2', name:  'Stefanny', email: 'juan@gmail.com'},
    {id: '3', name:  'Jeison', email: 'juan@gmail.com'},
    {id: '4', name:  'Eliana', email: 'juan@gmail.com'},
    {id: '5', name:  'Estefania', email: 'juan@gmail.com'}
];

const companyType = new GraphQLObjectType({
    name:"company",
    fields: () => {
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        users: {
            type: new GraphQLList(UserType),
            resolve(parentValue, args){
                return axios.get(`http://localhost:3000/companies/${parentValue.id}/users`)
                .then(res => res.data)
            }
        }
    }
});

const UserType = new GraphQLObjectType({
    name: 'user',
    fields: () => {
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        company: {
            type: companyType,
            resolve(parentValue, args){
                return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
                .then(res => res.data)
            }
        }
    }
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: { // Puntos de partida para consultas
        user: { // En GraphQL puedo consultar por usuario query {user { ... } }
            type: UserType,
            args: { id: {type: GraphQLString}},
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/user/${args.id}`)
                .then(res => res.data)
            }
        },
        companies: {
            type: new GraphQLList(companyType),
            resolve(){
                return axios.get(`http://localhost:3000/companies`)
                .then(res => res.data)
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});