describe('Login con Google', () => {
  it('should log in successfully with Google', () => {
    cy.visit('http://localhost:3000/login');

    // Simular el éxito del login con Google
    cy.window().then((win) => {
      cy.stub(win, 'fetch').withArgs('http://localhost:8080/api/auth/google').resolves({
        ok: true,
        json: () => Promise.resolve({ message: 'Google login successful' }),
      });
    });

    // Hacer clic en el botón de Google Login
    cy.get('.google-login button').click();

    // Verificar redirección o respuesta exitosa
    cy.url().should('eq', 'http://localhost:3000/');
  });

  it('should show an error message if Google login fails', () => {
    cy.visit('http://localhost:3000/login');

    // Simular el fallo del login con Google
    cy.window().then((win) => {
      cy.stub(win, 'fetch').withArgs('http://localhost:8080/api/auth/google').resolves({
        ok: false,
        json: () => Promise.resolve({ error: 'Failed to authenticate with the server.' }),
      });
    });

    // Hacer clic en el botón de Google Login
    cy.get('.google-login button').click();

    // Verificar el mensaje de error
    cy.get('div').should('contain', 'Failed to authenticate with the server.');
  });
});
