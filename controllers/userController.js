const {User} = require ('../database/models');
const response = require ('./response');


module.exports = {
  getUserInfo: async function (req, res) {
    console.log (req.user);
    if (!req.user) {
      return res.send ('error');
    }
    res.json (response.Success (req.user));
  },
  userlist: async function (req, res) {
    // user list
    const user = await User.find ();
    res.json (response.Success (user));
  },
};
