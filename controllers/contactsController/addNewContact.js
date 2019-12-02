module.exports = (User, Contact) => {
  return async ({
    authorization,
    deviceToken,
    fingerPrint,
    email,
    mobile,
    firstName,
    lastName
  }) => {
    try {
      // find user
      let user = await User.findById({
        authorization,
        deviceToken,
        fingerPrint
      });
      if (!user) return "user doesn't exist";
      // user exists
      // check if contact exists
      let contact = await Contact.findOne({
        email,
        mobile,
        firstName,
        lastName
      });
      if (contact) {
        // contact already exists, just add its id to user contacts if it doesn't exist
        if (!user.contacts.includes(contact.id)) {
          user.contacts.push(contact.id);
          user = await user.save();
        }
      } else {
        // contact doesn't exist, create a new contact
        contact = new Contact({
          email,
          mobile,
          firstName,
          lastName
        });
        // save the contact to the database
        contact = await contact.save();
        // add the contact id to user contacts
        user.contacts.push(contact.id);
        user = await user.save();
      }
      return "success";
    } catch {
      return "error";
    }
  };
};
