var {User} = require ('../../../database/models');

const users = async (parent, args, context, info) => {
  const {username} = args;
  // console.log (username);
  if (username) {
    return await User.find ({
      username: new RegExp (username, 'i'),
    });
  }

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
  // console.log (JSON.stringify (context));
  if (!context.id) {
    return {
      msg: '请先登入管理员账户',
      success: false,
    };
  }

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
