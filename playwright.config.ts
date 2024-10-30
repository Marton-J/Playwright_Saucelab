import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'https://www.saucedemo.com/',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  expect: {
    // Set a higher threshold for toMatchScreenshot for visual tests, to fail test and ser report set it below 0.16
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.17,
    },
  },
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 3,
  workers: 5,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['junit', { outputFile: 'test-results/results.xml' }]
  ],
  outputDir: 'test-results/',
  /* Configure projects for major browsers */
  projects: [

    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: {
          args: ['--ignore-certificate-errors'],
          headless: true,
        },
        viewport: {
          width: 1920,
          height: 1080,
        },
      },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  timeout: 10000,
});
