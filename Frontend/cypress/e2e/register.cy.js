describe('User Registration', () => {
  it('should register a new user successfully', () => {
    cy.visit('http://localhost:3000/register'); // Reemplaza con la URL de tu página de registro
    cy.get('input[name="nombre"]').type('Juan');
    cy.get('input[name="apellido"]').type('Pérez');
    cy.get('input[name="edad"]').type('25');
    cy.get('input[name="correo"]').type('aaaa.aaaa@example.com');
    cy.get('select[name="genero"]').select('Masculino');
    cy.get('input[name="profesion"]').type('Ingeniero');

    cy.get('button').contains('Registrar').click();

    cy.get('.Toastify__toast--success').should('contain', 'Usuario registrado exitosamente'); // Verifica que aparezca la notificación de éxito
  });
});
