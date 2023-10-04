import { Libro, Libreria } from "./logica.js";
import { probarUnicidadId } from "./utils.js";

//---------------- Declaración de variables -------------------//
let libreria = new Libreria();
let l1 = new Libro("Lib 1", "Juan", true);
let l2 = new Libro("Lib 2", "Juan", true);
let l3 = new Libro("Lib 1", "Pedro", false);
let l4 = new Libro("Lib 4", "Pepe", false);
let l5 = new Libro("Lib 5", "Lilian", false);

//---------------- Pruebas -------------------//
console.log("\nPrueba de generador de id único:");
probarUnicidadId();

console.log(
  "\nPrueba de correcta agregación y Prueba de Lista de los libros: "
);
libreria.agregarLibro(l1);
libreria.agregarLibro(l2);
libreria.agregarLibro(l3);
libreria.agregarLibro(l4);
libreria.agregarLibro(l5);
libreria.imprimirListadoLibros();

console.log("\nPrueba de correcta búsqueda de libros por autor:");
console.log("Libros del autor Juan:");
Libreria.imprimirListadoLibrosSinId(libreria.buscarLibrosAutor("Juan"));
console.log("Libros del autor Lilian:");
Libreria.imprimirListadoLibrosSinId(libreria.buscarLibrosAutor("Lilian"));

console.log("\nPrueba de correcta búsqueda de libros por título:");
console.log("Libros con título <Lib 1>:");
Libreria.imprimirListadoLibrosSinId(libreria.buscarLibrosTitulo("Lib 1"));
console.log("Libros con título <Lib 2>:");
Libreria.imprimirListadoLibrosSinId(libreria.buscarLibrosTitulo("Lib 2"));

console.log("\nPrueba de gestión de libros:");
let idLibro = libreria.getListadoLibrosConId()[0][0];
console.log(`Estado Inicial de libro con id -> ${idLibro}:`);
libreria.getLibro(idLibro).imprimir();
console.log(`\nPrueba de préstamo de libros <id: ${idLibro}>:`);
libreria.gestionarPrestamoLibro(idLibro, true).imprimir();
console.log(`\nPrueba de devolución de libros <id: ${idLibro}>:`);
libreria.gestionarPrestamoLibro(idLibro, false).imprimir();
