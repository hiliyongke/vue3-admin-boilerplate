const path = require('path');

module.exports = {
  rootDir: path.resolve(__dirname),
  clearMocks: true,
  moduleFileExtensions: ['vue', 'js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  // 别名设置
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/components/$1',
    '^/@components/(.*)$': '<rootDir>/src/components/$1'
  },
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.*\\.(js)$': 'babel-jest', // vue 文件用 vue-jest 转换
    '^.+\\.(t|j)sx?$': 'ts-jest' // ts 文件用 ts-jest 转换
  },
  // 匹配测试文件
  testMatch: [
    '**/__tests__/*.{j,t}s?(x)',
    '**/tests/*.{j,t}s?(x)',
    '**/tests/unit/*.spec.{j,t}s?(x)'
  ],
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!lodash-es)'],
  verbose: true,
  collectCoverage: false,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  collectCoverageFrom: ['src/**/*.{js,ts,vue}'],
  coveragePathIgnorePatterns: ['^.+\\.d\\.ts$']
};
