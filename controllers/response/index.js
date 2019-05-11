module.exports = {
  Success: function (data = {}) {
    var _json = {
      code: 0,
      msg: 'success',
      data: data,
    };
    return JSON.stringify (_json);
  },
  Error: function (msg = 'error') {
    var _json = {
      code: 1,
      msg: msg,
      data: {},
    };
    return JSON.stringify (_json);
  },
};
