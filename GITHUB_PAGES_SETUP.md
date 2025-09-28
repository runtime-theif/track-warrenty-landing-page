# 🚀 GitHub Pages Deployment Guide for TrackWarranty

## Overview

This guide explains how to deploy the TrackWarranty referral system on GitHub Pages with full `/invite/CODE` URL support.

## 🔧 GitHub Pages Limitations & Solutions

### Problem
GitHub Pages doesn't support server-side redirects (`.htaccess` files), so `/invite/CODE` URLs would normally return 404 errors.

### Solution
We use GitHub Pages' custom 404 handling to create client-side redirects that preserve all referral functionality.

## 📁 Required Files for GitHub Pages

### 1. Custom 404.html Handler
- **File**: `/404.html`
- **Purpose**: Intercepts `/invite/CODE` URLs and redirects to `/invite.html?code=CODE`
- **How it works**: 
  ```
  User visits: /invite/ABC123
  → GitHub Pages serves 404.html
  → JavaScript detects invite pattern
  → Redirects to: /invite.html?code=ABC123
  ```

### 2. Updated invite-handler.js
- **GitHub Pages compatible URL handling**
- **No server-side dependencies**
- **Clean URL management**

## 🚀 Deployment Steps

### Step 1: Repository Setup
```bash
# Create repository
git init
git add .
git commit -m "Initial TrackWarranty website"
git branch -M main
git remote add origin https://github.com/yourusername/track-warranty-website.git
git push -u origin main
```

### Step 2: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Source: **Deploy from a branch**
4. Branch: **main** / **root**
5. Click **Save**

### Step 3: Custom Domain (Optional)
1. Add `CNAME` file with your domain:
   ```
   trackwarranty.app
   ```
2. Configure DNS:
   ```
   A    @    185.199.108.153
   A    @    185.199.109.153
   A    @    185.199.110.153
   A    @    185.199.111.153
   CNAME www  yourusername.github.io
   ```

## 🔗 URL Routing on GitHub Pages

### How /invite/CODE URLs Work

1. **User clicks**: `https://yourdomain.com/invite/ABC123?ref=john`
2. **GitHub Pages**: Can't find `/invite/ABC123`, serves `404.html`
3. **404.html JavaScript**: 
   - Detects pattern `/invite/([A-Z0-9]+)`
   - Extracts code `ABC123`
   - Preserves query parameters `?ref=john`
   - Redirects to: `/invite.html?code=ABC123&ref=john`
4. **invite.html**: Loads normally with all referral data intact

### URL Patterns Supported
```
✅ /invite/ABC123
✅ /invite/ABC123?ref=john&utm_source=whatsapp
✅ /invite/ABC123/
✅ /invite (redirects to /invite.html)
✅ /invite/ (redirects to /invite.html)
```

## 📱 App Integration

### Universal Link Setup
Your app should handle these URL patterns:

```javascript
// iOS Universal Links (in apple-app-site-association)
{
  "applinks": {
    "apps": [],
    "details": [
      {
        "appID": "TEAMID.app.trackwarranty",
        "paths": [
          "/invite/*",
          "/*"
        ]
      }
    ]
  }
}

// Android App Links (in AndroidManifest.xml)
<intent-filter android:autoVerify="true">
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="https"
          android:host="trackwarranty.app"
          android:pathPrefix="/invite" />
</intent-filter>
```

### Deep Link Handling in App
```javascript
// When app opens from URL
function handleDeepLink(url) {
    const urlObj = new URL(url);
    
    // Extract invite code from path or query
    let inviteCode = null;
    
    // From path: /invite/ABC123
    const pathMatch = urlObj.pathname.match(/\/invite\/([A-Z0-9]+)/i);
    if (pathMatch) {
        inviteCode = pathMatch[1];
    }
    
    // From query: ?code=ABC123
    if (!inviteCode) {
        inviteCode = urlObj.searchParams.get('code');
    }
    
    // Extract referrer info
    const referrerName = urlObj.searchParams.get('ref');
    const utmSource = urlObj.searchParams.get('utm_source');
    
    // Auto-fill signup form
    if (inviteCode) {
        fillReferralCode(inviteCode, referrerName, utmSource);
    }
}
```

## 🧪 Testing on GitHub Pages

### Local Testing
```bash
# Serve locally to test 404 handling
python -m http.server 8000
# or
npx serve .

# Test URLs:
# http://localhost:8000/invite/TEST123
# http://localhost:8000/invite/ABC123?ref=john
```

### Production Testing
Once deployed, test these URLs:
```
https://yourdomain.com/invite/TEST123
https://yourdomain.com/invite/ABC123?ref=john&utm_source=whatsapp
https://yourdomain.com/invite/XYZ789?ref=sarah&utm_source=instagram
```

## 📊 Analytics Considerations

### URL Changes for Analytics
Original URLs like `/invite/ABC123` will show as `/invite.html?code=ABC123` in analytics.

### Google Analytics Setup
```javascript
// Track original intended URL
gtag('config', 'GA_MEASUREMENT_ID', {
  // Track the original path for better analytics
  custom_map: {
    'original_path': '/invite/' + inviteCode
  }
});

// Track referral events
gtag('event', 'referral_landing', {
  'invite_code': inviteCode,
  'referrer_name': referrerName,
  'utm_source': utmSource,
  'original_url': originalUrl
});
```

## 🔒 Security & Performance

### Advantages of GitHub Pages Hosting
- ✅ **Free HTTPS**: Automatic SSL certificates
- ✅ **Global CDN**: Fast loading worldwide
- ✅ **DDoS Protection**: GitHub's infrastructure
- ✅ **Version Control**: Full deployment history
- ✅ **No Server Maintenance**: Zero infrastructure management

### Limitations to Consider
- ❌ **No Server-Side Processing**: All logic must be client-side
- ❌ **No Database**: Use localStorage or external APIs
- ❌ **Static Files Only**: No dynamic content generation
- ❌ **Limited Redirects**: Must use JavaScript redirects

## 🚀 Production Optimization

### 1. Enable Compression
GitHub Pages automatically compresses files, but optimize your assets:
```bash
# Minify JavaScript (optional)
npx terser script.js -o script.min.js

# Optimize images
# Use WebP format for better compression
```

### 2. Cache Headers
GitHub Pages sets appropriate cache headers automatically.

### 3. Performance Monitoring
```javascript
// Track redirect performance
const redirectStart = performance.now();
// ... redirect logic ...
const redirectEnd = performance.now();

analytics.track('redirect_performance', {
  duration: redirectEnd - redirectStart,
  from: originalPath,
  to: finalPath
});
```

## 📈 SEO Considerations

### Meta Tags for Invite Pages
```html
<!-- Dynamic meta tags based on referral data -->
<meta property="og:title" content="John invited you to TrackWarranty!">
<meta property="og:description" content="Never lose money on expired warranties. Join with special invite code ABC123">
<meta property="og:url" content="https://trackwarranty.app/invite/ABC123">
```

### Canonical URLs
```html
<!-- Point to the invite.html version -->
<link rel="canonical" href="https://trackwarranty.app/invite.html?code=ABC123">
```

## 🔄 Backup Deployment Options

If GitHub Pages doesn't meet your needs:

### 1. Netlify
- Supports `_redirects` file for server-side redirects
- Better for complex routing requirements

### 2. Vercel
- Supports `vercel.json` for redirect configuration
- Excellent for modern web apps

### 3. Firebase Hosting
- Supports `firebase.json` for redirect rules
- Good integration with other Firebase services

## ✅ Deployment Checklist

Before going live:

- [ ] Test all `/invite/CODE` URLs redirect properly
- [ ] Verify platform detection works on mobile
- [ ] Check download links point to correct app stores
- [ ] Test referral tracking and analytics
- [ ] Verify custom domain SSL works (if using custom domain)
- [ ] Test social media link previews
- [ ] Confirm deep linking works with actual app
- [ ] Validate all UTM parameters are preserved

## 📞 Troubleshooting

### Common Issues

**Issue**: `/invite/CODE` URLs return 404
**Solution**: Ensure `404.html` is in the root directory

**Issue**: Referral data not preserved
**Solution**: Check JavaScript console for redirect errors

**Issue**: Social media previews not working
**Solution**: Ensure meta tags are set before any redirects

**Issue**: Deep links not opening app
**Solution**: Verify universal links/app links configuration

---

**🛡️ TrackWarranty** - Ready for viral growth on GitHub Pages! 🚀
