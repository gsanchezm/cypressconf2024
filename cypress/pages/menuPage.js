import BasePage from "./basePage";
import VisibilityAssertion from "../strategies/visibilityAssertion";
import MenuFactory from "../factories/menuFactory";

class MenuPage extends BasePage {
  
  elements = {
    lblSchoolName: () => ".wpsp-schoolname",
    /*lnkDashboard: () => ".wpsp-navigation > :nth-child(1) > a > span",
    lnkTeachers: () => ".wpsp-navigation > :nth-child(2) > a > span",
    lnkStudents: () => ".wpsp-navigation > :nth-child(3) > a > span",
    lnkParents: () => ".wpsp-navigation > :nth-child(4) > a > span",
    lnkClases: () => ".wpsp-navigation > :nth-child(5) > a > span",
    lnkAttendance: () => ".wpsp-navigation > :nth-child(6) > a > span",
    lnkEvents: () => ".wpsp-navigation > :nth-child(7) > a > span",
    lnkNotify: () => ".wpsp-navigation > :nth-child(8) > a > span",
    lnTransport: () => ".wpsp-navigation > :nth-child(9) > a > span",
    lnkGeneralSettings: () => ".wpsp-navigation > :nth-child(10) > a > span",*/
  };

  verifySchoolNameIsVisible() {
    this.assertionContext
      .setStrategy(new VisibilityAssertion())
      .executeStrategy(this.elements.lblSchoolName());
  }

  schoolNameIsVisible(){
    cy.isElementVisible(this.elements.lblSchoolName());
    return this;
  }

  navigateToMenu(menu) {
    const menuMap = MenuFactory.getMenuMap();

    // Guard clause: Exit early if the menu is not valid
    if (typeof menu !== 'string' && typeof menu !== 'number') {
      throw new Error(`Invalid menu parameter type: ${typeof menu}. Must be a string or number.`);
    }

    let menuOrder;

    if (typeof menu === 'string') {
      menuOrder = menuMap[menu];
    } else if (typeof menu === 'number') {
      menuOrder = menu;
    }

    // Guard clause: Exit early if the menuOrder is not found
    if (!menuOrder) {
      throw new Error(`Menu item "${menu}" not found in menuMap.`);
    }

    // Proceed to click on the element
    cy.clickOnelement(`.wpsp-navigation > :nth-child(${menuOrder}) > a > span`);
    return this;
  }

  
  
}

export default new MenuPage();
