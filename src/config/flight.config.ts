import { PlaywrightTestConfig } from '@playwright/test';
import path from 'path';
import dotenv from 'dotenv'

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const config: PlaywrightTestConfig = {
  timeout: 900000,
  retries: 1,
  testDir: '../tests/',
  reporter: 'html',
  workers: 5,
  globalSetup: path.join(__dirname, '../utilities/api/global.setup'),
  use: {
    headless: true,
    ignoreHTTPSErrors: true,
    baseURL: 'https://rahulshettyacademy.com',
    actionTimeout: 15000,
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  expect: {
    timeout: 15000,
    toHaveScreenshot: {
      maxDiffPixels: 30,
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },

    {
      name: 'firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'webkit',
      use: { browserName: 'webkit' },
    },
  ],
};
export default config;
