describe('Book Purchase', () => {
  it('should add a book to cart and complete purchase', () => {
    // Visitar la página del libro con ID 1
    cy.visit('http://localhost:3000/book/1');

    // Esperar a que los datos del libro se carguen
    cy.contains('Loading',  { timeout: 10000 }).should('not.exist'); // Verificar que el texto de carga desaparezca

    // Buscar y hacer clic en el botón "Añadir al carrito" usando la clase del botón
    cy.get('button.buy-button').click();

    // Esperar a que la notificación de "Book added to cart" aparezca
    cy.contains('Book added to cart',).should('be.visible');


    // cy.wait(5000);

  });
});
