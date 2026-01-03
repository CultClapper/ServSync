# MongoDB Setup Guide

## Option 1: MongoDB Atlas (Cloud - Recommended - FREE)

This is the easiest option and doesn't require installing anything locally.

### Steps:

1. **Create a free MongoDB Atlas account:**
   - Go to https://www.mongodb.com/cloud/atlas/register
   - Sign up for a free account

2. **Create a Cluster:**
   - After signing up, click "Build a Database"
   - Choose the FREE tier (M0 Sandbox)
   - Select a cloud provider and region (choose closest to you)
   - Click "Create"

3. **Create Database User:**
   - Go to "Database Access" in the left menu
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Enter a username and password (save these!)
   - Set privileges to "Atlas admin" or "Read and write to any database"
   - Click "Add User"

4. **Whitelist Your IP:**
   - Go to "Network Access" in the left menu
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development) or add your specific IP
   - Click "Confirm"

5. **Get Connection String:**
   - Go to "Database" in the left menu
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`)

6. **Update your .env file:**
   - Open `backend/.env`
   - Replace `MONGO_URI` with your Atlas connection string
   - Make sure to replace `<password>` with your actual database user password
   - Add the database name at the end: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/servsync?retryWrites=true&w=majority`

7. **Restart your backend server**

---

## Option 2: Install MongoDB Locally

### Windows Installation:

1. **Download MongoDB:**
   - Go to https://www.mongodb.com/try/download/community
   - Select Windows, MSI package
   - Download and run the installer

2. **Install MongoDB:**
   - Run the installer
   - Choose "Complete" installation
   - Install MongoDB as a Windows Service (recommended)
   - Install MongoDB Compass (GUI tool - optional but helpful)

3. **Verify Installation:**
   - MongoDB should start automatically as a Windows service
   - You can verify by opening Services (Win+R, type `services.msc`) and looking for "MongoDB"

4. **Your .env file should already be correct:**
   ```
   MONGO_URI=mongodb://localhost:27017/servsync
   ```

5. **Restart your backend server**

---

## Troubleshooting

### If registration still fails:

1. **Check backend console** for MongoDB connection errors
2. **Verify your .env file** has the correct MONGO_URI
3. **Make sure the backend server restarted** after changing .env
4. **For Atlas:** Make sure your IP is whitelisted and password is correct in connection string

### Common Errors:

- **"MongoServerError: Authentication failed"** - Wrong password in connection string
- **"MongoNetworkError"** - IP not whitelisted (for Atlas) or MongoDB not running (for local)
- **"ECONNREFUSED"** - MongoDB service not running (for local installation)

