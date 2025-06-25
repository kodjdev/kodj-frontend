import 'cypress-axe';

declare global {
    namespace Cypress {
        interface Chainable {
            login(email?: string, password?: string): Chainable<void>;
            logout(): Chainable<void>;

            visitEventsPage(): Chainable<void>;
            visitJobPostingPage(): Chainable<void>;

            fillJobPostingBasicInfo(data: any): Chainable<void>;
            fillJobPostingCompanyDetails(data: any): Chainable<void>;

            seedTestData(): Chainable<void>;
            clearTestData(): Chainable<void>;

            waitForPageLoad(): Chainable<void>;
            checkAccessibility(): Chainable<void>;
        }
    }
}

Cypress.Commands.add('login', (email = 'sardor0968@gmail.com', password = 'password123') => {
    cy.visit('/login');
    cy.get('[data-testid="email-input"]').type(email);
    cy.get('[data-testid="password-input"]').type(password);
    cy.get('[data-testid="login-button"]').click();
    cy.url().should('not.include', '/login');
});

Cypress.Commands.add('logout', () => {
    cy.get('[data-testid="user-menu"]').click();
    cy.get('[data-testid="logout-button"]').click();
    cy.url().should('include', '/');
});

Cypress.Commands.add('visitEventsPage', () => {
    cy.visit('/events');
    cy.waitForPageLoad();
});

Cypress.Commands.add('visitJobPostingPage', () => {
    cy.visit('/my-page');
    cy.get('[data-testid="job-posting-tab"]').click();
    cy.waitForPageLoad();
});

Cypress.Commands.add('fillJobPostingBasicInfo', (data) => {
    cy.get('[name="title"]').type(data.title);
    cy.get('[name="companyName"]').type(data.companyName);
    cy.get('[name="location"]').type(data.location);
    cy.get('[name="contactEmail"]').type(data.contactEmail);
    cy.get('[name="contactPhone"]').type(data.contactPhone);

    if (data.deadline) {
        cy.get('[name="deadline"]').type(data.deadline);
    }

    if (data.category) {
        cy.get('[name="category"]').select(data.category);
    }

    if (data.workplaceType) {
        cy.get('[name="workplaceType"]').select(data.workplaceType);
    }

    if (data.jobType) {
        cy.get('[name="jobType"]').select(data.jobType);
    }

    if (data.description) {
        cy.get('[name="description"]').type(data.description);
    }

    if (data.companyTags && data.companyTags.length > 0) {
        data.companyTags.forEach((tag) => {
            cy.contains('[data-testid="company-tag"]', tag).click();
        });
    }

    if (data.techTags && data.techTags.length > 0) {
        data.techTags.forEach((tag) => {
            cy.contains('[data-testid="tech-tag"]', tag).click();
        });
    }
});

Cypress.Commands.add('fillJobPostingCompanyDetails', (data) => {
    if (data.companyLogo) {
        cy.get('[data-testid="company-logo-upload"]').selectFile(data.companyLogo);
    }

    if (data.companyPictures && data.companyPictures.length > 0) {
        data.companyPictures.forEach((file, index) => {
            cy.get(`[data-testid="company-picture-upload-${index}"]`).selectFile(file);
        });
    }

    if (data.socialAccounts) {
        Object.entries(data.socialAccounts).forEach(([platform, url]) => {
            if (url) {
                cy.get(`[name="social-${platform}"]`).type(url as string);
            }
        });
    }
});

Cypress.Commands.add('seedTestData', () => {
    cy.task('seedDatabase');
});

Cypress.Commands.add('clearTestData', () => {
    cy.task('clearDatabase');
});

Cypress.Commands.add('waitForPageLoad', () => {
    cy.get('[data-testid="loading"]', { timeout: 10000 }).should('not.exist');
});

Cypress.Commands.add('checkAccessibility', () => {
    cy.get('h1, h2, h3, h4, h5, h6').should('exist');
    cy.get('img').should('have.attr', 'alt');
    cy.get('button, a').should('be.visible');
});

export {};
