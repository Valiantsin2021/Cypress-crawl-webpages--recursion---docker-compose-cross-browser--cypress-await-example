describe(`e2e test of Belarus page in Isolated travelers`, () => {
  before(function () {
    cy.fixture('./example.json').then(variables => {
      // "this" is still the test context object
      this.linksText = variables.linksText
      this.title = variables.title
    })
  })
  Cypress._.times(1, () => {
    it(`should open destination page and go to Belarus section`, function () {
      cy.visit('/category/europe/belarus/')
      cy.contains('h1', 'Belarus').should('be.visible')
      cy.get('.ast-container p')
        .invoke('text')
        .then(text => {
          expect(text).to.equal(this.title)
        })
      const recurse = () => {
        cy.checkLinks(this.linksText)
        cy.get('.updated')
          .should('have.length.at.least', 1)
          .and('be.visible')
          .each(el => {
            expect(el.text().trim()).to.match(/.*\/10\/2020/)
          })
        cy.get('a.next.page-numbers')
          .should(() => {})
          .its('length')
          .then(length => {
            if (length > 0) {
              cy.get('a.next.page-numbers').click().then(recurse)
            } else {
              cy.log('Last page clicked')
            }
          })
      }
      recurse()
    })
  })
})
