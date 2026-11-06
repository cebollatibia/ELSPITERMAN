"""Une los archivos del proyecto en SpiderLab_Energia.html.

Solo usa la biblioteca estándar de Python 3. Ejecutar este archivo es opcional:
index.html funciona directamente con los archivos separados.
"""
from pathlib import Path
import re


def generar():
    carpeta = Path(__file__).resolve().parent

    def leer(nombre):
        return (carpeta / nombre).read_text(encoding="utf-8")

    html = leer("index.html")
    # La versión de un archivo usa las fuentes del sistema y funciona sin red.
    css = re.sub(r"@import\s+url\([^)]*\)\s*;", "", leer("styles.css"))
    css_en_html = "<style>\n" + css + "\n</style>"
    html, estilos = re.subn(
        r'<link\s+rel="stylesheet"\s+href="styles\.css"\s*/?>',
        lambda _: css_en_html,
        html,
    )
    if estilos != 1:
        raise ValueError("No se encontró un único enlace a styles.css en index.html.")

    for nombre in ("physics.js", "app.js"):
        # Evita que una cadena de JavaScript cierre antes de tiempo la etiqueta.
        js = re.sub(r"</script", r"<\\/script", leer(nombre), flags=re.I)
        bloque = "<script>\n" + js + "\n</script>"
        html, scripts = re.subn(
            r'<script\s+src="' + re.escape(nombre) + r'"\s*>\s*</script>',
            lambda _: bloque,
            html,
        )
        if scripts != 1:
            raise ValueError(f"No se encontró un único script {nombre} en index.html.")

    destino = carpeta / "SpiderLab_Energia.html"
    destino.write_text(html, encoding="utf-8")
    print(f"HTML autónomo actualizado: {destino.name}")


if __name__ == "__main__":
    generar()
