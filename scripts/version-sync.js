#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function getLatestGitTag() {
  try {
    // Get the latest annotated tag
    const tag = execSync('git describe --tags --abbrev=0', { encoding: 'utf8' }).trim();
    return tag.startsWith('v') ? tag : `v${tag}`;
  } catch (error) {
    log('No Git tags found, using package.json version', 'yellow');
    return null;
  }
}

function getVersionFromTag(tag) {
  if (!tag) return null;
  // Remove 'v' prefix if present
  return tag.replace(/^v/, '');
}

function updateTauriConfig(version) {
  const tauriConfigPath = path.join(__dirname, '../src-tauri/tauri.conf.json');
  
  try {
    const config = JSON.parse(fs.readFileSync(tauriConfigPath, 'utf8'));
    
    // Update package version
    config.package.version = version;
    
    fs.writeFileSync(tauriConfigPath, JSON.stringify(config, null, 2));
    log(`✅ Updated tauri.conf.json version to ${version}`, 'green');
    return true;
  } catch (error) {
    log(`❌ Error updating tauri.conf.json: ${error.message}`, 'red');
    return false;
  }
}

function updatePackageJson(version) {
  const packageJsonPath = path.join(__dirname, '../package.json');
  
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    packageJson.version = version;
    
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    log(`✅ Updated package.json version to ${version}`, 'green');
    return true;
  } catch (error) {
    log(`❌ Error updating package.json: ${error.message}`, 'red');
    return false;
  }
}

function updateVersionFile(version) {
  const versionFilePath = path.join(__dirname, '../lib/version.ts');
  
  try {
    const buildDate = new Date().toISOString();
    const versionContent = `// Auto-generated version file
export const APP_VERSION = '${version}';
export const BUILD_DATE = '${buildDate}';
export const APP_NAME = 'DocForge';

export interface VersionInfo {
  version: string;
  buildDate: string;
  appName: string;
}

export const versionInfo: VersionInfo = {
  version: APP_VERSION,
  buildDate: BUILD_DATE,
  appName: APP_NAME,
};
`;

    // Ensure lib directory exists
    const libDir = path.dirname(versionFilePath);
    if (!fs.existsSync(libDir)) {
      fs.mkdirSync(libDir, { recursive: true });
    }
    
    fs.writeFileSync(versionFilePath, versionContent);
    log(`✅ Updated lib/version.ts with version ${version}`, 'green');
    return true;
  } catch (error) {
    log(`❌ Error updating version.ts: ${error.message}`, 'red');
    return false;
  }
}

function autoCommit(version) {
  try {
    // Check if there are changes to commit
    const status = execSync('git status --porcelain', { encoding: 'utf8' });
    
    if (status.trim()) {
      execSync('git add .', { stdio: 'inherit' });
      execSync(`git commit -m "chore: sync version to ${version}"`, { stdio: 'inherit' });
      log(`✅ Auto-committed version sync to ${version}`, 'green');
    } else {
      log('ℹ️  No changes to commit', 'blue');
    }
  } catch (error) {
    log(`⚠️  Auto-commit failed: ${error.message}`, 'yellow');
  }
}

function main() {
  log('🔄 Starting version sync...', 'cyan');
  
  // Get version from Git tag or package.json
  const gitTag = getLatestGitTag();
  const version = getVersionFromTag(gitTag) || '1.0.0';
  
  log(`📦 Using version: ${version}`, 'blue');
  
  // Update all version files
  const tauriUpdated = updateTauriConfig(version);
  const packageUpdated = updatePackageJson(version);
  const versionFileUpdated = updateVersionFile(version);
  
  if (tauriUpdated && packageUpdated && versionFileUpdated) {
    log('✅ Version sync completed successfully!', 'green');
    
    // Auto-commit if requested
    if (process.argv.includes('--commit')) {
      autoCommit(version);
    }
  } else {
    log('❌ Version sync failed!', 'red');
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { main, getLatestGitTag, getVersionFromTag }; 