import AssertionContext from '../strategies/assertionContext';

class BasePage {

  assertionContext = new AssertionContext();

  baseElements = {
    spnUserName: () => ".wpsp-username",
    lnkBackToWpAdmin: () => "..wpsp-back-wp > a",
    lnkChangePassword: () => ".wpsp-back-wp-changepassword > a",
    lnkSignOut: () => ".wpsp-dropdown > ul > :nth-child(3) > a",
    dvPreloading: () => ".wpsp-preLoading",
    btnCreateNew: () => ".wpsp-right > .wpsp-btn"
  };

  // Method to navigate to a specific URL
  navigateTo(url) {
    cy.visit(url);
    return this;
  }

  // Method to navigate to baseURL in cypress.config.js
  navigateTo() {
    cy.visit("/");
    return this;
  }

  goToUserName(){
    cy.clickOnelement(this.baseElements.spnUserName());
    return this;
  }

  usernameIsVisible(){
    cy.isElementVisible(this.baseElements.spnUserName());
    return this;
  }

  preloadingIsNotVisible(){
    cy.waitUntilNotVisible(this.baseElements.dvPreloading());
    return this;
  }

  andCreateNew(){
    cy.clickOnelement(this.baseElements.btnCreateNew());
  }

  logout(){
    cy.clickOnelement(this.baseElements.lnkSignOut());
    return this;
  }
}

export default BasePage;
