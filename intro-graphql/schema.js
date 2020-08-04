const graphql = require('graphql');
const axios = require('axios');

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = graphql;



const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    country: { type: GraphQLString },
    company: {
      type: CompanyType,
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
          .then(res => res.data);
      }
    }
  })
});

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/companies/${parentValue.id}/users`)
          .then(res => res.data);
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {  // Puntos de partida para consultas
    user: {  // En GraphQL Puedo consultar por usuario query { user { ... } }
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/users/${args.id}`)
          .then(res => res.data);
      }
    },
    companies: {
      type: new GraphQLList(CompanyType),
      resolve() {
        return axios.get(`http://localhost:3000/companies`)
          .then(res => res.data);
      }
    }
  }
});


module.exports = new GraphQLSchema({
  query: RootQuery
});