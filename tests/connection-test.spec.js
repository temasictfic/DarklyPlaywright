const { test, expect } = require('@playwright/test');

test('Verify connection to target website', async ({ page }) => {
  console.log('Using baseURL:', process.env.BASE_URL || 'http://localhost:8080');
  
  // Navigate to the main page
  await page.goto('/');
  
  // Take a screenshot of what we got
  await page.screenshot({ path: 'reports/connection-test.png' });
  
  // Check if we can see the BornToSec title or some other element that should be on the page
  const pageContent = await page.content();
  
  console.log('Page title:', await page.title());
  
  // Log the first 500 characters of the page content to see what we're getting
  console.log('Page content snippet:', pageContent.substring(0, 500));
  
  // Look for something that should be on the page
  const hasExpectedContent = pageContent.includes('BornToSec') || 
                             pageContent.includes('Darkly') || 
                             pageContent.includes('Web');
  
  expect(hasExpectedContent).toBeTruthy();
});