import BaseTest from "../support/baseTest";
import MenuPage from "../pages/menuPage";
import StudentPage from "../pages/studentPage";
import { MENU_OPTIONS } from "../support/menuOptions";
import StudentFactory from "../factories/studentFactory";

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
              const studentCombinations = StudentFactory.getStudents();
              MenuPage.navigateToMenu(MENU_OPTIONS.STUDENTS).andCreateNew();

              studentCombinations.forEach((student) => {
                StudentPage
              
                //Personal Details
                .genderAs(student.gender).withFirstName(student.firstName).andLastName(student.lastName)
                .withDateOfBirth(student.dateOfBirth).AndBloodGroup(student.bloodGroup)
                .toCurrentAddress(student.currentAddress).andCity(student.city).inCountry(student.country)

                //Account Information
                .withEmail(student.email).choosingUserName(student.userName)
                .withPassword(student.password).andConfirmPassword(student.password)

                //School Details
                .JoiningDateAs(student.joiningDate).andRollingNumber(student.rollingNumber)

                //.successDataSaved()

                .verifyStudentIsAdded(student.firstName);
              });
            });
          });
    }
}

const studentTest = new StudentTest();
studentTest.runTests();