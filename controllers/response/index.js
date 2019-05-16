module.exports = {
  Success: function (data = {}, msg = 'success') {
    var _json = {
      code: 0,
      msg: msg,
      data: data,
    };
    // return JSON.stringify (_json);
    return _json;
  },
  Error: function (msg = 'error') {
    var _json = {
      code: 1,
      msg: msg,
      data: {},
    };
    // return JSON.stringify (_json);
    return _json;
  },
};
