var express = require ('express');
var router = express.Router ();
var response = require ('../controllers/response');
var {User} = require ('../database/models');

const {redisClient} = require ('../database/redis');

const {secret} = require ('../config');
const jwt = require ('jsonwebtoken');

// 验证token
const auth = async function (req, res, next) {
  const token = String (req.headers.authorization).split (' ').pop ();
  req.accessToken = token;
  redisClient.get (token, function (err, val) {
    if (!val) {
      return next (new Error ('token已过期'));
    }

    const {id} = jwt.verify (token, secret);
    req.id = id;
    next ();
  });
};

router.use (auth);

var {
  getUserInfo,
  userlist,
  updateUserInfo,
  logout,
  validateToken,
} = require ('../controllers/userController');
/* GET users listing. */
router.get ('/', getUserInfo);
router.get ('/validateToken', validateToken);
router.get ('/userlist/:limit/:skipCount', userlist);
router.get ('/logout', logout);
router.post ('/updateUser', updateUserInfo);

module.exports = router;
