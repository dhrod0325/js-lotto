// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('inputPrice', amount => {
    cy.get('#LottoPurchase input').type(amount);
    cy.get('#LottoPurchase button').click();
});

Cypress.Commands.add('openModal', amount => {
    cy.inputPrice(3000);

    cy.get('.winning-number').each((element, idx) => {
        cy.wrap(element).type(idx + 1);
    });
    cy.get('.bonus-number').type(7);
    cy.get('.open-result-modal-button').first().click();
    cy.get('.modal').should('be.visible');
});
