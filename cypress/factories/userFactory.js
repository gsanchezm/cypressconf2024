import users from '../fixtures/users.json';

class UserFactory {
    static createUser(type) {
      const userMap = {
        validUser: users.adminUser,
        invalidUser: users.invalidCombinations[0],
        emptyUsername: users.invalidCombinations[1],
        emptyPassword: users.invalidCombinations[2],
        emptyUsernameAndPassword: users.invalidCombinations[3],
      };
  
      const user = userMap[type];
  
      if (!user) {
        throw new Error(`Unknown user type: ${type}`);
      }
  
      return user;
    }

    static getInvalidCombinations() {
        return users.invalidCombinations;
    }
}
  
export default UserFactory;