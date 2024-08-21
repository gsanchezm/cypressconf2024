// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import { recurse } from "cypress-recurse";

// Method to check if checkbox isn't checked
Cypress.Commands.add("checkIfUnchecked", (checkboxSelector) => {
  cy.get(checkboxSelector).then(($checkbox) => {
    if (!$checkbox.is(":checked")) {
      cy.wrap($checkbox).check();
    }
  });
});

// Method to type if text is not empty string
Cypress.Commands.add("typeIfNotEmpty", (inputSelector, text) => {
  if (text && text.trim().length > 0) {
    // Check if the string is not empty
    recurse(
      () => cy.get(inputSelector).should("be.visible").clear().type(text), // Type the text if it's not empty
      ($input) => $input.val() === text,
      {
        delay: 1000,
        timeout: 5000,
      }
    );
  }
});

Cypress.Commands.add("clickLink", (label) => {
  cy.get("a").contains(label).click();
});

Cypress.Commands.add("clickOnelement", (selector) => {
  cy.get(selector).should("be.visible").click();
});

Cypress.Commands.add("downloadFile", (url, directory, fileName) => {
  return cy.getCookies().then((cookies) => {
    return cy.task("downloadFile", {
      url,
      directory,
      cookies,
      fileName,
    });
  });
});

Cypress.Commands.add("isElementVisible", (selector,timeout = 10000) => {
  return cy.get("body", {timeout}).then(($body) => {
    const element = $body.find(selector);
    if (element.length > 0 && element.is(":visible")) {
      return true;
    } else {
      cy.log(`${selector} not visible or doesn't exist.`);
      return false;
    }
  });
});

Cypress.Commands.add("waitUntilNotVisible", (selector, timeout = 5000) => {
  //cy.get(selector, { timeout }).should("not.be.visible");
  cy.get('body').then(($body) => {
    const element = $body.find(selector);
    
    if (element.length > 0) {
      // Element exists, wait until it disappears
      cy.get(selector, { timeout }).should('not.be.visible');
    } else {
      // Element does not exist, continue immediately
      cy.log(`Element ${selector} does not exist. Continuing...`);
    }
  });
});

Cypress.Commands.add('selectRadioButton', (option, selector = 'input[type="radio"]') => {
  // Get all radio buttons and find the one that matches the given option
  cy.get(selector).each(($el) => {
    const value = $el.val();
    const label = $el.next('label').text().trim(); // Assumes the label is next to the input

    // Check if either the value or label matches the option
    if (value === option || label === option) {
      cy.wrap($el).check();
    }
  });
});
