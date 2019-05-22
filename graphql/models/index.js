const {gql} = require ('apollo-server-express');

var user = require ('./users');

const typeDefs = gql`
  #Common
  type Response{
    success:Boolean
    msg:String
  }

  #Schema
  ${user.typedefs.Schema}


  #Query
  ${user.typedefs.Query}

  #Mutation
  ${user.typedefs.Mutation}
`;

const resolvers = {
  Query: {
    ...user.resolvers.query,
  },
  Mutation: {
    ...user.resolvers.mutation,
  },
};

module.exports = {typeDefs, resolvers};
