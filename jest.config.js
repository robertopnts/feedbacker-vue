module.exports = {
  testEnvironment: "jsdom",
  transform: {
      "^.+\\.vue$": "@vue/vue3-jest",
      "^.+\\js$": "babel-jest",
  },  
  testMatch: [
    '**/*.spec.js'
  ],
  moduleFileExtensions: ["vue", "js"],
  coveragePathIgnorePatterns: ["/node_modules/", "/tests/"],
  coverageReporters: ["text", "json-summary"],
  testEnvironmentOptions: {
      customExportConditions: ["node", "node-addons"],
  },
}
