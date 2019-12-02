module.exports = (User, path) => {
  return {
    addNewUser: require(path.join(__dirname, "addNewUser"))(User)
  };
};
