import BasePage from "./basePage";
const MonthConverter = require("../support/monthConverter");
import TextAssertion from '../strategies/textAssertion';

class StudentPage extends BasePage {
  elements = {
    rdbMale: () => "#Male",
    rdbFemale: () => "#Female",
    rdbOther: () => "#other",
    txtFirstName: () => "#firstname",
    txtLastName: () => "#lastname",

    dtpDateOfBirth: () => "#Dob",
    thMonth: () =>
      "div.datepicker-days >table > thead > tr > th.datepicker-switch",
    thYear: () =>
      "div.datepicker-months >table > thead > tr > th.datepicker-switch",
    spnYear: () => "div.datepicker-years >table > tbody > tr > td > span",
    thPrev: () => "div.datepicker-years >table > thead > tr > th.prev",
    thNext: () => "div.datepicker-years >table > thead > tr > th.next",

    ddlBloodGroup: () => "#Bloodgroup",
    txtCurrentAddress: () => "#current_address",
    txtCityName: () => "#current_city",
    ddlCurrentCountry: () => "#current_country",

    txtEmail: () => "#Email",
    txtUserName: () => "#Username",
    txtPassword: () => "#Password",
    txtConfirmPassword: () => "#ConfirmPassword",

    dtpJoiningDate: () => "#Doj",
    ddlClass: () => "div > select[name='Class[]']",
    txtRollNumber: () => "#Rollno",
    btnSubmit: () => "#studentform4",

    tblStudent: () => "#student_table"
  };

  //Personal Details
  genderAs(gender) {
    const genderMap = {
      Male: this.elements.rdbMale(),
      Female: this.elements.rdbFemale(),
      Other: this.elements.rdbOther(),
    };

    const radioButton = genderMap[gender];

    if (!radioButton) {
      throw new Error(
        `Invalid gender option: "${gender}". Must be "Male", "Female", or "Other".`
      );
    }

    // Select the appropriate radio button
    cy.selectRadioButton(gender, radioButton);

    return this;
  }

  withFirstName(firstName) {
    cy.typeIfNotEmpty(this.elements.txtFirstName(), firstName);
    return this;
  }

  andLastName(lastName) {
    cy.typeIfNotEmpty(this.elements.txtLastName(), lastName);
    return this;
  }

  withDateOfBirth(dateOfBirth) {
    const converter = new MonthConverter();
    const userDate = new Date(dateOfBirth);
    const userYear = userDate.getFullYear();
    const userMonth = userDate.getMonth() + 1; // getMonth() is zero-based
    const userDay = userDate.getDate();

    cy.clickOnelement(this.elements.dtpDateOfBirth());
    cy.clickOnelement(this.elements.thMonth());

    cy.getText(this.elements.thYear()).then((text) => {
      const currentYear = parseInt(text);

      if (currentYear === userYear) {
        converter.selectMonthAndDay(converter, userMonth, userDay);
      } else {
        const yearGreaterThan = currentYear > userYear;
        cy.clickOnelement(this.elements.thYear());
        converter.selectYear(userYear, yearGreaterThan);
        converter.selectMonthAndDay(converter, userMonth, userDay);
      }
    });
    return this;
  }

  AndBloodGroup(bloodGroup) {
    cy.selectDropdownItem(this.elements.ddlBloodGroup(),bloodGroup);
    return this;
  }

  toCurrentAddress(address) {
    cy.typeIfNotEmpty(this.elements.txtCurrentAddress(), address);
    return this;
  }

  andCity(city) {
    cy.typeIfNotEmpty(this.elements.txtCityName(), city);
    return this;
  }

  inCountry(country) {
    cy.selectDropdownItem(this.elements.ddlCurrentCountry(),country);
    return this;
  }

  //Account Information
  withEmail(email){
    cy.typeIfNotEmpty(this.elements.txtEmail(), email);
    return this;
  }

  choosingUserName(username){
    cy.typeIfNotEmpty(this.elements.txtUserName(), username);
    return this;
  }

  withPassword(password){
    cy.typeIfNotEmpty(this.elements.txtPassword(), password);
    return this;
  }

  andConfirmPassword(password){
    cy.typeIfNotEmpty(this.elements.txtConfirmPassword(), password);
    return this;
  }

  //School Details
  JoiningDateAs(joiningDate){
    const converter = new MonthConverter();
    const userDate = new Date(joiningDate);
    const userYear = userDate.getFullYear();
    const userMonth = userDate.getMonth() + 1; // getMonth() is zero-based
    const userDay = userDate.getDate();

    cy.clickOnelement(this.elements.dtpJoiningDate());
    cy.clickOnelement(this.elements.thMonth());

    cy.getText(this.elements.thYear()).then((text) => {
      const currentYear = parseInt(text);

      if (currentYear === userYear) {
        converter.selectMonthAndDay(converter, userMonth, userDay);
      } else {
        const yearGreaterThan = currentYear > userYear;
        cy.clickOnelement(this.elements.thYear());
        converter.selectYear(userYear, yearGreaterThan);
        converter.selectMonthAndDay(converter, userMonth, userDay);
      }
    });

    return this;
  }

  selectingClass(classSelected){
    cy.selectDropdownItem(this.elements.ddlClass(),classSelected);
    return this;
  }

  andRollingNumber(rollingNumber){
    cy.typeIfNotEmpty(this.elements.txtRollNumber(), rollingNumber);
    cy.clickOnelement(this.elements.btnSubmit());
    return this;
  }

  verifyStudentIsAdded(fullName) {
    cy.readTable(this.elements.tblStudent()).then(() => {
      cy.get('@tableDataWithCount').then(({ tableData, rowCount }) => {
        // Debugging: Log the table data
        cy.log('Extracted Table Data:', JSON.stringify(tableData));
  
        const specificRow = tableData.find(row => row['Full Name'].includes(fullName));
        this.assertionContext.setStrategy(new TextAssertion()).executeStrategy(this.elements.tblStudent(), fullName);
  
        if (specificRow && specificRow['Action']) {
          // Assuming 'Action' is the header for the column with buttons
          const actionElements = specificRow['Action'].elements;
          cy.wrap(actionElements).eq(3).click(); // Click the first button (e.g., "See")
        }
      });
    });
    
    this.andChooseIfDelete(true);
  }  
  
}

export default new StudentPage();
