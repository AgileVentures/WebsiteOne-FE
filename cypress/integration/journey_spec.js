describe('Journey test', function () {
  describe('GIVEN I am in the home page', function () {
    beforeEach(function () {
      cy.visit('/')
    })

    it('THEN I should see the home page', function () {
      cy.contains('Scrums')
    })
  })
})