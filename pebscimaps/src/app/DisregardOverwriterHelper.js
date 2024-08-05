const fs = require('fs');
const path = require('path');

// Define the input and output file paths relative to the current directory
const inputFilePath = path.join(__dirname, 'WorldMap.js');
const outputFilePath = path.join(__dirname, 'output.js');

fs.readFile(inputFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    // Regular expression to find the <path> elements and their id attributes
    const regex = /<path\s+id="([^"]+)"[^>]*fill={[^}]*}[^>]*>/g;

    // Replace occurrences with the modified fill property
    const result = data.replace(regex, (match, id) => {
        return match.replace(/fill={[^}]*}/, `fill={determineCountryColor("${id}")}`);
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