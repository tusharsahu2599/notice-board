const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema({

    notice: { type: String, required: true },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: false,
    },
    postDate: { type: Date, required: true}
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("notices", noticeSchema);
