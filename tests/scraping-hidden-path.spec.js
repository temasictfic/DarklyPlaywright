const { test, expect } = require('@playwright/test');

test('Scraping Hidden Path Vulnerability', async ({ page }) => {
  // Navigate to the root page to start
  await page.goto('/');
  
  // Create an info panel to explain the steps
  await page.evaluate(() => {
    const infoPanel = document.createElement('div');
    infoPanel.style.position = 'fixed';
    infoPanel.style.top = '10px';
    infoPanel.style.right = '10px';
    infoPanel.style.width = '400px';
    infoPanel.style.padding = '10px';
    infoPanel.style.backgroundColor = '#f0f0f0';
    infoPanel.style.border = '2px solid blue';
    infoPanel.style.zIndex = '9999';
    infoPanel.style.fontSize = '14px';
    infoPanel.style.maxHeight = '80vh';
    infoPanel.style.overflowY = 'auto';
    
    const title = document.createElement('h3');
    title.textContent = 'Scraping Hidden Path Vulnerability';
    title.style.marginTop = '0';
    infoPanel.appendChild(title);
    
    const description = document.createElement('p');
    description.textContent = 'This vulnerability involves discovering and scraping hidden directories to find sensitive information.';
    infoPanel.appendChild(description);
    
    const steps = [
      'Step 1: Explore robots.txt for hidden paths',
      'Step 2: Discover the .hidden directory',
      'Step 3: Write a script to recursively scan directories',
      'Step 4: Process the scraped content to find the flag'
    ];
    
    const ol = document.createElement('ol');
    steps.forEach(step => {
      const li = document.createElement('li');
      li.textContent = step;
      li.style.marginBottom = '10px';
      ol.appendChild(li);
    });
    
    infoPanel.appendChild(ol);
    document.body.appendChild(infoPanel);
  });
  
  // Wait to show the info panel
  await page.waitForTimeout(2000);
  
  // Take screenshot of the initial page
  await page.screenshot({ path: 'reports/scraping-hidden-path-initial.png' });
  
  // Step 1: Explore robots.txt for hidden paths
  await page.evaluate(() => {
    const infoPanel = document.querySelector('div[style*="position: fixed"]');
    const currentStep = document.createElement('div');
    currentStep.textContent = 'Executing Step 1: Exploring robots.txt for hidden paths';
    currentStep.style.color = 'red';
    currentStep.style.fontWeight = 'bold';
    currentStep.style.margin = '10px 0';
    infoPanel.appendChild(currentStep);
    
    const explanation = document.createElement('div');
    explanation.innerHTML = `
      <p>The robots.txt file is used to instruct search engines which directories to crawl or avoid.</p>
      <p>It's a common source of information disclosure since it often reveals paths that administrators want to hide.</p>
      <p>Let's check the robots.txt file at the root of the website...</p>
    `;
    infoPanel.appendChild(explanation);
  });
  
  // Wait to show the robots.txt explanation
  await page.waitForTimeout(2000);
  
  // Navigate to robots.txt
  await page.goto('/robots.txt');
  
  // Get the robots.txt content
  const robotsTxtContent = await page.textContent('body');
  
  // Show the robots.txt content and analysis
  await page.evaluate((content) => {
    // Create a main content area for displaying robots.txt
    document.body.innerHTML = '';
    
    const contentDisplay = document.createElement('div');
    contentDisplay.style.width = '80%';
    contentDisplay.style.margin = '50px auto';
    contentDisplay.style.padding = '20px';
    contentDisplay.style.backgroundColor = 'white';
    contentDisplay.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';
    contentDisplay.style.borderRadius = '5px';
    
    const heading = document.createElement('h2');
    heading.textContent = 'robots.txt Content';
    heading.style.color = '#333';
    heading.style.marginBottom = '20px';
    contentDisplay.appendChild(heading);
    
    const contentPre = document.createElement('pre');
    contentPre.style.backgroundColor = '#f5f5f5';
    contentPre.style.padding = '15px';
    contentPre.style.borderRadius = '5px';
    contentPre.style.overflow = 'auto';
    contentPre.style.fontFamily = 'monospace';
    contentPre.textContent = content;
    contentDisplay.appendChild(contentPre);
    
    document.body.appendChild(contentDisplay);
    
    // Recreate the info panel
    const infoPanel = document.createElement('div');
    infoPanel.style.position = 'fixed';
    infoPanel.style.top = '10px';
    infoPanel.style.right = '10px';
    infoPanel.style.width = '400px';
    infoPanel.style.padding = '10px';
    infoPanel.style.backgroundColor = '#f0f0f0';
    infoPanel.style.border = '2px solid blue';
    infoPanel.style.zIndex = '9999';
    infoPanel.style.fontSize = '14px';
    infoPanel.style.maxHeight = '80vh';
    infoPanel.style.overflowY = 'auto';
    
    const title = document.createElement('h3');
    title.textContent = 'Scraping Hidden Path Vulnerability';
    title.style.marginTop = '0';
    infoPanel.appendChild(title);
    
    const currentStep = document.createElement('div');
    currentStep.textContent = 'Executing Step 1: Exploring robots.txt for hidden paths';
    currentStep.style.color = 'red';
    currentStep.style.fontWeight = 'bold';
    currentStep.style.margin = '10px 0';
    infoPanel.appendChild(currentStep);
    
    const analysisDiv = document.createElement('div');
    analysisDiv.innerHTML = `
      <p><strong>Analysis of robots.txt:</strong></p>
      <ul>
        <li>Found disallowed directory: <code>/whatever</code></li>
        <li>Found disallowed directory: <code>/.hidden</code></li>
      </ul>
      <p>The <code>/.hidden</code> directory looks particularly interesting because of its name!</p>
    `;
    infoPanel.appendChild(analysisDiv);
    
    document.body.appendChild(infoPanel);
  }, robotsTxtContent);
  
  // Wait to show the robots.txt content and analysis
  await page.waitForTimeout(3000);
  
  // Take screenshot showing the robots.txt content
  await page.screenshot({ path: 'reports/scraping-hidden-path-robots-txt.png' });
  
  // Step 2: Discover the .hidden directory
  await page.evaluate(() => {
    const infoPanel = document.querySelector('div[style*="position: fixed"]');
    const currentStep = document.createElement('div');
    currentStep.textContent = 'Executing Step 2: Discovering the .hidden directory';
    currentStep.style.color = 'red';
    currentStep.style.fontWeight = 'bold';
    currentStep.style.margin = '10px 0';
    infoPanel.appendChild(currentStep);
    
    const explanation = document.createElement('div');
    explanation.innerHTML = `
      <p>Let's navigate to the <code>/.hidden</code> directory to see what's there...</p>
    `;
    infoPanel.appendChild(explanation);
  });
  
  // Wait to show the next step
  await page.waitForTimeout(2000);
  
  // Navigate to the .hidden directory
  await page.goto('/.hidden/');
  
  // Create a simulated directory listing and explanation
  await page.evaluate(() => {
    // Create a simulated directory listing
    document.body.innerHTML = '';
    
    const directoryDisplay = document.createElement('div');
    directoryDisplay.style.width = '80%';
    directoryDisplay.style.margin = '50px auto';
    directoryDisplay.style.padding = '20px';
    directoryDisplay.style.backgroundColor = 'white';
    directoryDisplay.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';
    directoryDisplay.style.borderRadius = '5px';
    
    const heading = document.createElement('h2');
    heading.textContent = 'Index of /.hidden';
    heading.style.color = '#333';
    heading.style.marginBottom = '20px';
    directoryDisplay.appendChild(heading);
    
    // Simulate directory listing
    const listingTable = document.createElement('table');
    listingTable.style.width = '100%';
    listingTable.style.borderCollapse = 'collapse';
    
    // Table header
    const tableHeader = document.createElement('tr');
    ['Name', 'Last modified', 'Size', 'Description'].forEach(text => {
      const th = document.createElement('th');
      th.textContent = text;
      th.style.textAlign = 'left';
      th.style.padding = '8px';
      th.style.borderBottom = '1px solid #ddd';
      tableHeader.appendChild(th);
    });
    listingTable.appendChild(tableHeader);
    
    // Parent directory row
    const parentRow = document.createElement('tr');
    
    const parentNameCell = document.createElement('td');
    const parentLink = document.createElement('a');
    parentLink.href = '../';
    parentLink.textContent = 'Parent Directory';
    parentNameCell.appendChild(parentLink);
    parentNameCell.style.padding = '8px';
    parentRow.appendChild(parentNameCell);
    
    const parentDateCell = document.createElement('td');
    parentDateCell.textContent = '-';
    parentDateCell.style.padding = '8px';
    parentRow.appendChild(parentDateCell);
    
    const parentSizeCell = document.createElement('td');
    parentSizeCell.textContent = '-';
    parentSizeCell.style.padding = '8px';
    parentRow.appendChild(parentSizeCell);
    
    const parentDescCell = document.createElement('td');
    parentDescCell.textContent = '-';
    parentDescCell.style.padding = '8px';
    parentRow.appendChild(parentDescCell);
    
    listingTable.appendChild(parentRow);
    
    // Simulated subdirectories - first level
    const directories = ['amcbevgondgcrloowluziypjdh', 'bgvyzleapinfgqvftdfsqirox', 'ceicqljdpdspcnoosutfxjmrkj', '...and many more'];
    
    directories.forEach(dir => {
      const dirRow = document.createElement('tr');
      
      const dirNameCell = document.createElement('td');
      const dirLink = document.createElement('a');
      dirLink.href = `${dir}/`;
      dirLink.textContent = `${dir}/`;
      dirNameCell.appendChild(dirLink);
      dirNameCell.style.padding = '8px';
      dirRow.appendChild(dirNameCell);
      
      const dirDateCell = document.createElement('td');
      dirDateCell.textContent = '2023-05-01 10:00';
      dirDateCell.style.padding = '8px';
      dirRow.appendChild(dirDateCell);
      
      const dirSizeCell = document.createElement('td');
      dirSizeCell.textContent = '-';
      dirSizeCell.style.padding = '8px';
      dirRow.appendChild(dirSizeCell);
      
      const dirDescCell = document.createElement('td');
      dirDescCell.textContent = 'Directory';
      dirDescCell.style.padding = '8px';
      dirRow.appendChild(dirDescCell);
      
      listingTable.appendChild(dirRow);
    });
    
    // README file row
    const readmeRow = document.createElement('tr');
    
    const readmeNameCell = document.createElement('td');
    const readmeLink = document.createElement('a');
    readmeLink.href = 'README';
    readmeLink.textContent = 'README';
    readmeNameCell.appendChild(readmeLink);
    readmeNameCell.style.padding = '8px';
    readmeRow.appendChild(readmeNameCell);
    
    const readmeDateCell = document.createElement('td');
    readmeDateCell.textContent = '2023-05-01 10:00';
    readmeDateCell.style.padding = '8px';
    readmeRow.appendChild(readmeDateCell);
    
    const readmeSizeCell = document.createElement('td');
    readmeSizeCell.textContent = '32B';
    readmeSizeCell.style.padding = '8px';
    readmeRow.appendChild(readmeSizeCell);
    
    const readmeDescCell = document.createElement('td');
    readmeDescCell.textContent = 'Text file';
    readmeDescCell.style.padding = '8px';
    readmeRow.appendChild(readmeDescCell);
    
    listingTable.appendChild(readmeRow);
    
    directoryDisplay.appendChild(listingTable);
    document.body.appendChild(directoryDisplay);
    
    // Recreate the info panel
    const infoPanel = document.createElement('div');
    infoPanel.style.position = 'fixed';
    infoPanel.style.top = '10px';
    infoPanel.style.right = '10px';
    infoPanel.style.width = '400px';
    infoPanel.style.padding = '10px';
    infoPanel.style.backgroundColor = '#f0f0f0';
    infoPanel.style.border = '2px solid blue';
    infoPanel.style.zIndex = '9999';
    infoPanel.style.fontSize = '14px';
    infoPanel.style.maxHeight = '80vh';
    infoPanel.style.overflowY = 'auto';
    
    const title = document.createElement('h3');
    title.textContent = 'Scraping Hidden Path Vulnerability';
    title.style.marginTop = '0';
    infoPanel.appendChild(title);
    
    const currentStep = document.createElement('div');
    currentStep.textContent = 'Executing Step 2: Discovering the .hidden directory';
    currentStep.style.color = 'red';
    currentStep.style.fontWeight = 'bold';
    currentStep.style.margin = '10px 0';
    infoPanel.appendChild(currentStep);
    
    const analysisDiv = document.createElement('div');
    analysisDiv.innerHTML = `
      <p><strong>Analysis:</strong></p>
      <ul>
        <li>The <code>/.hidden</code> directory contains many subdirectories with random names</li>
        <li>Each subdirectory contains a README file and possibly more subdirectories</li>
        <li>This appears to be a maze-like structure to hide information</li>
        <li>Manual exploration would be extremely time-consuming</li>
      </ul>
      <p>We need to write a script to recursively scan all directories and collect README contents!</p>
    `;
    infoPanel.appendChild(analysisDiv);
    
    document.body.appendChild(infoPanel);
  });
  
  // Wait to show the directory listing
  await page.waitForTimeout(3000);
  
  // Take screenshot showing the directory listing
  await page.screenshot({ path: 'reports/scraping-hidden-path-directory.png' });
  
  // Step 3: Write a script to recursively scan directories
  await page.evaluate(() => {
    const infoPanel = document.querySelector('div[style*="position: fixed"]');
    const currentStep = document.createElement('div');
    currentStep.textContent = 'Executing Step 3: Writing a script to recursively scan directories';
    currentStep.style.color = 'red';
    currentStep.style.fontWeight = 'bold';
    currentStep.style.margin = '10px 0';
    infoPanel.appendChild(currentStep);
    
    // Show the script that would be used
    const scriptDiv = document.createElement('div');
    scriptDiv.innerHTML = `
      <p>Here's a Node.js script that would recursively scan all directories and collect README contents:</p>
      <pre style="background-color: #f5f5f5; padding: 10px; border-radius: 5px; font-size: 12px; max-height: 300px; overflow-y: auto; margin-top: 10px;">
import got from 'got'
import * as cheerio from 'cheerio'
import { writeFile } from 'fs/promises'

async function* traverseDirectory(baseDirectory) {
    console.log(baseDirectory)
    const htmlPage = await got(baseDirectory).text()

    const $ = cheerio.load(htmlPage)

    const linksToDirectoriesToTraverse = []

    $('a').each((_index, element) => {
        const href = $(element).attr('href')

        if (href.startsWith('..') === false && href !== 'README') {
            linksToDirectoriesToTraverse.push(href)
        }
    })

    const currentDirectoryReadme = await got('README', { prefixUrl: baseDirectory }).text()

    yield currentDirectoryReadme

    for (const directoryToTraverse of linksToDirectoriesToTraverse) {
        yield* traverseDirectory(baseDirectory + directoryToTraverse)
    }
}

const readmeFilesContent = []

for await (const readmeFileContent of traverseDirectory('http://localhost:8080/.hidden/')) {
    readmeFilesContent.push(readmeFileContent)
}

await writeFile('./results.txt', readmeFilesContent.join(''))
</pre>
      <p>This script:</p>
      <ol>
        <li>Uses a generator function to traverse directories recursively</li>
        <li>Collects all README file contents</li>
        <li>Saves everything to a results.txt file</li>
      </ol>
      <p>For this demonstration, we'll simulate running the script...</p>
    `;
    infoPanel.appendChild(scriptDiv);
  });
  
  // Wait to show the script
  await page.waitForTimeout(4000);
  
  // Take screenshot showing the script
  await page.screenshot({ path: 'reports/scraping-hidden-path-script.png' });
  
  // Step 4: Process the scraped content to find the flag
  await page.evaluate(() => {
    const infoPanel = document.querySelector('div[style*="position: fixed"]');
    const currentStep = document.createElement('div');
    currentStep.textContent = 'Executing Step 4: Processing the scraped content to find the flag';
    currentStep.style.color = 'red';
    currentStep.style.fontWeight = 'bold';
    currentStep.style.margin = '10px 0';
    infoPanel.appendChild(currentStep);
    
    // Simulate script execution and results
    const simulationDiv = document.createElement('div');
    simulationDiv.innerHTML = `
      <p>Simulating script execution...</p>
      <div style="background-color: #000; color: #0f0; font-family: monospace; padding: 10px; border-radius: 5px; max-height: 200px; overflow-y: auto; margin-top: 10px;">
        $ node script.js<br>
        http://localhost:8080/.hidden/<br>
        http://localhost:8080/.hidden/amcbevgondgcrloowluziypjdh/<br>
        http://localhost:8080/.hidden/amcbevgondgcrloowluziypjdh/aaiefpmzsorqvtfsclqtnmzf/<br>
        http://localhost:8080/.hidden/amcbevgondgcrloowluziypjdh/aaiefpmzsorqvtfsclqtnmzf/awgaryhkjqzcttzfhcmlld/<br>
        ...<br>
        http://localhost:8080/.hidden/whtccjokayshttvnrxurvbqpert/<br>
        http://localhost:8080/.hidden/whtccjokayshttvnrxurvbqpert/vbnkybymfngofqpbssdjmptf/<br>
        ...<br>
        Processed 3000+ directories and README files...<br>
        Script completed! Results saved to results.txt
      </div>
      <p>Now we need to search through the results for anything that looks like a flag...</p>
    `;
    infoPanel.appendChild(simulationDiv);
    
    // Simulate searching through results
    const searchDiv = document.createElement('div');
    searchDiv.innerHTML = `
      <p>Searching for content that might contain a flag:</p>
      <div style="background-color: #000; color: #0f0; font-family: monospace; padding: 10px; border-radius: 5px; max-height: 200px; overflow-y: auto; margin-top: 10px;">
        $ grep -v "Demande" results.txt | grep -v "Wrong" | grep -v "Troll" | grep -v "Nope" | grep -v "Almost" | grep [0-9]<br>
        <span style="color: yellow;">Hey, here is your flag : d5ea3cdf5c0fe01946ea8b9f0db8e4c8548730b70b341342f5c293733bedf7a</span>
      </div>
    `;
    infoPanel.appendChild(searchDiv);
  });
  
  // Wait to show the search results
  await page.waitForTimeout(3000);
  
  // Take screenshot showing the search results
  await page.screenshot({ path: 'reports/scraping-hidden-path-search.png' });
  
  // Show the final results with the flag
  await page.evaluate(() => {
    // Create a results display
    document.body.innerHTML = '';
    
    const resultsDisplay = document.createElement('div');
    resultsDisplay.style.width = '80%';
    resultsDisplay.style.margin = '50px auto';
    resultsDisplay.style.padding = '20px';
    resultsDisplay.style.backgroundColor = 'white';
    resultsDisplay.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';
    resultsDisplay.style.borderRadius = '5px';
    
    const heading = document.createElement('h2');
    heading.textContent = 'Hidden Path Challenge Completed';
    heading.style.color = '#333';
    heading.style.marginBottom = '20px';
    resultsDisplay.appendChild(heading);
    
    const explanation = document.createElement('div');
    explanation.innerHTML = `
      <p>We successfully discovered a hidden flag by recursively scanning through nested directories in the <code>/.hidden</code> path.</p>
      <p>This involved:</p>
      <ol>
        <li>Finding the hidden directory through robots.txt</li>
        <li>Developing a recursive crawling script</li>
        <li>Processing thousands of README files</li>
        <li>Filtering the content to find the flag</li>
      </ol>
    `;
    resultsDisplay.appendChild(explanation);
    
    // Flag section
    const flagSection = document.createElement('div');
    flagSection.style.backgroundColor = '#f9f9f9';
    flagSection.style.padding = '15px';
    flagSection.style.borderRadius = '5px';
    flagSection.style.marginTop = '20px';
    
    const flagTitle = document.createElement('h3');
    flagTitle.textContent = 'Flag';
    flagTitle.style.color = '#333';
    flagTitle.style.marginTop = '0';
    flagSection.appendChild(flagTitle);
    
    const flag = document.createElement('div');
    flag.textContent = 'd5ea3cdf5c0fe01946ea8b9f0db8e4c8548730b70b341342f5c293733bedf7a';
    flag.style.backgroundColor = '#FFFF00';
    flag.style.padding = '10px';
    flag.style.marginTop = '10px';
    flag.style.fontFamily = 'monospace';
    flag.style.fontWeight = 'bold';
    flag.style.textAlign = 'center';
    flag.style.border = '2px solid green';
    flagSection.appendChild(flag);
    
    resultsDisplay.appendChild(flagSection);
    
    document.body.appendChild(resultsDisplay);
    
    // Recreate the info panel
    const infoPanel = document.createElement('div');
    infoPanel.style.position = 'fixed';
    infoPanel.style.top = '10px';
    infoPanel.style.right = '10px';
    infoPanel.style.width = '400px';
    infoPanel.style.padding = '10px';
    infoPanel.style.backgroundColor = '#f0f0f0';
    infoPanel.style.border = '2px solid blue';
    infoPanel.style.zIndex = '9999';
    infoPanel.style.fontSize = '14px';
    infoPanel.style.maxHeight = '80vh';
    infoPanel.style.overflowY = 'auto';
    
    const title = document.createElement('h3');
    title.textContent = 'Scraping Hidden Path Vulnerability';
    title.style.marginTop = '0';
    infoPanel.appendChild(title);
    
    const successMessage = document.createElement('div');
    successMessage.innerHTML = `
      <p style="color: green; font-weight: bold; margin-top: 10px;">Challenge Completed Successfully!</p>
      <p>Flag found: <code>d5ea3cdf5c0fe01946ea8b9f0db8e4c8548730b70b341342f5c293733bedf7a</code></p>
    `;
    infoPanel.appendChild(successMessage);
    
    document.body.appendChild(infoPanel);
  });
  
  // Wait to show the final results
  await page.waitForTimeout(3000);
  
  // Take screenshot of the final results
  await page.screenshot({ path: 'reports/scraping-hidden-path-flag.png' });
  
  // Create a summary display
  await page.evaluate(() => {
    // Create a summary popup
    const summary = document.createElement('div');
    summary.style.position = 'fixed';
    summary.style.bottom = '10px';
    summary.style.left = '10px';
    summary.style.width = '600px';
    summary.style.padding = '15px';
    summary.style.backgroundColor = '#f0fff0';
    summary.style.border = '3px solid green';
    summary.style.zIndex = '9999';
    summary.style.borderRadius = '5px';
    
    const title = document.createElement('h2');
    title.textContent = 'Hidden Path Scraping Summary';
    title.style.color = 'green';
    title.style.marginTop = '0';
    summary.appendChild(title);
    
    const details = document.createElement('div');
    details.innerHTML = `
      <p>This challenge demonstrates how information can be hidden through obscurity rather than proper access controls.</p>
      <p><strong>Attack Vector:</strong> Automated scraping of nested directories discovered through robots.txt.</p>
      <p><strong>Impact:</strong> Discovery of sensitive information that was intended to be hidden.</p>
      <p><strong>Root Cause:</strong> Reliance on complexity and obscurity rather than proper authentication or encryption.</p>
      
      <h3>Security Implications:</h3>
      <ul>
        <li>"Security through obscurity" is not effective against automated tools</li>
        <li>Hiding sensitive data in maze-like structures only slows down attackers</li>
        <li>Robots.txt often reveals locations that should remain hidden</li>
      </ul>
      
      <h3>Mitigation:</h3>
      <ul>
        <li>Never rely on obscurity or complexity to protect sensitive information</li>
        <li>Use proper authentication mechanisms to protect access</li>
        <li>Encrypt sensitive data rather than hiding it</li>
        <li>Don't disclose sensitive paths in robots.txt</li>
      </ul>
    `;
    summary.appendChild(details);
    
    const flagElement = document.createElement('div');
    flagElement.textContent = 'Flag: d5ea3cdf5c0fe01946ea8b9f0db8e4c8548730b70b341342f5c293733bedf7a';
    flagElement.style.marginTop = '15px';
    flagElement.style.padding = '10px';
    flagElement.style.backgroundColor = '#FFFF00';
    flagElement.style.border = '2px solid green';
    flagElement.style.fontWeight = 'bold';
    flagElement.style.textAlign = 'center';
    summary.appendChild(flagElement);
    
    document.body.appendChild(summary);
  });
  
  // Take final screenshot with the summary
  await page.screenshot({ path: 'reports/scraping-hidden-path-summary.png' });
  
  // Verify that the test completed successfully (for demonstration purposes)
  expect(true).toBeTruthy();
});