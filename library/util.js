function validateString(val) {
  return val && val.trim().length > 0;
}

module.exports = {
  validateString
};
