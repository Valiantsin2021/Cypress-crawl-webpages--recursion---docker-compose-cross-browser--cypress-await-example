// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
import 'cypress-map'
import 'cypress-data-session'
import 'cy-spok'
import 'cypress-recurse'
//
// -- This is a parent command --
Cypress.Commands.add('gotoBah', () => {
  cy.visit('https://glebbahmutov.com/blog/index.html')
})
Cypress.Commands.add('checkLinks', linksText => {
  let text = []
  cy.get('[rel="bookmark"]')
    .should('be.visible')
    .then(el => {
      for (let i of el) {
        cy.wrap(i)
          .invoke('text')
          .then(t => {
            expect(linksText).to.deep.include(t.trimStart().trimEnd())
            text.push(t.trimStart().trimEnd())
          })
      }
      cy.log(text)
    })
})
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
