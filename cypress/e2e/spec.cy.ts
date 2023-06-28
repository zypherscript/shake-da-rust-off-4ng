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

  it(`Should have title 'Messages'`, () => {
    cy.contains('Messages');
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
