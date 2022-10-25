

const express = require('express');

const app = express();
const PORT = 8000;

app.get('/', (req, res) =>{
    res.send("Hello World")
});

app.get('/algo', (req, res) =>{
    res.send("esta es la ruta algo")
});

app.get('/alumnos', (req, res) =>{
    res.json([{id: 100, name: "carla", lastName: "ramirez"}])
});

app.listen(PORT, ()=>{
    console.log(`La app esta escuchando en el puerto http://localhost:${PORT}`)
})