import React from 'react';
import { mount } from 'cypress/react';
import Search from './Search';

describe('Search Component', () => {
  it('should update query state on input change', () => {
    const setQuery = cy.stub().as('setQuery');
    mount(<Search query="" setQuery={setQuery} searchResults={[]} setsearchResults={cy.stub()} selectCity={cy.stub()} />);

    cy.get('[data-testid="search-input"]').type('Melbourne');
    cy.get('@setQuery').should('have.been.calledWith', 'Melbourne');
  });

  it('should fetch and display search results on button click', () => {
    const setsearchResults = cy.stub().as('setsearchResults');
    cy.stub(global, 'fetch').resolves({
      json: () => Promise.resolve([
        { name: 'Melbourne', country: 'Australia', lat: -37.814, lon: 144.96332 },
        { name: 'Melbourne', country: 'USA', lat: 28.0836, lon: -80.6081 }
      ]),
    });

    mount(<Search query="Melbourne" setQuery={cy.stub()} searchResults={[]} setsearchResults={setsearchResults} selectCity={cy.stub()} />);

    cy.get('[data-testid="search-button"]').click();
    cy.get('@setsearchResults').should('have.been.calledWith', [
      { name: 'Melbourne', country: 'Australia', lat: -37.814, lon: 144.96332 },
      { name: 'Melbourne', country: 'USA', lat: 28.0836, lon: -80.6081 }
    ]);
  });
});