export default {
  testEnvironment: 'node',
  transform: {},
  testMatch: [
    '**/test/**/*.test.js',
    '**/__tests__/**/*.test.js'
  ],
  verbose: true,
  collectCoverage: false,
  setupFilesAfterEnv: ['<rootDir>/test/setup.js']
};