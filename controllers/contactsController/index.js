module.exports = (User, Contact, path) => {
  return {
    addNewContact: require(path.join(__dirname, "addNewContact"))(
      User,
      Contact
    ),
    findUserContacts: require(path.join(__dirname, "findUserContacts"))(
      User,
      Contact
    ),
    recentContacts: require(path.join(__dirname, "recentContacts"))(
      User,
      Contact
    )
  };
};
