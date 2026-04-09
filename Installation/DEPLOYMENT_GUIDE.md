# APK Download Page - Deployment Guide

## Overview
This is a simple React + Vite application that serves as a landing page for users to download your APK file.

## Setup Instructions

### 1. Add Your APK File
Place your APK file in the `public/` directory:
```
Installation/installation/public/app.apk
```

The download button will automatically point to this file.

### 2. Customize Content
Edit `src/App.jsx` to customize:
- App name (currently "Vaccine Tracker")
- Subtitle and description
- App features list
- App size and requirements
- App version

### 3. Update App Icon (Optional)
Replace the SVG icon in `src/App.jsx` with your own logo or image. Current icon is built-in SVG, but you can:

**Option A: Use an image file**
```jsx
import appIcon from './assets/app-icon.png'
// Then use: <img src={appIcon} className="app-icon" alt="App icon" />
```

**Option B: Replace SVG directly in the component**

### 4. Local Testing
```bash
cd Installation/installation

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:5173` to test the page.

## Deployment to Vercel

### Option 1: Using Vercel CLI (Recommended)
```bash
# Install Vercel CLI (if not already installed)
npm install -g vercel

# Navigate to the Installation/installation directory
cd Installation/installation

# Deploy
vercel

# Follow the prompts to:
# - Connect your GitHub account
# - Select your project
# - Configure build settings
```

### Option 2: GitHub Integration
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Add New Project"
4. Import your GitHub repository
5. Configure:
   - **Framework**: Vite
   - **Root Directory**: `Installation/installation`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Click "Deploy"

### Option 3: Manual Upload
1. Build the project:
   ```bash
   cd Installation/installation
   npm run build
   ```

2. Upload the `dist` folder to Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project" → "Continue with Direct File Upload"
   - Drag and drop the `dist` folder

## Vercel Configuration (Optional)

Create a `vercel.json` file in the root of the project for extra configuration:

```json
{
  "buildCommand": "npm run build",
  "installCommand": "npm install",
  "outputDirectory": "dist",
  "env": {},
  "functions": {
    "api/**/*.js": {
      "maxDuration": 30
    }
  }
}
```

## Environment Variables
Currently, the app doesn't require environment variables. If you need any in the future, add them in Vercel dashboard:
1. Project Settings → Environment Variables
2. Add your variables
3. Redeploy

## Build & Optimize

### Production Build
```bash
npm run build
```

This creates optimized files in the `dist/` folder.

### File Size
- Size: ~45 KB (after gzip)
- No external CDN dependencies
- All assets are self-contained

## Custom Domain (Optional)

1. In Vercel dashboard, go to your project settings
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as instructed

## Troubleshooting

### APK Not Downloading
- Ensure `app.apk` exists in `public/` folder
- Check browser console for errors
- Verify the file isn't corrupted

### Build Fails
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
npm run build
```

### Slow Initial Load
- Consider using a CDN for the APK file
- Upload APK to cloud storage (AWS S3, Azure Blob, etc.)
- Update download link in `App.jsx`

## Using Cloud Storage for APK (Recommended for Large Files)

Instead of serving APK from Vercel, use cloud storage:

1. **Upload APK to Cloud Storage**
   - AWS S3, Google Cloud Storage, or Azure Blob Storage
   - Generate a public download link

2. **Update Download Link in App.jsx**
   ```jsx
   const handleDownload = () => {
     // Replace with your cloud storage URL
     window.location.href = 'https://your-storage-url/app.apk'
   }
   ```

3. Benefits:
   - Vercel has limited storage/bandwidth
   - Faster downloads for large files
   - Better analytics for APK downloads

## Monitoring

Check Vercel analytics:
1. Project dashboard → "Analytics"
2. View page views, response times, etc.

## Next Steps

1. Add your APK to `public/app.apk`
2. Customize app details in `App.jsx`
3. Test locally with `npm run dev`
4. Deploy to Vercel using CLI or GitHub integration
5. Share your Vercel URL with users

---

For more help, visit [Vercel Documentation](https://vercel.com/docs)
