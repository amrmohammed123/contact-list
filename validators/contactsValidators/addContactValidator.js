module.exports = body => {
  return [
    body("authorization").not().isEmpty(),
    body("deviceToken").not().isEmpty(),
    body("fingerPrint").not().isEmpty(),
    body("email").isEmail(),
    body("firstName").isAlpha(),
    body("lastName").isAlpha(),
    body("mobile").isMobilePhone()
  ]
};
