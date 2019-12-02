module.exports = (body, path) => {
  return {
    addUserValidator: require(path.join(__dirname, "addUserValidator"))(body)
  };
};
