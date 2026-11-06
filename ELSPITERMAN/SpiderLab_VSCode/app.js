/*no entendi por que no se sube*/
/* Spider Lab: la interfaz usa calcular() de physics.js. */
const $ = id => document.getElementById(id);
const reducido = matchMedia('(prefers-reduced-motion: reduce)').matches;
const estado = {
  masa: 70,
  altura: 5,
  posicion: 0,
  fase: 0,
  reproduciendo: !reducido,
  lento: false,
  vista: 'laboratorio'
};
// Masa que muestra el dibujo durante la transición; las cuentas usan estado.masa.
let masaVisual = estado.masa;
const numero = (n, d = 1) => n.toLocaleString('es-MX', {
  minimumFractionDigits: d,
  maximumFractionDigits: d
});
let ultimaMarca = 0,
  ultimoDibujo = 0,
  transicion = null,
  paso = 0,
  lenguaje = 'python';
const python = `from math import sqrt

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

    return total, potencial, cinetica, rapidez, trabajo`;
const javascript = `function calcular(masa, alturaInicial, alturaActual) {
  const gravedad = 9.81;

  // 1. La energía con la que empieza
  const total = masa * gravedad * alturaInicial;
  // 2. La energía que conserva como altura
  const potencial = masa * gravedad * alturaActual;
  // 3. Energía cinética (sin errores de redondeo)
  const cinetica = Math.max(0, total - potencial);
  // 4. Despejamos la rapidez de Ec = 1/2 mv²
  const rapidez = Math.sqrt(2 * cinetica / masa);
  // 5. Trabajo de la gravedad desde el inicio
  const trabajo = masa * gravedad * (alturaInicial - alturaActual);

  return { total, potencial, cinetica, rapidez, trabajo };
}`;
const pythonDescarga = python + `

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
`;

// Ciudad vectorial: decorativa; no interviene en las cuentas.
const ns = 'http://www.w3.org/2000/svg';
for (let capa = 0; capa < 2; capa++) {
  for (let i = 0; i < 21; i++) {
    const x = i * 46 - 20 + capa * 13,
      alto = 35 + Math.abs(Math.sin(i * 7.13 + capa)) * 95;
    const y = 360 - alto + capa * 30,
      ancho = 24 + (i % 3) * 8;
    const grupo = document.createElementNS(ns, 'g');
    const edificio = document.createElementNS(ns, 'path');
    const cima = i % 5 === 0 ? `M${x} ${y}h${ancho/2-3}v-25h6v25h${ancho/2-3}` : `M${x} ${y}h${ancho}`;
    edificio.setAttribute('d', cima + `V410H${x}Z`);
    edificio.setAttribute('fill', capa ? '#142239' : '#28394e');
    grupo.append(edificio);
    const luces = document.createElementNS(ns, 'rect');
    for (const [k, v] of Object.entries({
        x,
        y,
        width: ancho,
        height: 410 - y,
        fill: 'url(#farwindows)'
      })) luces.setAttribute(k, v);
    grupo.append(luces);
    $('farCity').append(grupo);
  }
}

// Más masa = abdomen y cintura más redondeados, brazos y piernas más gruesos.
// Estas proporciones son ilustrativas; no representan una fórmula corporal.
function actualizarSilueta(masa) {
  const cambio = (Math.max(40, Math.min(140, masa)) - 70) / 70;
  const hombros = 13 + 4 * cambio;
  const abdomen = 13 + 13 * cambio;
  const cadera = 8 + 6 * cambio;
  const brazo = 10 + 4 * cambio;
  const pierna = 12 + 5 * cambio;
  const trazar = (id, forma) => $(id).setAttribute('d', forma);

  trazar('hero-torso', `M${-hombros} 3 Q0 -5 ${hombros} 3
    C${hombros + 1} 11 ${abdomen} 17 ${abdomen} 24
    C${abdomen} 34 ${cadera + 3} 40 ${cadera} 40 H${-cadera}
    C${-cadera - 3} 40 ${-abdomen} 34 ${-abdomen} 24
    C${-abdomen} 17 ${-hombros - 1} 11 ${-hombros} 3 Z`);
  const panel = lado => `M${lado * hombros} 12
    C${lado * abdomen} 20 ${lado * abdomen} 30 ${lado * cadera} 38
    L${lado * (cadera - 4)} 38
    C${lado * (abdomen - 6)} 30 ${lado * (abdomen - 6)} 20 ${lado * (hombros - 6)} 16 Z`;
  trazar('hero-sides', panel(-1) + panel(1));
  trazar('hero-highlight', `M-4 4 Q${-abdomen + 2} 18 -4 34
    Q${-abdomen + 8} 18 -1 5 Z`);
  trazar('hero-torso-web', `M${3 - hombros} 7 Q0 10 ${hombros - 3} 7
    M${-abdomen * .75} 15 Q0 20 ${abdomen * .75} 15
    M${-abdomen * .85} 24 Q0 29 ${abdomen * .85} 24
    M${-cadera} 33 Q0 37 ${cadera} 33 M0 3 V38`);
  $('hero-emblem').setAttribute('transform', `scale(${1 + .18 * cambio} 1)`);

  // La palma permanece en (-5, -40), el mismo punto que usa la telaraña.
  const brazos = `M${6 - hombros} 10 L${-23 - 4 * cambio} -6 L-5 -39
    M${hombros - 5} 11 L28 21 L36 7`;
  const piernas = `M${1 - cadera} 33 L-24 58 L-46 67
    M${cadera - 5} 33 L26 49 L23 77`;
  for (const [id, forma, ancho] of [
    ['hero-arm-outline', brazos, brazo + 3], ['hero-arms', brazos, brazo],
    ['hero-leg-outline', piernas, pierna + 4], ['hero-legs', piernas, pierna]
  ]) {
    trazar(id, forma);
    $(id).setAttribute('stroke-width', ancho);
  }
}

function sincronizarReproduccion() {
  $('play').querySelector('use').setAttribute('href', estado.reproduciendo ? '#pause-icon' : '#play-icon');
  $('play').querySelector('span').textContent = estado.reproduciendo ? 'Pausar' : 'Reproducir';
  $('playStatus').textContent = estado.reproduciendo ? 'EN MOVIMIENTO' : 'EXPLORACIÓN EN PAUSA';
  $('slow').textContent = estado.lento ? '0.5×' : '1×';
  $('slow').setAttribute('aria-pressed', String(estado.lento));
}

function pausar() {
  estado.reproduciendo = false;
  sincronizarReproduccion()
}

function sincronizarControles() {
  if (reducido) {
    masaVisual = estado.masa;
    actualizarSilueta(masaVisual);
  }
  $('mass').value = estado.masa;
  $('massValue').textContent = estado.masa;
  $('initialHeight').value = estado.altura;
  $('initialHeightValue').textContent = estado.altura;
  $('lengthValue').textContent = 2 * estado.altura + ' m';
  for (const id of ['mass', 'initialHeight', 'position']) {
    const c = $(id);
    c.style.setProperty('--fill', 100 * (+c.value - +c.min) / (+c.max - +c.min) + '%');
  }
  document.querySelectorAll('[data-preset]').forEach(b => {
    const seleccionado = b.dataset.preset === 'base' && estado.masa === 70 && estado.altura === 5 || b.dataset.preset === 'mass' && estado.masa === 140 && estado.altura === 5 || b.dataset.preset === 'height' && estado.masa === 70 && estado.altura === 10;
    b.classList.toggle('active', seleccionado);
    b.setAttribute('aria-pressed', String(seleccionado));
  });
}

function posicionar(p, suave = false) {
  pausar();
  if (suave && !reducido) transicion = {
    desde: estado.posicion,
    hasta: p,
    inicio: performance.now()
  };
  else {
    transicion = null;
    estado.posicion = p;
    estado.fase = Math.acos(1 - 2 * p / 100);
    actualizar()
  }
}

function actualizar() {
  const angulo = (-60 + 120 * estado.posicion / 100) * Math.PI / 180;
  const h = Math.min(estado.altura, Math.max(0, 2 * estado.altura * (1 - Math.cos(angulo))));
  const r = calcular(estado.masa, estado.altura, h);
  $('position').value = estado.posicion;
  $('positionValue').textContent = numero(estado.posicion, 0) + '%';
  $('position').style.setProperty('--fill', estado.posicion + '%');
  $('speed').textContent = numero(r.rapidez, 2);
  $('ep').textContent = numero(r.potencial);
  $('ec').textContent = numero(r.cinetica);
  $('et').textContent = numero(r.total);
  $('work').textContent = numero(r.trabajo);
  const porcentaje = 100 * r.potencial / r.total;
  $('potentialFill').style.width = porcentaje + '%';
  $('potentialPercent').textContent = numero(porcentaje, 0) + '% potencial';
  $('kineticPercent').textContent = numero(100 - porcentaje, 0) + '% cinética';
  $('energyTrack').setAttribute('aria-label', `${numero(porcentaje,0)}% de energía potencial y ${numero(100-porcentaje,0)}% de energía cinética. Total: ${numero(r.total)} joules.`);
  const x = 450 + 250 * Math.sin(angulo),
    y = 28 + 250 * Math.cos(angulo),
    rotacion = -angulo * .3;
  $('hero').setAttribute('transform', `translate(${x} ${y}) rotate(${rotacion*180/Math.PI})`);
  const manoX = x - 5 * Math.cos(rotacion) + 40 * Math.sin(rotacion),
    manoY = y - 5 * Math.sin(rotacion) - 40 * Math.cos(rotacion);
  for (const id of ['web', 'webShadow']) {
    $(id).setAttribute('x2', manoX);
    $(id).setAttribute('y2', manoY)
  }
  $('heightLine').setAttribute('y1', y);
  $('heightCap').setAttribute('d', `M725 ${y}h10M725 278h10`);
  $('heightLabel').setAttribute('y', Math.min(274, (y + 278) / 2 + 3));
  $('heightLabel').textContent = numero(h, 2) + ' m';
  const puntos = [];
  for (let i = 0; i <= 35; i++) {
    const a = -Math.PI / 3 + (angulo + Math.PI / 3) * i / 35;
    puntos.push(`${i?'L':'M'}${450+250*Math.sin(a)},${28+250*Math.cos(a)}`)
  }
  $('trail').setAttribute('d', puntos.join(' '));
  document.querySelectorAll('[data-point]').forEach(b => {
    const activo = Math.abs(estado.posicion - +b.dataset.point) < .15;
    b.classList.toggle('active', activo);
    b.setAttribute('aria-pressed', String(activo))
  });
  let titulo, explicacion;
  if (estado.posicion < 1e-7) {
    titulo = 'Todo empieza con la altura.';
    explicacion = 'En el extremo inicial, toda la energía es potencial. La rapidez es cero: el héroe parte del reposo.'
  } else if (estado.posicion > 100 - 1e-7) {
    titulo = 'La energía vuelve a ser altura.';
    explicacion = 'En el otro extremo se recupera la altura inicial. La rapidez vuelve a cero antes de regresar.'
  } else if (Math.abs(estado.posicion - 50) < 1e-7) {
    titulo = 'Aquí alcanza su mayor rapidez.';
    explicacion = 'En el punto más bajo, toda la energía es cinética. La energía potencial es cero, pero el total no cambia.'
  } else if (porcentaje < 5) {
    titulo = 'Cerca del centro, más rapidez.';
    explicacion = 'Casi toda la energía está en el movimiento. El máximo de rapidez se alcanza justo en el punto B.'
  } else {
    titulo = 'Altura y movimiento se intercambian.';
    explicacion = 'Al bajar, la energía potencial pasa a cinética. Al subir ocurre lo contrario. La suma siempre es la misma.'
  }
  $('insightTitle').textContent = titulo;
  $('insightText').textContent = explicacion;
  const sustituciones = {
    total: `${estado.masa} × 9.81 × ${estado.altura} = ${numero(r.total)} J`,
    potential: `${estado.masa} × 9.81 × ${numero(h,2)} ≈ ${numero(r.potencial)} J`,
    kinetic: `${numero(r.total)} − ${numero(r.potencial)} ≈ ${numero(r.cinetica)} J`,
    speed: `√(2 × ${numero(r.cinetica)} / ${estado.masa}) ≈ ${numero(r.rapidez,2)} m/s`,
    work: `${estado.masa} × 9.81 × (${estado.altura} − ${numero(h,2)}) ≈ ${numero(r.trabajo)} J`
  };
  document.querySelectorAll('[data-eq]').forEach(el => el.textContent = sustituciones[el.dataset.eq]);
}

$('play').onclick = () => {
  transicion = null;
  estado.reproduciendo = !estado.reproduciendo;
  sincronizarReproduccion()
};
$('reset').onclick = () => {
  pausar();
  transicion = null;
  Object.assign(estado, {
    masa: 70,
    altura: 5,
    posicion: 0,
    fase: 0,
    lento: false
  });
  sincronizarControles();
  sincronizarReproduccion();
  actualizar()
};
$('slow').onclick = () => {
  estado.lento = !estado.lento;
  sincronizarReproduccion()
};
$('position').oninput = () => posicionar(+$('position').value);
for (const [id, clave] of [
    ['mass', 'masa'],
    ['initialHeight', 'altura']
  ]) {
  $(id).oninput = () => {
    pausar();
    transicion = null;
    estado[clave] = +$(id).value;
    sincronizarControles();
    actualizar()
  };
}
document.querySelectorAll('[data-point]').forEach(b => b.onclick = () => posicionar(+b.dataset.point, true));
document.querySelectorAll('[data-preset]').forEach(b => b.onclick = () => {
  pausar();
  transicion = null;
  estado.masa = b.dataset.preset === 'mass' ? 140 : 70;
  estado.altura = b.dataset.preset === 'height' ? 10 : 5;
  sincronizarControles();
  actualizar();
});

function mostrarVista(v) {
  if (!['laboratorio', 'fisica', 'codigo'].includes(v)) v = 'laboratorio';
  if (v !== 'laboratorio') pausar();
  estado.vista = v;
  document.querySelectorAll('.view').forEach(el => el.hidden = el.id !== 'view-' + v);
  document.querySelectorAll('[data-view]').forEach(b => {
    b.classList.toggle('active', b.dataset.view === v);
    if (b.dataset.view === v) b.setAttribute('aria-current', 'page');
    else b.removeAttribute('aria-current')
  });
  history.replaceState(null, '', '#' + v);
  window.scrollTo({
    top: 0,
    behavior: 'instant'
  });
}
document.querySelectorAll('[data-view],[data-go]').forEach(b => b.onclick = () => mostrarVista(b.dataset.view || b.dataset.go));
window.addEventListener('hashchange', () => mostrarVista(location.hash.slice(1)));

function abrirAyuda() {
  pausar();
  $('helpDialog').showModal()
}
for (const id of ['modelHelp', 'assumptions', 'footerHelp']) $(id).onclick = abrirAyuda;
for (const id of ['closeDialog', 'understood']) $(id).onclick = () => $('helpDialog').close();
$('helpDialog').addEventListener('click', e => {
  if (e.target === $('helpDialog')) {
    const r = $('helpDialog').getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) $('helpDialog').close()
  }
});

// Guía breve para la exposición: cinco estados, sin simulación temporal.
const pasos = [{
  titulo: 'Primero, haz una predicción.',
  texto: '70 kg y 5 m. Toda la energía está en la altura: 3,433.5 J. Pregunta al grupo dónde será mayor la rapidez.',
  m: 70,
  h: 5,
  p: 0
}, {
  titulo: 'De altura a movimiento.',
  texto: 'Abajo, los 3,433.5 J son energía cinética. La rapidez llega a 9.90 m/s. El total de energía sigue siendo el mismo.',
  m: 70,
  h: 5,
  p: 50
}, {
  titulo: 'Duplica la masa. Compara la rapidez.',
  texto: 'Ahora son 140 kg. La energía se duplica, pero la rapidez sigue en 9.90 m/s: la masa se cancela al despejar la fórmula.',
  m: 140,
  h: 5,
  p: 50
}, {
  titulo: 'Duplica la altura inicial.',
  texto: 'Volvemos a 70 kg y subimos a 10 m. Abajo la rapidez es 14.01 m/s: aumenta por √2, no al doble.',
  m: 70,
  h: 10,
  p: 50
}, {
  titulo: 'Cierra el recorrido. Explica la idea.',
  texto: 'Con los datos originales, en el otro extremo toda la energía vuelve a ser potencial. Ahora abre las cinco cuentas para enseñar el código.',
  m: 70,
  h: 5,
  p: 100
}];

function aplicarPaso() {
  const s = pasos[paso];
  pausar();
  transicion = null;
  estado.masa = s.m;
  estado.altura = s.h;
  posicionar(s.p);
  sincronizarControles();
  $('tourIndex').textContent = `0${paso+1} / 05`;
  $('tourTitle').textContent = s.titulo;
  $('tourText').textContent = s.texto;
  $('tourBack').disabled = paso === 0;
  $('tourNext').textContent = paso === 4 ? 'Ver las cinco cuentas →' : 'Siguiente →';
}

function cerrarTour() {
  $('tour').hidden = true;
  document.body.classList.remove('presenting')
}
document.querySelectorAll('.tour-open').forEach(b => b.onclick = () => {
  mostrarVista('laboratorio');
  $('tour').hidden = false;
  document.body.classList.add('presenting');
  paso = 0;
  aplicarPaso()
});
$('tourClose').onclick = cerrarTour;
$('tourBack').onclick = () => {
  if (paso > 0) {
    paso--;
    aplicarPaso()
  }
};
$('tourNext').onclick = () => {
  if (paso < 4) {
    paso++;
    aplicarPaso()
  } else {
    cerrarTour();
    mostrarVista('codigo')
  }
};
document.querySelectorAll('[data-answer]').forEach(b => b.onclick = () => {
  document.querySelectorAll('[data-answer]').forEach(x => x.classList.toggle('chosen', x === b));
  $('answerFeedback').textContent = b.dataset.answer === 'no' ? 'Exacto. v = √[2g(h₀ − h)]. La masa se cancela: cambia la energía, pero no la rapidez a igual altura.' : 'No en este modelo. Al duplicar la masa también se duplica la energía cinética; en v = √(2Ec/m), ambos factores se cancelan.'
});

// Código de lectura: se insertan nodos de texto, nunca contenido del usuario.
function pintarCodigo(tipo) {
  lenguaje = tipo;
  const codigo = tipo === 'python' ? python : javascript;
  $('codeContent').replaceChildren();
  codigo.split('\n').forEach((linea, i) => {
    const fila = document.createElement('span');
    fila.className = 'code-line';
    const n = document.createElement('span');
    n.className = 'line-number';
    n.textContent = i + 1;
    fila.append(n);
    if (linea.trim().startsWith('#') || linea.trim().startsWith('//')) {
      const c = document.createElement('span');
      c.className = 'comment';
      c.textContent = linea;
      fila.append(c)
    } else {
      const patron = /(\b(?:from|import|def|return|function|const)\b|\b(?:calcular|sqrt|max)\b|\b\d+(?:\.\d+)?\b)/g;
      let fin = 0;
      for (const m of linea.matchAll(patron)) {
        fila.append(document.createTextNode(linea.slice(fin, m.index)));
        const c = document.createElement('span');
        c.className = /^\d/.test(m[0]) ? 'num' : /calcular|sqrt|max/.test(m[0]) ? 'fn' : 'kw';
        c.textContent = m[0];
        fila.append(c);
        fin = m.index + m[0].length
      }
      fila.append(document.createTextNode(linea.slice(fin)))
    }
    $('codeContent').append(fila);
  });
  $('codeFilename').textContent = tipo === 'python' ? 'fisica.py' : 'physics.js';
  $('codeLanguageNote').textContent = tipo === 'python' ? 'Python para tu entrega · equivalente al cálculo del navegador' : 'JavaScript · estas son las cuentas que ejecuta el navegador';
  for (const id of ['pythonTab', 'jsTab']) {
    const activo = id === (tipo === 'python' ? 'pythonTab' : 'jsTab');
    $(id).classList.toggle('active', activo);
    $(id).setAttribute('aria-pressed', String(activo))
  }
  $('copyStatus').textContent = '';
}
$('pythonTab').onclick = () => pintarCodigo('python');
$('jsTab').onclick = () => pintarCodigo('js');
$('copyCode').onclick = async () => {
  try {
    await navigator.clipboard.writeText(lenguaje === 'python' ? python : javascript);
    $('copyStatus').textContent = 'Código copiado ✓'
  } catch {
    $('copyStatus').textContent = 'Selecciona el código y usa Ctrl+C para copiarlo.'
  }
};
if (location.protocol === 'file:') {
  $('downloadWeb').removeAttribute('href');
  $('downloadWeb').removeAttribute('download');
  $('downloadWeb').setAttribute('aria-disabled', 'true');
  $('downloadWeb').textContent = '✓ Versión HTML sin conexión';
  $('downloadPython').href = URL.createObjectURL(new Blob([pythonDescarga], {
    type: 'text/x-python;charset=utf-8'
  }));
  $('downloadPython').download = 'spider_energia.py'
}

// El ritmo es solo visual. Las magnitudes físicas se calculan por posición.
function animar(ahora) {
  const dt = ultimaMarca ? Math.min((ahora - ultimaMarca) / 1000, .05) : 0;
  ultimaMarca = ahora;
  // Acercamos el dibujo a la masa elegida suavemente, incluso estando en pausa.
  if (masaVisual !== estado.masa) {
    masaVisual += (estado.masa - masaVisual) * (1 - Math.exp(-dt / .1));
    if (reducido || Math.abs(estado.masa - masaVisual) < .01) masaVisual = estado.masa;
    actualizarSilueta(masaVisual);
  }
  if (transicion) {
    const u = Math.min(1, (ahora - transicion.inicio) / 550),
      suave = u * u * (3 - 2 * u);
    estado.posicion = transicion.desde + (transicion.hasta - transicion.desde) * suave;
    estado.fase = Math.acos(1 - 2 * estado.posicion / 100);
    if (u === 1) transicion = null;
  } else if (estado.reproduciendo && estado.vista === 'laboratorio') {
    estado.fase = (estado.fase + dt * (estado.lento ? .5 : 1) * 2 * Math.PI / 10) % (2 * Math.PI);
    estado.posicion = (1 - Math.cos(estado.fase)) * 50;
  }
  if (ahora - ultimoDibujo > 30) {
    actualizar();
    ultimoDibujo = ahora
  }
  requestAnimationFrame(animar);
}
document.addEventListener('visibilitychange', () => {
  if (document.hidden) pausar()
});
pintarCodigo('python');
actualizarSilueta(masaVisual);
sincronizarControles();
sincronizarReproduccion();
actualizar();
mostrarVista(location.hash.slice(1) || 'laboratorio');
requestAnimationFrame(animar);
