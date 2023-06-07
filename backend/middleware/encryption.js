const bcrypt = require("bcrypt");

function encrypt(plaintext) {
  try {
    return bcrypt.hashSync(plaintext, 10);
  } catch (err) {
    console.log(err);
  }
  return;
}

function compare(plain, hash) {
  try {
    if (bcrypt.compareSync(plain, hash)) return true;
    else return false;
  } catch (err) {
    console.log(err);
  }
  return false;
}

module.exports = { encrypt, compare };
