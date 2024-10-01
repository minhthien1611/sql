import express from 'express';
import userRepo from './utils/userRepository.js';
import path from 'path';
import { engine } from 'express-handlebars';

const app = express();

app.engine(
  'hbs',
  engine({
    extname: '.hbs',
  })
);
app.set('view engine', 'hbs');
app.set('views', 'src/views');

app.use(express.static(path.resolve('src/pubclic'))); 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/api/products', async (req, res) => {
  const result = await userRepo.getProducts();
  res.send({
    data: result,
  });
});

app.post('/api/products', async (req, res) => {
  const result = await userRepo.createProducts(req.body);

  if (result.affectedRows !== 0) {
    return res.status(201).send({
      message: 'Products created successfully',
    });
  }

  res.statusCode(400).send({
    messsage: "Data can't insert into database",
  });
});

app.put('/api/products', async (req, res) => {
  const result = await userRepo.updateProducts(req.body);

  if (result.affectedRows !== 0) {
    return res.status(201).send({
      message: 'Products update successfully',
    });
  }

  res.statusCode(400).send({
    messsage: "Data can't insert into database",
  });
});

app.delete('/api/products/:id', async (req, res) =>{
  const result = await userRepo.updateProducts(req.body);

  if (result.affectedRows !== 0) {
    return res.status(201).send({
      message: 'Products update successfully',
    });
  }
    res.statusCode(400).send({
      messsage: "Data can't insert into database",
    });
  
});

app.listen(3000, (req, res) => {
  console.log('listening 3000');
});
