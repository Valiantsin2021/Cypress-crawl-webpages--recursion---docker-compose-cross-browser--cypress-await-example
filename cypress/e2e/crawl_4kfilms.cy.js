describe('Crawl 4kfilms website', () => {
  it('Crawl every link from the page and save links and images to json', () => {
    // Cypress.on('log:changed', (log, interactive) => {
    //   if (log.displayName !== 'fetch' && log.displayName !== 'xhr') return

    //   const logs = window.top.document.querySelectorAll(
    //     'li.command-name-request'
    //   )
    //   if (logs.length) {
    //     const last = [...logs][logs.length - 1]
    //     last.remove()
    //   }
    // })
    cy.visit('https://gud.4-kfilm.cyou/multfilm-4k/')
    cy.get('.pnext a').as('nextPage')
    const links = []
    function crawl() {
      cy.get('a.krat123-poster.img-box.with-mask').then(elements => {
        links.push(
          ...elements.toArray().map(el => {
            const obj = {
              title: el.innerText,
              link: el.getAttribute('href'),
              image: `https://gud.4-kfilm.cyou${el
                .querySelector('img')
                .getAttribute('src')}`
            }
            return obj
          })
        )
        // first method to check the element is present

        cy.get('@nextPage')
          .should(() => {})
          .its('length')
          .then(length => {
            if (length > 0) {
              cy.get('@nextPage').click().then(crawl)
            } else {
              cy.log('Last page clicked')
            }
          })

        // second method to check the element is present

        // cy.get('body').then(body => {
        //   const select = body[0].querySelectorAll('.pnext a')
        //   if (select.length > 0) {
        //     cy.get('@nextPage').click().then(crawl)
        //   } else {
        //     cy.log('Last page')
        //   }
        // })
      })
    }
    crawl()
    cy.wrap(links).then(links => {
      cy.writeFile('./4kfilms.json', JSON.stringify(links))
    })
  })
  it('check string for valid email match', () => {
    let email = '1223commonTags@co.co'
    const input = Cypress.$('<input type="email">')[0]
    input.value = email
    expect(input.checkValidity(), 'Email').to.be.true
  })
})
