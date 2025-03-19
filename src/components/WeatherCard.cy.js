import React from 'react';
import { mount } from 'cypress/react';
import WeatherCard from './WeatherCard';

describe('WeatherCard Component', () => {
  it('should display weather information', () => {
    const city = {
      name: 'Melbourne',
      country: 'Australia',
      state: 'Victoria',
      lat: -37.814,
      lon: 144.96332,
    };

    cy.stub(global, 'fetch').resolves({
      json: () => Promise.resolve({
        main: { temp: 18.83 },
        weather: [{ main: 'Clear' }],
      }),
    });

    mount(<WeatherCard city={city} />);
    cy.contains('Melbourne').should('be.visible');
    cy.contains('18.83°C').should('be.visible');
    cy.contains('Clear').should('be.visible');
  });

  it('should display placeholder when temperature is not available', () => {
    const city = {
      name: 'Melbourne',
      country: 'Australia',
      state: 'Victoria',
      lat: -37.814,
      lon: 144.96332,
    };

    cy.stub(global, 'fetch').resolves({
      json: () => Promise.resolve({
        main: { temp: null },
        weather: [{ main: 'Clear' }],
      }),
    });

    mount(<WeatherCard city={city} />);
    cy.contains('Melbourne').should('be.visible');
    cy.contains('-/-').should('be.visible');
    cy.contains('Clear').should('be.visible');
  });
});