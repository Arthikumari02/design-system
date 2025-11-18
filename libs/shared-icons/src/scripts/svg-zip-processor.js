const fs = require('fs')
const path = require('path')
const os = require('os')
const { execSync } = require('child_process')
const { createReadStream, createWriteStream } = require('fs')

// Function to process an SVG file and convert it to symbol format
function convertSvgToSymbol(svgContent, filename) {
   try {
      // Simple regex-based approach to extract viewBox and content
      const viewBoxMatch = svgContent.match(/viewBox=["']([^"']*)["']/)
      const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24'

      // Extract the content inside the SVG tag
      const contentMatch = svgContent.match(/<svg[^>]*>([\s\S]*)<\/svg>/i)
      const innerContent = contentMatch ? contentMatch[1].trim() : ''

      // Return object with id and content for later sorting
      return {
         id: filename,
         content: `      <symbol viewBox='${viewBox}' id='${filename}'>\n${innerContent}\n      </symbol>\n\n`
      }
   } catch (error) {
      console.error(`Error converting SVG to symbol (${filename}):`, error)
      return null
   }
}

// Function to extract a zip file using unzip command
function extractZip(zipFilePath, extractToPath) {
   try {
      // Create the extraction directory if it doesn't exist
      if (!fs.existsSync(extractToPath)) {
         fs.mkdirSync(extractToPath, { recursive: true })
      }

      // Use the unzip command to extract the zip file
      execSync(`unzip -o "${zipFilePath}" -d "${extractToPath}"`, {
         stdio: 'inherit'
      })
      return true
   } catch (error) {
      console.error(`Error extracting zip file (${zipFilePath}):`, error)
      return false
   }
}

// Function to recursively process SVG files in a directory
function processSvgFiles(directory, symbolsArray = []) {
   const entries = fs.readdirSync(directory, { withFileTypes: true })

   for (const entry of entries) {
      const fullPath = path.join(directory, entry.name)

      if (entry.isDirectory()) {
         // Recursively process subdirectories
         processSvgFiles(fullPath, symbolsArray)
      } else if (entry.isFile()) {
         if (entry.name.toLowerCase().endsWith('.svg')) {
            console.log(`Processing SVG: ${entry.name}`)

            // Extract filename without extension to use as ID
            const filename = path.basename(entry.name, '.svg')

            // Read SVG content
            const svgContent = fs.readFileSync(fullPath, 'utf8')

            // Convert to symbol and add to symbols array
            const symbol = convertSvgToSymbol(svgContent, filename)
            if (symbol) {
               symbolsArray.push(symbol)
            }
         } else if (entry.name.toLowerCase().endsWith('.zip')) {
            console.log(`Found nested zip: ${entry.name}`)

            // Create a temporary directory for this nested zip
            const nestedTempDir = fs.mkdtempSync(
               path.join(os.tmpdir(), 'nested-zip-')
            )

            try {
               // Extract the nested zip
               if (extractZip(fullPath, nestedTempDir)) {
                  // Process the extracted files
                  processSvgFiles(nestedTempDir, symbolsArray)
               }
            } catch (error) {
               console.error(
                  `Error processing nested zip (${entry.name}):`,
                  error
               )
            } finally {
               // Clean up the nested temp directory
               try {
                  fs.rmSync(nestedTempDir, { recursive: true, force: true })
               } catch (err) {
                  console.warn(
                     `Could not clean up temp directory ${nestedTempDir}:`,
                     err
                  )
               }
            }
         }
      }
   }

   return symbolsArray
}

// Main function to process the zip file with nested zips
function processMainZipFile(zipFilePath, outputFilePath) {
   try {
      // Check if zip file exists
      if (!fs.existsSync(zipFilePath)) {
         console.error(`Zip file not found: ${zipFilePath}`)
         return
      }

      console.log(`Processing main zip file: ${zipFilePath}`)

      // Create a temporary directory for extraction
      const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'main-zip-'))

      try {
         // Extract the main zip file
         if (!extractZip(zipFilePath, tempDir)) {
            console.error('Failed to extract the main zip file')
            return
         }

         // Create output directory if it doesn't exist
         const outputDir = path.dirname(outputFilePath)
         if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true })
         }

         // Process all SVG files in the extracted directory
         const symbolsArray = processSvgFiles(tempDir)

         // Sort symbols alphabetically by ID
         symbolsArray.sort((a, b) => a.id.localeCompare(b.id))

         // Create the SVG wrapper
         const svgHeader =
            '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none">\n    <defs>\n'
         const svgFooter = '    </defs>\n</svg>'

         // Join sorted symbols into a single string
         const symbolsContent = symbolsArray
            .map(symbol => symbol.content)
            .join('')
         const outputContent = svgHeader + symbolsContent + svgFooter

         // Write output to file
         fs.writeFileSync(outputFilePath, outputContent)
         console.log(
            `Successfully created ${symbolsArray.length} symbols in alphabetical order at: ${outputFilePath}`
         )
      } finally {
         // Clean up the main temp directory
         try {
            fs.rmSync(tempDir, { recursive: true, force: true })
         } catch (err) {
            console.warn(`Could not clean up temp directory ${tempDir}:`, err)
         }
      }
   } catch (error) {
      console.error('Error processing SVG zip file:', error)
   }
}

// Check command line arguments
if (process.argv.length < 4) {
   console.log('Usage: node script.js <path-to-zip-file> <output-file-path>')
   console.log('Example: node script.js ./icons.zip ./symbols.svg')
   process.exit(1)
}

// Get command line arguments
const zipFilePath = process.argv[2]
const outputFilePath = process.argv[3]

// Process the zip file
processMainZipFile(zipFilePath, outputFilePath)
