import express from 'express';


const app = express();
const port = 5000;

app.use(express.json());

app.get('/api/products', (req, res) => { 
	res.json({
		success: true,
  	data: []
	});
});

app.post('/api/products', (req, res) =>{
	console.log(req.body);

	res.json({
		success: true,
    data: req.body,
	});
});

app.listen(port, ()=> console.log(`Server started at http://localhost:${port}`));
