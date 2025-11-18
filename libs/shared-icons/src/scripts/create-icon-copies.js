/**
 * Script to create copies for shared-icons library
 * Creates copies of tailwind.config.js, generated_tailwind_config.js, and CSS theme files from design-system library
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
const generatedTailwindConfigSource = path.join(
   designSystemDir,
   'generated_tailwind_config.js'
)
const rootCssSource = path.join(
   designSystemDir,
   '.storybook',
   'styles',
   'root.css'
)
const blueCssSource = path.join(
   designSystemDir,
   '.storybook',
   'styles',
   'blue.css'
)
const darkCssSource = path.join(
   designSystemDir,
   '.storybook',
   'styles',
   'dark.css'
)
const lightCssSource = path.join(
   designSystemDir,
   '.storybook',
   'styles',
   'light.css'
)

// Target files
const tailwindConfigTarget = path.join(sharedIconsDir, 'tailwind.config.js')
const generatedTailwindConfigTarget = path.join(
   sharedIconsDir,
   'generated_tailwind_config.js'
)
const storybookRootCssTarget = path.join(
   sharedIconsStorybookStylesDir,
   'root.css'
)
const storybookBlueCssTarget = path.join(
   sharedIconsStorybookStylesDir,
   'blue.css'
)
const storybookDarkCssTarget = path.join(
   sharedIconsStorybookStylesDir,
   'dark.css'
)
const storybookLightCssTarget = path.join(
   sharedIconsStorybookStylesDir,
   'light.css'
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
checkPathExists(
   generatedTailwindConfigSource,
   'Source generated_tailwind_config.js'
)
checkPathExists(rootCssSource, 'Source root.css')
checkPathExists(blueCssSource, 'Source blue.css')
checkPathExists(darkCssSource, 'Source dark.css')
checkPathExists(lightCssSource, 'Source light.css')

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

// Function to copy file
function copyFile(source, target) {
   // Skip if source doesn't exist
   if (!fs.existsSync(source)) {
      console.error(`Source file does not exist: ${source}`)
      return false
   }

   // Remove existing file if it exists
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

   console.log(`Copying file: ${source} -> ${target}`)

   // Copy the file
   try {
      fs.copyFileSync(source, target)
      console.log(`Copied file: ${target}`)
      return true
   } catch (copyError) {
      console.error(`Error copying file: ${copyError.message}`)
      return false
   }
}

// Create copies
console.log('\nCreating copies for shared-icons library...')

// Create copy for tailwind.config.js
const tailwindResult = copyFile(tailwindConfigSource, tailwindConfigTarget)
console.log(
   `tailwind.config.js result: ${tailwindResult ? 'SUCCESS' : 'FAILED'}`
)

// Create copy for generated_tailwind_config.js
const generatedTailwindResult = copyFile(
   generatedTailwindConfigSource,
   generatedTailwindConfigTarget
)
console.log(
   `generated_tailwind_config.js result: ${generatedTailwindResult ? 'SUCCESS' : 'FAILED'}`
)

// Create copy for root.css in .storybook/styles
const rootCssResult = copyFile(rootCssSource, storybookRootCssTarget)
console.log(`root.css result: ${rootCssResult ? 'SUCCESS' : 'FAILED'}`)

// Create copy for blue.css in .storybook/styles
const blueCssResult = copyFile(blueCssSource, storybookBlueCssTarget)
console.log(`blue.css result: ${blueCssResult ? 'SUCCESS' : 'FAILED'}`)

// Create copy for dark.css in .storybook/styles
const darkCssResult = copyFile(darkCssSource, storybookDarkCssTarget)
console.log(`dark.css result: ${darkCssResult ? 'SUCCESS' : 'FAILED'}`)

// Create copy for light.css in .storybook/styles
const lightCssResult = copyFile(lightCssSource, storybookLightCssTarget)
console.log(`light.css result: ${lightCssResult ? 'SUCCESS' : 'FAILED'}`)

// Verify final results
console.log('\nVerifying created files:')
console.log(`tailwind.config.js exists: ${fs.existsSync(tailwindConfigTarget)}`)
console.log(
   `generated_tailwind_config.js exists: ${fs.existsSync(generatedTailwindConfigTarget)}`
)
console.log(`root.css exists: ${fs.existsSync(storybookRootCssTarget)}`)
console.log(`blue.css exists: ${fs.existsSync(storybookBlueCssTarget)}`)
console.log(`dark.css exists: ${fs.existsSync(storybookDarkCssTarget)}`)
console.log(`light.css exists: ${fs.existsSync(storybookLightCssTarget)}`)

console.log('\nScript completed!')
