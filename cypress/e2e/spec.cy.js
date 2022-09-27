describe('App', () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/").wait(2000)
  })

  it('Should visit the website', () => {
    cy.visit("http://localhost:3000/")
  })

  it('Should show a landing page with a title and background', () => {
    cy.get('h1').should('be.visible').contains('Burrito Builder')
      .get('.App').should('have.css', 'background-image')
  })

  it('Should show an input field for Name, ingredient buttons, and a Submit Order button', () => {
    cy.get('input')
  })

})