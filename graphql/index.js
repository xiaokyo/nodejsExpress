const {ApolloServer} = require ('apollo-server-express');
const {typeDefs, resolvers} = require ('./models');

const {redisClient, getRedisValue} = require ('../database/redis');

const {secret} = require ('../config');
const jwt = require ('jsonwebtoken');

const server = new ApolloServer ({
  typeDefs,
  resolvers,
  context: async ({req}) => {
    // get the user token from the headers
    const token = String (req.headers.authorization).split (' ').pop () || '';
    // try to retrieve a user with the token

    let _id = '';
    if (token) {
      const _promise = getRedisValue (token);
      await _promise.then (res => {
        if (res) {
          const {id} = jwt.verify (token, secret);
          _id = id;
        }
      });
    }
    
    return {id: _id};
  },
});

var setGraphqlServer = app => {
  server.applyMiddleware ({app});
};

module.exports = setGraphqlServer;
