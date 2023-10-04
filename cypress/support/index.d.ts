declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to open custom url
     * @example cy.gotoBah()
     */
    gotoBah()
    /**
     * Get the all the country links from the page 
     * and asserts text of each link with the constant
     * @param linksText
     * @example cy.checkLinks(linksText)
     */
    checkLinks()
  }
}
