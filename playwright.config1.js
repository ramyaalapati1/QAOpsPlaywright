// @ts-check
import { chromium, defineConfig, devices, firefox } from '@playwright/test';
import { worker } from 'node:cluster';
import { trace } from 'node:console';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  /* Run tests in files in parallel */
  //retries: 1,
  workers: 2,
  reporter: [['html', { open: 'on-failure' }]],
  timeout: 30 * 1000,
  //explicit wait can define below way
  expect: { timeout: 5000, },
  projects: [
    {
      name: "firefox Executions",
      use: {
        browserName: 'firefox',
        headless: true,
        screenshot: 'off',
        trace: 'retain-on-failure'

      }
    },
    {
      name: "Chrome",
      use: {
        browserName: 'chromium',
        headless: false,
        video: 'retain-on-failure',
        screenshot: 'on',
        trace: 'retain-on-failure',
        //viewport: { width: 720, height: 720 }


      }
    }

  ]




});

module.exports = config


