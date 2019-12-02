module.exports = (User, Contact) => {
  return async ({ authorization, deviceToken, fingerPrint }) => {
    try {
      // find user
      const user = await User.findById({
        authorization,
        deviceToken,
        fingerPrint
      });
      if (!user) return "user doesn't exist";
      else {
        if (user.contacts.length === 0)
          // no users to retrieve
          return [];
        else {
          const usersToRetrieve = user.contacts.slice(
            Math.max(user.contacts.length - 5, 0),
            user.contacts.length
          );
          return await Contact.aggregate([
            {
              $match: { _id: { $in: usersToRetrieve } }
            },
            {
              $project: {
                _id: 0,
                firstName: "$firstName",
                lastName: "$lastName",
                email: "$email",
                mobileNumber: "$mobile",
                created_ts: "$createdAt"
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
