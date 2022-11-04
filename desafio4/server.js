const Contenedor = require('../desafio2/index')
const express = require('express');
const bodyParser = require("body-parser");
const { Router } = express;
const contenedor = new Contenedor('desafio4/products.txt');

const app = express();
const routerProducts = Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api/products', routerProducts);

const PORT = 8080;

app.use('/public', express.static(__dirname + '/public'));

routerProducts.use((req, res, next)=>{ //middleware
    console.log('estan ingresando a la ruta /api/products');
    next();
})

app.get('/formulario', (req, res) =>{
    res.sendFile(__dirname + '/index.html');
});

app.post('/formulario', (req, res) =>{
    const {body} = req;
    contenedor.save(body);
    res.send("Producto añadido con éxito");
})


app.get('/', (req, res) =>{
    res.send("Hello World");
});


routerProducts.get('/', 
    (req, res)=>{
        const productos = JSON.stringify(contenedor.getAll());
        if (productos == "[]")  {
            res.json({error: true, msg: "Productos no encontrados"});
        } else {
            const respuesta = JSON.parse(productos);
            res.json(respuesta);
        }
        
    }    
);

routerProducts.get('/:id', (req, res) =>{
    const {id} = req.params;
    const productosArray = contenedor.getAll();
    const productoPedido = contenedor.getById(parseInt(id));
    if (productosArray.length < id) {
        res.json({error: "true", msg: "El producto no existe"})
    } else {
        res.json(productoPedido);
    }
});

routerProducts.delete('/:id', (req, res) =>{
    const {id} = req.params;
    const productosArray = contenedor.getAll();
    const productoPedido = contenedor.deteleById(parseInt(id));
    if (productosArray.length < id) {
        res.json({error: "true", msg: "El producto no existe"})
    } else {
        res.json({
            success: "true",
            msg: "Producto eliminado",
            productList: productoPedido
        });
    }
})

routerProducts.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, precio, thumbnail} = req.body;
        const boolean = contenedor.updateById(id, titulo, precio, thumbnail);
        console.log(boolean)
        if (boolean) {
            res.send("Producto modificado")
        } else{
            res.send("Producto no encontrado")
        }  
    } catch (error) {
        console.log("error")
    }
});

app.listen(PORT, ()=>{
    console.log(`La app esta escuchando en el puerto http://localhost:${PORT}`);
})