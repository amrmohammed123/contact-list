module.exports = (User, Contact) => {
  return async ({ authorization, deviceToken, fingerPrint, pageNum }) => {
    try {
      // find user
      const user = await User.findById({
        authorization,
        deviceToken,
        fingerPrint
      });
      if (!user) return "user doesn't exist";
      else {
        const contactsToRetrieve = 5; // assuming each page will show 5 contacts
        const start = (pageNum - 1) * contactsToRetrieve;
        if (start >= user.contacts.length)
          // no users to retrieve
          return [];
        else {
          const usersToRetrieve = user.contacts.slice(
            start,
            Math.min(start + contactsToRetrieve, user.contacts.length)
          );
          return await Contact.aggregate([
            {
              $match: { _id: { $in: usersToRetrieve } }
            },
            {
              $project: {
                contactId: "$_id",
                _id: 0,
                firstName: "$firstName",
                lastName: "$lastName",
                email: "$email",
                mobileNumber: "$mobile",
                createdAt: "$createdAt"
              }
            }
          ]);
        }
      }
    } catch {
      return "error";
    }
  };
};
