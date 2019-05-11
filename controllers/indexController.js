const {User} = require ('../database/models');
const response = require ('./response');
const {secret} = require ('../config');
const jwt = require ('jsonwebtoken');
const {redisClient} = require ('../database/redis');

require ('../database/redis');

module.exports = {
  register: async function (req, res, next) {
    // register user
    const isExistUser = await User.findOne ({
      username: req.body.username,
    });

    if (isExistUser) return next (new Error ('用户已存在'));

    const user = await User.create ({
      username: req.body.username,
      password: req.body.password,
    });
    res.json (response.Success ());
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

    redisClient.set (token, String (user._id)); //token和uid存入缓存redis
    redisClient.expire (token, 60 * 60 * 24 * 7); //token 过期时间

    res.json (
      response.Success ({
        token: token,
      })
    );
  },
};
