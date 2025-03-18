describe('Weather Application', () => {
    it('should display the application title', () => {
      cy.visit('http://localhost:3001'); 
      cy.contains('Weather Application').should('be.visible');
    });
  
    it('should allow text input in the search field and click the search button', () => {
      cy.visit('http://localhost:3001');
      cy.get('[data-testid="search-input"]').type('Melbourne');
      cy.get('[data-testid="search-button"]').click();
      cy.get('[data-testid="search-results"]').should('be.visible');
    });
  
    it('should display weather data when a city is selected', () => {
      cy.visit('http://localhost:3001');
      cy.get('[data-testid="search-input"]').type('Melbourne');
      cy.get('[data-testid="search-button"]').click();
      cy.get('[data-testid="search-results"]').should('be.visible');
      cy.get('[data-testid="search-results"] > div').first().click();
      cy.get('[data-testid="my-weather-list"]').within(() => {
        cy.contains('Melbourne').should('be.visible');
        cy.contains(/clouds|clear|sunny/i).should('be.visible');
        cy.contains(/\d+°C/).should('be.visible'); 
      });
    });
});