import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/product.route.js'

dotenv.config()

const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json());

app.use("/api/products", productRoutes);

const startServer = async () => {
	await connectDB();
	
	app.listen(port, ()=> {
		console.log(`Server started at http://localhost:${port}`)
	});

};

startServer();
