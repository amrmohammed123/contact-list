module.exports = mongoose => {
  const userSchema = new mongoose.Schema({
    _id: {
      type: {
        authorization: { type: String, required: true },
        deviceToken: { type: String, required: true },
        fingerPrint: { type: String, required: true }
      },
      required: true
    },
    name: { type: String, required: true },
    contacts: [mongoose.Schema.Types.ObjectId]
  });
  return mongoose.model("User", userSchema);
};
