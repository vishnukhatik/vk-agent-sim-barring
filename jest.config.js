module.exports = {
  verbose: true,
  moduleFileExtensions: ['ts', 'js', 'vue', 'json'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '\\.(css|less|scss|sass|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/styleMock.js',
    '^vue$': 'vue/dist/vue.common.js'
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!@mfe)'
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest'
  },
  testEnvironment: 'jsdom',
  collectCoverage: true,
  collectCoverageFrom: [
    // '**/*.{ts,js,vue}',
    '<rootDir>/src/**/*.{ts,js,vue}',

    '!**/coverage/**',
    '!**/.nuxt/**',
    '!**/.node_modules/**',
    '!<rootDir>/src/scs-fragment.vue'
  ],
  coverageReporters: ['lcov', 'text-summary', 'html'],
  reporters: [
    'default',
    [
      'jest-sonar',
      {
        outputDirectory: 'coverage',
        outputName: 'sonar-reporter.xml'
      }
    ]
  ],
  setupFiles: ['./test/setupTest.js'],
};
