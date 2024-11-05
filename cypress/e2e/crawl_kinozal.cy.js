describe('Crawl 4kfilms website', () => {
  it('Crawl every link from the page and save links and images to json', () => {
    cy.visit('https://kinozal.tv/browse.php?s=&g=0&c=0&v=7&d=0&w=0&t=0&f=0')
    cy.get('[rel="next"]').as('nextPage')
    const links = []
    function crawl() {
      cy.get('td.nam a').then(elements => {
        links.push(
          ...elements.toArray().map(el => {
            const obj = {
              title: el.innerText,
              link: `https://kinozal.tv/${el.getAttribute('href')}`
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
      // add images to the parsed links
      //   for (let el of links) {
      //     cy.request(el.link).then(result => {
      //       const imgSrc = result.body.match(
      //         /<img[^>]* src="([^"]*)" class="p200"[^>]*alt="">/
      //       )[1]
      //       if (imgSrc[0] === '/') {
      //         let imgNewSrc = 'https://kinozal.tv' + imgSrc
      //         el.image = imgNewSrc
      //       }
      //       el.image = imgSrc
      //     })
      //   }
      cy.writeFile('./kinozal_4k_films.json', JSON.stringify(links))
    })
  })
})
