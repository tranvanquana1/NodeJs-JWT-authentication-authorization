const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  username: {
    type: String,
    require: "ERROR_USERNAME_MISSING",
  },

  email: { type: String, default: null },
  password: { type: String, require: "ERROR_PASSWORD_MISSING" },
  roles: [
    {
      type: ObjectId,
      ref: "Role",
      index: true,
      trim: true,
    },
  ],
  created_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
});

/**
 * pre-save hook
 */

UserSchema.pre("save", function (next) {
  this.update_at = Date.now();
  next();
});

module.exports = mongoose.model("User", UserSchema);
