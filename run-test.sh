#!/bin/bash

# Check if the Darkly server is running
echo "Checking if Darkly server is accessible..."
if ! curl -s --head --request GET http://localhost:8080 | grep "200 OK" > /dev/null; then
  echo "Error: Darkly server does not appear to be running at http://localhost:8080"
  echo "Please make sure you've started the Darkly ISO with:"
  echo "qemu-system-x86_64 -drive file=Darkly_i386.iso,format=raw -m 4G -nic hostfwd=tcp:127.0.0.1:8080-:80"
  exit 1
fi

echo "Darkly server is accessible."

# Function to run a specific test
run_test() {
  test_name=$1
  echo "Running test: $test_name"
  
  # Check if the test exists
  if [ ! -f "tests/$test_name.spec.js" ]; then
    echo "Error: Test $test_name does not exist in the tests directory."
    exit 1
  fi
  
  # Run the test with Playwright
  npx playwright test tests/$test_name.spec.js --headed
  
  echo "Test completed: $test_name"
}

# Function to list all available tests
list_tests() {
  echo "Available tests:"
  echo "----------------------------------------"
  for test_file in tests/*.spec.js; do
    test_name=$(basename "$test_file" .spec.js)
    echo "- $test_name"
  done
  echo "----------------------------------------"
}

# Main execution logic
if [ "$1" == "all" ]; then
  echo "Running all tests..."
  npx playwright test --headed
elif [ "$1" == "list" ]; then
  list_tests
elif [ -n "$1" ]; then
  run_test "$1"
else
  echo "Usage:"
  echo "  $0 list                # List all available tests"
  echo "  $0 all                 # Run all tests"
  echo "  $0 <test-name>         # Run a specific test"
  echo ""
  echo "Examples:"
  echo "  $0 hidden-input        # Run only the hidden input test"
  echo "  $0 cookie-tampering    # Run only the cookie tampering test"
  list_tests
fi