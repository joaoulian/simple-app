module.exports = {
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testEnvironment: 'node',
  testRegex: './src/.*\\.(test|spec)?\\.(ts|ts)$',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  roots: ['<rootDir>/src'],
  moduleNameMapper: {
    '@core/(.*)': '<rootDir>/src/shared/core/$1',
    '@utils/(.*)': '<rootDir>/src/shared/utils/$1',
    '@shared/(.*)': '<rootDir>/src/shared/$1',
    '@identity/(.*)': '<rootDir>/src/identity/$1',
  },
};
