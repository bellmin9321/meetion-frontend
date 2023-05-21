/// <reference types="cypress" />
import '@testing-library/cypress/add-commands';

Cypress.Commands.add('login', (username: string, password: string) => {
  cy.session([username, password], () => {
    cy.get('[type="email"]').type(username);
    cy.get('[type="password"]').type(password);
    cy.get('[type="submit"]').click();
  });
});

export {};
