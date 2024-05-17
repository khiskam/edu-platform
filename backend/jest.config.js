/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "@domain/(.*)": "<rootDir>/src/domain/$1",
    "@services/(.*)": "<rootDir>/src/services/$1",
    "@infrastructure/(.*)": "<rootDir>/src/infrastructure/$1",
    "@app/(.*)": "<rootDir>/src/app/$1",
  },
  passWithNoTests: true,
};
