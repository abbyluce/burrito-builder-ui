describe('App', () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/")
  })

  it('Should visit the website', () => {
    cy.visit("http://localhost:3000/")
  })

  it('Should show a landing page with a title and background', () => {
    cy.get('h1').should('be.visible').contains('Burrito Builder')
      .get('.App').should('have.css', 'background-image')
  })

  it('Should show an input field for Name, ingredient buttons, and a Submit Order button', () => {
    cy.get('input').invoke('attr', 'placeholder').should('contain', 'Name')
      .get('button').should('contain', 'beans')
      .get('.submit-order-button').contains('Submit Order')
  })

  it('Should show existing orders on page load', () => {
      cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
        statusCode: 201
      })
      .get('.order').first().should('contain', 'Pat')
      .get('.order').first().should('contain', 'beans')
  })

  it('Should show an error message if the response is not ok', () => {
    cy.intercept({
        method: 'GET',
        url: 'http://localhost:3001/api/v1/orders'
      },
      {
        statusCode: 401,
        body: { 
          message: `Error fetching:` 
        }
      })
  })

  it('Should be able to fill out the Name input and select ingredients', () => {
    cy.get('input[name="name"]')
      .type('Sasquatch')
      .should('have.value', 'Sasquatch')
      .get('button[name="steak"]').click()
      .get('button[name="hot sauce"]').click()
      .get('button[name="cilantro"]').click()
      .get('p').contains('Order: steak, hot sauce, cilantro')
  })

  it('should be able to click Submit Order and see the card on the page', () => {
    cy.get('input[name="name"]')
      .type('Sasquatch')
      .should('have.value', 'Sasquatch')
      .get('button[name="steak"]').click()
      .get('button[name="hot sauce"]').click()
      .get('button[name="cilantro"]').click()
      .get('.submit-order-button').click()
      .intercept('POST', 'http://localhost:3001/api/v1/orders', {
        statusCode: 201,
        body: {
          name: "Sasquatch",
          ingredients: ["steak", "hot sauce", "cilantro"]
        }
      })
      .get('.order').last()
      .should('contain', 'Sasquatch')
      .should('contain', 'steak')
      .should('contain', 'hot sauce')
      .should('contain', 'cilantro')
      .should('not.contain','carnitas')
  })

  it('Should should receive an alert if the user tries to submit an order without a name', () => {
    cy.get('.submit-order-button').click()
    cy.on('window:alert', (str) => {
        expect(str).to.contains('Please include a name for the order!')
      }
  )
})
})