describe('Login Process', () => {
  it('successfully logs in', () => {
    cy.visit('http://localhost:3001/login');

    cy.get('input[name=email]').type('validUser');
    cy.get('input[name=password]').type('validPassword');

    cy.get('form[data-testid="login-form"]').submit();

    cy.window().its('localStorage.token').should('exist');
  });
});
