module.exports = (body, path) => {
  return {
    addContactValidator: require(path.join(__dirname, "addContactValidator"))(
      body
    ),
    getListValidator: require(path.join(__dirname, "getListValidator"))(body),
    getRecentListValidator: require(path.join(
      __dirname,
      "getRecentListValidator"
    ))(body)
  };
};
