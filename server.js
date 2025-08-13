import express from 'express';
import cors from 'cors';
import session from 'express-session';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 4000;

// 中间件
app.use(cors({
  origin: [
    'http://localhost:5173', 
    'http://localhost:5174', 
    'http://localhost:3000',
    'https://qiuziwu-a6-kambaz-react-web-app.netlify.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
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

// 读取课程数据
const coursesData = JSON.parse(readFileSync(join(__dirname, 'src/Kambaz/Database/courses.json'), 'utf8'));
console.log('Loaded courses data:', coursesData.length, 'courses');
console.log('First course:', coursesData[0]?.name);

// 读取模块数据
const modulesData = JSON.parse(readFileSync(join(__dirname, 'src/Kambaz/Database/modules.json'), 'utf8'));
console.log('Loaded modules data:', modulesData.length, 'modules');

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

// 获取指定用户的课程
app.get('/api/users/:userId/courses', (req, res) => {
  const { userId } = req.params;
  
  // 查找用户的注册信息
  const userEnrollments = enrollmentsData.filter(e => e.user === userId);
  
  // 根据注册信息获取课程详情
  const userCourses = userEnrollments.map(enrollment => {
    const course = coursesData.find(c => c._id === enrollment.course);
    return course;
  }).filter(course => course); // 过滤掉未找到的课程
  
  console.log(`Fetching courses for user ${userId}:`, userCourses.length, 'courses');
  res.json(userCourses);
});

// 获取所有课程
app.get('/api/courses', (req, res) => {
  res.json(coursesData);
});

// 获取课程模块
app.get('/api/courses/:courseId/modules', (req, res) => {
  const { courseId } = req.params;
  const courseModules = modulesData.filter(module => module.course === courseId);
  console.log(`Fetching modules for course ${courseId}:`, courseModules.length, 'modules');
  res.json(courseModules);
});

// 获取课程用户
app.get('/api/courses/:courseId/users', (req, res) => {
  const { courseId } = req.params;
  
  // 查找课程的注册信息
  const courseEnrollments = enrollmentsData.filter(e => e.course === courseId);
  
  // 根据注册信息获取用户详情
  const courseUsers = courseEnrollments.map(enrollment => {
    const user = usersData.find(u => u._id === enrollment.user);
    return user;
  }).filter(user => user); // 过滤掉未找到的用户
  
  console.log(`Fetching users for course ${courseId}:`, courseUsers.length, 'users');
  res.json(courseUsers);
});

// 获取课程作业
app.get('/api/courses/:courseId/assignments', (req, res) => {
  const { courseId } = req.params;
  const courseAssignments = assignmentsData.filter(assignment => assignment.course === courseId);
  console.log(`Fetching assignments for course ${courseId}:`, courseAssignments.length, 'assignments');
  res.json(courseAssignments);
});

// 创建课程模块
app.post('/api/courses/:courseId/modules', (req, res) => {
  const { courseId } = req.params;
  const module = req.body;
  module._id = `M${Date.now()}`;
  module.course = courseId;
  modulesData.push(module);
  
  // 将更新后的数据写回文件
  writeFileSync(join(__dirname, 'src/Kambaz/Database/modules.json'), JSON.stringify(modulesData, null, 2));
  
  console.log('New module created:', module.name, 'for course:', courseId);
  res.json(module);
});

// 创建课程
app.post('/api/courses', (req, res) => {
  const course = req.body;
  course._id = `RS${Date.now()}`; // 生成唯一ID
  coursesData.push(course);
  
  // 将更新后的数据写回文件
  writeFileSync(join(__dirname, 'src/Kambaz/Database/courses.json'), JSON.stringify(coursesData, null, 2));
  
  console.log('New course created:', course.name);
  res.json(course);
});

// 更新课程
app.put('/api/courses/:courseId', (req, res) => {
  const { courseId } = req.params;
  const updates = req.body;
  
  const courseIndex = coursesData.findIndex(c => c._id === courseId);
  if (courseIndex !== -1) {
    coursesData[courseIndex] = { ...coursesData[courseIndex], ...updates };
    
    // 将更新后的数据写回文件
    writeFileSync(join(__dirname, 'src/Kambaz/Database/courses.json'), JSON.stringify(coursesData, null, 2));
    
    console.log('Course updated:', courseId);
    res.json(coursesData[courseIndex]);
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

// 删除课程
app.delete('/api/courses/:courseId', (req, res) => {
  const { courseId } = req.params;
  
  const courseIndex = coursesData.findIndex(c => c._id === courseId);
  if (courseIndex !== -1) {
    const deletedCourse = coursesData.splice(courseIndex, 1)[0];
    
    // 将更新后的数据写回文件
    writeFileSync(join(__dirname, 'src/Kambaz/Database/courses.json'), JSON.stringify(coursesData, null, 2));
    
    console.log('Course deleted:', deletedCourse.name);
    res.json({ message: 'Course deleted successfully', deletedCourse });
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
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

// 更新模块
app.put('/api/modules/:moduleId', (req, res) => {
  const { moduleId } = req.params;
  const updates = req.body;
  
  const moduleIndex = modulesData.findIndex(m => m._id === moduleId);
  if (moduleIndex !== -1) {
    modulesData[moduleIndex] = { ...modulesData[moduleIndex], ...updates };
    
    // 将更新后的数据写回文件
    writeFileSync(join(__dirname, 'src/Kambaz/Database/modules.json'), JSON.stringify(modulesData, null, 2));
    
    console.log('Module updated:', moduleId);
    res.json(modulesData[moduleIndex]);
  } else {
    res.status(404).json({ message: 'Module not found' });
  }
});

// 删除模块
app.delete('/api/modules/:moduleId', (req, res) => {
  const { moduleId } = req.params;
  
  const moduleIndex = modulesData.findIndex(m => m._id === moduleId);
  if (moduleIndex !== -1) {
    const deletedModule = modulesData.splice(moduleIndex, 1)[0];
    
    // 将更新后的数据写回文件
    writeFileSync(join(__dirname, 'src/Kambaz/Database/modules.json'), JSON.stringify(modulesData, null, 2));
    
    console.log('Module deleted:', deletedModule.name);
    res.json({ message: 'Module deleted successfully', deletedModule });
  } else {
    res.status(404).json({ message: 'Module not found' });
  }
});

// 读取注册数据
const enrollmentsData = JSON.parse(readFileSync(join(__dirname, 'src/Kambaz/Database/enrollments.json'), 'utf8'));

// 读取作业数据
const assignmentsData = JSON.parse(readFileSync(join(__dirname, 'src/Kambaz/Database/assignments.json'), 'utf8'));
console.log('Loaded assignments data:', assignmentsData.length, 'assignments');

// 获取所有注册信息
app.get('/api/enrollments', (req, res) => {
  res.json(enrollmentsData);
});

// 获取用户的注册信息
app.get('/api/enrollments/user/:userId', (req, res) => {
  const { userId } = req.params;
  const userEnrollments = enrollmentsData.filter(e => e.user === userId);
  res.json(userEnrollments);
});

// 获取课程的注册信息
app.get('/api/enrollments/course/:courseId', (req, res) => {
  const { courseId } = req.params;
  const courseEnrollments = enrollmentsData.filter(e => e.course === courseId);
  res.json(courseEnrollments);
});

// 注册用户到课程
app.post('/api/enrollments', (req, res) => {
  const { user, course } = req.body;
  const newEnrollment = {
    _id: Date.now().toString(),
    user,
    course,
    enrollmentDate: new Date().toISOString().split('T')[0]
  };
  enrollmentsData.push(newEnrollment);
  console.log('User enrolled:', user, 'in course:', course);
  res.json(newEnrollment);
});

// 取消注册
app.delete('/api/enrollments/user/:userId/course/:courseId', (req, res) => {
  const { userId, courseId } = req.params;
  const enrollmentIndex = enrollmentsData.findIndex(e => e.user === userId && e.course === courseId);
  if (enrollmentIndex !== -1) {
    enrollmentsData.splice(enrollmentIndex, 1);
    console.log('User unenrolled:', userId, 'from course:', courseId);
    res.json({ message: 'Unenrolled successfully' });
  } else {
    res.status(404).json({ message: 'Enrollment not found' });
  }
});

// 检查用户是否已注册课程
app.get('/api/enrollments/user/:userId/course/:courseId/check', (req, res) => {
  const { userId, courseId } = req.params;
  const isEnrolled = enrollmentsData.some(e => e.user === userId && e.course === courseId);
  res.json({ enrolled: isEnrolled });
});

// 创建作业（仅限faculty）
app.post('/api/assignments', (req, res) => {
  // 检查用户权限
  if (!req.session.user || req.session.user.role !== 'FACULTY') {
    return res.status(403).json({ message: 'Only faculty can create assignments' });
  }
  
  const assignment = req.body;
  assignment._id = `A${Date.now()}`;
  assignmentsData.push(assignment);
  
  // 将更新后的数据写回文件
  writeFileSync(join(__dirname, 'src/Kambaz/Database/assignments.json'), JSON.stringify(assignmentsData, null, 2));
  
  console.log('New assignment created:', assignment.title, 'by faculty:', req.session.user.username);
  res.json(assignment);
});

// 更新作业（仅限faculty）
app.put('/api/assignments/:assignmentId', (req, res) => {
  // 检查用户权限
  if (!req.session.user || req.session.user.role !== 'FACULTY') {
    return res.status(403).json({ message: 'Only faculty can update assignments' });
  }
  
  const { assignmentId } = req.params;
  const updates = req.body;
  
  const assignmentIndex = assignmentsData.findIndex(a => a._id === assignmentId);
  if (assignmentIndex !== -1) {
    assignmentsData[assignmentIndex] = { ...assignmentsData[assignmentIndex], ...updates };
    
    // 将更新后的数据写回文件
    writeFileSync(join(__dirname, 'src/Kambaz/Database/assignments.json'), JSON.stringify(assignmentsData, null, 2));
    
    console.log('Assignment updated:', assignmentId, 'by faculty:', req.session.user.username);
    res.json(assignmentsData[assignmentIndex]);
  } else {
    res.status(404).json({ message: 'Assignment not found' });
  }
});

// 删除作业（仅限faculty）
app.delete('/api/assignments/:assignmentId', (req, res) => {
  // 检查用户权限
  if (!req.session.user || req.session.user.role !== 'FACULTY') {
    return res.status(403).json({ message: 'Only faculty can delete assignments' });
  }
  
  const { assignmentId } = req.params;
  
  const assignmentIndex = assignmentsData.findIndex(a => a._id === assignmentId);
  if (assignmentIndex !== -1) {
    const deletedAssignment = assignmentsData.splice(assignmentIndex, 1)[0];
    
    // 将更新后的数据写回文件
    writeFileSync(join(__dirname, 'src/Kambaz/Database/assignments.json'), JSON.stringify(assignmentsData, null, 2));
    
    console.log('Assignment deleted:', deletedAssignment.title, 'by faculty:', req.session.user.username);
    res.json({ message: 'Assignment deleted successfully', deletedAssignment });
  } else {
    res.status(404).json({ message: 'Assignment not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('Available users for testing:');
  usersData.forEach(user => {
    console.log(`- ${user.username} / ${user.password} (${user.role})`);
  });
});
