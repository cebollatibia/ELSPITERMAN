from math import sqrt

def calcular(masa, altura_inicial, altura_actual):
    gravedad = 9.81

    # 1. La energía con la que empieza
    total = masa * gravedad * altura_inicial
    # 2. La energía que conserva como altura
    potencial = masa * gravedad * altura_actual
    # 3. La energía convertida en movimiento
    cinetica = total - potencial
    # 4. Despejamos la rapidez de Ec = 1/2 mv²
    rapidez = sqrt(2 * cinetica / masa)
    # 5. Trabajo de la gravedad desde el inicio
    trabajo = masa * gravedad * (altura_inicial - altura_actual)

    return total, potencial, cinetica, rapidez, trabajo

# Programa de consola: ejecutar con Python 3.
if __name__ == "__main__":
    from math import isfinite
    try:
        m = float(input("Masa del héroe (kg): ").replace(",", "."))
        h0 = float(input("Altura inicial (m): ").replace(",", "."))
        h = float(input("Altura actual (m): ").replace(",", "."))
        if not all(isfinite(x) for x in (m, h0, h)):
            raise ValueError("Usa números finitos.")
        if m <= 0 or h0 <= 0 or not 0 <= h <= h0:
            raise ValueError("Se requiere masa > 0, altura inicial > 0 y 0 <= h <= h0.")
        total, ep, ec, v, trabajo = calcular(m, h0, h)
        print(f"Energía total: {total:.2f} J")
        print(f"Potencial: {ep:.2f} J | Cinética: {ec:.2f} J")
        print(f"Rapidez: {v:.2f} m/s")
        print(f"Trabajo de la gravedad: {trabajo:.2f} J")
    except ValueError as error:
        print("Revisa los datos:", error)
