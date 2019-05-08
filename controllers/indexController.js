const {User} = require ('../database/models');
const response = require ('./response');
const {secret} = require ('../config');
const jwt = require ('jsonwebtoken');
const {redisClient} = require ('../database/redis');

require ('../database/redis');

module.exports = {
  register: async function (req, res) {
    // register user
    try {
      const user = await User.create ({
        username: req.body.username,
        password: req.body.password,
      });
      res.json (response.Success (user));
    } catch (error) {
      res.json (response.Error (error.errmsg));
    }
  },
  login: async function (req, res) {
    // login user
    const user = await User.findOne ({
      username: req.body.username,
    });

    if (!user) {
      return res.status (422).json (response.Error ('用户不存在'));
    }

    const isPasswordValid = require ('bcrypt').compareSync (
      req.body.password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status (422).json (response.Error ('密码不匹配'));
    }

    const token = jwt.sign (
      {
        id: String (user._id),
      },
      secret
    );

    redisClient.set (token, String (user._id));
    redisClient.expire (token, 60);

    res.json (
      response.Success ({
        // user: user,
        token: token,
      })
    );
  },

  redis: function (req, res) {
    res.send ('redis');
  },
};
