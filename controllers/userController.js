const {User} = require ('../database/models');
const response = require ('./response');

const {secret} = require ('../config');
const jwt = require ('jsonwebtoken');
const {redisClient} = require ('../database/redis');

module.exports = {
  validateToken: function (req, res) {
    res.json (response.Success ());
  },
  logout: async function (req, res) {
    const flag = redisClient.expire (req.accessToken, 0); //token 过期时间
    if (flag) {
      res.json (response.Success ({}));
    } else {
      res.json (response.Error ({}));
    }
  },
  getUserInfo: async function (req, res) {
    const user = await User.findById (req.id);
    res.json (response.Success (user));
  },
  userlist: async function (req, res) {
    // user list
    // console.log (req.params.limit);
    let _limit = parseInt (req.params.limit);
    let _skipCount = parseInt (req.params.skipCount);
    const user = await User.find ().limit (_limit).skip (_skipCount);
    res.json (response.Success (user));
  },
  updateUserInfo: async function (req, res, next) {
    const user = await User.findOne ({
      username: req.body.username,
    });

    // console.log (user);
    if (user) {
      if (user._id == req.id) return next (new Error ('无法使用相同的用户名'));
      return next (new Error ('该用户名已存在'));
    }
    await User.updateOne (
      {_id: req.id},
      {
        username: req.body.username,
        phone: req.body.phone,
        gender: 'f',
        attrUrl: req.body.attrUrl,
      },
      {
        upsert: true,
      }
    );

    const user1 = await User.findById (req.id);
    res.json (response.Success ());
  },
};
