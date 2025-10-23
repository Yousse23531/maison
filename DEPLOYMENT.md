# Deployment Guide - Maison Rustique Website

## 🌐 Making Admin Publicly Accessible

The admin interface is now **publicly accessible** when you deploy your website. Here's what has been set up:

### ✅ **What's Already Configured**

1. **Public Admin Route**: `/admin/blocked-dates`
2. **Hidden Access**: No visible navigation links - accessible only via direct URL
3. **No Authentication Required**: Admin is accessible to anyone with the URL
4. **Responsive Design**: Works on both desktop and mobile

### 🚀 **How to Deploy**

#### **Option 1: Build and Deploy Static Files**
```bash
# Build the production version
npm run build

# The built files will be in the 'build' directory
# Upload the contents of 'build' to your web hosting service
```

#### **🔧 Important: Fix for 404 Errors**

**Problem**: Admin route `/admin/blocked-dates` shows 404 error on deployed site.

**Solution**: Configuration files have been created to handle client-side routing:

- **`.htaccess`** - For Apache servers (most shared hosting)
- **`_redirects`** - For Netlify
- **`vercel.json`** - For Vercel
- **`netlify.toml`** - For Netlify (alternative)

These files tell the server to serve `index.html` for all routes, allowing React Router to handle the routing.

#### **Option 2: Deploy with Backend**
```bash
# Start both frontend and backend
npm run dev

# For production, you'll need to:
# 1. Build the frontend: npm run build
# 2. Start the backend: node server/index.js
# 3. Serve the built files with your backend
```

### 🔗 **Public URLs After Deployment**

- **Main Website**: `https://yourdomain.com/`
- **Admin Interface**: `https://yourdomain.com/admin/blocked-dates` (hidden access only)

### 🎯 **Admin Features Available Publicly**

- **Block Dates**: Select dates and click "🔒 Bloquer les dates"
- **Unblock Dates**: Select blocked dates and click "🔓 Débloquer les dates"
- **Real-time Updates**: Changes appear immediately on the main calendar
- **Visual Feedback**: Green = Free, Red = Blocked
- **Hidden Access**: No visible links - only accessible via direct URL

### 🔒 **Security Considerations**

**Important**: The admin interface is currently **publicly accessible** without authentication. If you want to add security:

1. **Add authentication** to the admin route
2. **Use environment variables** for admin credentials
3. **Implement IP whitelisting** if needed

### 📱 **Mobile Access**

The admin interface is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

### 🛠 **Environment Variables**

For production deployment, you may want to set these environment variables:

```bash
# Backend API URL (if different from default)
VITE_API_URL=https://yourdomain.com/api

# Base path (if deploying to a subdirectory)
VITE_BASE=/your-subdirectory/
```

### 📋 **Deployment Checklist**

- [ ] Build the frontend: `npm run build`
- [ ] Upload build files to your hosting service
- [ ] **IMPORTANT**: Ensure routing configuration is in place (see below)
- [ ] Ensure backend API is accessible
- [ ] Test admin interface at `/admin/blocked-dates`
- [ ] Test date blocking/unblocking functionality
- [ ] Verify mobile responsiveness

### 🌐 **Hosting Provider Specific Instructions**

#### **Apache/Shared Hosting (cPanel, etc.)**
- Upload the `.htaccess` file from the `public` folder to your root directory
- The `.htaccess` file will handle client-side routing

#### **Netlify**
- Upload the `_redirects` file from the `public` folder
- Or use the `netlify.toml` file in your project root

#### **Vercel**
- The `vercel.json` file in your project root will handle routing automatically

#### **GitHub Pages**
- You may need to add a `404.html` file that redirects to `index.html`
- Or use a custom domain with proper server configuration

### 🎉 **Ready to Go!**

Your admin interface is now publicly accessible and ready for deployment. Users can access it only by going directly to `/admin/blocked-dates` on your domain - there are no visible navigation links.
