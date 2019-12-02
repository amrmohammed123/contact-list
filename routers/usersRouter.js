module.exports = (
  express,
  usersValidators,
  validationResult,
  UsersController
) => {
  const router = express.Router();
  const { addUserValidator } = usersValidators;
  const { addNewUser } = UsersController;

  router.post("/addUser", addUserValidator, async (req, res) => {
    // check for any validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    // no errors
    const result = await addNewUser(req.body);
    switch (result) {
      case "success":
        return res.status(201).send("");
      case "error":
        return res.status(500).send("");
      case "user exists":
        return res.status(400).send("");
    }
  });

  return router;
};
