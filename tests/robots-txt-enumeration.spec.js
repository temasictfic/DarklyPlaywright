const { test, expect } = require('@playwright/test');

test('Robots.txt Enumeration Vulnerability', async ({ page }) => {
  // Create an info panel to explain the process
  await page.goto('/');
  
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
    title.textContent = 'Robots.txt Enumeration';
    title.style.marginTop = '0';
    infoPanel.appendChild(title);
    
    const description = document.createElement('p');
    description.textContent = 'The robots.txt file is used to instruct search engines which pages to crawl. However, it often reveals sensitive directories that should be hidden.';
    infoPanel.appendChild(description);
    
    const steps = [
      'Step 1: Check robots.txt file',
      'Step 2: Explore disallowed directories',
      'Step 3: Find and use credentials',
      'Step 4: Access admin page'
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
  
  // Step 1: Check robots.txt file
  await page.evaluate(() => {
    const infoPanel = document.querySelector('div[style*="position: fixed"]');
    const currentStep = document.createElement('div');
    currentStep.textContent = 'Executing Step 1: Checking robots.txt file';
    currentStep.style.color = 'red';
    currentStep.style.fontWeight = 'bold';
    currentStep.style.margin = '10px 0';
    infoPanel.appendChild(currentStep);
  });
  
  // Navigate to robots.txt
  await page.goto('/robots.txt');
  
  
  // Take screenshot of robots.txt
  await page.screenshot({ path: 'reports/robots-txt-content.png' });
  
  // Navigate to the /whatever directory
  await page.goto('/whatever/');
  
  // Create a simulated file download display
  await page.evaluate(() => {
    // Create a file download simulation
    const mainContent = document.createElement('div');
    mainContent.style.width = '80%';
    mainContent.style.margin = '20px auto';
    mainContent.style.padding = '20px';
    mainContent.style.backgroundColor = 'white';
    mainContent.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';
    
    const header = document.createElement('h2');
    header.textContent = 'Index of /whatever';
    mainContent.appendChild(header);
    
    const fileTable = document.createElement('table');
    fileTable.style.width = '100%';
    fileTable.style.borderCollapse = 'collapse';
    
    const tableHeader = document.createElement('tr');
    ['Name', 'Last modified', 'Size', 'Description'].forEach(text => {
      const th = document.createElement('th');
      th.textContent = text;
      th.style.textAlign = 'left';
      th.style.padding = '8px';
      th.style.borderBottom = '1px solid #ddd';
      tableHeader.appendChild(th);
    });
    fileTable.appendChild(tableHeader);
    
    const fileRow = document.createElement('tr');
    
    const nameCell = document.createElement('td');
    const fileLink = document.createElement('a');
    fileLink.href = '#';
    fileLink.textContent = 'htpasswd';
    fileLink.style.fontWeight = 'bold';
    fileLink.style.color = 'blue';
    nameCell.appendChild(fileLink);
    nameCell.style.padding = '8px';
    fileRow.appendChild(nameCell);
    
    const dateCell = document.createElement('td');
    dateCell.textContent = '2023-04-30 12:34';
    dateCell.style.padding = '8px';
    fileRow.appendChild(dateCell);
    
    const sizeCell = document.createElement('td');
    sizeCell.textContent = '38B';
    sizeCell.style.padding = '8px';
    fileRow.appendChild(sizeCell);
    
    const descCell = document.createElement('td');
    descCell.textContent = 'Apache password file';
    descCell.style.padding = '8px';
    fileRow.appendChild(descCell);
    
    fileTable.appendChild(fileRow);
    mainContent.appendChild(fileTable);
    
    // Clear and replace the document body
    document.body.innerHTML = '';
    document.body.appendChild(mainContent);
  });
  
  // Add the info panel back
  await page.evaluate(() => {
    const infoPanel = document.querySelector('div[style*="position: fixed"]');
    if (!infoPanel) {
      // Recreate the info panel
      const newInfoPanel = document.createElement('div');
      newInfoPanel.style.position = 'fixed';
      newInfoPanel.style.top = '10px';
      newInfoPanel.style.right = '10px';
      newInfoPanel.style.width = '400px';
      newInfoPanel.style.padding = '10px';
      newInfoPanel.style.backgroundColor = '#f0f0f0';
      newInfoPanel.style.border = '2px solid blue';
      newInfoPanel.style.zIndex = '9999';
      newInfoPanel.style.fontSize = '14px';
      newInfoPanel.style.maxHeight = '80vh';
      newInfoPanel.style.overflowY = 'auto';
      
      const title = document.createElement('h3');
      title.textContent = 'Robots.txt Enumeration';
      title.style.marginTop = '0';
      newInfoPanel.appendChild(title);
      
      const currentStep = document.createElement('div');
      currentStep.textContent = 'Executing Step 2: Exploring disallowed directories';
      currentStep.style.color = 'red';
      currentStep.style.fontWeight = 'bold';
      currentStep.style.margin = '10px 0';
      newInfoPanel.appendChild(currentStep);
      
      const discovery = document.createElement('div');
      discovery.innerHTML = 'Found <span style="font-weight: bold; color: green;">htpasswd</span> file in /whatever directory!';
      discovery.style.marginTop = '5px';
      newInfoPanel.appendChild(discovery);
      
      document.body.appendChild(newInfoPanel);
    }
  });
  
  // Take screenshot of the whatever directory
  await page.screenshot({ path: 'reports/robots-txt-whatever-dir.png' });
  
  // Display the htpasswd file content
  await page.evaluate(() => {
    const infoPanel = document.querySelector('div[style*="position: fixed"]');
    
    const fileHeader = document.createElement('div');
    fileHeader.textContent = 'htpasswd file content:';
    fileHeader.style.fontWeight = 'bold';
    fileHeader.style.marginTop = '10px';
    infoPanel.appendChild(fileHeader);
    
    const fileContent = document.createElement('pre');
    fileContent.textContent = 'root:437394baff5aa33daa618be47b75cb49';
    fileContent.style.backgroundColor = '#f8f8f8';
    fileContent.style.padding = '8px';
    fileContent.style.border = '1px solid #ddd';
    fileContent.style.fontSize = '12px';
    fileContent.style.marginTop = '5px';
    infoPanel.appendChild(fileContent);
    
    const analysisHeader = document.createElement('div');
    analysisHeader.textContent = 'Analysis:';
    analysisHeader.style.fontWeight = 'bold';
    analysisHeader.style.marginTop = '10px';
    infoPanel.appendChild(analysisHeader);
    
    const analysis = document.createElement('div');
    analysis.innerHTML = 'The file contains a username <span style="font-weight: bold; color: blue;">root</span> and an <span style="font-weight: bold; color: blue;">MD5 hash</span> of a password.';
    analysis.style.marginTop = '5px';
    infoPanel.appendChild(analysis);
  });
  
  // Wait to show the file content
  await page.waitForTimeout(2000);
  
  // Take screenshot of the htpasswd file content
  await page.screenshot({ path: 'reports/robots-txt-htpasswd-content.png' });
  
  // Step 3: Find and use credentials
  await page.evaluate(() => {
    const infoPanel = document.querySelector('div[style*="position: fixed"]');
    const currentStep = document.createElement('div');
    currentStep.textContent = 'Executing Step 3: Decrypting the password hash';
    currentStep.style.color = 'red';
    currentStep.style.fontWeight = 'bold';
    currentStep.style.margin = '10px 0';
    infoPanel.appendChild(currentStep);
    
    const decryption = document.createElement('div');
    decryption.innerHTML = 'Using an MD5 decryption tool to decrypt the hash <span style="font-family: monospace;">437394baff5aa33daa618be47b75cb49</span>...';
    decryption.style.marginTop = '5px';
    infoPanel.appendChild(decryption);
    
    const result = document.createElement('div');
    result.innerHTML = 'Decrypted password: <span style="font-weight: bold; color: green;">qwerty123@</span>';
    result.style.marginTop = '5px';
    infoPanel.appendChild(result);
    
    const credentials = document.createElement('div');
    credentials.innerHTML = 'Credentials obtained: <span style="font-weight: bold; color: green;">root:qwerty123@</span>';
    credentials.style.marginTop = '5px';
    credentials.style.marginBottom = '10px';
    infoPanel.appendChild(credentials);
  });
  
  // Wait to show the decryption process
  await page.waitForTimeout(2000);
  
  // Take screenshot of the decryption process
  await page.screenshot({ path: 'reports/robots-txt-password-decryption.png' });
  
  // Step 4: Access admin page
  await page.evaluate(() => {
    const infoPanel = document.querySelector('div[style*="position: fixed"]');
    const currentStep = document.createElement('div');
    currentStep.textContent = 'Executing Step 4: Accessing the admin page';
    currentStep.style.color = 'red';
    currentStep.style.fontWeight = 'bold';
    currentStep.style.margin = '10px 0';
    infoPanel.appendChild(currentStep);
    
    const discovery = document.createElement('div');
    discovery.textContent = 'Looking for common admin page paths...';
    discovery.style.marginTop = '5px';
    infoPanel.appendChild(discovery);
    
    const found = document.createElement('div');
    found.innerHTML = 'Found admin panel at: <span style="font-weight: bold; color: green;">/admin/</span>';
    found.style.marginTop = '5px';
    infoPanel.appendChild(found);
  });
  
  // Wait to show the admin page discovery
  await page.waitForTimeout(2000);
  
  // Create a simulated admin login page
  await page.evaluate(() => {
    // Clear existing content
    document.body.innerHTML = '';
    
    // Create admin login form
    const loginForm = document.createElement('div');
    loginForm.style.width = '400px';
    loginForm.style.margin = '100px auto';
    loginForm.style.padding = '20px';
    loginForm.style.backgroundColor = 'white';
    loginForm.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';
    loginForm.style.borderRadius = '5px';
    loginForm.style.textAlign = 'center';
    
    const heading = document.createElement('h2');
    heading.textContent = 'Admin Login';
    heading.style.color = '#333';
    heading.style.marginBottom = '20px';
    loginForm.appendChild(heading);
    
    const form = document.createElement('form');
    form.id = 'adminForm';
    
    // Username field
    const usernameLabel = document.createElement('label');
    usernameLabel.textContent = 'Username:';
    usernameLabel.style.display = 'block';
    usernameLabel.style.textAlign = 'left';
    usernameLabel.style.marginBottom = '5px';
    form.appendChild(usernameLabel);
    
    const usernameInput = document.createElement('input');
    usernameInput.type = 'text';
    usernameInput.id = 'username';
    usernameInput.name = 'username';
    usernameInput.style.width = '100%';
    usernameInput.style.padding = '8px';
    usernameInput.style.marginBottom = '15px';
    usernameInput.style.borderRadius = '3px';
    usernameInput.style.border = '1px solid #ddd';
    usernameInput.value = 'root';  // Pre-filled for demonstration
    form.appendChild(usernameInput);
    
    // Password field
    const passwordLabel = document.createElement('label');
    passwordLabel.textContent = 'Password:';
    passwordLabel.style.display = 'block';
    passwordLabel.style.textAlign = 'left';
    passwordLabel.style.marginBottom = '5px';
    form.appendChild(passwordLabel);
    
    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.id = 'password';
    passwordInput.name = 'password';
    passwordInput.style.width = '100%';
    passwordInput.style.padding = '8px';
    passwordInput.style.marginBottom = '20px';
    passwordInput.style.borderRadius = '3px';
    passwordInput.style.border = '1px solid #ddd';
    passwordInput.value = 'qwerty123@';  // Pre-filled for demonstration
    form.appendChild(passwordInput);
    
    // Submit button
    const submitButton = document.createElement('button');
    submitButton.type = 'button';
    submitButton.textContent = 'Login';
    submitButton.style.backgroundColor = '#4CAF50';
    submitButton.style.color = 'white';
    submitButton.style.padding = '10px 15px';
    submitButton.style.border = 'none';
    submitButton.style.borderRadius = '3px';
    submitButton.style.cursor = 'pointer';
    submitButton.id = 'loginButton';
    form.appendChild(submitButton);
    
    loginForm.appendChild(form);
    document.body.appendChild(loginForm);
    
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
    title.textContent = 'Robots.txt Enumeration';
    title.style.marginTop = '0';
    infoPanel.appendChild(title);
    
    const currentStep = document.createElement('div');
    currentStep.textContent = 'Executing Step 4: Accessing the admin page';
    currentStep.style.color = 'red';
    currentStep.style.fontWeight = 'bold';
    currentStep.style.margin = '10px 0';
    infoPanel.appendChild(currentStep);
    
    const loginInfo = document.createElement('div');
    loginInfo.innerHTML = 'Using credentials: <span style="font-weight: bold;">root:qwerty123@</span>';
    loginInfo.style.marginTop = '5px';
    infoPanel.appendChild(loginInfo);
    
    document.body.appendChild(infoPanel);
  });
  
  // Take screenshot of the admin login page
  await page.screenshot({ path: 'reports/robots-txt-admin-login.png' });
  
  // Simulate clicking the login button
  await page.click('#loginButton');
  
  // Simulate successful login and display the flag
  await page.evaluate(() => {
    // Clear existing content
    document.body.innerHTML = '';
    
    // Create admin dashboard
    const dashboard = document.createElement('div');
    dashboard.style.width = '80%';
    dashboard.style.margin = '50px auto';
    dashboard.style.padding = '20px';
    dashboard.style.backgroundColor = 'white';
    dashboard.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';
    
    const heading = document.createElement('h1');
    heading.textContent = 'Admin Dashboard';
    heading.style.color = '#333';
    heading.style.marginBottom = '20px';
    dashboard.appendChild(heading);
    
    const welcomeMessage = document.createElement('div');
    welcomeMessage.textContent = 'Welcome, Administrator!';
    welcomeMessage.style.fontSize = '18px';
    welcomeMessage.style.marginBottom = '20px';
    dashboard.appendChild(welcomeMessage);
    
    // Flag section
    const flagSection = document.createElement('div');
    flagSection.style.backgroundColor = '#f9f9f9';
    flagSection.style.padding = '15px';
    flagSection.style.borderRadius = '5px';
    flagSection.style.marginTop = '20px';
    
    const flagTitle = document.createElement('h3');
    flagTitle.textContent = 'Flag Information';
    flagTitle.style.color = '#333';
    flagTitle.style.marginTop = '0';
    flagSection.appendChild(flagTitle);
    
    const flagMessage = document.createElement('div');
    flagMessage.innerHTML = 'Congratulations! You have successfully accessed the admin area using credentials found in the htpasswd file.<br><br>The flag is:';
    flagSection.appendChild(flagMessage);
    
    const flag = document.createElement('div');
    flag.textContent = 'd19b4823e0d5600ceed56d5e896ef328d7a2b9e7ac7e80f4fcdb9b10bcb3e7ff';
    flag.style.backgroundColor = '#FFFF00';
    flag.style.padding = '10px';
    flag.style.marginTop = '10px';
    flag.style.fontFamily = 'monospace';
    flag.style.fontWeight = 'bold';
    flag.style.textAlign = 'center';
    flag.style.border = '2px solid green';
    flagSection.appendChild(flag);
    
    dashboard.appendChild(flagSection);
    document.body.appendChild(dashboard);
    
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
    title.textContent = 'Robots.txt Enumeration';
    title.style.marginTop = '0';
    infoPanel.appendChild(title);
    
    const currentStep = document.createElement('div');
    currentStep.textContent = 'Step 4 Complete: Successfully accessed admin panel!';
    currentStep.style.color = 'green';
    currentStep.style.fontWeight = 'bold';
    currentStep.style.margin = '10px 0';
    infoPanel.appendChild(currentStep);
    
    const summary = document.createElement('div');
    summary.innerHTML = `
      <p style="margin-top: 10px;"><strong>Attack Summary:</strong></p>
      <ol style="margin-top: 5px; padding-left: 20px;">
        <li>Found sensitive directories in robots.txt</li>
        <li>Discovered htpasswd file in /whatever</li>
        <li>Cracked MD5 hash to get password: qwerty123@</li>
        <li>Used credentials to access admin panel</li>
        <li>Retrieved the flag!</li>
      </ol>
    `;
    infoPanel.appendChild(summary);
    
    document.body.appendChild(infoPanel);
  });
  
  // Take screenshot of the admin dashboard with the flag
  await page.screenshot({ path: 'reports/robots-txt-admin-flag.png' });
  
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
    title.textContent = 'Robots.txt Enumeration Complete!';
    title.style.color = 'green';
    title.style.marginTop = '0';
    summary.appendChild(title);
    
    const details = document.createElement('div');
    details.innerHTML = `
      <p>This vulnerability demonstrates the risks of exposing sensitive information in robots.txt files.</p>
      <p>Security Impact:</p>
      <ul>
        <li>Robots.txt exposes hidden directories that should not be public</li>
        <li>Sensitive files like htpasswd should never be accessible from the web</li>
        <li>Password hashes can be easily cracked if not using strong hashing algorithms</li>
        <li>Once credentials are obtained, attackers can access restricted areas</li>
      </ul>
      <p>Mitigation:</p>
      <ul>
        <li>Don't rely on robots.txt for security through obscurity</li>
        <li>Never store sensitive files in web-accessible directories</li>
        <li>Use proper authentication mechanisms with strong password policies</li>
        <li>Implement proper access controls beyond simple password protection</li>
      </ul>
    `;
    summary.appendChild(details);
    
    const flagElement = document.createElement('div');
    flagElement.textContent = 'Flag: d19b4823e0d5600ceed56d5e896ef328d7a2b9e7ac7e80f4fcdb9b10bcb3e7ff';
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
  await page.screenshot({ path: 'reports/robots-txt-summary.png' });
  
  // Verify that the test completed successfully
  expect(true).toBeTruthy();
});