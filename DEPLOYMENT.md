# 部署配置说明

## 环境变量配置

在部署到Netlify或Render时，需要设置以下环境变量：

### Netlify环境变量配置

1. 登录Netlify控制台
2. 进入你的项目设置
3. 在"Environment variables"部分添加：
   - `VITE_HTTP_SERVER`: 你的后端服务器URL（例如：`https://your-app-name.onrender.com`）

### Render环境变量配置

1. 登录Render控制台
2. 进入你的前端应用设置
3. 在"Environment"部分添加：
   - `VITE_HTTP_SERVER`: 你的后端服务器URL（例如：`https://your-backend-app.onrender.com`）

## 重要说明

- `VITE_HTTP_SERVER` 必须以 `https://` 开头（生产环境）
- 确保后端服务器已正确配置CORS，允许前端域名访问
- 本地开发时使用 `http://localhost:4000`
- 部署时使用你的实际后端服务器URL

## 故障排除

如果遇到空白页面或API错误：
1. 检查环境变量是否正确设置
2. 确认后端服务器URL是否可访问
3. 检查浏览器控制台的错误信息
4. 确认后端服务器的CORS配置
