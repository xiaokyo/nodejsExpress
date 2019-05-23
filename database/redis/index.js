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

var getRedisValue = key => {
  return new Promise ((resolve, reject) => {
    redisClient.get (key, function (err, val) {
      if (err) {
        // return throw new Error ('redis error');
        reject (err);
      }

      if (val) {
        // return val;
        resolve (val);
      } else {
        resolve (val);
      }
    });
  });
};

module.exports = {redisClient, getRedisValue};
