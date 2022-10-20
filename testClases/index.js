const fs = require('fs');
const hoy = new Date ();

try {
    fs.writeFileSync('./data.txt', `${hoy}`);
    const data = fs.readFileSync('./data.txt', 'utf-8');
    console.log(data)
} catch (error) {
    console.log("fecha no valida");
}

// Realizar un programa que:
// A) Guarde en un archivo llamado fyh.txt la fecha y hora actual.
// B) Lea nuestro propio archivo de programa y lo muestre por consola.
// C) Incluya el manejo de errores con try catch (progresando las excepciones con throw new Error).
