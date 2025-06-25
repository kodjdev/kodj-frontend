module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/tests/setup/setupTests.ts'],
    testMatch: ['<rootDir>/tests/**/*.test.{ts,tsx}', '<rootDir>/tests/**/*.spec.{ts,tsx}'],

    moduleNameMapping: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^@tests/(.*)$': '<rootDir>/tests/$1',
    },

    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
        '^.+\\.(js|jsx)$': 'babel-jest',
    },

    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

    collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts', '!src/main.tsx', '!src/firebase/**', '!src/static/**'],

    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov', 'html'],

    moduleNameMapping: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/tests/__mocks__/fileMock.js',
    },

    testEnvironmentOptions: {
        customExportConditions: ['node', 'node-addons'],
    },

    /**
     * we clear the  mocks between tests
     * to ensure that each test runs in isolation
     */
    clearMocks: true,
    verbose: true,
};
