const {User} = require ('../database/models');
const response = require ('./response');
const {secret} = require ('../config');
const jwt = require ('jsonwebtoken');

module.exports = {
  register: async function (req, res) {
    // register user
    try {
      const user = await User.create ({
        username: req.body.username,
        password: req.body.password,
      });
      res.send (response.Success (user));
    } catch (error) {
      res.send (response.Error (error));
    }
  },
  login: async function (req, res) {
    // login user
    const user = await User.findOne ({
      username: req.body.username,
    });

    if (!user) {
      res.status (422).send (response.Error ('用户不存在'));
    }

    const isPasswordValid = require ('bcrypt').compareSync (
      req.body.password,
      user.password
    );

    if (!isPasswordValid) {
      res.status (422).send (response.Error ('密码不匹配'));
    }

    const token = jwt.sign (
      {
        id: String (user._id),
      },
      secret
    );
    res.send (
      response.Success ({
        // user: user,
        token: token,
      })
    );
  },
};
