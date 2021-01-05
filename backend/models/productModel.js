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

const colorSchema = mongoose.Schema({
  name: { type: String, required: false },
  inStock: { type: String, required: false },
  images: [{ type: String, required: false }]
})

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    name: {
      type: String,
      required: true
    },
    image: [
      {
        type: String,
        required: false
      }
    ],
    color: [colorSchema],
    reviews: [reviewSchema],
    brand: {
      type: String,
      required: false
    },
    category: {
      type: String,
      required: false
    },
    fibers: {
      type: String,
      required: false
    },
    meterage: {
      type: String,
      required: false
    },
    minimum: {
      type: Number,
      required: true,
      default: 0
    },
    description: {
      type: String,
      required: false
    },
    rating: {
      type: Number,
      required: false,
      default: 0
    },
    numReviews: {
      type: Number,
      required: false,
      default: 0
    },
    price: {
      type: Number,
      required: true,
      default: 0
    },
    outOfStock: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  {
    timestamps: true
  }
)

const Product = mongoose.model("Product", productSchema)

export default Product
