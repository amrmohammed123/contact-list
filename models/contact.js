module.exports = mongoose => {
  const contactSchema = new mongoose.Schema(
    {
      email: String,
      mobile: String,
      firstName: String,
      lastName: String
    },
    { timestamps: { createdAt: "createdAt" } }
  );
  return mongoose.model("Contact", contactSchema);
};
