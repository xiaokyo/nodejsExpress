var express = require ('express');
var router = express.Router ();
var response = require ('../controllers/response');
var {User} = require ('../database/models');
var {getUserInfo, userlist} = require ('../controllers/userController');
const {redisClient} = require ('../database/redis');

const {secret} = require ('../config');
const jwt = require ('jsonwebtoken');

const auth = async function (req, res, next) {
  try {
    const token = String (req.headers.authorization).split (' ').pop ();

    redisClient.get (token, function (err, val) {
      console.log (val);
      if (val == null) {
        next (new Error ('token已过期'));
      }
    });

    const {id} = jwt.verify (token, secret);
    req.user = await User.findById (id);
    next ();
  } catch (error) {
    res.status (422).json (response.Error (error));
  }
};

router.use (auth);

/* GET users listing. */
router.get ('/', getUserInfo);
router.get ('/userlist', userlist);

module.exports = router;
