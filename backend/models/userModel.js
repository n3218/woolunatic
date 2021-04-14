import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    storecredit: { type: Number, required: true, default: 0 },
    phone: { type: String, required: false, default: "" },
    favorites: [
      {
        art: { type: String, required: false },
        brand: { type: String, required: false },
        name: { type: String, required: true },
        color: { type: String, required: false },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product"
        }
      }
    ],
    address: [
      {
        address: { type: String, required: true },
        city: { type: String, required: true },
        zipCode: { type: String, required: true },
        country: { type: String, required: true }
      }
    ]
  },
  {
    timestamps: true
  }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model("User", userSchema)

export default User
