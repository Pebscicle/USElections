const fs = require('fs');
const path = require('path');


// Read the input file
// Define the input and output file paths relative to the current directory
const inputFilePath = path.join(__dirname, 'USADetailedMap.js');
const outputFilePath = path.join(__dirname, 'output.js');

fs.readFile(inputFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    // Regular expression to find the determineStatesColor and ID
    const regex = /fill={(determineStatesColor)(\(".*?"\))?}[^>]*id="(\d{5})"/g;

    // Replace occurrences with the modified function call
    const result = data.replace(regex, (match, p1, p2, p3) => {
        return match.replace(p1 + (p2 || ""), `${p1}("${p3}")`);
    });

    // Write the output to a new file
    fs.writeFile(outputFilePath, result, 'utf8', (err) => {
        if (err) {
            console.error('Error writing the file:', err);
            return;
        }
        console.log('File has been updated successfully.');
    });
});