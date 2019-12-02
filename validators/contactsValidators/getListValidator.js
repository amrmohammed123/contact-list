module.exports = body => {
  return [
    body("authorization").not().isEmpty(),
    body("deviceToken").not().isEmpty(),
    body("fingerPrint").not().isEmpty(),
    body("pageNum").isNumeric()
  ];
};
