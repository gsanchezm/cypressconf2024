import StudentPage from "../pages/studentPage";

class MonthConverter {
  constructor() {
    this.months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
  }

  getMonthAbbreviation(monthNumber) {
    if (monthNumber < 1 || monthNumber > 12) {
      throw new Error("Month number must be between 1 and 12.");
    }
    return this.months[monthNumber - 1];
  }

  getMonthNumber(monthAbbreviation) {
    const index = this.months.indexOf(monthAbbreviation.toUpperCase());
    if (index === -1) {
      throw new Error(
        "Invalid month abbreviation. Use three-letter format like 'JAN', 'FEB', etc."
      );
    }
    return index + 1;
  }

  selectMonthAndDay(converter, userMonth, userDay) {
    // Select the month
    cy.get("div.datepicker-months > table > tbody > tr > td > span")
      .should("be.visible")
      .each(($el) => {
        if (
          $el.text().trim().toUpperCase() ===
          converter.getMonthAbbreviation(userMonth)
        ) {
          cy.wrap($el).click();
        }
      });

    // Select the day
    cy.get(
      "div.datepicker-days > table > tbody > tr > td.day:not(.old):not(.new)"
    )
      .should("be.visible")
      .each(($el) => {
        if (parseInt($el.text().trim()) === userDay) {
          cy.wrap($el).click();
        }
      });
  }

  selectYear(userYear, yearGreaterThan) {
    cy.get("div.datepicker-years > table > tbody > tr > td > span")
      .should("be.visible")
      .each(($el, index, $list) => {
        if (parseInt($el.text().trim()) === userYear) {
          cy.wrap($el).click();
          cy.log(`Year ${$el.text().trim()} found`);
          return false; // This will stop the `each` iteration
        } else if (index === $list.length - 1) {
          // If the end of the list is reached and the year is not found, click the previous/next button and recurse
          cy.clickOnelement(
            yearGreaterThan
              ? StudentPage.elements.thPrev()
              : StudentPage.elements.thNext()
          ).then(() => {
            this.selectYear(userYear, yearGreaterThan); // Recursive call after the click action completes
          });
        }
      });
  }
}

// Export the class so it can be used in other files
module.exports = MonthConverter;
