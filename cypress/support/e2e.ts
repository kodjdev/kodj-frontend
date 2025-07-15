import './commands';
import 'cypress-axe';

/* cypress global config */
Cypress.on('uncaught:exception', (err, runnable) => {
    /* we prevent the cypress from failing on uncaught exceptions */
    return false;
});

beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();

    cy.viewport(1280, 720);
});
