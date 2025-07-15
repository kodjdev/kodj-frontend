import { defineConfig } from 'cypress';

export default defineConfig({
    e2e: {
        baseUrl: 'http://localhost:5173',
        specPattern: 'cypress/e2e/**/*.cy.{ts,tsx}',
        supportFile: 'cypress/support/e2e.ts',
        fixturesFolder: 'cypress/fixtures',
        screenshotsFolder: 'cypress/screenshots',
        videosFolder: 'cypress/videos',

        viewportWidth: 1280,
        viewportHeight: 720,
        defaultCommandTimeout: 10000,
        requestTimeout: 10000,
        responseTimeout: 10000,

        setupNodeEvents(on, config) {
            // implement node event listeners here

            on('task', {
                seedDatabase() {
                    return null;
                },

                clearDatabase() {
                    return null;
                },

                log(message) {
                    console.log(message);
                    return null;
                },
            });

            return config;
        },

        env: {
            apiUrl: 'http://localhost:3001/api',
            testUser: {
                email: 'test@gmail.com',
                password: 'password123',
            },
        },
    },

    component: {
        devServer: {
            framework: 'react',
            bundler: 'vite',
        },
        specPattern: 'src/**/*.cy.{ts,tsx}',
        supportFile: 'cypress/support/component.ts',
    },

    retries: {
        runMode: 2,
        openMode: 0,
    },

    video: true,
    screenshotOnRunFailure: true,
});
