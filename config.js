// MongoDB配置
export const config = {
  // 本地MongoDB连接
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017',
  DB_NAME: process.env.DB_NAME || 'kambaz-db',
  
  // 如果您使用的是MongoDB Atlas，请修改MONGODB_URI为：
  // MONGODB_URI: 'mongodb+srv://username:password@cluster.mongodb.net'
};

export default config;

