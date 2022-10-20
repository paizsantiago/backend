class Usuario {
    constructor (nombre, apellido){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = [];
        this.mascotas = [];
    }


   getFullname = () =>{
        return `El usario es ${this.nombre} ${this.apellido}`;
   }


   addMascota = (nombre) =>{
        this.mascotas = [...this.mascotas, nombre];
   }

   countMascotas = () =>{
        return `La cantidad de mascotas es: ${this.mascotas.length}`;
   }

   addBook = (nombre, author) =>{
        this.libros = [...this.libros, {nombre, author}];
   }

   getBookNames = () =>{
    let booksName = [];
    this.libros.map(item => {
        booksName = [...booksName, item.nombre];
    })
    return booksName;
   }

}

const usuario = new Usuario ("Santiago", "Paiz");

usuario.addBook("Harry Potter 1", "J.K.Rowling");
usuario.addBook("Harry Potter 2", "J.K.Rowling");
usuario.addBook("Harry Potter 3", "J.K.Rowling");

usuario.addMascota("Ellie");
usuario.addMascota("Mandy");
usuario.addMascota("India");
usuario.addMascota("Theo");
usuario.addMascota("Negra");

console.log(usuario.getFullname())
console.log(usuario.countMascotas());
console.log(usuario.getBookNames());