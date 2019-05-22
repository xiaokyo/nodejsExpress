const Schema = `
  type User{
    username:String
    phone:String
    gender:String
  }
`;

const Query = `
  type Query{
    users:[User]
  }
`;

const Mutation = `
  type Mutation{
    addUser(username:String!,password:String!,phone:String!):Response

    deleteUser(username:String!):Response
  }
`;

module.exports = {Schema, Query, Mutation};
