const fs = require('fs');

class Contenedor {
    constructor(nombreArchivo){
        this.nombreArchivo = nombreArchivo;
    }

    save = (objeto) =>{
        try {   
            if (fs.readFileSync(this.nombreArchivo, 'utf-8') === "") {
                fs.writeFileSync(this.nombreArchivo, "[]");
            }
            const productos = this.getAll();
            const id =
                productos.length === 0
                    ? 1
                    : productos[productos.length - 1].id + 1;
            objeto.id = id;
            let fileData = JSON.parse(fs.readFileSync(this.nombreArchivo));
            let newData = [...fileData, objeto]
            fs.writeFileSync(this.nombreArchivo, JSON.stringify(newData, null, 2));
        } catch (error) {
            console.log("Error");
        }
    }

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

    updateById = (id, titulo, precio, thumbnail) => {
        try {
            const productos =  this.getAll();
            const isInProductList = productos.find(prod => Number(prod.id) === Number(id));
            const indexItem = productos.findIndex((prod) => Number(prod.id) === Number(id));
            if (isInProductList != undefined) {
                const objeto = { id: id, titulo: titulo, precio: precio, thumbnail: thumbnail};
                productos[indexItem] = objeto;
                console.log(objeto);
                 fs.writeFileSync(
                    this.nombreArchivo,
                    JSON.stringify(productos, null, 2)
                );
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log("error");
        }
    };


    getAll = () => JSON.parse(fs.readFileSync(this.nombreArchivo));
    

    deteleById = (id) =>{
        try {
            const resultado = fs.readFileSync(this.nombreArchivo, 'utf-8');
            const obj = JSON.parse(resultado);
            id--;
            obj.splice(id, 1);
            fs.writeFileSync(this.nombreArchivo, JSON.stringify(obj, null, 2)) 
            return obj;
        } catch (error) {
            console.log("Error id no encontrado");
        }
    }

    deteleAll = () =>{
        fs.writeFileSync(this.nombreArchivo, "");
    }

}


const agregarProductos = (array) =>{ // funcion para agregar el array de productos al archivo
    for (let item of array) {
        contenedor.save(item)
    }
}

const arrayObjetos = [
    {
        titulo: "Mouse",
        price: 150
    },
    {
        title: "Mouse Pad",
        price: 40
    },
    {
        title: "Teclado",
        price: 200
    },
    {
        title: "Monitor",
        price: 500
    }
]

const contenedor = new Contenedor("desafio2/productos.txt");


// agregarProductos(arrayObjetos); //la utilizo una sola vez para cargar lo que hay dentro del array

console.log("Busqueda por id : ",  contenedor.getById(2));
console.log("Todos los productos del archivo: ",  contenedor.getAll());
console.log("Eliminando un producto: ", contenedor.deteleById(4));
// contenedor.deteleAll() //Elimina todo lo que tiene dentro el archivo


module.exports = Contenedor;
