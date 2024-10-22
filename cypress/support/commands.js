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

Cypress.Commands.add('getText', (selector) => {
  return cy.get(selector).then(($el) => {
    const text = $el.text().trim();  // Extract and trim the text
    return text;  // Return the text string
  });
});


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

Cypress.Commands.add("clickUntilVisible", (clickSelector, targetSelector, retries = 5, delay = 500) => {
  function clickAndCheck(retryCount) {
    if (retryCount <= 0) {
      throw new Error(`Failed to find ${targetSelector} after multiple attempts`);
    }

    cy.get(clickSelector).click({ force: true }).then(() => {
      cy.get('body').then(($body) => {
        if ($body.find(targetSelector).length === 0) {
          cy.wait(delay); // Wait for a moment before retrying
          clickAndCheck(retryCount - 1);
        } else {
          cy.get(targetSelector).should('be.visible');
        }
      });
    });
  }

  clickAndCheck(retries);
});

Cypress.Commands.add('selectDropdownItem', (dropdownSelector, visibleText) => {
  cy.get(dropdownSelector).should('be.visible').then(($dropdown) => {
    cy.wrap($dropdown).select(visibleText);
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

Cypress.Commands.add('readTable', (tableSelector) => {
  const tableData = [];
  let rowCount = 0;
  let headers = [];

  // Extract headers if they exist
  cy.get(`${tableSelector} thead th`).each(($header) => {
    headers.push($header.text().trim());
  }).then(() => {
    // Iterate over each row in the tbody
    cy.get(`${tableSelector} tbody tr`).each(($row) => {
      const rowData = {};
      rowCount++; // Increment row count

      // Iterate over each cell in the row
      cy.wrap($row).find('td').each(($cell, index) => {
        const header = headers[index] || `column${index}`; // Use header or fallback to generic column name
        
        // Check if the cell contains interactive elements
        if ($cell.find('button, a, input, select, textarea').length > 0) {
          rowData[header] = {
            text: $cell.text().trim(),
            elements: $cell.find('button, a, input, select, textarea')
          };
        } else {
          rowData[header] = $cell.text().trim();
        }
      });

      tableData.push(rowData);
    }).then(() => {
      cy.wrap({ tableData, rowCount }).as('tableDataWithCount'); // Store the result for further use
    });
  });
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

Cypress.Commands.add('shouldBeVisibleThenDisappear', (selector, shouldExist = true, timeout = 10000) => {
  // Assert that the element is initially visible
  cy.get(selector).should('be.visible');

  // Use ternary operator to check if the element should still exist or be removed
  cy.get(selector, { timeout }).should(shouldExist ? 'not.be.visible' : 'not.exist');
});
