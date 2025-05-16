const bcrypt = require('bcrypt');
const saltRounds = 10;

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    console.error('Hashing error:', error);
    throw error;
  }
};

const comparePassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    console.error('Comparison error:', error);
    return false;
  }
};

module.exports = { hashPassword, comparePassword };