# Automated Versioning System

## 🎯 Overview

This automated versioning system syncs your app version from Git tags to all configuration files and displays version information throughout the app. Perfect for weekly legal releases!

## ✅ Features Implemented

### 1. **Version Sync Script** (`scripts/version-sync.js`)
- ✅ Reads latest Git tag (e.g., `v1.1.0`)
- ✅ Updates `tauri.conf.json` package version
- ✅ Updates `package.json` version
- ✅ Generates `lib/version.ts` with build metadata
- ✅ Auto-commit option with `--commit` flag

### 2. **Version Display Components**
- ✅ `VersionInfo.tsx` - Full version info with release notes
- ✅ `VersionDisplay.tsx` - Minimal version display for sidebar/footer
- ✅ Settings page with comprehensive version management

### 3. **Settings Integration**
- ✅ Complete settings page with 7 sections
- ✅ About tab with version information
- ✅ Update checking functionality
- ✅ Release notes display

## 🚀 Usage

### Basic Version Sync
```bash
# Sync version from Git tags to all config files
pnpm version:sync

# Sync and auto-commit changes
pnpm version:sync:commit
```

### Git Tag Workflow
```bash
# 1. Create a new release tag
git tag -a v1.1.1 -m "Release v1.1.1 - Enhanced document generation"

# 2. Push the tag
git push origin v1.1.1

# 3. Sync version to app
pnpm version:sync

# 4. Build the app
pnpm tauri:build
```

## 📁 File Structure

```
├── scripts/
│   └── version-sync.js          # Main version sync script
├── lib/
│   └── version.ts               # Auto-generated version metadata
├── components/
│   ├── VersionInfo.tsx          # Full version info component
│   └── VersionDisplay.tsx       # Minimal version display
├── app/
│   └── settings/
│       └── page.tsx             # Settings page with version info
├── src-tauri/
│   └── tauri.conf.json          # Updated with version sync
└── package.json                 # Updated with version sync
```

## 🔧 Configuration

### Version Sources (Priority Order)
1. **Git Tags** - Latest annotated tag (e.g., `v1.1.0`)
2. **Fallback** - Current `package.json` version

### Files Updated by Sync Script
- `src-tauri/tauri.conf.json` - `package.version`
- `package.json` - `version`
- `lib/version.ts` - Auto-generated with build date

### Version Display Locations
- **Dashboard Footer** - Minimal version display
- **Settings Page** - Full version information
- **About Tab** - Complete version management

## 🎨 UI Components

### VersionDisplay (Minimal)
```tsx
<VersionDisplay variant="minimal" />
// Output: ℹ️ v1.1.0
```

### VersionInfo (Full)
```tsx
<VersionInfo />
// Output: Complete version card with:
// - App name and version
// - Build date
// - Update checker
// - Release notes
// - Legal information
```

## 📱 Settings Page Features

### 7 Settings Sections
1. **General** - App preferences and defaults
2. **Account** - User profile and authentication
3. **Privacy & Security** - Data protection settings
4. **Notifications** - Alert preferences
5. **Appearance** - Theme and display settings
6. **Data & Storage** - Document management
7. **About** - Version info and legal details

### About Tab Features
- ✅ Current version display
- ✅ Build date information
- ✅ Update checking
- ✅ Recent release notes
- ✅ Legal information links

## 🔄 Automated Workflow

### Weekly Release Process
```bash
# 1. Create new release tag
git tag -a v1.1.2 -m "Weekly release v1.1.2"

# 2. Push tag to GitHub
git push origin v1.1.2

# 3. Sync version to app
pnpm version:sync

# 4. Build native app
pnpm tauri:build

# 5. Test the build
# The app will now show v1.1.2 in the UI
```

### CI/CD Integration
```yaml
# Example GitHub Actions workflow
- name: Sync Version
  run: pnpm version:sync

- name: Build App
  run: pnpm tauri:build
```

## 🎯 Version Display Locations

### 1. Dashboard Footer
- Minimal version display
- Always visible
- Clean, unobtrusive design

### 2. Settings Page
- Comprehensive version management
- Update checking
- Release notes
- Legal information

### 3. About Section
- Full version details
- Build information
- Update history

## 🔧 Customization

### Update Release Notes
Edit the mock data in `components/VersionInfo.tsx`:
```tsx
const mockReleaseNotes: ReleaseNote[] = [
  {
    version: '1.1.1',
    date: '2024-01-22',
    title: 'Weekly Legal Release',
    description: 'Enhanced document generation and bug fixes.'
  }
]
```

### Change Version Display Style
Modify `components/VersionDisplay.tsx`:
```tsx
// Minimal variant
<div className="text-xs text-muted-foreground">
  v{versionInfo.version}
</div>

// Detailed variant
<div className="text-sm">
  {versionInfo.appName} v{versionInfo.version}
</div>
```

### Add More Settings Sections
Edit `app/settings/page.tsx`:
```tsx
const settingsSections = [
  // ... existing sections
  {
    id: "advanced",
    title: "Advanced",
    icon: <Settings className="h-4 w-4" />,
    description: "Advanced configuration options"
  }
]
```

## 🧪 Testing

### Test Version Sync
```bash
# 1. Create a test tag
git tag -a v1.1.1 -m "Test release"

# 2. Run sync
pnpm version:sync

# 3. Verify updates
cat lib/version.ts
cat src-tauri/tauri.conf.json
cat package.json

# 4. Check UI
pnpm dev
# Navigate to /settings and check About tab
```

### Test Build Process
```bash
# 1. Sync version
pnpm version:sync

# 2. Build app
pnpm tauri:build

# 3. Check generated app shows correct version
# Open DocForge.app and check version in About
```

## 🎯 Success Metrics

- ✅ **Automated Sync** - Version syncs from Git tags to all config files
- ✅ **UI Integration** - Version displayed in dashboard footer and settings
- ✅ **Build Integration** - Native app shows correct version
- ✅ **Release Notes** - Recent releases displayed in settings
- ✅ **Update Checking** - Simulated update check functionality
- ✅ **Professional UI** - Clean, legal-appropriate design

## 📞 Support

### Common Issues
1. **No Git tags found** - Script falls back to package.json version
2. **Build errors** - Check that all files are properly updated
3. **UI not updating** - Restart dev server after version sync

### Debug Commands
```bash
# Check current Git tags
git tag --list

# Check current version in files
cat lib/version.ts
cat src-tauri/tauri.conf.json | grep version
cat package.json | grep version

# Test version sync
pnpm version:sync --dry-run
```

---

**Status**: ✅ **COMPLETE** - Automated versioning system fully implemented and ready for weekly legal releases! 