const { test, expect } = require('@playwright/test');

test('Parameter Tampering Vulnerability', async ({ page }) => {
  // Navigate to the main page
  await page.goto('/index.php');
  
  // Highlight the social media icons
  const socialIcon = await page.locator('a.icon.fa-facebook');
  await socialIcon.evaluate(node => {
    node.style.border = '2px solid red';
    node.style.padding = '10px';
    node.style.display = 'inline-block';
  });
  
  // Wait to highlight the target element
  await page.waitForTimeout(2000);
  
  // Take screenshot before modification
  await page.screenshot({ path: 'reports/parameter-tampering-before.png' });
  
  // Display the original href
  const originalHref = await socialIcon.getAttribute('href');
  console.log('Original href:', originalHref);
  
  // Modify the href attribute to point to a different site
  await socialIcon.evaluate(node => {
    // Show the original link
    const originalText = document.createElement('div');
    originalText.textContent = 'Original: ' + node.href;
    originalText.style.color = 'blue';
    originalText.style.marginBottom = '10px';
    node.parentNode.insertBefore(originalText, node);
    
    // Change the link
    node.href = 'index.php?page=redirect&site=example.com';
    
    // Show the modified link
    const modifiedText = document.createElement('div');
    modifiedText.textContent = 'Modified: ' + node.href;
    modifiedText.style.color = 'red';
    modifiedText.style.marginBottom = '10px';
    node.parentNode.insertBefore(modifiedText, node);
  });
  
  // Wait to show the modified href
  await page.waitForTimeout(2000);
  
  // Take screenshot after modification
  await page.screenshot({ path: 'reports/parameter-tampering-modified.png' });
  
  // Click the modified link
  await socialIcon.click();
  
  // Wait for the flag to appear
  await page.waitForSelector('h2:has-text("Good Job")');
  
  // Highlight the flag
  const flagElement = await page.locator('h2:has-text("Good Job")');
  await flagElement.evaluate(node => {
    node.style.backgroundColor = '#FFFF00';
    node.style.padding = '10px';
    node.style.border = '2px solid green';
  });
  
  // Take screenshot of the flag
  await page.screenshot({ path: 'reports/parameter-tampering-flag.png' });
  
  // Extract the flag
  const flagText = await flagElement.textContent();
  console.log('FLAG FOUND:', flagText.trim());
  
  // Verify the flag is correct
  expect(flagText).toContain('b9e775a0291fed784a2d9680fcfad7edd6b8cdf87648da647aaf4bba288bcab3');
});