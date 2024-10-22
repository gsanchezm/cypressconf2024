import LoginPage from "../pages/loginPage";
import UserFactory from "../factories/userFactory";

class BaseTest {
    beforeEach() {
    const validUser = UserFactory.createUser("validUser");
      // This method will run before each test in the derived classes
      cy.log('Running shared beforeEach hook');
      LoginPage.navigateTo()
      .loginAs(validUser.username)
      .withPassword(validUser.password)
      .login()
      .preloadingIsNotVisible();
    }
  
    afterEach() {
      // This method will run after each test in the derived classes
      cy.log('Running shared afterEach hook');
    }
  }
  
  export default BaseTest;