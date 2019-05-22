var {User} = require ('../../../database/models');

const users = async () => {
  var users = await User.find ();
  return users;
};

const addUser = async (parent, {username, password, phone}, context, info) => {
  // console.log (context);
  await User.create ({
    username: username,
    password: password,
    phone: phone,
  });

  return {
    success: true,
  };
};

const deleteUser = async (parent, {username}, context, info) => {
  console.log (context.id);
  const user = await User.findOne ({
    username: username,
  });

  // console.log(111);
  if (!user) {
    // throw new Error ('not Found');
    return {
      msg: 'not Found',
      success: false,
    };
  }
  // console.log(222);

  await User.deleteOne ({
    username: username,
  });

  return {
    msg: '成功',
    success: true,
  };
};

const query = {users};
const mutation = {addUser, deleteUser};

module.exports = {query, mutation};
