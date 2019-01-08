module.exports = {
  verbose: true,
  collectCoverage: true,
  setupTestFrameworkScriptFile: "<rootDir>/src/tests/setupTests.js",
  coverageReporters: ["text", "lcov"],
  collectCoverageFrom: [
    "**/*.{js,jsx}",
    "!**/*.{config}.{js}",
    "!**/node_modules/**",
    "!**/dist/**",
    "!**/vendor/**",
    "!**/coverage/**",
    "!**/src/index.js"
  ],
  "transform": {
    "^.+\\.js$": "babel-jest",
    ".+\\.(css|styl|less|sass|scss)$": "jest-transform-css"
  }
};
