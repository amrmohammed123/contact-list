module.exports = User => {
  return async ({ authorization, deviceToken, fingerPrint, name }) => {
    try {
      // check if user exists
      let user = await User.findById({
        authorization,
        deviceToken,
        fingerPrint
      });
      if (user) return "user exists";
      else {
        // user doesn't exist, create a new user
        user = new User({
          _id: { authorization, deviceToken, fingerPrint },
          name
        });
        // save the user to the database
        user = await user.save();
        return "success";
      }
    } catch {
      return "error";
    }
  };
};
