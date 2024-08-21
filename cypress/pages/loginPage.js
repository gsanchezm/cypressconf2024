import BasePage from "./basePage";
import TextAssertion from '../strategies/textAssertion';
import VisibilityAssertion from '../strategies/visibilityAssertion';

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
    this.assertionContext.setStrategy(new TextAssertion()).executeStrategy(this.elements.lblError(), errorToCompare);
  }
}

export default new LoginPage();
