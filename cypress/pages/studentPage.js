import BasePage from "./basePage";

class StudentPage extends BasePage {
  elements = {
    rdbMale: () => "#Male",
    rdbFemale: () => "#Female",
    rdbOther: () => "#other",
    txtFirstName: () => "#firstname",
    txtLastName: () => "#lastname",

    dtpDateOfBirth: () => "#Dob",
    thActualMonthyear: () => "div.datepicker-days >table > thead > tr > th.datepicker-switch",
    spnYear: () => "div.datepicker-years >table > tbody > tr > td > span",
    thPrev: () => "div.datepicker-years >table > thead > tr > th.prev",
    thNext: () => "div.datepicker-years >table > thead > tr > th.next",

    ddlBloodGroup: () => "#Bloodgroup",
    txtCurrentAddress: ()=> "#current_address",
    txtCityName: () => "#current_city",
    ddlCurrentCountry: () => "#current_country",

    rdbParentMale: () => "#p_Male",
    rdbParentFemale: () => "#p_Female",
    rdbParentOther: () => "#p_other",

    txtEmail: () => "#Email",
    txtUserName: () => "#Username",
    txtPassword: () => "#Password",
    txtConfirmPassword: () => "#ConfirmPassword",

    dtpJoiningDate: () => "#Doj",
    ddlClass: () => "div > select[name='Class[]']",
    txtRollNumber: () => "#Rollno"
  };

  //Personal Details
  genderAs(gender){
    const genderMap = {
        Male: this.elements.rdbMale(),
        Female: this.elements.rdbFemale(),
        Other: this.elements.rdbOther()
    };

    // Get the corresponding radio button selector for the provided gender
    const radioButton = genderMap[gender];

    // Guard clause: If gender is not valid, throw an error
    if (!radioButton) {
        throw new Error(`Invalid gender option: "${gender}". Must be "Male", "Female", or "Other".`);
    }

    // Select the appropriate radio button
    cy.selectRadioButton(gender, radioButton);

    return this;
  }

  withFirstName(firstName){
    cy.typeIfNotEmpty(this.elements.txtFirstName(), firstName);
    return this;
  }

  andLastName(lastName){
    cy.typeIfNotEmpty(this.elements.txtLastName(), lastName);
    return this;
  }

  withDateOfBirth(dateOfBirth){
    const date = dateOfBirth.split("/");
    let i = 0;

    cy.clickOnelement(this.elements.dtpDateOfBirth());
    do{
        cy.clickOnelement(this.elements.thActualMonthyear());
    }while(i<3);
    
    if(this.elements.thActualMonthyear().contains(date[2])){
        cy.get('div.datepicker-years > table > tbody > tr > td > span').each(($el, index, $list) => {
            if (date[2] === '2026') {
              cy.wrap($el).click(); 
            }
          });
    }else{
        do{
            cy.clickOnelement(this.elements.thPrev());
        }while(date[2] === '2000');
    }

    
    return this;
  }

  AndBloodGroup(bloodGroup){
    return this;
  }

  toCurrentAddress(address){
    return this;
  }

  andCity(city){
    return this;
  }

  inCountry(country){
    return this;
  }

  //Parent Detail

  //Account Information

  //School Details
}

export default new StudentPage();
