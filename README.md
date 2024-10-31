# Playwright Ubiquiti Test Saucelab application

## Overview
This project leverages Playwright to automate tests for Saucelab applications, ensuring quality, reliability, and consistent user experiences. This guide provides steps to set up the testing environment and manage configuration with environment variables.

## Installation
Follow these steps to set up the project:

1. Initialize a new Playwright project:
    ```sh
    npx playwright install
    ```
    This command will guide you through setting up a new Playwright project. It will create the necessary configuration files and install Playwright.

2. Install the `dotenv` package to manage environment variables:
    ```sh
    npm i dotenv
    ```
    The `dotenv` package is used to load environment variables from a `.env` file into `process.env` simplifying configuration management by keeping sensitive or environment-specific data separate from the codebase.

## Install Playwright Test for VSCode (Optional)
For an easier and more integrated testing experience, install the Playwright Test for VSCode extension. This extension provides features such as running tests directly from the editor, viewing test results, and navigating through failures.

<img width="1505" alt="image" src="https://github.com/user-attachments/assets/a2d88624-69c3-4a7b-b145-c24ade14c7ad">

Follow these steps to install Playwright Test for VSCode extension:

1. Open Extensions in VSCode.
2. Search for `Playwright Test for VSCode`.
3. Click `Install`.

After installation, you can run and debug Playwright tests directly within the VSCode interface, making test execution and result analysis more convenient.

## Types of Tests
In this project, we implement various types of tests to ensure comprehensive coverage and maintain high-quality standards:

### API (Smoke Tests)
API tests, often referred to as smoke tests, are designed to quickly verify that the core functionalities of the application are working as expected. These tests are typically run after each build to ensure that the application is stable and ready for further testing.

### UI Tests

#### Functional Tests
Functional tests focus on verifying that specific features of the application work as intended. These tests interact with the UI elements and validate that the application behaves correctly according to the requirements.

#### End-to-End (E2E) Tests
End-to-end tests simulate real user scenarios and test the entire application flow from start to finish. These tests ensure that the application behaves correctly in a production-like environment, covering the complete user journey.

### Visual Comparison Tests
Visual comparison tests are used to ensure that the UI of the application appears as expected. These tests compare the current UI against a baseline image to detect any unintended visual changes. This helps in maintaining a consistent user experience and catching visual regressions.

By implementing these types of tests, we can ensure that the Saucelab application is thoroughly tested and maintains high standards of quality and reliability.

### Running Tests
To ensure the quality and reliability of the Saucelab application, we have implemented various tests. Below are the instructions to run these tests from the root directory in the terminal.

#### Run API Tests Commands
To run the API tests, use the following commands:

```sh
npx playwright test pokemon.spec.ts
npx playwright test tests/api/sauceLab.spec.ts
```

#### Run All UI Tests Commands
To run all UI tests, use the following command:
```sh
npx playwright test tests/ui
```

Debug Singular Test
To debug a specific test, use the following command:
```sh
npx playwright test tests/ui/5_e2e_test/e2e_test.spec.ts --debug
````
Run Test in Specific Browser
If you want to run a test in a specific browser, you can use the --project flag:
```sh
npx playwright test tests/ui/5_e2e_test/e2e_test.spec.ts --project=chromium
npx playwright test tests/ui/5_e2e_test/e2e_test.spec.ts --project=firefox
npx playwright test tests/ui/5_e2e_test/e2e_test.spec.ts --project=webkit
```
