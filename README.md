# Darkly Security Testing Automation

This project provides a comprehensive solution for automating security vulnerability demonstrations for the Darkly project. It uses Playwright to visually demonstrate web security vulnerabilities through automated browser interactions.

## Overview

The Darkly project is designed to introduce you to the world of web application security. This automated testing solution allows you to:

1. Visually see how vulnerabilities are exploited
2. Understand the security concepts behind each vulnerability
3. Automatically capture flags from various challenges
4. Demonstrate these vulnerabilities

## Prerequisites

- The Darkly ISO file running with:
  ```
  qemu-system-x86_64 -drive file=Darkly_i386.iso,format=raw -m 4G -nic hostfwd=tcp:127.0.0.1:8080-:80
  ```
- Web server accessible at http://localhost:8080

## Getting Started

1. Clone this repository to your local machine.

2. Install Playwright extension [text](https://playwright.dev/docs/getting-started-vscode)

5. Select and run any of the vulnerability tests from the extension.

6. Alternatively, you can run tests from the command line:
   ```
   ./run-tests.sh list     # List all available tests
   ./run-tests.sh all      # Run all tests
   ./run-tests.sh <test>   # Run a specific test
   ```

## Available Vulnerability Tests

This solution currently automates the following vulnerabilities:

1. **Hidden Input** - Form field manipulation to bypass controls
2. **Parameter Tampering** - URL parameter manipulation
3. **Cookie Tampering** - Modifying cookies to gain unauthorized access
4. **Data Tampering** - Form data manipulation to exploit poor validation
5. **SQL Injection (Members)** - Database exploitation in the members page
6. **SQL Injection (Images)** - Database exploitation in the image search
7. **Brute Force** - Password guessing against the login form
8. **Path Traversal** - Accessing sensitive files using directory traversal
9. **Robots.txt Enumeration** - Information disclosure through robots.txt
10. **XSS Feedback** - Cross-site scripting in the feedback form
11. **XSS Data Object** - XSS using data URIs in object tags
12. **Content Type Attack** - File upload vulnerability via content type spoofing
13. **Header Manipulation** - Bypassing controls using HTTP headers
14. **Scraping Hidden Path** - Finding hidden flags through recursive scraping

## Test Details

### 1. Hidden Input Vulnerability

- **Location**: `/index.php?page=recover`
- **Vulnerability**: Hidden form field that can be modified
- **Flag**: `1d4855f7337c0c14b6f44946872c4eb33853f40b2d54393fbe94f49f1e19bbb0`

### 2. Parameter Tampering

- **Location**: `/index.php` (social media links)
- **Vulnerability**: Insecure redirect parameter
- **Flag**: `b9e775a0291fed784a2d9680fcfad7edd6b8cdf87648da647aaf4bba288bcab3`

### 3. Cookie Tampering

- **Location**: Any page with the "I_am_admin" cookie
- **Vulnerability**: MD5 hash of a boolean value in cookie
- **Flag**: `df2eb4ba34ed059a1e3e89ff4dfc13445f104a1a52295214def1c4fb1693a5c3`

### 4. Data Tampering

- **Location**: `/index.php?page=survey`
- **Vulnerability**: Client-side only form validation
- **Flag**: `03a944b434d5baff05f46c4bede5792551a2595574bcafc9a6e25f67c382ccaa`

### 5. SQL Injection (Members)

- **Location**: `/index.php?page=member`
- **Vulnerability**: Unsanitized user input in SQL query
- **Flag**: `10a16d834f9b1e4068b25c4c46fe0284e99e44dceaf08098fc83925ba6310ff5`

### 6. SQL Injection (Images)

- **Location**: `/index.php?page=searchimg`
- **Vulnerability**: Unsanitized user input in SQL query
- **Flag**: `f2a29020ef3132e01dd61df97fd33ec8d7fcd1388cc9601e7db691d17d4d6188`

### 7. Brute Force

- **Location**: `/index.php?page=signin`
- **Vulnerability**: No rate limiting or account lockout
- **Flag**: `b3a6e43ddf8b4bbb4125e5e7d23040433827759d4de1c04ea63907479a80a6b2`

### 8. Path Traversal

- **Location**: `/index.php?page=../../../[...]`
- **Vulnerability**: Insufficient path validation
- **Flag**: `b12c4b2cb8094750ae121a676269aa9e2872d07c06e429d25a63196ec1c8c1d0`

### 9. Robots.txt Enumeration

- **Location**: `/robots.txt`, `/whatever`, `/admin`
- **Vulnerability**: Information disclosure in robots.txt
- **Flag**: `d19b4823e0d5600ceed56d5e896ef328d7a2b9e7ac7e80f4fcdb9b10bcb3e7ff`

### 10. XSS Feedback

- **Location**: `/index.php?page=feedback`
- **Vulnerability**: Client-side only maxlength limitation
- **Flag**: `0fbb54bbf7d099713ca4be297e1bc7da0173d8b3c21c1811b916a3a86652724e`

### 11. XSS Data Object

- **Location**: `/index.php?page=media&src=nsa`
- **Vulnerability**: Unsanitized input in object tag
- **Flag**: `928d819fc19405ae09921a2b71227bd9aba106f9d2d37ac412e9e5a750f1506d`

### 12. Content Type Attack

- **Location**: `/index.php?page=upload`
- **Vulnerability**: Content-Type checking without content validation
- **Flag**: `46910d9ce35b385885a9f7e2b336249d622f29b267a1771fbacf52133beddba8`

### 13. Header Manipulation

- **Location**: `/index.php?page=b7e44c7a40c5f80139f0a50f3650fb2bd8d00b0d24667c4c2ca32c88e13b758f`
- **Vulnerability**: Reliance on HTTP headers for access control
- **Flag**: `f2a29020ef3132e01dd61df97fd33ec8d7fcd1388cc9601e7db691d17d4d6188`

### 14. Scraping Hidden Path

- **Location**: `/.hidden/`
- **Vulnerability**: Security through obscurity with nested directories
- **Flag**: `d5ea3cdf5c0fe01946ea8b9f0db8e4c8548730b70b341342f5c293733bedf7a`

## How the Tests Work

Each test follows a structured approach to demonstrate vulnerabilities:

1. **Exploration** - Identify vulnerable elements and explain the security issue
2. **Demonstration** - Step-by-step visual walkthrough of exploiting the vulnerability 
3. **Explanation** - Annotations highlighting what's happening at each stage
4. **Flag Capture** - Show the flag when successfully exploiting the vulnerability
5. **Security Analysis** - Explanation of the vulnerability and mitigation strategies

## Customizing Tests

You can customize the existing tests or add new ones:

1. Create a new test script in the `tests/` directory following the existing patterns
2. Add the test details to the `tests` array in `server.js`

## Security Considerations

This project is intended for educational purposes only. The techniques demonstrated here should only be used in controlled environments and with proper authorization. Never attempt to exploit vulnerabilities on systems without explicit permission.

## Additional Resources

For more information about the web vulnerabilities demonstrated in this project, check out:

- [OWASP Top Ten](https://owasp.org/www-project-top-ten/)
- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [PortSwigger Web Security Academy](https://portswigger.net/web-security)

## License

This project is provided for educational purposes only. Use at your own risk.