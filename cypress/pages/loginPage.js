import BasePage from "./basePage";
import TextAssertion from '../strategies/textAssertion';

class LoginPage extends BasePage {

  elements = {
    txtUserName: () => "#user_login",
    txtPassword: () => "#user_pass",
    chkRememberMe: () => "#rememberme",
    btnLogin: () => "#wp-submit",
    lblError: () => "#login_error > p",
  };

  loginAs(username) {
    cy.typeIfNotEmpty(this.elements.txtUserName(), username);
    return this;
  }

  userNameFieldIsVisible(){
    return cy.isElementVisible(this.elements.txtUserName()); 
  }

  withPassword(password) {
    cy.typeIfNotEmpty(this.elements.txtPassword(), password);
    return this;
  }

  andRememeberMe() {
    cy.checkIfUnchecked(this.elements.chkRememberMe());
    return this;
  }

  login() {
    cy.clickOnelement(this.elements.btnLogin());
    return this;
  }

  verifyErrorLabel(errorToCompare){
    cy.isElementVisible(this.elements.lblError()).then(
      (isVisible) =>{
        if(isVisible){
          this.assertionContext.setStrategy(new TextAssertion()).executeStrategy(this.elements.lblError(), errorToCompare, true);
        }
      }
    )
  }
}

export default new LoginPage();
