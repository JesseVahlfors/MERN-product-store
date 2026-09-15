import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
  try {

		const products = await Product.find();
		res.status(200).json({
			success: true,
			data: products
		})

	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Failed to get Products"
		})
		
	}
};

export const createProduct = async (req, res) => {
  const product = req.body;

	if(!product.name || !product.price || !product.image ){
		return res.status(400).json({
			success: false,
			message: "Please provide all fields."
		})
	}

	const  newProduct = new Product(product);

	try {
		await newProduct.save()

		res.status(201).json({
			success: true,
			data: newProduct,
		})
		
	} catch (error) {
		console.error("Error creating product", error);

		res.status(500).json({
			success: false,
			message: "Server error",
		})
	}
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
	const product = req.body;

	
	try {
		const updatedProduct = await Product.findByIdAndUpdate(
			id, 
			product, 
			{ returnDocument: "after" }
		);
		
		if (!updatedProduct){
			return res.status(404).json({
			success: false,
			message: "Product not found"
		})};

		res.status(200).json({
			success: true,
			data: updatedProduct
		});

	} catch (error) {

		res.status(500).json({
			success: false,
			message: "Server error"
		});

	}
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
 	try {
		const product = await Product.findByIdAndDelete(id);

			if (!product){
				return res.status(404).json({
				success: false,
				message: "Product not found"
			});
		}

		res.status(200).json({
		success: true,
			message: "Product deleted"
		})
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Server error"
		})
	}
};