const mongoose = require ('mongoose');
const userSchema = new mongoose.Schema ({
  username: {type: String, unique: true},
  password: {
    type: String,
    set (val) {
      return require ('bcrypt').hashSync (val, 10);
    },
  },
});
const User = mongoose.model ('User', userSchema);

module.exports = User;
