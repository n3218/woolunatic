import mongoose from "mongoose"

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
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

const holdsSchema = mongoose.Schema({
  qty: { type: Number, required: false },
  lockedAt: { type: Date, required: false },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "User"
  }
})

const productSchema = mongoose.Schema(
  {
    art: { type: String, required: true, unique: true, index: true, default: "" },
    brand: { type: String, required: true, default: "" },
    name: { type: String, required: true, default: "" },
    color: { type: String, required: true, default: "" },
    colorWay: { type: String, required: true, default: "" },
    category: { type: String, required: true, default: "" },
    nm: { type: String, required: false, default: "" },
    meterage: { type: Number, required: false, default: 0 },
    fibers: { type: String, required: false, default: "" },
    price: { type: Number, required: true, default: 0 },
    description: { type: String, required: false, default: "" },
    image: [{ type: String, required: false }],
    reviews: [reviewSchema],
    rating: { type: Number, required: false, default: 0 },
    numReviews: { type: Number, required: false, default: 0 },
    minimum: { type: Number, required: false, default: 0 },
    inStock: { type: String, required: false, default: "" },
    onHold: [holdsSchema],
    outOfStock: { type: Boolean, required: false, default: false },
    novelty: { type: Boolean, required: false, default: false },
    inSale: { type: Boolean, required: false, default: false },
    regular: { type: Boolean, required: false, default: false },
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

const Product = mongoose.model("Product", productSchema)

export default Product
