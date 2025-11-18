/**
 * Script to create symlinks for shared-icons library
 * Creates symlinks for tailwind.config.js and root.css from design-system library
 * Enhanced with better error handling and platform detection
 */

const fs = require('fs')
const path = require('path')

// Define paths
const rootDir = path.resolve(__dirname, '../../../../..')
const designSystemDir = path.join(rootDir, 'libs', 'design-system')
const sharedIconsDir = path.join(rootDir, 'libs', 'shared', 'icons')
const sharedIconsStorybookDir = path.join(sharedIconsDir, '.storybook')
const sharedIconsStorybookStylesDir = path.join(
   sharedIconsStorybookDir,
   'styles'
)

// Source files (absolute paths)
const tailwindConfigSource = path.join(designSystemDir, 'tailwind.config.js')
const rootCssSource = path.join(
   designSystemDir,
   '.storybook',
   'styles',
   'root.css'
)
const babelMacrosConfigSource = path.join(
   designSystemDir,
   'babel-plugin-macros.config.js'
)

// Target files
const tailwindConfigTarget = path.join(sharedIconsDir, 'tailwind.config.js')
const storybookRootCssTarget = path.join(
   sharedIconsStorybookStylesDir,
   'root.css'
)
const babelMacrosConfigTarget = path.join(
   sharedIconsDir,
   'babel-plugin-macros.config.js'
)

// Function to check if path exists
function checkPathExists(filePath, description) {
   const exists = fs.existsSync(filePath)
   console.log(`Checking ${description}: ${filePath}`)
   console.log(`${description} exists: ${exists}`)
   return exists
}

// Verify essential paths
console.log('Verifying directory structure...')
checkPathExists(rootDir, 'Root directory')
checkPathExists(designSystemDir, 'Design system directory')
checkPathExists(sharedIconsDir, 'Shared icons directory')
checkPathExists(tailwindConfigSource, 'Source tailwind.config.js')
checkPathExists(rootCssSource, 'Source root.css')
checkPathExists(babelMacrosConfigSource, 'Source babel-plugin-macros.config.js')

// Platform detection
const isWindows = process.platform === 'win32'
console.log(`Running on Windows: ${isWindows}`)

// Function to create directory if it doesn't exist
function ensureDirectoryExists(dirPath) {
   if (!fs.existsSync(dirPath)) {
      try {
         fs.mkdirSync(dirPath, { recursive: true })
         console.log(`Created directory: ${dirPath}`)
      } catch (error) {
         console.error(`Error creating directory ${dirPath}:`, error.message)
         return false
      }
   }
   return true
}

// Function to create a symlink or copy file as fallback
function createSymlinkOrCopy(source, target, useRelativePath = false) {
   // Skip if source doesn't exist
   if (!fs.existsSync(source)) {
      console.error(`Source file does not exist: ${source}`)
      return false
   }

   // Remove existing file or symlink if it exists
   if (fs.existsSync(target)) {
      try {
         fs.unlinkSync(target)
         console.log(`Removed existing file: ${target}`)
      } catch (error) {
         console.error(`Error removing existing file ${target}:`, error.message)
         return false
      }
   }

   // Create directory if it doesn't exist
   const targetDir = path.dirname(target)
   if (!ensureDirectoryExists(targetDir)) {
      return false
   }

   // Calculate the source path (relative or absolute)
   const symlinkSource = useRelativePath
      ? path.relative(path.dirname(target), source)
      : source

   console.log(`Attempting to link: ${target} -> ${symlinkSource}`)

   // Try creating symlink first
   try {
      // For Windows, 'file' type works for both files and directories
      fs.symlinkSync(symlinkSource, target, 'file')
      console.log(`Created symlink: ${target} -> ${symlinkSource}`)
      return true
   } catch (error) {
      console.warn(`Symlink creation failed: ${error.message}`)

      // If symlink fails (e.g., due to permissions), fall back to copying the file
      console.log(`Falling back to copying file: ${source} -> ${target}`)
      try {
         fs.copyFileSync(source, target)
         console.log(`Copied file instead: ${target}`)
         return true
      } catch (copyError) {
         console.error(`Error copying file: ${copyError.message}`)
         return false
      }
   }
}

// Create symlinks or copies
console.log('\nCreating symlinks for shared-icons library...')

// Create symlink for tailwind.config.js
const tailwindResult = createSymlinkOrCopy(
   tailwindConfigSource,
   tailwindConfigTarget,
   false
)
console.log(
   `tailwind.config.js result: ${tailwindResult ? 'SUCCESS' : 'FAILED'}`
)

// Create symlink for root.css in .storybook/styles
const rootCssResult = createSymlinkOrCopy(
   rootCssSource,
   storybookRootCssTarget,
   false
)
console.log(`root.css result: ${rootCssResult ? 'SUCCESS' : 'FAILED'}`)

// Create symlink for babel-plugin-macros.config.js
const babelMacrosResult = createSymlinkOrCopy(
   babelMacrosConfigSource,
   babelMacrosConfigTarget,
   false
)
console.log(
   `babel-plugin-macros.config.js result: ${babelMacrosResult ? 'SUCCESS' : 'FAILED'}`
)

// Verify final results
console.log('\nVerifying created files:')
console.log(`tailwind.config.js exists: ${fs.existsSync(tailwindConfigTarget)}`)
console.log(`root.css exists: ${fs.existsSync(storybookRootCssTarget)}`)
console.log(
   `babel-plugin-macros.config.js exists: ${fs.existsSync(
      babelMacrosConfigTarget
   )}`
)

console.log('\nScript completed!')
