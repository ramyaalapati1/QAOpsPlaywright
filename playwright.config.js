// @ts-check
import { chromium, defineConfig, devices, firefox } from '@playwright/test';
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
  testMatch: '**/*.spec.js',
  /* Run tests in files in parallel */
  reporter: [['html', { open: 'on-failure' }]],
  retries: 0,
  timeout: 40 * 1000,
  //explicit wait can define below way
  expect: { timeout: 5000, },

  use: {
    browserName: 'chromium',
    headless: true,
    screenshot: 'on',
    trace: 'on'

  },


});

module.exports = config


