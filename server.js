const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Available tests
const tests = [
    { id: 'hidden-input', name: 'Hidden Input', description: 'Demonstrates security breach via modifying hidden form fields' },
    { id: 'parameter-tampering', name: 'Parameter Tampering', description: 'Demonstrates security breach via URL parameter manipulation' },
    { id: 'cookie-tampering', name: 'Cookie Tampering', description: 'Demonstrates security breach by modifying cookies' },
    { id: 'data-tampering', name: 'Data Tampering', description: 'Demonstrates security breach via form data manipulation' },
    { id: 'sql-injection-members', name: 'SQL Injection (Members)', description: 'Demonstrates SQL injection vulnerability in the members page' },
    { id: 'sql-injection-images', name: 'SQL Injection (Images)', description: 'Demonstrates SQL injection vulnerability in the image search page' },
    { id: 'brute-force', name: 'Brute Force', description: 'Demonstrates brute force attack against the login form' },
    { id: 'path-traversal', name: 'Path Traversal', description: 'Demonstrates directory traversal vulnerability to access sensitive files' },
    { id: 'robots-txt-enumeration', name: 'Robots.txt Enumeration', description: 'Demonstrates information disclosure through robots.txt file' },
    { id: 'xss-feedback', name: 'XSS Feedback', description: 'Demonstrates Cross-Site Scripting vulnerability in the feedback form' },
    { id: 'xss-data-object', name: 'XSS Data Object', description: 'Demonstrates XSS vulnerability using data URIs in object tags' },
    { id: 'content-type-attack', name: 'Content Type Attack', description: 'Demonstrates file upload vulnerability by spoofing content types' },
    { id: 'header-manipulation', name: 'Header Manipulation', description: 'Demonstrates vulnerability in handling HTTP headers' },
    { id: 'scraping-hidden-path', name: 'Scraping Hidden Path', description: 'Demonstrates finding hidden flags through recursive scraping' }
];

// Routes
app.get('/', (req, res) => {
    res.render('index', { tests });
});

// When running tests, make sure we use the correct base URL
app.post('/run-test', (req, res) => {
    const testId = req.body.testId;
    const testFile = `tests/${testId}.spec.js`;

    if (!fs.existsSync(testFile)) {
        return res.status(404).send('Test not found');
    }

    // Use the BASE_URL environment variable 
    const baseUrl = process.env.BASE_URL || 'http://localhost:8080';
    exec(`npx playwright test ${testFile} --headed --project=chromium`, (error, stdout, stderr) => {
        console.log('Test complete:', stdout);
        if (error) {
            console.error('Error running test:', stderr);
        }
        res.redirect('/');
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});