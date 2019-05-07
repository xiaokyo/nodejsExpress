const config = {
  app: {
    name: '小K商店',
    host: 'http://www.xiaok.com',
  },
  secret: 'lsdjflsdkjfkdlsfjkdlsfjdfsf',
  mongodb: {
    url: 'mongodb://localhost:27017/xiakshop',
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
    },
  },
  redis:{
    
  }
};

module.exports = config;
