import mongoose from "mongoose"

const textSchema = mongoose.Schema(
  {
    title: { type: String, required: true, default: "" },
    url: { type: String, required: true, default: "", unique: true },
    description: { type: String, required: false, default: "" },
    image: [{ type: String, required: false }],
    sort: { type: Number, required: false, default: 0 },
    hide: { type: Boolean, required: false, default: false },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
)

const Text = mongoose.model("Text", textSchema)

export default Text
