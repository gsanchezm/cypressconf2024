import BaseTest from "../support/baseTest";
import MenuPage from "../pages/menuPage";
import StudentPage from "../pages/studentPage";
import { MENU_OPTIONS } from "../support/menuOptions";

class StudentTest extends BaseTest{
    runTests(){
        describe("Student Tests", () => {
            beforeEach(() => {
                super.beforeEach();
            });  

            afterEach(() => {
                super.afterEach();
              });

            it("should new student be created", () => {
              MenuPage.navigateToMenu(MENU_OPTIONS.STUDENTS).andCreateNew();

              StudentPage
              //Personal Details
                .genderAs('Female')
                .withFirstName('Test Student')
                .andLastName('Test LastName')
                .withDateOfBirth('06/12/2026')
                .AndBloodGroup('A+');

              //Parent Detail

              //Account Information

              //School Details
            });
          });
    }
}

const studentTest = new StudentTest();
studentTest.runTests();