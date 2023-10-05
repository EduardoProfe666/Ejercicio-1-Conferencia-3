export const validarNoNullUndefined = (x) => x !== null && x !== undefined;

export const generarIdUnico = () =>
  Math.floor(
    performance.timeOrigin * performance.now() + performance.timeOrigin
  ).toString(36);

export function probarUnicidadId() {
  let l = [];
  for (let i = 0; i < 10000; i++) {
    let id = generarIdUnico();
    if (l.includes(id)) throw new Error();
    l.push(id);
  }
  console.log("Prueba de Unicidad de Id generado finalizada correctamente");
}