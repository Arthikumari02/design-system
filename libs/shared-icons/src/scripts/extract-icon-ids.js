const fs = require('fs')
const path = require('path')

// Path to the SVG sprite file - fixing the path to use project root
const projectRoot = path.resolve(__dirname, '../../../../..')
const svgFilePath = path.join(
   projectRoot,
   'apps/hive/src/assets/icons/appIconSprite.svg'
)

// Function to extract IDs from SVG file
function extractIconIds(filePath) {
   try {
      // Read the SVG file
      const content = fs.readFileSync(filePath, 'utf8')

      // Regular expression to match symbol IDs
      // This pattern looks for id='something' within symbol tags
      const symbolIdRegex = /<symbol[^>]*id=['"]([^'"]+)['"][^>]*>/g

      const ids = []
      let match

      // Extract all matches
      while ((match = symbolIdRegex.exec(content)) !== null) {
         ids.push(match[1])
      }

      return ids
   } catch (error) {
      console.error('Error reading or parsing the SVG file:', error)
      return []
   }
}

// Extract the IDs
const iconIds = extractIconIds(svgFilePath)

// Export the array to a JSON file if needed
const outputPath = path.join(__dirname, 'outline-icon-ids.json')
fs.writeFileSync(outputPath, JSON.stringify(iconIds, null, 2))
