# Spider Lab — proyecto editable para Visual Studio Code

Laboratorio de trabajo y energía inspirado en el balanceo de Spider-Man.
Incluye la interfaz, la ilustración vectorial, las animaciones, los controles,
las fórmulas, el modo exposición y una versión Python de consola.

## Empezar en tres pasos

1. Extrae **todo** el ZIP. No abras los archivos directamente dentro del ZIP.
2. En Visual Studio Code, elige **Archivo → Abrir carpeta** y selecciona
   `SpiderLab_VSCode`. También puedes abrir `SpiderLab.code-workspace`.
3. Abre `index.html` con tu navegador desde el explorador de archivos.
   Guarda tus cambios en VS Code y recarga el navegador para verlos.

La web no requiere instalar paquetes, compilar, configurar cuentas ni ejecutar
Python. Mantén `index.html`, `styles.css`, `physics.js` y `app.js` en la misma
carpeta. Usa un navegador actual como Chrome, Edge o Firefox.

Para abrir o compartir **un solo archivo**, usa `SpiderLab_Energia.html`.
Incluye el código, los estilos y los dibujos; funciona sin conexión.

## Qué archivo editar

| Archivo | Qué contiene |
| --- | --- |
| `index.html` | Estructura, textos, botones y dibujo SVG de la ciudad y del héroe. |
| `styles.css` | Colores, tipografías, tarjetas, controles y adaptación a celular. |
| `physics.js` | La función `calcular()`: cinco cuentas de física. |
| `app.js` | Posición, animación, eventos, resultados y pasos del modo exposición. |
| `spider_energia.py` | Programa Python de consola equivalente a los cálculos del navegador. |
| `generar_html.py` | Genera de nuevo el HTML de un solo archivo después de editar. |
| `SpiderLab_Energia.html` | Copia autónoma ya generada, lista para abrir o compartir. |
| `.vscode/settings.json` | Preferencias sencillas del editor: UTF-8 y sangría. |

Edita los archivos separados como versión principal. El HTML autónomo es una
copia: sus cambios no se transfieren de vuelta a los archivos separados.

### Cambios habituales

- **Colores:** busca `:root` al principio de `styles.css`.
- **Textos y títulos:** edita `index.html`.
- **Valores iniciales:** busca `const estado` y el evento de `reset` en `app.js`.
  Actualiza también los valores visibles y rangos en `index.html` cuando corresponda.
- **Fórmulas:** edita `physics.js`.
- **Ritmo de la animación:** busca `function animar` en `app.js`.
- **Silueta según la masa:** busca `function actualizarSilueta` en `app.js`.
  `hombros`, `abdomen`, `cadera`, `brazo` y `pierna` controlan sus proporciones.
- **Guion de exposición:** busca `const pasos` en `app.js`.

Al aumentar la masa de 40 a 140 kg, el abdomen y la cintura se vuelven más
redondeados y las extremidades ganan grosor. El cambio es suave, funciona también
en pausa, en los escenarios y en el modo exposición. La mano permanece unida
a la telaraña. Si el sistema solicita reducir el movimiento, la forma cambia
directamente.

Para explicarlo en clase: `actualizarSilueta()` convierte la masa en medidas del
dibujo SVG. `masaVisual` suaviza el paso entre formas; `estado.masa` sigue siendo
el dato utilizado en las fórmulas. Es una representación visual de la masa,
no una relación anatómica exacta. La altura y la masa siguen determinando la
energía y la rapidez con las cinco cuentas de `physics.js`.

La sección «El código» muestra ejemplos guardados en `const python` y
`const javascript`, dentro de `app.js`. Si cambias las fórmulas, actualiza también
esos ejemplos y `spider_energia.py` para que coincidan con el cálculo real.
`const pythonDescarga` contiene la parte de consola que se descarga cuando abres
la página como archivo local.

Las fuentes de Google son un detalle visual opcional en `styles.css`. Sin red,
la interfaz usa las fuentes de respaldo del sistema y conserva su funcionamiento.
El HTML autónomo no solicita esas fuentes.

## Actualizar el HTML de un solo archivo

Después de editar los archivos principales, abre una terminal en esta carpeta.
Con Python 3 instalado, ejecuta:

**Windows:**

```sh
py generar_html.py
```

**macOS o Linux:**

```sh
python3 generar_html.py
```

Se reemplazará únicamente `SpiderLab_Energia.html`. No necesitas este paso para
trabajar con `index.html`; solo para actualizar la copia autónoma.

## Ejecutar el programa Python

**Windows:**

```sh
py spider_energia.py
```

**macOS o Linux:**

```sh
python3 spider_energia.py
```

Prueba masa `70`, altura inicial `5` y altura actual `0`. Obtendrás energía total
de `3433.50 J` y rapidez de `9.90 m/s`. Solo utiliza la biblioteca estándar de
Python. Acepta punto o coma decimal y comprueba los datos introducidos.

**La web ejecuta JavaScript.** El archivo Python permite entregar y explicar
las mismas cuentas en el lenguaje solicitado para la clase; no se ejecuta
dentro del navegador.

## La física en cinco cuentas

Se supone que el héroe parte del reposo, con gravedad constante y sin pérdidas:

1. Energía total: `E = m × g × h0`.
2. Energía potencial: `Ep = m × g × h`.
3. Energía cinética: `Ec = E − Ep`.
4. Rapidez: `v = sqrt(2 × Ec / m)`.
5. Trabajo de la gravedad desde el inicio: `Wg = m × g × (h0 − h)`.

`m` se mide en kg; `g = 9.81 m/s²`; las alturas se miden desde el punto más bajo;
las energías y el trabajo se expresan en joules. La masa debe ser positiva y la
altura actual debe estar entre cero y la altura inicial.

El anclaje es fijo, la cuerda no tiene masa ni se estira y el héroe se representa
como una masa puntual. Los extremos están a ±60°, por eso la longitud es
`L = 2 × h0`. La animación recorre posiciones de forma ilustrativa: su reloj no
resuelve la ecuación temporal del péndulo. Los resultados corresponden a la
altura de cada posición en este modelo ideal.

Para exponer: abre **Modo exposición** y recorre los cinco pasos. Primero compara
los extremos con el centro, después duplica la masa y finalmente la altura.
En «El código» puedes mostrar solo la función de cálculo para explicar la parte
física sin entrar en los detalles del dibujo y la interfaz.

Proyecto educativo no oficial inspirado en Spider-Man.
