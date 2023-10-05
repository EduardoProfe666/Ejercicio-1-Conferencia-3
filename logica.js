import { validarNoNullUndefined, generarIdUnico } from "./utilidades.js";

export class Libro {
  constructor(titulo, autor, estado) {
    // Atributos Privados
    let _titulo;
    let _autor;
    let _estado; // true -> Disponible, false -> Prestado

    // Getters
    this.getTitulo = () => _titulo;
    this.getAutor = () => _autor;
    this.getEstado = () => _estado;

    // Setters
    (this.setTitulo = (titulo) => {
      if (!validarNoNullUndefined(titulo) || typeof titulo !== "string")
        throw new Error("Título no válido");
      _titulo = titulo;
    })(titulo);

    (this.setAutor = (autor) => {
      if (!validarNoNullUndefined(autor) || typeof autor !== "string")
        throw new Error("Autor no válido");
      _autor = autor;
    })(autor);

    (this.setEstado = (estado) => {
      if (!validarNoNullUndefined(estado) || typeof estado !== "boolean")
        throw new Error("Estado no válido");
      _estado = estado;
    })(estado);
  }

  toString() {
    return `Libro con título: ${this.getTitulo()}, autor: ${this.getAutor()} y estado: ${
      this.getEstado() ? "Disponible" : "Prestado"
    }`;
  }
  imprimir() {
    console.log(this.toString());
  }
}

export class Libreria {
  constructor() {
    const libros = new Map();

    // Getters
    this.getLibros = () => libros;
  }

  agregarLibro(libro) {
    if (!validarNoNullUndefined(libro) || !(libro instanceof Libro))
      throw new Error("Libro no válido");
    if (this.getLibros().has(libro)) {
      throw new Error("Libro ya existente");
    }
    this.getLibros().set(generarIdUnico(), libro);
  }

  getLibro(id) {
    return this.getLibros().get(id);
  }

  getListadoLibrosSinId() {
    return Array.from(this.getLibros().values());
  }

  getListadoLibrosConId() {
    return Array.from(this.getLibros().entries());
  }

  static imprimirListadoLibrosSinId(listado_libros) {
    if (
      !validarNoNullUndefined(listado_libros) ||
      !(listado_libros instanceof Array)
    )
      throw new Error("Listado no válido");
    for (let libro of listado_libros) libro.imprimir();
  }

  imprimirListadoLibros() {
    for (let libro of this.getListadoLibrosConId()) {
      console.log(`Id: ${libro[0]} -> ${libro[1].toString()}`);
    }
  }

  buscarLibrosAutor(autor) {
    if (!validarNoNullUndefined(autor) || typeof autor !== "string")
      throw new Error("Autor no válido");
    return this.getListadoLibrosSinId().filter(
      (libro) => libro.getAutor() === autor
    );
  }
  buscarLibrosTitulo(titulo) {
    if (!validarNoNullUndefined(titulo) || typeof titulo !== "string")
      throw new Error("Titulo no válido");
    return this.getListadoLibrosSinId().filter(
      (libro) => libro.getTitulo() === titulo
    );
  }

  /**
   * Permite gestionar el proceso de prestar/devolver libros de la librería
   *
   * @param {string} id Id del libro a ejecutar la operación
   * @param {boolean} operacion Operación: true -> prestar libro, false-> devolver libro
   * @returns Libro gestionado
   */
  gestionarPrestamoLibro(id, operacion) {
    if (!this.getLibros().has(id)) throw new Error("Libro no existente");
    let l = this.getLibros().get(id);
    if (l.getEstado() !== operacion) {
      throw new Error(
        `No es posible ${
          operacion ? "prestar" : "devolver"
        } el libro pues se encuentra actualmente ${
          operacion ? "prestado" : "disponible"
        }`
      );
    }
    l.setEstado(!l.getEstado());

    return l;
  }
}
