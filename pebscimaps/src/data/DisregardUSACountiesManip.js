const fs = require('fs');
const path = require('path');

const inputTable = `<table width="60%" class="wikitable sortable jquery-tablesorter" style="text-align:center">

<thead><tr>
<th rowspan="2" class="headerSort" tabindex="0" role="columnheader button" title="Sort ascending">County
</th>
<th colspan="2">Joe Biden<br>Democratic
</th>
<th colspan="2">Donald Trump<br>Republican
</th>
<th colspan="2">Jo Jorgensen<br>Libertarian
</th>
<th colspan="2">Howie Hawkins<br>Green
</th>
<th colspan="2">Brock Pierce<br>American Shopping
</th>
<th colspan="2">Don Blankenship<br>Constitution
</th>
<th colspan="2">Margin
</th>
<th rowspan="2" class="headerSort" tabindex="0" role="columnheader button" title="Sort ascending">Total votes cast
</th></tr><tr>
<th data-sort-type="number" style="text-align:center;" class="headerSort" tabindex="0" role="columnheader button" title="Sort ascending">#
</th>
<th data-sort-type="number" style="text-align:center;" class="headerSort" tabindex="0" role="columnheader button" title="Sort ascending">%
</th>
<th data-sort-type="number" style="text-align:center;" class="headerSort" tabindex="0" role="columnheader button" title="Sort ascending">#
</th>
<th data-sort-type="number" style="text-align:center;" class="headerSort" tabindex="0" role="columnheader button" title="Sort ascending">%
</th>
<th data-sort-type="number" style="text-align:center;" class="headerSort" tabindex="0" role="columnheader button" title="Sort ascending">#
</th>
<th data-sort-type="number" style="text-align:center;" class="headerSort" tabindex="0" role="columnheader button" title="Sort ascending">%
</th>
<th data-sort-type="number" style="text-align:center;" class="headerSort" tabindex="0" role="columnheader button" title="Sort ascending">#
</th>
<th data-sort-type="number" style="text-align:center;" class="headerSort" tabindex="0" role="columnheader button" title="Sort ascending">%
</th>
<th data-sort-type="number" style="text-align:center;" class="headerSort" tabindex="0" role="columnheader button" title="Sort ascending">#
</th>
<th data-sort-type="number" style="text-align:center;" class="headerSort" tabindex="0" role="columnheader button" title="Sort ascending">%
</th>
<th data-sort-type="number" style="text-align:center;" class="headerSort" tabindex="0" role="columnheader button" title="Sort ascending">#
</th>
<th data-sort-type="number" style="text-align:center;" class="headerSort" tabindex="0" role="columnheader button" title="Sort ascending">%
</th>
<th data-sort-type="number" style="text-align:center;" class="headerSort" tabindex="0" role="columnheader button" title="Sort ascending">#
</th>
<th data-sort-type="number" style="text-align:center;" class="headerSort" tabindex="0" role="columnheader button" title="Sort ascending">%
</th></tr></thead><tbody>

<tr style="text-align:center;">
<td style="background-color:#B0CEFF"><a href="/wiki/Hawaii_County,_Hawaii" title="Hawaii County, Hawaii">Hawaii</a>
</td>
<td style="background-color:#B0CEFF">58,731
</td>
<td style="background-color:#B0CEFF">66.88%
</td>
<td style="background-color:#FFB6B6">26,897
</td>
<td style="background-color:#FFB6B6">30.63%
</td>
<td style="background:#FED105">1,027
</td>
<td style="background:#FED105">1.17%
</td>
<td style="background:#17aa5c">805
</td>
<td style="background:#17aa5c">0.92%
</td>
<td style="background:#EEEEEE">220
</td>
<td style="background:#EEEEEE">0.25%
</td>
<td style="background:#A356DE">134
</td>
<td style="background:#A356DE">0.15%
</td>
<td style="background-color:#B0CEFF">31,834
</td>
<td style="background-color:#B0CEFF">36.25%
</td>
<td style="background-color:#B0CEFF">87,814
</td></tr>
<tr style="text-align:center;">
<td style="background-color:#B0CEFF"><a href="/wiki/Honolulu_County,_Hawaii" title="Honolulu County, Hawaii">Honolulu</a>
</td>
<td style="background-color:#B0CEFF">238,869
</td>
<td style="background-color:#B0CEFF">62.51%
</td>
<td style="background-color:#FFB6B6">136,259
</td>
<td style="background-color:#FFB6B6">35.66%
</td>
<td style="background:#FED105">3,437
</td>
<td style="background:#FED105">0.90%
</td>
<td style="background:#17aa5c">2,178
</td>
<td style="background:#17aa5c">0.57%
</td>
<td style="background:#EEEEEE">741
</td>
<td style="background:#EEEEEE">0.19%
</td>
<td style="background:#A356DE">630
</td>
<td style="background:#A356DE">0.16%
</td>
<td style="background-color:#B0CEFF">102,610
</td>
<td style="background-color:#B0CEFF">26.85%
</td>
<td style="background-color:#B0CEFF">382,114
</td></tr>
<tr style="text-align:center;">
<td style="background-color:#B0CEFF"><a href="/wiki/Kalawao_County,_Hawaii" title="Kalawao County, Hawaii">Kalawao</a>
</td>
<td style="background-color:#B0CEFF">23
</td>
<td style="background-color:#B0CEFF">95.83%
</td>
<td style="background-color:#FFB6B6">1
</td>
<td style="background-color:#FFB6B6">4.17%
</td>
<td style="background:#FED105">0
</td>
<td style="background:#FED105">0.00%
</td>
<td style="background:#17aa5c">0
</td>
<td style="background:#17aa5c">0.00%
</td>
<td style="background:#EEEEEE">0
</td>
<td style="background:#EEEEEE">0.00%
</td>
<td style="background:#A356DE">0
</td>
<td style="background:#A356DE">0.00%
</td>
<td style="background-color:#B0CEFF">22
</td>
<td style="background-color:#B0CEFF">91.66%
</td>
<td style="background-color:#B0CEFF">24
</td></tr>
<tr style="text-align:center;">
<td style="background-color:#B0CEFF"><a href="/wiki/Kauai_County,_Hawaii" title="Kauai County, Hawaii">Kauai</a>
</td>
<td style="background-color:#B0CEFF">21,225
</td>
<td style="background-color:#B0CEFF">63.36%
</td>
<td style="background-color:#FFB6B6">11,582
</td>
<td style="background-color:#FFB6B6">34.58%
</td>
<td style="background:#FED105">303
</td>
<td style="background:#FED105">0.90%
</td>
<td style="background:#17aa5c">254
</td>
<td style="background:#17aa5c">0.76%
</td>
<td style="background:#EEEEEE">77
</td>
<td style="background:#EEEEEE">0.23%
</td>
<td style="background:#A356DE">56
</td>
<td style="background:#A356DE">0.17%
</td>
<td style="background-color:#B0CEFF">9,643
</td>
<td style="background-color:#B0CEFF">28.78%
</td>
<td style="background-color:#B0CEFF">33,497
</td></tr>
<tr style="text-align:center;">
<td style="background-color:#B0CEFF"><a href="/wiki/Maui_County,_Hawaii" title="Maui County, Hawaii">Maui</a>
</td>
<td style="background-color:#B0CEFF">47,305
</td>
<td style="background-color:#B0CEFF">66.59%
</td>
<td style="background-color:#FFB6B6">22,126
</td>
<td style="background-color:#FFB6B6">31.14%
</td>
<td style="background:#FED105">772
</td>
<td style="background:#FED105">1.09%
</td>
<td style="background:#17aa5c">585
</td>
<td style="background:#17aa5c">0.82%
</td>
<td style="background:#EEEEEE">145
</td>
<td style="background:#EEEEEE">0.20%
</td>
<td style="background:#A356DE">111
</td>
<td style="background:#A356DE">0.16%
</td>
<td style="background-color:#B0CEFF">25,179
</td>
<td style="background-color:#B0CEFF">35.45%
</td>
<td style="background-color:#B0CEFF">71,044
</td></tr>
</tbody><tfoot><tr style="text-align:center;">
<th>Totals
</th>
<th>366,130
</th>
<th>63.73%
</th>
<th>196,864
</th>
<th>34.27%
</th>
<th>5,539
</th>
<th>0.96%
</th>
<th>3,822
</th>
<th>0.67%
</th>
<th>1,183
</th>
<th>0.21%
</th>
<th>931
</th>
<th>0.16%
</th>
<th>169,266
</th>
<th>29.46%
</th>
<th>574,469
</th></tr></tfoot></table>`;

// Define the input and output file paths relative to the current directory
const inputFilePath = path.join(__dirname, 'usaCountiesElections.json');
const outputFilePath = path.join(__dirname, 'output.json');

function convertToInt(str) {
    // Remove commas and convert to number
    return Number(str.replace(/,/g, ''));
}

// Read the input file
fs.readFile(inputFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    // Parse the JSON data
    let counties;
    try {
        counties = JSON.parse(data);
    } catch (parseErr) {
        console.error('Error parsing JSON:', parseErr);
        return;
    }

    // Iterate through the keys of the object
    for (let id in counties) {
        if (counties.hasOwnProperty(id)) {
            
            const tableElements = inputTable.split(`<tr style="text-align:center;">`);
            for(let i = 1; i < tableElements.length-1; i++){
                const extractTitleAndOther = tableElements[i].split(`title="`);
                //console.log(extractTitleAndOther.length);
                const title = extractTitleAndOther[1].split(', Hawaii')[0].trim();

                if(title === counties[id].name && counties[id].id.startsWith("15")){
                    console.log('counties[id]');
                    console.log(counties[id]);
                    console.log('title');
                    console.log(title);
                    
                    const rowElements = extractTitleAndOther[1].split(', Hawaii')[1].split('>');
                    const leftVotes = convertToInt(rowElements[4].split('</td')[0].trim());
                    const rightVotes = convertToInt(rowElements[8].split('</td')[0].trim());
                    const libVotes = convertToInt(rowElements[12].split('</td')[0].trim());
                    const indyVotes = 0;//convertToInt(rowElements[16].split('</td')[0].trim());
                    const otherVotes = convertToInt(rowElements[20].split('</td')[0].trim())+convertToInt(rowElements[24].split('</td')[0].trim());//+ convertToInt(rowElements[28].split('</td')[0].trim());
                    const greenVotes = convertToInt(rowElements[16].split('</td')[0].trim());

                    // Add the "electionResults" attribute with the key value
                    counties[id]["electionResults"] = [
                        {
                        "year": 2020,
                        "republican": rightVotes,
                        "democrat": leftVotes,
                        "independent": indyVotes,
                        "libertarian": libVotes,
                        "green": greenVotes,
                        "other": otherVotes
                        }
                    ]
                }
            }

            
            //counties[id]["id"] = id;
        }
    }

    // Convert the modified object back to a JSON string
    const outputData = JSON.stringify(counties, null, 4);

    // Write the output to a new file
    fs.writeFile(outputFilePath, outputData, 'utf8', (err) => {
        if (err) {
            console.error('Error writing the file:', err);
            return;
        }
        console.log('File has been updated successfully.');
    });
});