describe('Landing Page / Authentication', function() {
  beforeEach(() => {
    cy.visit('/');
  });

  it('accepts input', function() {
    cy.get('input[name=email]')
      .type('margad@gmail.com')
      .should('have.value', 'margad@gmail.com');
    cy.get('input[name=password]')
      .type('password')
      .should('have.value', 'password');
  });

  context('Form submission', () => {
    it('Login on submit', () => {
      cy.get('input[name=email]').type('margad@gmail.com');
      cy.get('input[name=password]').type('password');
      // .type('{enter}');
      cy.get('.makeStyles-primary-200').click();
      cy.location('pathname').should('eq', '/home');
    });
  });
});
