/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transformIgnorePatterns: ['node_modules/(?!(sucrase)/)'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx|mjs|scss|css)$': 'babel-jest',
  },
  moduleNameMapper: {
    "^.+\\.(css|less|scss)$": "identity-obj-proxy"
  },
  testEnvironment: "jsdom"
};