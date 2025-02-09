/// <reference types="../support" />
describe('Crawl Bahmutov blog pages', () => {
  it('Visit every link from the repos list', () => {
    cy.gotoBah()
    cy.contains('a', 'Next ➡').as('nextPage')
    const links = []
    function crawl() {
      cy.get('[itemprop="name"] a')
        .should('have.length.greaterThan', 10)
        .then($links => {
          links.push(
            ...$links.toArray().map(link => {
              const obj = {
                title: link.innerHTML,
                link: `https://glebbahmutov.com/blog/${link
                  .getAttribute('href')
                  .replace('../../', '')}`
              }
              return obj
            })
          )
        })
      cy.contains('a', 'Next ➡')
        .should(() => {})
        .its('length')
        .then(length => {
          if (length > 0) {
            cy.get('@nextPage').click().then(crawl)
          } else {
            cy.log('Last page clicked')
          }
        })
    }
    crawl()
    cy.wrap(links).then(links => {
      cy.writeFile('links.json', links)
      console.log(JSON.stringify(links, null, 2))
    })
  })
})
// describe('Crawl Bahmutov blog pages', () => {
//   it('Visit every link from the repos list', () => {
//     cy.visit('https://glebbahmutov.com/blog/index.html')
//     const links = []
//     cy.get('[itemprop="name"] a')
//       .should('have.length', 100)
//       .then($links => {
//         links.push(
//           ...$links.toArray().map(link => {
//             const obj = {
//               title: link.innerHTML,
//               link: `https://glebbahmutov.com/blog${link.getAttribute('href')}`
//             }
//             return obj
//           })
//         )
//       })
//     cy.wrap(links).then(links => {
//       cy.writeFile('links.json', links)
//       console.log(JSON.stringify(links, null, 2))
//     })
//   })
// })
