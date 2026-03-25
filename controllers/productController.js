 import Product from "../models/productmodel.js";


export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      message: "Saved",
      data: product
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


 export const getProducts = async (req, res) => {
  try {
  
    const products = await Product.find();

    
    const mobile = products.filter(p => p.categoryType === "mobile");


    const laptop = products.filter(p => p.categoryType === "laptop");

    const bangles = products.filter(p => p.categoryType === "bangles");
    const popular = await Product.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      mobile,
      laptop,
      bangles,
      popular
    });

  } catch (error) {
    console.error("ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};