var express = require ('express');
var router = express.Router ();
var response = require ('../controllers/response');
var {User} = require ('../database/models');
var {getUserInfo, userlist} = require ('../controllers/userController');

const {secret} = require ('../config');
const jwt = require ('jsonwebtoken');

const auth = async function (req, res, next) {
  try {
    const token = String (req.headers.authorization).split (' ').pop ();
    const {id} = jwt.verify (token, secret);
    req.user = await User.findById (id);
    next ();
  } catch (error) {
    res.status (422).send (response.Error ('token已失效,请重新登入'));
  }
};

router.use (auth);

/* GET users listing. */
router.get ('/', getUserInfo);
router.get ('/userlist', userlist);

module.exports = router;
