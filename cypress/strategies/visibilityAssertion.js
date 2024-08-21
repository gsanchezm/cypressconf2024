import AssertionStrategy from './assertionStrategy';

class VisibilityAssertion extends AssertionStrategy {
  execute(selector) {
    cy.get(selector).should('be.visible');
  }
}

export default VisibilityAssertion;