 import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: String,

    categoryType: {
      type: String,
      required: true,
      enum: ["mobile", "laptop", "bangles"]
    },

    RAM: String,
    Storage: String,
    Camera: String,
    Processor: String,
    Battery: String,

    Color: String,
    Size: String,
    Material: String,
    Weight: String
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);