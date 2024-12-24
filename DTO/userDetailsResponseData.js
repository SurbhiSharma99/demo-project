class UserDTO {
    constructor(user) {
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.email = user.email;
      this.userName = user.userName;
    }
  }
  
  module.exports = UserDTO;