var targetHero = 'Bombasto';
var nameSuffix = 'X';
var newHeroName = targetHero + nameSuffix;

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

  it(
    `Should update hero name (${newHeroName}) in details view`,
    updateHeroNameInDetailView
  );

  function updateHeroNameInDetailView() {
    cy.get('.ng-untouched').clear().type(newHeroName);
    cy.get('app-hero-detail > :nth-child(1) > :nth-child(5)').click();

    cy.get('[ng-reflect-router-link="/detail/13"]').contains(newHeroName);

    cy.url().should('include', '/dashboard');
    cy.url().should('eq', 'http://localhost:4200/dashboard');
  }

  it(`Should save and show (${newHeroName}) in Heroes List`, () => {
    cy.get('[routerlink="/heroes"]').click();
    cy.get(':nth-child(2) > a').contains(newHeroName);
  });

  it(`Should delete (${newHeroName}) in details view`, () => {
    cy.get(':nth-child(2) > .delete').click();
    cy.get('ul.heroes').find('li').should('have.length', 8);
  });

  it(`Should add back ${targetHero}`, () => {
    cy.get('input').type(targetHero);
    cy.get('app-heroes > div > button').click();
    cy.contains(targetHero);
  });

  it(`Should add the hero name Alice`, () => {
    cy.get('input').type('Alice');
    cy.get('app-heroes > div > button').click();
    cy.contains('Alice');
  });

  it(`Should search for 'Ma'`, () => {
    cy.visit('localhost:4200');
    cy.get('#search-box').type('Ma');

    cy.get(':nth-child(1) > a').contains('Magneta');
    cy.get('.search-result > :nth-child(2) > a').contains('RubberMan');
    cy.get(':nth-child(3) > a').contains('Dynama');
    cy.get(':nth-child(4) > a').contains('Magma');
  });

  it(`Should continue search with 'g'`, () => {
    cy.get('#search-box').type('g');

    cy.get(':nth-child(1) > a').contains('Magneta');
    cy.get(':nth-child(4) > a').contains('Magma');
  });

  it(`Should continue search with 'n' and selects 'Magneta'`, () => {
    cy.get('#search-box').type('n');

    cy.get(':nth-child(1) > a').contains('Magneta').click();
  });

  it(`Should Navigate to Magneta details view properly`, () => {
    cy.url().should('include', '/detail/15');
    cy.url().should('eq', 'http://localhost:4200/detail/15');
  });
});
