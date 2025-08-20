# MongoDB 设置说明

## 概述
本项目已更新为使用MongoDB作为数据库，而不是本地JSON文件。

## 设置步骤

### 1. 安装MongoDB
如果您还没有安装MongoDB，请按照以下步骤安装：

#### 本地安装
- **macOS**: 使用Homebrew安装
  ```bash
  brew tap mongodb/brew
  brew install mongodb-community
  brew services start mongodb/brew/mongodb-community
  ```

- **Windows**: 从[MongoDB官网](https://www.mongodb.com/try/download/community)下载安装包

- **Linux**: 使用包管理器安装
  ```bash
  sudo apt-get install mongodb
  sudo systemctl start mongodb
  ```

#### 使用MongoDB Atlas（云服务）
1. 访问 [MongoDB Atlas](https://www.mongodb.com/atlas)
2. 创建免费账户和集群
3. 获取连接字符串

### 2. 配置连接
编辑 `config.js` 文件：

```javascript
export const config = {
  // 本地MongoDB连接
  MONGODB_URI: 'mongodb://localhost:27017',
  DB_NAME: 'kambaz-db',
  
  // 或者使用MongoDB Atlas
  // MONGODB_URI: 'mongodb+srv://username:password@cluster.mongodb.net',
  // DB_NAME: 'kambaz-db',
};
```

### 3. 导入数据
您需要将现有的JSON数据导入到MongoDB中。可以使用以下方法：

#### 方法1: 使用MongoDB Compass（图形界面）
1. 下载并安装 [MongoDB Compass](https://www.mongodb.com/try/download/compass)
2. 连接到您的MongoDB实例
3. 创建数据库 `kambaz-db`
4. 创建以下集合：
   - `users`
   - `courses`
   - `modules`
   - `assignments`
   - `enrollments`
5. 将JSON文件中的数据导入到相应的集合中

#### 方法2: 使用命令行
```bash
# 导入用户数据
mongoimport --db kambaz-db --collection users --file src/Kambaz/Database/users.json --jsonArray

# 导入课程数据
mongoimport --db kambaz-db --collection courses --file src/Kambaz/Database/courses.json --jsonArray

# 导入模块数据
mongoimport --db kambaz-db --collection modules --file src/Kambaz/Database/modules.json --jsonArray

# 导入作业数据
mongoimport --db kambaz-db --collection assignments --file src/Kambaz/Database/assignments.json --jsonArray

# 导入注册数据
mongoimport --db kambaz-db --collection enrollments --file src/Kambaz/Database/enrollments.json --jsonArray
```

### 4. 启动服务器
```bash
npm run server
```

## 数据结构
确保您的MongoDB集合包含以下字段：

### users 集合
```javascript
{
  "_id": "string",
  "username": "string",
  "password": "string",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "role": "ADMIN|FACULTY|TA|STUDENT",
  "loginId": "string",
  "section": "string",
  "lastActivity": "string",
  "totalActivity": "string"
}
```

### modules 集合
```javascript
{
  "_id": "string",
  "name": "string",
  "description": "string",
  "course": "string",
  "lessons": [
    {
      "_id": "string",
      "name": "string",
      "description": "string",
      "module": "string"
    }
  ]
}
```

## 故障排除

### 连接错误
- 确保MongoDB服务正在运行
- 检查连接字符串是否正确
- 如果使用Atlas，确保IP地址已添加到白名单

### 数据不显示
- 检查集合名称是否正确
- 确保数据已正确导入
- 查看服务器控制台的错误信息

## 支持
如果您遇到问题，请检查：
1. MongoDB服务状态
2. 连接配置
3. 数据格式
4. 服务器日志

