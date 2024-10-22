import AssertionContext from "../strategies/assertionContext";
import VisitDecorator from "../decorators/visitDecorator"

class BasePage {
  assertionContext = new AssertionContext();
  visitDecorator = new VisitDecorator();

  baseElements = {
    spnUserName: () => ".wpsp-profile-pic.wpsp-dropdown-toggle",
    lnkBackToWpAdmin: () => ".wpsp-back-wp > a",
    lnkChangePassword: () => ".wpsp-back-wp-changepassword > a",
    lnkSignOut: () => ".wpsp-dropdown > ul > :nth-child(3) > a",
    dvPreloading: () => ".wpsp-preLoading",
    btnCreateNew: () => ".wpsp-right > .wpsp-btn",
    dvDeleteModal: () => "div.wpsp-popup-cont.wpsp-alertbox.wpsp-alert-danger",
    btnOk: () => "a.ClassDeleteBt",
    btnCancel: () => "a.wpsp-popup-cancel",
    mdlSavedData: () => "#SuccessModal" //#SuccessModal > .wpsp-popBody > .wpsp-popInner > .wpsp-popup-cont
  };

  // Method to navigate to a specific URL
  navigateTo(url) {
    this.visitDecorator.visit(url);
    return this;
  }

  // Method to navigate to baseURL in cypress.config.js
  navigateTo() {
    this.visitDecorator.visit("/");
    return this;
  }

  goToUserName() {
    cy.clickUntilVisible(this.baseElements.spnUserName,this.baseElements.lnkSignOut()) 
    return this;
  }

  usernameIsVisible() {
    return cy.isElementVisible(this.baseElements.spnUserName());
    //return this;
  }

  preloadingIsNotVisible() {
    cy.waitUntilNotVisible(this.baseElements.dvPreloading());
    return this;
  }

  andCreateNew() {
    cy.clickOnelement(this.baseElements.btnCreateNew());
  }

  logout() {
    cy.isElementVisible(this.baseElements.spnUserName()).then((isVisible) =>{
      if(isVisible){
        cy.clickUntilVisible(this.baseElements.spnUserName(),this.baseElements.lnkBackToWpAdmin());
        cy.log('Clicked on back to admin')
      }
    })
    cy.clickOnelement(this.baseElements.lnkSignOut());
    return this;
  }

  andChooseIfDelete(selection) {
    cy.isElementVisible(this.baseElements.dvDeleteModal()).then((isVisible) => {
      cy.clickOnelement(isVisible && selection
        ? this.baseElements.btnOk()
        : this.baseElements.btnCancel()
      );
    });
  }

  successDataSaved(){
    cy.shouldBeVisibleThenDisappear(this.baseElements.mdlSavedData());
  }
}

export default BasePage;
