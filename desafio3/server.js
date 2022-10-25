
const express = require('express');
const fs = require('fs');

class Contenedor {
    constructor(nombreArchivo){
        this.nombreArchivo = nombreArchivo;
        this.id = 0;
    }

    getAll = () => JSON.parse(fs.readFileSync(this.nombreArchivo));

    getById  = (id) =>{
        try {
            const resultado = fs.readFileSync(this.nombreArchivo, 'utf-8');
            const obj = JSON.parse(resultado);
            const objetoPedido = obj.find(item => item.id === id);
            if (objetoPedido != undefined) {
                return objetoPedido;
            }else{
                return "El producto no existe";
            }
        } catch (error) {
            console.log("Error");
        }
    }
}

const app = express();
const PORT = process.env.PORT || 8080;
const contenedor = new Contenedor('desafio3/productos.txt');

app.get('/', (req, res) =>{
    res.send("Hello World")
});

app.get('/productos', (req, res) =>{
    res.send(contenedor.getAll())
});

app.get('/productoRandom', (req, res) =>{
    const newArray = contenedor.getAll();
    res.json(contenedor.getById(parseInt(Math.random() * newArray.length+1)));
});

app.listen(PORT, ()=>{
    console.log(`La app esta escuchando en el puerto http://localhost:${PORT}`)
})