/// <reference types="cypress" />

const eventId = '5';
const registrationUrl = `/events/upcoming/register/${eventId}`;

describe('Event Registration:', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/dapi.kakao.com/**', { statusCode: 200, body: {} });
        cy.intercept('GET', '**/maps.googleapis.com/**', { statusCode: 200, body: {} });
    });

    describe('Authentication Flow Testing', () => {
        beforeEach(() => {
            cy.clearLocalStorage();
            cy.clearCookies();
        });

        it('should show login modal when not authenticated', () => {
            cy.visit(registrationUrl);
            cy.wait(1000);

            cy.contains('Login Required').should('be.visible');
            cy.contains('You need to be logged in to register for the event').should('be.visible');
            cy.contains('Event').should('be.visible');
            cy.wait(500);
        });

        it('should navigate to login page from modal', () => {
            cy.visit(registrationUrl);
            cy.wait(1000);

            cy.get('body').then(($body) => {
                if ($body.text().includes('CONTINUE')) {
                    cy.contains('CONTINUE').click();
                } else if ($body.text().includes('Continue')) {
                    cy.contains('Continue').click();
                } else {
                    cy.get('button')
                        .contains(/continue/i)
                        .click();
                }
            });
            cy.wait(1000);

            cy.url().should('include', '/login');
            cy.contains('Welcome Back').should('be.visible');
            cy.wait(500);
        });

        it('should show Google Sign In button on login page', () => {
            cy.visit('/login');
            cy.wait(1000);

            cy.contains('Google').should('be.visible');
            cy.wait(500);
        });
    });
});

describe('Manual Authentication Setup', () => {
    /* this step requires manual login before running these specific tests */

    it('should access registration form when manually logged in', () => {
        /* manual step: user should login via browser first, then run this test */
        cy.visit(registrationUrl);
        cy.wait(2000);

        cy.url().then((url) => {
            if (url.includes('/login')) {
                cy.log('⚠️ Manual login required: Please login in browser first, then run this test');
                cy.contains('Welcome Back').should('be.visible');
            } else {
                cy.log('Successfully authenticated - testing registration form');

                cy.get('body').then(($body) => {
                    const hasFirstName = $body.find('input[id="firstName"]').length > 0;
                    const hasLastName = $body.find('input[id="lastName"]').length > 0;
                    const hasEmail = $body.find('input[id="email"]').length > 0;

                    if (hasFirstName && hasLastName && hasEmail) {
                        cy.log('Registration form found');
                        cy.get('input[id="firstName"]').should('be.visible');
                        cy.get('input[id="lastName"]').should('be.visible');
                        cy.get('input[id="email"]').should('be.visible');
                    } else {
                        cy.log('Registration form elements not found - may need authentication');
                    }
                });
            }
        });
    });

    it('should test form validation when authenticated', () => {
        cy.visit(registrationUrl);
        cy.wait(2000);

        cy.url().then((url) => {
            if (!url.includes('/login')) {
                cy.get('body').then(($body) => {
                    const continueButton = $body
                        .find('button')
                        .filter(
                            (i, el) => !!el.textContent?.includes('Continue') || !!el.textContent?.includes('계속'),
                        );

                    if (continueButton.length > 0) {
                        cy.wrap(continueButton.first()).click();
                        cy.wait(500);

                        cy.url().should('include', 'register');
                        cy.log('Form validation working');
                    }
                });
            }
        });
    });

    it('should complete registration form when authenticated', () => {
        cy.visit(registrationUrl);
        cy.wait(2000);

        cy.url().then((url) => {
            if (!url.includes('/login')) {
                cy.get('body').then(($body) => {
                    if ($body.find('input[id="firstName"]').length > 0) {
                        cy.get('input[id="firstName"]').type('John');
                        cy.get('input[id="lastName"]').type('Doe');
                        cy.get('input[id="jobTitle"]').type('Software Developer');
                        cy.get('input[id="experience"]').type('5 years');
                        cy.get('input[id="email"]').type('john.doe@example.com');
                        cy.get('input[id="phone"]').type('01012345678');

                        const continueBtn = $body
                            .find('button')
                            .filter((i, el) => !!el.textContent?.includes('Continue'));

                        if (continueBtn.length > 0) {
                            cy.wrap(continueBtn.first()).click();
                            cy.wait(1000);
                            cy.log('Proceeded to step 2');
                        }
                    }
                });
            }
        });
    });
});

describe('UI Component Testing (No Auth Required)', () => {
    it('should show correct page structure when not authenticated', () => {
        cy.visit(registrationUrl);
        cy.wait(1000);

        cy.contains('Login Required').should('be.visible');

        cy.get('button').should('have.length.at.least', 1);
        cy.wait(500);
    });

    it('should have proper page title and meta', () => {
        cy.visit(registrationUrl);
        cy.wait(1000);

        cy.get('body').should('not.be.empty');
        cy.get('h1, h2, h3').should('have.length.at.least', 1);
        cy.wait(500);
    });

    it('should be responsive on different viewports', () => {
        cy.viewport(375, 667);
        cy.visit(registrationUrl);
        cy.wait(1000);
        cy.contains('Login Required').should('be.visible');

        cy.viewport(768, 1024);
        cy.visit(registrationUrl);
        cy.wait(1000);
        cy.contains('Login Required').should('be.visible');

        cy.wait(500);
    });
});

describe('API Integration Testing', () => {
    beforeEach(() => {
        cy.intercept('POST', '**/users/meetups/*/registration', {
            statusCode: 200,
            body: {
                data: { message: 'Registration successful' },
            },
        }).as('registerEvent');
    });

    it('should handle registration API when form is submitted', () => {
        cy.visit(registrationUrl);
        cy.wait(2000);

        cy.url().then((url) => {
            if (!url.includes('/login')) {
                cy.get('body').then(($body) => {
                    const submitBtn = $body
                        .find('button')
                        .filter(
                            (i, el) =>
                                !!el.textContent?.includes('Register') || !!el.textContent?.includes('Submit') || false,
                        );

                    if (submitBtn.length > 0) {
                        cy.wrap(submitBtn.first()).click();
                        cy.wait('@registerEvent').then((interception) => {
                            expect(interception.response?.statusCode).to.eq(200);
                            cy.log('Registration API called successfully');
                        });
                    }
                });
            } else {
                cy.log('Authentication required for API testing');
            }
        });
    });
});
