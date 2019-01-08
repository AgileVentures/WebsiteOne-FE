module.exports = {
  verbose: true,
  collectCoverage: true,
  setupTestFrameworkScriptFile: "<rootDir>/src/tests/setupTests.js",
  coverageReporters: ["text", "lcov"],
  collectCoverageFrom: [
    "**/*.{js,jsx}",
    "!**/*.{config}.{js}",
    "!**/node_modules/**",
    "!**/vendor/**",
    "!**/coverage/**",
    "!**/src/index.js"
  ]
};
