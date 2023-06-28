var targetHero = 'Bombasto';

describe('Tour of Heroes App Testing', { testIsolation: false }, () => {
  it(`Should have title 'Tour Of Heroes'`, () => {
    cy.visit('/');
    cy.contains('Tour of Heroes');
  });

  it(`Should have title 'Top Heroes'`, () => {
    cy.contains('Top Heroes');
  });

  it(`Should have title 'Hero Search'`, () => {
    cy.contains('Hero Search');
  });

  it('should display the header with text "Messages"', () => {
    cy.get('.messages h2').should('contain', 'Messages');
  });

  it('should add and display messages', () => {
    cy.get('.messages .message')
      .should('have.length', 1)
      .each((messageElement, index) => {
        cy.wrap(messageElement).should('contain', 'fetched heroes');
      });
  });

  it('should clear messages', () => {
    cy.get('.messages .clear').click();
    cy.get('.messages .message').should('not.exist');
  });

  it(
    `Should select and route to (${targetHero}) Hero details`,
    dashboardSelecTargetHero
  );

  function dashboardSelecTargetHero() {
    cy.contains('Bombasto').click();
    cy.url().should('include', '/detail/13');
    cy.url().should('eq', 'http://localhost:4200/detail/13');
  }
});
