// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Indica a Next.js dónde está tu package.json
  dir: './',
});

/** @type {import('jest').Config} */
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    // Para ignorar imports de CSS en tests
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
  },
};

module.exports = createJestConfig(customJestConfig);
