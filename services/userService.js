const bcrypt = require('bcrypt-nodejs');

module.exports = {

    // generating a hash
    // passwords are not saved to the database as is. Instead, they are hashed first, then saved.
    // hashes are always the same for the same password given the same "salt".
    generateHash(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    },
    // checking if password is valid
    // this method takes the password, hashes it, and compares it to the user's own password
    // when the two hashes are equal, it means the passwords match
    validPassword(password, userPassword) {
        return bcrypt.compareSync(password, userPassword);
    },
    
    isMember(user) {
        return (user.role === "member");
    },
    isManager(user) {
        return (user.role === "manager");
    }
}