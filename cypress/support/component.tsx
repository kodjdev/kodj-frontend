import React from 'react';
import { mount } from 'cypress/react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';

declare global {
    namespace Cypress {
        interface Chainable {
            mount: typeof mount;
        }
    }
}

Cypress.Commands.add('mount', (component, options = {}) => {
    const wrapped = (
        <BrowserRouter>
            <RecoilRoot>{component}</RecoilRoot>
        </BrowserRouter>
    );

    return mount(wrapped, options);
});
