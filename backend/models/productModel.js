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

const productSchema = mongoose.Schema(
  {
    art: { type: String, required: false },
    brand: { type: String, required: false },
    name: { type: String, required: true },
    color: { type: String, required: false },
    colorWay: { type: String, required: false },
    category: { type: String, required: false },
    nm: { type: String, required: false, default: "" },
    meterage: { type: Number, required: false, default: 0 },
    fibers: { type: String, required: false, default: "" },
    price: { type: Number, required: true, default: 0 },
    description: { type: String, required: false, default: "" },
    image: [{ type: String, required: false }],
    reviews: [reviewSchema],
    rating: { type: Number, required: false, default: 0 },
    numReviews: { type: Number, required: false, default: 0 },
    minimum: { type: Number, required: true, default: 0 },
    inStock: { type: String, required: false, default: "" },
    stockLock: {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
      },
      lockedAt: { type: Date, required: true },
      value: { type: String, required: true }
    },
    outOfStock: { type: Boolean, required: true, default: false },
    novelty: { type: Boolean, required: true, default: false },
    inSale: { type: Boolean, required: true, default: false },
    regular: { type: Boolean, required: true, default: false },
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
