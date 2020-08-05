const graphql = require('graphql');
const axios = require('axios');

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;


const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    country: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
          .then(res => res.data);
      }
    },
    friends: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        const friendsIds = parentValue.friends;
        if (!Array.isArray(friendsIds) || friendsIds.length === 0) {
          return;
        }

        const paths = friendsIds.map(id => axios.get(`http://localhost:3000/users/${id}`));
        return axios.all(paths).then(responses => {
          return responses.map(res => res.data)
        });
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

const Mutations = new GraphQLObjectType({
  name: 'Mutations',
  fields: {
    addUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLInt }
      },
      resolve(parentValue, args) {
        const { name, email, age } = args;
        return axios.post(`http://localhost:3000/users`, { name, email, age })
          .then(res => res.data);
      }
    },
    deleteUser: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(GraphQLString) } },
      resolve(parentValue, args) {
        return axios.delete(`http://localhost:3000/users/${args.id}`)
          .then(res => res.data);
      }
    },
    editUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLInt },
        email: { type: GraphQLString }
        // Tarea: Editar Amigos
      },
      resolve(parentValue, args) {
        // usamos patch en lugar de put, porque se hace una actualización parcial de datos
        // PUT: Actualiza TODA la entidad
        return axios.patch(`http://localhost:3000/users/${args.id}`, { age: args.age, email: args.email })
          .then(res => res.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations
});