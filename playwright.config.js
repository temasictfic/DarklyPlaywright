// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
    testDir: './tests',
    fullyParallel: false,
    forbidOnly: !!process.env.CI,
    retries: 0,
    workers: 1,
    reporter: 'html',
    use: {
        baseURL: process.env.BASE_URL || 'http://localhost:8080',
        trace: 'on',
        video: 'on',
        screenshot: 'on',
        // Slow down actions by 1000ms for demo
        launchOptions: {
            slowMo: 500
        }
    },
    timeout: 120000,
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});