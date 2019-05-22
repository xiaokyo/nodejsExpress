const {ApolloServer} = require ('apollo-server-express');
const {typeDefs, resolvers} = require ('./models');

const {redisClient} = require ('../database/redis');

const {secret} = require ('../config');
const jwt = require ('jsonwebtoken');

const server = new ApolloServer ({
  typeDefs,
  resolvers,
  context: ({req}) => {
    // get the user token from the headers
    const token = String (req.headers.authorization).split (' ').pop () || '';
    // try to retrieve a user with the token

    let _id = '';
    if (token) {
      redisClient.get (token, function (err, val) {
        if (val) {
          const {id} = jwt.verify (token, secret);
          console.log (id);
          _id = id;
          // return {id};
        }
      });
    }

    console.log ('_id:' + _id);

    // add the user to the context
    return {id: _id};
  },
});

var setGraphqlServer = app => {
  server.applyMiddleware ({app});
};

module.exports = setGraphqlServer;
