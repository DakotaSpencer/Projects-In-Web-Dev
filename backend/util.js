const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
require("dotenv").config();

class Utils {
  generateKey() {
    return uuidv4();
  }
  saltPassword(password) {
    return password + process.env.SALT_WORD;
  }
  unsaltPassword(password) {
    var regex = new RegExp(process.env.SALT_WORD + "$");
    return password.replace(regex, "");
  }
  async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }
  async comparePasswords(inputPassword, hashedPassword) {
    return await bcrypt.compare(inputPassword, hashedPassword);
  }
}

module.exports = Utils;
