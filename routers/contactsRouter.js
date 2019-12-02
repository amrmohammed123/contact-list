module.exports = (
  express,
  contactsValidators,
  validationResult,
  contactsController
) => {
  const router = express.Router();
  const {
    addContactValidator,
    getListValidator,
    getRecentListValidator
  } = contactsValidators; // load validators
  const {
    addNewContact,
    findUserContacts,
    recentContacts
  } = contactsController; // load controllers

  // add a new contact to a user
  router.post("/addContact", addContactValidator, async (req, res) => {
    // check for any validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    // no errors
    const result = await addNewContact(req.body);
    switch (result) {
      case "success":
        return res.status(200).send("");
      case "error":
        return res.status(500).send("");
      case "user doesn't exist":
        return res.status(401).send("");
    }
  });

  // get all contacts of user for a specified page number (assuming a page will show 5 user)
  router.post("/getList", getListValidator, async (req, res) => {
    // check for any validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    // no errors
    const result = await findUserContacts(req.body);
    switch (result) {
      case "error":
        return res.status(500).send("");
      case "user doesn't exist":
        return res.status(401).send("");
      default:
        res.status(200).json(result);
    }
  });

  // get last added 5 users (or less if there's less than 5 users)
  router.post("/getRecentList", getRecentListValidator, async (req, res) => {
    // check for any validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    // no errors
    const result = await recentContacts(req.body);
    switch (result) {
      case "error":
        return res.status(500).send("");
      case "user doesn't exist":
        return res.status(401).send("");
      default:
        res.status(200).json(result);
    }
  });

  return router;
};
