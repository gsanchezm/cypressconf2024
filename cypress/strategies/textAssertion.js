import AssertionStrategy from "./assertionStrategy";

class TextAssertion extends AssertionStrategy {
  execute(selector, expectedText) {
    if (!expectedText || expectedText.trim().length === 0) {
      // If expectedText is empty or only whitespace, skip the assertion
      cy.log("Skipping text assertion because expectedText is empty.");
      return;
    }

    cy.get(selector).should("have.text", expectedText);
  }
}

export default TextAssertion;