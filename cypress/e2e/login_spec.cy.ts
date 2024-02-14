describe('Login Process', () => {
  it('successfully logs in', () => {
    cy.visit('http://localhost:3000/api/login');
    // Double check the endpoint in your backend

    cy.get('input[name=username]').type('validUser');
    cy.get('input[name=password]').type('validPassword');

    cy.get('form[data-testid="login-form"]').submit();

    cy.window().its('localStorage.token').should('exist');
  });
});