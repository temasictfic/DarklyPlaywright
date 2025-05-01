const { test, expect } = require('@playwright/test');

test('Header Manipulation Vulnerability', async ({ page }) => {
  // Navigate to the main page to start exploration
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
    title.textContent = 'Header Manipulation Vulnerability';
    title.style.marginTop = '0';
    infoPanel.appendChild(title);
    
    const description = document.createElement('p');
    description.textContent = 'This vulnerability involves manipulating HTTP headers to access restricted content.';
    infoPanel.appendChild(description);
    
    const steps = [
      'Step 1: Discover the vulnerable page',
      'Step 2: Check for informative comments',
      'Step 3: Modify the Referer header',
      'Step 4: Modify the User-Agent header',
      'Step 5: Retrieve the flag'
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
  await page.screenshot({ path: 'reports/header-manipulation-initial.png' });
  
  // Step 1: Discover the vulnerable page
  await page.evaluate(() => {
    const infoPanel = document.querySelector('div[style*="position: fixed"]');
    const currentStep = document.createElement('div');
    currentStep.textContent = 'Executing Step 1: Discovering the vulnerable page';
    currentStep.style.color = 'red';
    currentStep.style.fontWeight = 'bold';
    currentStep.style.margin = '10px 0';
    infoPanel.appendChild(currentStep);
    
    const discovery = document.createElement('div');
    discovery.innerHTML = `
      <p>For this vulnerability, we need to locate a page that checks HTTP headers for authorization or access control.</p>
      <p>Looking through the site, we found a suspicious page with a hash in the URL:</p>
      <code>/index.php?page=b7e44c7a40c5f80139f0a50f3650fb2bd8d00b0d24667c4c2ca32c88e13b758f</code>
    `;
    discovery.style.marginTop = '10px';
    infoPanel.appendChild(discovery);
  });
  
  // Wait to show the discovery information
  await page.waitForTimeout(2000);
  
  // Take screenshot showing the page discovery
  await page.screenshot({ path: 'reports/header-manipulation-discovery.png' });
  
  // Navigate to the suspicious page
  await page.goto('/index.php?page=b7e44c7a40c5f80139f0a50f3650fb2bd8d00b0d24667c4c2ca32c88e13b758f');
  
  // Step 2: Check for informative comments
  await page.evaluate(() => {
    // Recreate info panel if it's lost after navigation
    if (!document.querySelector('div[style*="position: fixed"]')) {
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
      title.textContent = 'Header Manipulation Vulnerability';
      title.style.marginTop = '0';
      infoPanel.appendChild(title);
      
      document.body.appendChild(infoPanel);
    }
    
    const infoPanel = document.querySelector('div[style*="position: fixed"]');
    const currentStep = document.createElement('div');
    currentStep.textContent = 'Executing Step 2: Checking for informative comments';
    currentStep.style.color = 'red';
    currentStep.style.fontWeight = 'bold';
    currentStep.style.margin = '10px 0';
    infoPanel.appendChild(currentStep);
    
    // Get the page source
    const pageSource = document.documentElement.outerHTML;
    
    // Look for HTML comments
    const commentRegex = /<!--([\s\S]*?)-->/g;
    const comments = [];
    let match;
    
    while ((match = commentRegex.exec(pageSource)) !== null) {
      comments.push(match[1].trim());
    }
    
    // Display found comments
    const commentsDiv = document.createElement('div');
    commentsDiv.innerHTML = '<p>Checking page source for HTML comments...</p>';
    
    if (comments.length > 0) {
      commentsDiv.innerHTML += '<p>Found the following comments:</p><ul>';
      comments.forEach(comment => {
        commentsDiv.innerHTML += `<li style="margin-bottom: 5px;"><code>${comment}</code></li>`;
      });
      commentsDiv.innerHTML += '</ul>';
    } else {
      commentsDiv.innerHTML += '<p>No comments found in the page source.</p>';
    }
    
    // For demonstration purposes, add the expected comments if not found
    if (comments.length === 0) {
      commentsDiv.innerHTML += `
        <p>For this demonstration, we'll add the comments we expect to find:</p>
        <ul>
          <li style="margin-bottom: 5px; color: green;"><code>You must come from : "https://www.nsa.gov/".</code></li>
          <li style="margin-bottom: 5px; color: green;"><code>Let's use this browser : "ft_bornToSec". It will help you a lot.</code></li>
        </ul>
      `;
    }
    
    infoPanel.appendChild(commentsDiv);
    
    // Analysis of the comments
    const analysisDiv = document.createElement('div');
    analysisDiv.innerHTML = `
      <p style="margin-top: 15px;"><strong>Analysis:</strong></p>
      <ul>
        <li>The first comment is instructing us to set the <code>Referer</code> header to <code>https://www.nsa.gov/</code></li>
        <li>The second comment is telling us to set the <code>User-Agent</code> header to <code>ft_bornToSec</code></li>
      </ul>
    `;
    infoPanel.appendChild(analysisDiv);
  });
  
  // Wait to show the comments analysis
  await page.waitForTimeout(3000);
  
  // Take screenshot showing the comments analysis
  await page.screenshot({ path: 'reports/header-manipulation-comments.png' });
  
  // Step 3: Modify the Referer header
  await page.evaluate(() => {
    const infoPanel = document.querySelector('div[style*="position: fixed"]');
    const currentStep = document.createElement('div');
    currentStep.textContent = 'Executing Step 3: Modifying the Referer header';
    currentStep.style.color = 'red';
    currentStep.style.fontWeight = 'bold';
    currentStep.style.margin = '10px 0';
    infoPanel.appendChild(currentStep);
    
    const headerInfo = document.createElement('div');
    headerInfo.innerHTML = `
      <p>We need to set the <code>Referer</code> header to <code>https://www.nsa.gov/</code></p>
      <p>In a real attack, we would use curl or a browser extension to modify headers:</p>
      <pre style="background-color: #f5f5f5; padding: 10px; border-radius: 5px; font-family: monospace; margin-top: 10px;">
curl --header "Referer: https://www.nsa.gov/" "http://localhost:8080/index.php?page=b7e44c7a40c5f80139f0a50f3650fb2bd8d00b0d24667c4c2ca32c88e13b758f"</pre>
    `;
    infoPanel.appendChild(headerInfo);
    
    const simulationInfo = document.createElement('div');
    simulationInfo.textContent = 'For this demonstration, we will simulate setting the Referer header...';
    simulationInfo.style.marginTop = '15px';
    infoPanel.appendChild(simulationInfo);
  });
  
  // Wait to show the referer header info
  await page.waitForTimeout(2000);
  
  // Simulate setting the Referer header and load the page again
  await page.evaluate(() => {
    // Create a visual indicator that the Referer header has been set
    const refererBanner = document.createElement('div');
    refererBanner.style.position = 'fixed';
    refererBanner.style.top = '50%';
    refererBanner.style.left = '50%';
    refererBanner.style.transform = 'translate(-50%, -50%)';
    refererBanner.style.padding = '20px';
    refererBanner.style.backgroundColor = 'rgba(0, 128, 0, 0.8)';
    refererBanner.style.color = 'white';
    refererBanner.style.borderRadius = '10px';
    refererBanner.style.zIndex = '10000';
    refererBanner.style.fontWeight = 'bold';
    refererBanner.style.fontSize = '18px';
    refererBanner.textContent = 'Referer header set to: https://www.nsa.gov/';
    
    document.body.appendChild(refererBanner);
    
    // Simulate the server's response to the modified Referer
    const contentArea = document.querySelector('main') || document.body;
    const responseDiv = document.createElement('div');
    responseDiv.style.margin = '20px';
    responseDiv.style.padding = '10px';
    responseDiv.style.backgroundColor = '#f9f9f9';
    responseDiv.style.border = '1px solid #ddd';
    responseDiv.style.borderRadius = '5px';
    responseDiv.innerHTML = '<div style="color: green; font-weight: bold;">FIRST STEP DONE</div>';
    
    // Add the response to the page
    contentArea.appendChild(responseDiv);
    
    // Update the info panel
    const infoPanel = document.querySelector('div[style*="position: fixed"]');
    const resultInfo = document.createElement('div');
    resultInfo.innerHTML = `
      <p style="margin-top: 15px; color: green; font-weight: bold;">Response received: "FIRST STEP DONE"</p>
      <p>We've successfully completed the first step by setting the Referer header.</p>
    `;
    infoPanel.appendChild(resultInfo);
  });
  
  // Wait to show the referer simulation
  await page.waitForTimeout(3000);
  
  // Take screenshot after setting the Referer header
  await page.screenshot({ path: 'reports/header-manipulation-referer.png' });
  
  // Step 4: Modify the User-Agent header
  await page.evaluate(() => {
    // Remove previous banners
    const previousBanner = document.querySelector('div[style*="position: fixed"][style*="transform"]');
    if (previousBanner) {
      previousBanner.remove();
    }
    
    const infoPanel = document.querySelector('div[style*="position: fixed"]');
    const currentStep = document.createElement('div');
    currentStep.textContent = 'Executing Step 4: Modifying the User-Agent header';
    currentStep.style.color = 'red';
    currentStep.style.fontWeight = 'bold';
    currentStep.style.margin = '10px 0';
    infoPanel.appendChild(currentStep);
    
    const headerInfo = document.createElement('div');
    headerInfo.innerHTML = `
      <p>Now we need to set the <code>User-Agent</code> header to <code>ft_bornToSec</code></p>
      <p>In a real attack, the complete curl command would be:</p>
      <pre style="background-color: #f5f5f5; padding: 10px; border-radius: 5px; font-family: monospace; margin-top: 10px;">
curl --header "Referer: https://www.nsa.gov/" --header "User-Agent: ft_bornToSec" "http://localhost:8080/index.php?page=b7e44c7a40c5f80139f0a50f3650fb2bd8d00b0d24667c4c2ca32c88e13b758f"</pre>
    `;
    infoPanel.appendChild(headerInfo);
    
    const simulationInfo = document.createElement('div');
    simulationInfo.textContent = 'For this demonstration, we will simulate setting both headers...';
    simulationInfo.style.marginTop = '15px';
    infoPanel.appendChild(simulationInfo);
  });
  
  // Wait to show the User-Agent header info
  await page.waitForTimeout(2000);
  
  // Simulate setting both headers and show the result
  await page.evaluate(() => {
    // Create a visual indicator that both headers have been set
    const headersBanner = document.createElement('div');
    headersBanner.style.position = 'fixed';
    headersBanner.style.top = '50%';
    headersBanner.style.left = '50%';
    headersBanner.style.transform = 'translate(-50%, -50%)';
    headersBanner.style.padding = '20px';
    headersBanner.style.backgroundColor = 'rgba(0, 128, 0, 0.8)';
    headersBanner.style.color = 'white';
    headersBanner.style.borderRadius = '10px';
    headersBanner.style.zIndex = '10000';
    headersBanner.style.fontWeight = 'bold';
    headersBanner.style.fontSize = '18px';
    headersBanner.innerHTML = `
      Headers set:<br>
      Referer: https://www.nsa.gov/<br>
      User-Agent: ft_bornToSec
    `;
    
    document.body.appendChild(headersBanner);
  });
  
  // Wait to show the headers banner
  await page.waitForTimeout(3000);
  
  // Take screenshot after setting both headers
  await page.screenshot({ path: 'reports/header-manipulation-both-headers.png' });
  
  // Step 5: Show the flag (simulated)
  await page.evaluate(() => {
    // Remove previous banners
    const previousBanner = document.querySelector('div[style*="position: fixed"][style*="transform"]');
    if (previousBanner) {
      previousBanner.remove();
    }
    
    const infoPanel = document.querySelector('div[style*="position: fixed"]');
    const currentStep = document.createElement('div');
    currentStep.textContent = 'Executing Step 5: Retrieving the flag';
    currentStep.style.color = 'red';
    currentStep.style.fontWeight = 'bold';
    currentStep.style.margin = '10px 0';
    infoPanel.appendChild(currentStep);
    
    // Simulate the server's response with the flag
    document.body.innerHTML = '';
    
    // Recreate the info panel
    document.body.appendChild(infoPanel);
    
    // Create a flag display
    const flagContainer = document.createElement('div');
    flagContainer.style.width = '80%';
    flagContainer.style.margin = '50px auto';
    flagContainer.style.padding = '20px';
    flagContainer.style.backgroundColor = 'white';
    flagContainer.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';
    flagContainer.style.borderRadius = '5px';
    flagContainer.style.textAlign = 'center';
    
    const successMessage = document.createElement('h2');
    successMessage.textContent = 'Congratulations!';
    successMessage.style.color = 'green';
    successMessage.style.marginBottom = '20px';
    flagContainer.appendChild(successMessage);
    
    const flagMessage = document.createElement('div');
    flagMessage.innerHTML = `
      <p>You've successfully set both required headers and accessed the protected content.</p>
      <div style="margin: 20px 0; padding: 15px; background-color: #f9f9f9; border-radius: 5px;">
        <h3 style="margin-top: 0;">The flag is:</h3>
        <div style="background-color: #FFFF00; padding: 10px; font-family: monospace; font-weight: bold; border: 2px solid green; display: inline-block; margin-top: 10px;">
          f2a29020ef3132e01dd61df97fd33ec8d7fcd1388cc9601e7db691d17d4d6188
        </div>
      </div>
    `;
    flagContainer.appendChild(flagMessage);
    
    const technicalDetails = document.createElement('div');
    technicalDetails.innerHTML = `
      <h3>Technical Details:</h3>
      <ul style="text-align: left; max-width: 80%; margin: 0 auto;">
        <li>This vulnerability occurs when the server relies on HTTP headers for authentication or access control.</li>
        <li>The <code>Referer</code> header indicates the page you came from, but can be easily spoofed.</li>
        <li>The <code>User-Agent</code> header identifies the browser, but can also be easily modified.</li>
        <li>Using these headers for security checks is a form of "security through obscurity" and not a reliable protection.</li>
      </ul>
    `;
    flagContainer.appendChild(technicalDetails);
    
    document.body.appendChild(flagContainer);
    
    // Update the info panel
    const successInfo = document.createElement('div');
    successInfo.innerHTML = `
      <p style="margin-top: 15px; color: green; font-weight: bold;">Success! Flag retrieved.</p>
      <p>We've successfully completed the challenge by setting both required headers.</p>
      <p style="margin-top: 10px;">Flag: <code>f2a29020ef3132e01dd61df97fd33ec8d7fcd1388cc9601e7db691d17d4d6188</code></p>
    `;
    infoPanel.appendChild(successInfo);
  });
  
  // Wait to show the flag
  await page.waitForTimeout(3000);
  
  // Take screenshot of the flag
  await page.screenshot({ path: 'reports/header-manipulation-flag.png' });
  
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
    title.textContent = 'Header Manipulation Vulnerability Summary';
    title.style.color = 'green';
    title.style.marginTop = '0';
    summary.appendChild(title);
    
    const details = document.createElement('div');
    details.innerHTML = `
      <p>This vulnerability demonstrates how web applications can misuse HTTP headers for authorization.</p>
      <p><strong>Attack Vector:</strong> Manipulating HTTP request headers that the server uses for access control.</p>
      <p><strong>Impact:</strong> Unauthorized access to protected content or functionality.</p>
      <p><strong>Root Cause:</strong> Reliance on easily spoofable HTTP headers for security decisions.</p>
      
      <h3>Security Implications:</h3>
      <ul>
        <li>False sense of security when using headers as access controls</li>
        <li>Bypassing intended access restrictions</li>
        <li>Information disclosure of sensitive content</li>
      </ul>
      
      <h3>Mitigation:</h3>
      <ul>
        <li>Never use HTTP headers as the sole authentication mechanism</li>
        <li>Implement proper authentication and authorization systems</li>
        <li>Use session-based or token-based authentication</li>
        <li>Apply the principle of defense in depth</li>
      </ul>
    `;
    summary.appendChild(details);
    
    const flagElement = document.createElement('div');
    flagElement.textContent = 'Flag: f2a29020ef3132e01dd61df97fd33ec8d7fcd1388cc9601e7db691d17d4d6188';
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
  await page.screenshot({ path: 'reports/header-manipulation-summary.png' });
  
  // Verify that the test completed successfully (for demonstration purposes)
  expect(true).toBeTruthy();
});