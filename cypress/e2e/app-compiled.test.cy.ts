describe('Приложение доступно', () => {
    it('Приложение поднялось', function() {
        cy.visit('http://localhost:3000');
      });
})