import students from '../fixtures/students.json';

class StudentFactory {
    static createStudent(type) {
        const studentMap = {
          studentOne: students.students[0]
        };
    
        const student = studentMap[type];
    
        if (!student) {
          throw new Error(`Unknown user type: ${type}`);
        }
    
        return student;
      }
  
      static getStudents() {
          return students.students;
      }
}
  
export default StudentFactory;