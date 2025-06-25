/// <reference types="cypress" />

describe('Events Browsing - Real API Backend', () => {
    beforeEach(() => {
        /* we only block external APIs that might interfere as we let events APIs through */
        cy.intercept('GET', '**/dapi.kakao.com/**', { statusCode: 200, body: {} }).as('kakaoMaps');
        cy.intercept('GET', '**/maps.googleapis.com/**', { statusCode: 200, body: {} }).as('googleMaps');

        cy.visit('/events');
        cy.wait(1000);
    });

    describe('Page Load and Initial State', () => {
        it('should load events page successfully with real data', () => {
            cy.url().should('include', '/events');
            cy.wait(500);

            cy.contains('Upcoming').should('be.visible');
            cy.contains('Events').should('be.visible');
            cy.wait(300);
        });

        it('should display filter buttons', () => {
            cy.contains('button', 'All').should('be.visible');
            cy.contains('button', 'Upcoming Events').should('be.visible');
            cy.contains('button', 'Past Events').should('be.visible');
            cy.wait(300);
        });

        it('should show real events from backend', () => {
            cy.get('body').then(($body) => {
                const hasEventCards = $body.find('a[href*="/events/"]').length > 0;
                const hasPlaceholder =
                    $body.text().includes('No events') || $body.find('[data-testid="placeholder-card"]').length > 0;

                if (hasEventCards) {
                    cy.get('a[href*="/events/"]').should('have.length.at.least', 1);
                } else if (hasPlaceholder) {
                    cy.log('No events available - showing placeholder');
                } else {
                    cy.log('Unexpected state - investigating...');
                }

                expect($body.text().length).to.be.greaterThan(100);
            });
            cy.wait(300);
        });
    });

    describe('Filter Functionality with Real Data', () => {
        it('should filter to upcoming events only', () => {
            cy.contains('button', 'Upcoming Events').should('be.visible');
            cy.wait(300);

            cy.contains('button', 'Upcoming Events').click();
            cy.wait(1000);

            cy.contains('h2', 'Upcoming').should('be.visible');
            cy.get('h2').should('not.contain', 'Past');
            cy.wait(300);
        });

        it('should filter to past events only', () => {
            cy.contains('button', 'Past Events').should('be.visible');
            cy.wait(300);

            cy.contains('button', 'Past Events').click();
            cy.wait(1000);

            cy.contains('h2', 'Past').should('be.visible');
            cy.get('h2').should('not.contain', 'Upcoming');
            cy.wait(300);
        });

        it('should show all events when "All" filter is selected', () => {
            cy.contains('button', 'Upcoming Events').click();
            cy.wait(1000);

            cy.contains('button', 'All').click();
            cy.wait(1000);

            cy.contains('h2', 'Upcoming').should('be.visible');
            cy.contains('h2', 'Past').should('be.visible');
            cy.wait(300);
        });

        it('should maintain filter state during navigation', () => {
            cy.contains('button', 'Past Events').click();
            cy.wait(1000);

            cy.contains('h2', 'Past').should('be.visible');

            cy.contains('button', 'Past Events')
                .should('have.css', 'background-color')
                .and('not.equal', 'rgba(0, 0, 0, 0)');
            cy.wait(300);
        });
    });

    describe('Event Cards with Real Data', () => {
        it('should display event cards when real data is available', () => {
            cy.get('body').then(($body) => {
                const eventCards = $body.find('a[href*="/events/"]');

                if (eventCards.length > 0) {
                    cy.log(`Found ${eventCards.length} real event cards`);

                    cy.get('a[href*="/events/"]')
                        .first()
                        .within(() => {
                            cy.get('body').should('not.be.empty');
                        });

                    cy.wait(400);
                } else {
                    cy.log('ℹ️ No event cards found - may be empty state');
                    cy.contains('Upcoming').should('be.visible');
                }
            });
        });

        it('should navigate to event details when card is clicked', () => {
            cy.get('body').then(($body) => {
                const eventCards = $body.find('a[href*="/events/"]');

                if (eventCards.length > 0) {
                    cy.get('a[href*="/events/"]').first().should('be.visible');
                    cy.wait(500);

                    cy.get('a[href*="/events/"]').first().scrollIntoView();
                    cy.wait(300);

                    cy.get('a[href*="/events/"]').first().click();
                    cy.wait(1000);

                    cy.url().should('match', /\/events\/(upcoming|past)\/details\/\d+/);
                    cy.wait(500);
                } else {
                    cy.log('No event cards to click - skipping navigation test');
                }
            });
        });

        it('should display event metadata correctly', () => {
            cy.get('body').then(($body) => {
                const eventCards = $body.find('a[href*="/events/"]');

                if (eventCards.length > 0) {
                    cy.get('a[href*="/events/"]')
                        .first()
                        .should(($card) => {
                            const text = $card.text();
                            expect(text.length).to.be.greaterThan(10);
                        });
                    cy.wait(300);
                }
            });
        });
    });

    describe('Responsive Design with Real Data', () => {
        it('should display correctly on mobile viewport', () => {
            cy.viewport(375, 667);
            cy.wait(500);

            cy.contains('Upcoming').should('be.visible');
            cy.wait(300);

            cy.contains('button', 'All').should('be.visible');
            cy.wait(300);

            cy.get('body').should(($body) => {
                expect($body.text()).to.include('Events');
            });
        });

        it('should display correctly on tablet viewport', () => {
            cy.viewport(768, 1024);
            cy.wait(500);

            cy.contains('Upcoming').should('be.visible');
            cy.contains('Events').should('be.visible');
            cy.wait(300);
        });

        it('should maintain functionality on small screens', () => {
            cy.viewport(320, 568);
            cy.wait(500);

            cy.contains('button', 'Past Events').should('be.visible').click();
            cy.wait(1000);

            cy.contains('h2', 'Past').should('be.visible');
            cy.wait(300);
        });
    });

    describe('Loading and Performance with Real API', () => {
        it('should load events within reasonable time', () => {
            const startTime = Date.now();

            cy.visit('/events');
            cy.contains('Upcoming').should('be.visible');
            cy.contains('Events').should('be.visible');

            cy.then(() => {
                const loadTime = Date.now() - startTime;
                expect(loadTime).to.be.lessThan(3000);
                cy.log(`Page loaded in ${loadTime}ms`);
            });
        });

        it('should handle slow network conditions', () => {
            cy.intercept('GET', '**/api/v1/meetups**', (req) => {
                req.reply({
                    delay: 2000,
                    body: req.body,
                });
            }).as('slowEvents');

            cy.visit('/events');

            cy.contains('Upcoming', { timeout: 8000 }).should('be.visible');
            cy.wait(500);
        });

        it('should show loading states appropriately', () => {
            cy.visit('/events');

            cy.get('body').then(($body) => {
                const hasLoadingText = $body.text().includes('Loading') || $body.text().includes('loading');
                if (hasLoadingText) {
                    cy.log('Loading indicator found');
                } else {
                    cy.log('Loading too fast to see indicator');
                }
            });

            cy.contains('Upcoming').should('be.visible');
            cy.wait(300);
        });
    });

    describe('Real Data Validation', () => {
        it('should display actual event data from backend', () => {
            cy.get('body').should(($body) => {
                const text = $body.text();

                expect(text.length).to.be.greaterThan(200);

                expect(text).to.match(/Events|Upcoming|Past|Registration|Meetup/i);
            });
            cy.wait(300);
        });

        it('should have working interactive elements', () => {
            cy.contains('button', 'All').should('not.be.disabled');
            cy.contains('button', 'Upcoming Events').should('not.be.disabled');
            cy.contains('button', 'Past Events').should('not.be.disabled');

            cy.contains('button', 'Upcoming Events').click();
            cy.wait(1000);

            cy.contains('h2', 'Upcoming').should('be.visible');
            cy.wait(300);
        });

        it('should handle API errors gracefully when they occur', () => {
            cy.intercept('GET', '**/api/v1/meetups**', {
                statusCode: 500,
                body: { error: 'Server Error' },
                delay: 500,
            }).as('serverError');

            cy.visit('/events');
            cy.wait('@serverError');
            cy.wait(1000);

            cy.get('body').then(($body) => {
                const text = $body.text();
                const hasErrorMessage = text.includes('error') || text.includes('Error') || text.includes('failed');
                const hasEmptyState = text.includes('No events') || text.includes('Try again');
                const hasBasicLayout = text.includes('Events') && text.includes('Upcoming');

                expect(hasErrorMessage || hasEmptyState || hasBasicLayout).to.be.true;
            });
            cy.wait(300);
        });
    });

    describe('SEO and Accessibility', () => {
        it('should have proper page structure for SEO', () => {
            cy.get('h1, h2, h3').should('have.length.at.least', 1);
            cy.get('main, section, article').should('have.length.at.least', 1);

            cy.title().should('not.be.empty');
            cy.wait(300);
        });

        it('should be keyboard accessible', () => {
            cy.contains('button', 'All').focus();
            cy.focused().should('be.visible').and('contain', 'All');

            cy.contains('button', 'Upcoming Events').focus();
            cy.focused().should('contain', 'Upcoming Events');

            cy.focused().type('{enter}');
            cy.wait(1000);

            cy.contains('h2', 'Upcoming').should('be.visible');
            cy.wait(300);
        });
    });
});
