describe('Login Normal', () => {
  it('should log in successfully with valid credentials', () => {
    cy.visit('http://localhost:3000/login');

    // Ingresar correo y contraseña
    cy.get('input[type="email"]').type('prueba2@homailt.com');
    cy.get('input[type="password"]').type('Akali123');

    // Hacer clic en el botón de Login usando data-testid
    cy.get('[data-testid="login-button"]').click();

    // Verificar redirección y ausencia de mensaje de error
    cy.url().should('eq', 'http://localhost:3000/');
    cy.get('div').should('not.contain', 'El usuario no existe o la contraseña es incorrecta.');
  });

  it('should show an error message for invalid credentials', () => {
    cy.visit('http://localhost:3000/login');

    // Ingresar credenciales incorrectas
    cy.get('input[type="email"]').type('prueba2@homailt.com');
    cy.get('input[type="password"]').type('wrongpassword');

    // Hacer clic en el botón de Login usando data-testid
    cy.get('[data-testid="login-button"]').click();

    // Verificar el mensaje de error
    cy.get('div').should('contain', 'El usuario no existe o la contraseña es incorrecta.');
  });
});
