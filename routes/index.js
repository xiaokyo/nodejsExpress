var express = require ('express');
var router = express.Router ();
var {userlist, login, register,redis} = require ('../controllers/indexController');

/* GET home page. */
// router.get ('/', userlist);

router.post ('/login', login);
router.post ('/register', register);

router.get ('/redis', redis);

module.exports = router;
