import LoginPage from "../pages/loginPage";
import MenuPage from "../pages/menuPage";
import UserFactory from "../../factories/userFactory";
import BaseTest from "../support/baseTest";

class LoginTest extends BaseTest {
  runTests() {
    describe("Login Tests", () => {
      beforeEach(() => {
        super.beforeEach();
      });

      afterEach(() => {
        super.afterEach();
      });

      it("should log in with valid credentials", () => {
        // Assert
        MenuPage.verifySchoolNameIsVisible();
      });

      it("should fail to log in with invalid credentials", () => {
        if (LoginPage.usernameIsVisible()) {
          LoginPage.goToUserName().logout();
        }

        const invalidCombinations = UserFactory.getInvalidCombinations();

        invalidCombinations.forEach((user) => {
          // Act
          LoginPage.loginAs(user.username).withPassword(user.password).login();

          // Assert
          LoginPage.verifyErrorLabel(user.errorText);

          // Reset form between attempts if needed (optional, depends on the app behavior)
          cy.reload();
          LoginPage.navigateTo();
        });
      });
    });
  }
}

const loginTest = new LoginTest();
loginTest.runTests();