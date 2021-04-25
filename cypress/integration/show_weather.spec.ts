/// <reference types="cypress" />
// @ts-check
describe('Display weather based on user input', () => {
    it('Displays the weather in the main display', () => {
        cy.visit('http://localhost:3000');

        cy.contains("Today\'s Weather");
        
        cy.get('[data-testid="input-city"]')
        .type('London');

        cy.get('[data-testid="btn-search"]')
        .click();
        
        cy.contains('London')
    })
})