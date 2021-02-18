const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const RoleSchema = new Schema({
  name: {
    type: String,
    require: "ERROR_NAME_MISSING",
  },
  created_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
});

/**
 * pre-save hook
 */

RoleSchema.pre("save", function (next) {
  this.update_at = Date.now();
  next();
});

module.exports = mongoose.model("Role", RoleSchema);
