/* Las cinco cuentas. Mismas fórmulas que la versión Python. */
function calcular(masa, alturaInicial, alturaActual) {
  const gravedad = 9.81;
  const total = masa * gravedad * alturaInicial;
  const potencial = masa * gravedad * alturaActual;
  const cinetica = Math.max(0, total - potencial);
  const rapidez = Math.sqrt(2 * cinetica / masa);
  const trabajo = masa * gravedad * (alturaInicial - alturaActual);
  return {
    total,
    potencial,
    cinetica,
    rapidez,
    trabajo
  };
}
