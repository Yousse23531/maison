# 🚀 URGENT: Fix Admin Page 404 Error

## The Problem
Your admin page at `http://maison-rustique.com/admin/blocked-dates` shows a 404 error instead of the actual admin interface.

## The Solution
You need to upload the `.htaccess` file to your server. This file tells the server how to handle the admin route.

## 📋 Step-by-Step Fix

### 1. **Download the .htaccess file**
The `.htaccess` file is already created and ready in your `build` folder.

### 2. **Upload to your server**
You need to upload the `.htaccess` file to the **root directory** of your website (`maison-rustique.com`).

**Important**: The `.htaccess` file must be in the same directory as your `index.html` file.

### 3. **File locations on your server should be:**
```
maison-rustique.com/
├── index.html
├── .htaccess          ← THIS FILE IS MISSING!
├── assets/
├── 1.jpg
├── 2.jpg
└── ... (other files)
```

### 4. **How to upload .htaccess:**

#### **Option A: Using File Manager (cPanel)**
1. Go to your hosting control panel
2. Open File Manager
3. Navigate to your website's root directory (usually `public_html` or `www`)
4. Upload the `.htaccess` file from your `build` folder
5. Make sure it's in the same directory as `index.html`

#### **Option B: Using FTP (FileZilla)**
1. Connect to your server via FTP
2. Navigate to your website's root directory
3. Upload the `.htaccess` file
4. Make sure it's in the same directory as `index.html`

### 5. **Test the fix**
After uploading the `.htaccess` file:
1. Go to `http://maison-rustique.com/admin/blocked-dates`
2. You should see the admin interface instead of the 404 error

## 🔧 What the .htaccess file does:
```
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]
```

This tells Apache: "For any URL that doesn't match a real file, serve index.html instead" - which allows React Router to handle the routing.

## ⚠️ Important Notes:
- The `.htaccess` file must be named exactly `.htaccess` (with the dot at the beginning)
- It must be in the root directory of your website
- Some hosting providers hide files starting with a dot - make sure to show hidden files
- After uploading, clear your browser cache and try again

## 🎯 Expected Result:
After uploading the `.htaccess` file, `http://maison-rustique.com/admin/blocked-dates` will show your admin interface with the calendar and blocking functionality.



