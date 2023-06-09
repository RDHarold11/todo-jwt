const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    category: {
      type: Array,
    },
    isFavorite: {
      type: Boolean,
    },
    img: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
