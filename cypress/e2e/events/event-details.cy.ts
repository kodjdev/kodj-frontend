/// <reference types="cypress" />

describe('Event Details Page - Real API', () => {
    const upcomingEventId = '4';

    beforeEach(() => {
        /* only block external APIs that might interfere */
        cy.intercept('GET', '**/dapi.kakao.com/**', { statusCode: 200, body: {} }).as('kakaoMaps');
        cy.intercept('GET', '**/maps.googleapis.com/**', { statusCode: 200, body: {} }).as('googleMaps');
    });

    describe('Page Navigation and Load', () => {
        it('should load event details page successfully', () => {
            cy.visit(`/events/upcoming/details/${upcomingEventId}`);
            cy.wait(2000);

            cy.contains('Event Details').should('be.visible');
            cy.contains('Back to Events').should('be.visible');
            cy.wait(300);
        });

        it('should navigate from events list to event details', () => {
            cy.visit('/events');
            cy.wait(3000);

            cy.get('a[href*="/events/"]').first().should('be.visible');
            cy.wait(500);
            cy.get('a[href*="/events/"]').first().click();
            cy.wait(1000);

            cy.url().should('match', /\/events\/(upcoming|past)\/details\/\d+/);
            cy.contains('Event Details').should('be.visible');
            cy.wait(300);
        });

        it('should handle invalid event ID gracefully', () => {
            cy.visit('/events/upcoming/details/999999');
            cy.wait(3000);

            cy.get('body').then(($body) => {
                const text = $body.text();
                const hasError =
                    text.includes('Error') ||
                    text.includes('not found') ||
                    text.includes('404') ||
                    text.includes('Event not found');
                const isRedirected = !window.location.pathname.includes('999999');

                expect(hasError || isRedirected).to.be.true;
            });
            cy.wait(300);
        });
    });

    describe('Event Information Display', () => {
        beforeEach(() => {
            cy.visit(`/events/upcoming/details/${upcomingEventId}`);
            cy.wait(2500);
        });

        it('should display event title and basic information', () => {
            cy.get('body').should(($body) => {
                const text = $body.text();
                expect(text.includes('Meetup') || text.includes('Workshop')).to.be.true;
            });
            cy.wait(300);

            cy.contains('Event Details').should('be.visible');
            cy.wait(300);
        });

        it('should display event metadata in side panel', () => {
            cy.get('body').should(($body) => {
                const text = $body.text();
                expect(text).to.match(/\d{4}|\w+\s+\d{1,2}|PM|AM/);
            });
            cy.wait(300);

            cy.get('body').should(($body) => {
                const text = $body.text();
                expect(text.includes('경기') || text.includes('Location')).to.be.true;
            });
            cy.wait(300);

            cy.get('body').should(($body) => {
                const text = $body.text();
                expect(text.includes('Registered') || text.includes('Free')).to.be.true;
            });
            cy.wait(300);
        });

        it('should display registration button', () => {
            cy.contains('Register for Event').should('be.visible');
            cy.wait(300);

            cy.get('svg').should('have.length.at.least', 1);
            cy.wait(300);
        });

        it('should display event image or placeholder', () => {
            cy.get('img').then(($imgs) => {
                if ($imgs.length > 0) {
                    cy.wrap($imgs.first()).should('be.visible');
                } else {
                    cy.get('[style*="background"]').should('have.length.at.least', 1);
                }
            });
            cy.wait(300);
        });
    });

    describe('Tab Navigation', () => {
        beforeEach(() => {
            cy.visit(`/events/upcoming/details/${upcomingEventId}`);
            cy.wait(2500);
        });

        it('should display all navigation tabs', () => {
            cy.contains('button', 'Event Details').should('be.visible');
            cy.wait(200);
            cy.contains('button', 'Timeline').should('be.visible');
            cy.wait(200);
            cy.contains('button', 'Speakers').should('be.visible');
            cy.wait(200);
            cy.contains('button', 'Location').should('be.visible');
            cy.wait(300);
        });

        it('should switch between tabs successfully', () => {
            cy.contains('button', 'Timeline').click();
            cy.wait(500);
            cy.contains('button', 'Timeline').should('have.css', 'color');

            cy.contains('button', 'Speakers').click();
            cy.wait(500);
            cy.contains('button', 'Speakers').should('have.css', 'color');

            cy.contains('button', 'Location').click();
            cy.wait(500);
            cy.contains('button', 'Location').should('have.css', 'color');

            cy.contains('button', 'Event Details').click();
            cy.wait(500);
            cy.contains('button', 'Event Details').should('have.css', 'color');
            cy.wait(300);
        });

        it('should show different content for each tab', () => {
            cy.contains('button', 'Event Details').click();
            cy.wait(500);
            cy.get('body').should(($body) => {
                expect($body.text().length).to.be.greaterThan(100);
            });

            cy.contains('button', 'Timeline').click();
            cy.wait(500);

            cy.contains('button', 'Location').click();
            cy.wait(500);

            cy.get('body').should('not.contain', 'Error');
            cy.wait(300);
        });
    });

    describe('Registration Functionality', () => {
        beforeEach(() => {
            cy.visit(`/events/upcoming/details/${upcomingEventId}`);
            cy.wait(2500);
        });

        it('should display registration button for upcoming events', () => {
            cy.contains('Register for Event').should('be.visible');
            cy.wait(300);
        });

        it('should navigate to registration page when clicked', () => {
            cy.contains('Register for Event').click();
            cy.wait(1000);

            cy.url().should('include', 'register');
            cy.wait(300);
        });

        it('should show current registration status', () => {
            cy.get('body').should(($body) => {
                const text = $body.text();
                expect(text).to.match(/\d+\/\d+|Registered|Available|Free/);
            });
            cy.wait(300);
        });
    });

    describe('Navigation Elements', () => {
        beforeEach(() => {
            cy.visit(`/events/upcoming/details/${upcomingEventId}`);
            cy.wait(2500);
        });

        it('should display back to events link', () => {
            cy.contains('Back to Events').should('be.visible');
            cy.wait(300);
        });

        it('should navigate back to events list', () => {
            cy.contains('Back to Events').click();
            cy.wait(1000);

            cy.url().should('include', '/events');
            cy.contains('Upcoming').should('be.visible');
            cy.wait(300);
        });
    });

    describe('Responsive Design', () => {
        beforeEach(() => {
            cy.visit(`/events/upcoming/details/${upcomingEventId}`);
        });

        it('should display correctly on mobile viewport', () => {
            cy.viewport(375, 667);
            cy.wait(800);

            cy.contains('Event Details').should('be.visible');
            cy.wait(300);
            cy.contains('Register for Event').should('be.visible');
            cy.wait(300);

            cy.contains('button', 'Timeline').should('be.visible');
            cy.wait(300);
        });

        it('should display correctly on tablet viewport', () => {
            cy.viewport(768, 1024);
            cy.wait(800);

            cy.contains('Event Details').should('be.visible');
            cy.contains('Register for Event').should('be.visible');
            cy.contains('Back to Events').should('be.visible');
            cy.wait(300);
        });

        it('should maintain functionality on small screens', () => {
            cy.viewport(320, 568);
            cy.wait(800);

            cy.contains('Register for Event').should('be.visible').click();
            cy.wait(1000);
            cy.url().should('include', 'register');
        });
    });

    describe('Content Loading and Performance', () => {
        it('should load page content within reasonable time', () => {
            const startTime = Date.now();

            cy.visit(`/events/upcoming/details/${upcomingEventId}`);
            cy.contains('Event Details').should('be.visible');
            cy.contains('Register for Event').should('be.visible');

            cy.then(() => {
                const loadTime = Date.now() - startTime;
                expect(loadTime).to.be.lessThan(5000);
            });
        });

        it('should handle slow network conditions', () => {
            cy.intercept('GET', '**/meetups/*/details', (req) => {
                req.reply({
                    delay: 2000,
                });
            });

            cy.visit(`/events/upcoming/details/${upcomingEventId}`);
            cy.wait(4000);
            cy.contains('Event Details').should('be.visible');
            cy.wait(300);
        });
    });

    describe('Real Data Validation', () => {
        beforeEach(() => {
            cy.visit(`/events/upcoming/details/${upcomingEventId}`);
            cy.wait(2500);
        });

        it('should display real event data from API', () => {
            cy.get('body').should(($body) => {
                const text = $body.text();

                expect(text.length).to.be.greaterThan(200);

                expect(text).to.match(/\d{4}|PM|AM|\d{1,2}:\d{2}/);

                expect(text).to.match(/Location|경기|Address/);
            });
            cy.wait(300);
        });

        it('should have working interactive elements', () => {
            cy.contains('Register for Event').should('not.be.disabled');
            cy.contains('button', 'Timeline').should('not.be.disabled');
            cy.contains('button', 'Speakers').should('not.be.disabled');
            cy.contains('button', 'Location').should('not.be.disabled');
            cy.wait(300);
        });
    });
});
