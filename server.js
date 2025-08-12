import express from 'express';
import cors from 'cors';
import session from 'express-session';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 4000;

// 中间件
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

// 读取用户数据
const usersData = JSON.parse(readFileSync(join(__dirname, 'src/Kambaz/Database/users.json'), 'utf8'));
console.log('Loaded users data:', usersData.length, 'users');
console.log('First user:', usersData[0]?.username);

// 用户登录API
app.post('/api/users/signin', (req, res) => {
  const { username, password } = req.body;
  
  console.log('Login attempt:', { username, password });
  
  // 查找用户
  const user = usersData.find(u => u.username === username && u.password === password);
  
  if (user) {
    // 登录成功
    req.session.user = user;
    console.log('Login successful for user:', username);
    res.json(user);
  } else {
    // 登录失败
    console.log('Login failed for user:', username);
    res.status(401).json({ message: 'Unable to login. Try again later.' });
  }
});

// 用户注册API
app.post('/api/users/signup', (req, res) => {
  const newUser = req.body;
  newUser._id = Date.now().toString();
  usersData.push(newUser);
  req.session.user = newUser;
  res.json(newUser);
});

// 创建新用户API
app.post('/api/users', (req, res) => {
  const newUser = req.body;
  newUser._id = Date.now().toString();
  newUser.loginId = `00${Date.now()}S`;
  newUser.lastActivity = new Date().toISOString().split('T')[0];
  newUser.totalActivity = "00:00:00";
  usersData.push(newUser);
  console.log('New user created:', newUser.username);
  res.json(newUser);
});

// 获取当前用户信息
app.post('/api/users/profile', (req, res) => {
  if (req.session.user) {
    res.json(req.session.user);
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

// 用户登出API
app.post('/api/users/signout', (req, res) => {
  req.session.destroy();
  res.json({ message: 'Logged out successfully' });
});

// 获取所有用户
app.get('/api/users', (req, res) => {
  const { role, name } = req.query;
  
  let filteredUsers = usersData;
  
  if (role) {
    // 按角色过滤用户
    filteredUsers = filteredUsers.filter(user => user.role === role);
  }
  
  if (name) {
    // 按名字搜索用户（搜索firstName和lastName）
    const searchName = name.toLowerCase();
    filteredUsers = filteredUsers.filter(user => 
      user.firstName?.toLowerCase().includes(searchName) ||
      user.lastName?.toLowerCase().includes(searchName) ||
      user.username?.toLowerCase().includes(searchName)
    );
  }
  
  res.json(filteredUsers);
});

// 获取单个用户
app.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  
  const user = usersData.find(u => u._id === id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// 更新用户信息
app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  
  const userIndex = usersData.findIndex(u => u._id === id);
  if (userIndex !== -1) {
    usersData[userIndex] = { ...usersData[userIndex], ...updates };
    res.json(usersData[userIndex]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// 获取用户课程
app.get('/api/users/current/courses', (req, res) => {
  // 这里可以返回用户的课程数据
  res.json([]);
});

// 获取课程模块
app.get('/api/courses/:courseId/modules', (req, res) => {
  // 这里可以返回课程的模块数据
  res.json([]);
});

// 创建课程模块
app.post('/api/courses/:courseId/modules', (req, res) => {
  const module = req.body;
  res.json(module);
});

// 创建课程
app.post('/api/courses', (req, res) => {
  const course = req.body;
  res.json(course);
});

// 更新课程
app.put('/api/courses/:courseId', (req, res) => {
  const updates = req.body;
  res.json(updates);
});

// 删除课程
app.delete('/api/courses/:courseId', (req, res) => {
  res.json({ message: 'Course deleted' });
});

// 删除用户
app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  
  const userIndex = usersData.findIndex(u => u._id === id);
  if (userIndex !== -1) {
    const deletedUser = usersData.splice(userIndex, 1)[0];
    console.log('User deleted:', deletedUser.username);
    res.json({ message: 'User deleted successfully', deletedUser });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('Available users for testing:');
  usersData.forEach(user => {
    console.log(`- ${user.username} / ${user.password} (${user.role})`);
  });
});
