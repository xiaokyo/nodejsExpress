var redis = require ('redis');
var redisClient = redis.createClient ();

redisClient.on ('error', function (err) {
  console.log ('Error ' + err);
});

// client.set ('string key', 'string val');

// client.get ('string key', function (err, val) {
//   console.log (val);
// });

// // client.quit ();

// client.get ('string key', function (err, val) {
//   console.log (val);
// });

module.exports = {redisClient};
