/* ============================================================
   EL MOTOR DEL SITIO

   Este archivo hace una sola cosa: lee tus proyectos del archivo
   de datos y arma con ellos la grilla de Work y el carrusel de
   la portada.

   POR QUÉ EXISTE:
   Antes cada proyecto estaba escrito a mano dentro del HTML, en
   tres sitios distintos. Agregar uno significaba editar tres
   archivos sin equivocarse. Ahora todo sale de un solo lugar,
   datos/proyectos.json, y ese archivo es el que va a editar tu
   panel de administración.

   TÚ NO TIENES QUE TOCAR ESTE ARCHIVO NUNCA.
   ============================================================ */


/* ------------------------------------------------------------
   1. LAS ETIQUETAS

   Las etiquetas se guardan en minúscula y sin símbolos, porque
   así son fáciles de comparar para la máquina. Pero a la gente
   hay que mostrarle "UX/UI", no "uxui". Esta tabla traduce.

   Si algún día agregas una categoría nueva, va acá y también
   en el desplegable de work.html.
   ------------------------------------------------------------ */
const NOMBRES_ETIQUETAS = {
  uxui: 'UX/UI',
  branding: 'Branding',
  editorial: 'Editorial',
  packaging: 'Packaging',
  motion: 'Motion',
  illustration: 'Illustration'
};


/* ------------------------------------------------------------
   2. TRAER LOS DATOS

   fetch() va a buscar el archivo. Como tarda un instante, todo
   lo que dependa de él tiene que esperarlo: eso es lo que hacen
   async y await.

   ⚠️ IMPORTANTE: esto NO funciona abriendo el HTML con doble
   clic. Los navegadores no dejan que una página abierta desde
   el disco lea otros archivos del disco, por seguridad.
   Para probarlo en tu computadora necesitas Live Server, la
   extensión de VS Code. Publicado en Netlify funciona siempre.
   ------------------------------------------------------------ */
async function traerProyectos() {
  const respuesta = await fetch('datos/proyectos.json');
  const datos = await respuesta.json();

  return datos.proyectos
    // Fuera los que tengas ocultos
    .filter(p => p.visible)
    // Del más nuevo al más viejo
    .sort((a, b) => b.anio - a.anio);
}


/* ------------------------------------------------------------
   3. ARMAR UNA TARJETA DE LA GRILLA DE WORK
   ------------------------------------------------------------ */
function tarjetaProyecto(p) {
  // Las etiquetas, traducidas y separadas por comas
  const etiquetasVisibles = p.etiquetas
    .map(e => NOMBRES_ETIQUETAS[e] || e)
    .join(', ');

  // Si tiene portada se pone; si no, queda el bloque gris
  const imagen = p.portada
    ? `<img src="${p.portada}" alt="${p.titulo}">`
    : '';

  // El año solo se muestra si hay fecha escrita
  const anio = p.fecha ? ` • ${p.fecha}` : '';

  return `
    <a href="proyecto.html?p=${p.id}" class="pieza" data-tags="${p.etiquetas.join(',')}">
      <div class="pieza-imagen">${imagen}</div>
      <h2 class="pieza-titulo">${p.titulo}${anio}</h2>
      <p class="pieza-tags">${etiquetasVisibles}</p>
    </a>
  `;
}


/* ------------------------------------------------------------
   4. PINTAR LA GRILLA DE WORK
   ------------------------------------------------------------ */
async function pintarGrilla() {
  const grilla = document.getElementById('grilla');
  if (!grilla) return;   // no estamos en Work, no hacemos nada

  const proyectos = await traerProyectos();

  // join('') pega todas las tarjetas en un solo texto
  grilla.innerHTML = proyectos.map(tarjetaProyecto).join('')
    + '<p class="sin-resultados" id="sin-resultados" style="display:none;">No projects in this category yet.</p>';

  // El filtro se conecta DESPUÉS de que las tarjetas existan.
  // Antes no habría nada que filtrar.
  conectarFiltro();
}


/* ------------------------------------------------------------
   5. EL FILTRO POR CATEGORÍA
   Esconde las piezas que no tienen la etiqueta elegida.
   ------------------------------------------------------------ */
function conectarFiltro() {
  const filtro  = document.getElementById('filtro');
  const limpiar = document.getElementById('limpiar');
  const vacio   = document.getElementById('sin-resultados');
  if (!filtro) return;

  function aplicar() {
    const elegida = filtro.value;
    let visibles = 0;

    document.querySelectorAll('.pieza').forEach(pieza => {
      const tags = pieza.dataset.tags.split(',');
      const pasa = elegida === '' || tags.includes(elegida);

      pieza.classList.toggle('oculta', !pasa);
      if (pasa) visibles++;
    });

    vacio.style.display = visibles === 0 ? 'block' : 'none';

    // La clase va en la CAJA y no en el select: el borde es
    // de la caja. Está explicado en el CSS, bloque W2.
    document.getElementById('filtro-caja')
      .classList.toggle('activo', elegida !== '');
  }

  filtro.addEventListener('change', aplicar);

  limpiar.addEventListener('click', () => {
    filtro.value = '';
    aplicar();
  });
}


/* ------------------------------------------------------------
   6. EL CARRUSEL DE LA PORTADA

   Son las mismas piezas, escritas dos veces seguidas para que
   el bucle no se note. Eso también sale de acá ahora, así que
   ya no hay que acordarse de agregar la pieza en las dos copias.
   ------------------------------------------------------------ */
async function pintarCarrusel() {
  const pista = document.getElementById('marquee-pista');
  if (!pista) return;   // no estamos en la portada

  const proyectos = await traerProyectos();

  const pieza = (p, duplicada) => {
    const imagen = p.portada
      // En la copia duplicada el alt va vacío: es la misma imagen
      // y no hace falta que un lector de pantalla la lea dos veces
      ? `<img src="${p.portada}" alt="${duplicada ? '' : p.titulo}">`
      : '';
    return `<a href="proyecto.html?p=${p.id}" class="marquee-item">${imagen}</a>`;
  };

  const copia1 = proyectos.map(p => pieza(p, false)).join('');
  const copia2 = proyectos.map(p => pieza(p, true)).join('');

  pista.innerHTML = copia1 + copia2;
}


/* ------------------------------------------------------------
   7. LA PÁGINA DE UN PROYECTO

   Hay UN solo archivo, proyecto.html, que sirve para todos.
   Cuál mostrar se decide por la dirección:

     proyecto.html?p=skinbro

   Ese "?p=skinbro" se llama parámetro. El JavaScript lo lee,
   busca ese proyecto en los datos y arma la página con él.

   POR QUÉ ASÍ: la alternativa era un archivo HTML por proyecto,
   y entonces crear uno nuevo desde el panel no bastaría: habría
   que crear también su página. Con esto, el panel crea el
   proyecto y la página existe sola.
   ------------------------------------------------------------ */
async function pintarProyecto() {
  const cont = document.getElementById('proyecto');
  if (!cont) return;   // no estamos en una página de proyecto

  // Leer el ?p= de la dirección
  const id = new URLSearchParams(location.search).get('p');

  const respuesta = await fetch('datos/proyectos.json');
  const todos = (await respuesta.json()).proyectos;
  const p = todos.find(x => x.id === id);

  // Si la dirección apunta a algo que no existe
  if (!p) {
    cont.innerHTML = `
      <section class="proyecto-cabecera">
        <div>
          <a href="work.html" class="volver">&#8249; All work</a>
          <h1 class="proyecto-titulo-grande">Project not found</h1>
          <p class="proyecto-descripcion">
            This project doesn&rsquo;t exist, or it isn&rsquo;t published yet.
          </p>
        </div>
      </section>`;
    return;
  }

  document.title = `${p.titulo} — Carlota Corzo`;

  const etiquetas = p.etiquetas
    .map(e => `<li>${NOMBRES_ETIQUETAS[e] || e}</li>`)
    .join('');

  // Las imágenes. Cada una trae su ancho; si no, media.
  const imagenes = (p.imagenes || []).map(img => `
    <figure class="${img.ancho || 'mitad'}">
      <img src="${img.archivo}" alt="${img.alt || ''}">
      ${img.pie ? `<figcaption>${img.pie}</figcaption>` : ''}
    </figure>
  `).join('');

  // Anterior y siguiente, calculados solos a partir del orden
  const visibles = todos.filter(x => x.visible).sort((a, b) => b.anio - a.anio);
  const i = visibles.findIndex(x => x.id === p.id);
  const anterior = visibles[i - 1];
  const siguiente = visibles[i + 1];

  const enlace = (proy, lado) => {
    if (!proy) return '<span></span>';
    const texto = lado === 'prev' ? 'Previous project' : 'Next project';
    const flecha = lado === 'prev' ? '&#8249;' : '&#8250;';
    const nombre = `<span>${texto}<span class="nombre">${proy.titulo}</span></span>`;
    return `<a href="proyecto.html?p=${proy.id}">${
      lado === 'prev' ? flecha + nombre : nombre + flecha
    }</a>`;
  };

  cont.innerHTML = `
    <section class="proyecto-cabecera">
      <div>
        <a href="work.html" class="volver">&#8249; All work</a>
        <h1 class="proyecto-titulo-grande">${p.titulo}</h1>
        <p class="proyecto-descripcion">${p.descripcion || ''}</p>
      </div>
      <div class="proyecto-ficha">
        ${p.fecha ? `<p class="proyecto-fecha">${p.fecha}</p>` : ''}
        <ul class="proyecto-tags">${etiquetas}</ul>
      </div>
    </section>

    ${imagenes ? `<section class="galeria">${imagenes}</section>` : ''}

    <nav class="nav-proyectos">
      ${enlace(anterior, 'prev')}
      ${enlace(siguiente, 'next')}
    </nav>
  `;
}


/* ------------------------------------------------------------
   8. LA LISTA DE WRITING
   Mismo mecanismo que los proyectos, con su propio archivo.
   ------------------------------------------------------------ */
async function pintarWriting() {
  const lista = document.getElementById('writing');
  if (!lista) return;

  const respuesta = await fetch('datos/writing.json');
  const entradas = (await respuesta.json()).entradas
    .filter(e => e.visible)
    // De la más nueva a la más vieja. Las fechas en formato
    // año-mes-día se ordenan solas comparándolas como texto.
    .sort((a, b) => b.fecha.localeCompare(a.fecha));

  if (entradas.length === 0) {
    lista.innerHTML = '<p class="sin-resultados">Nothing published yet.</p>';
    return;
  }

  lista.innerHTML = entradas.map(e => `
    <a href="texto.html?t=${e.id}" class="entrada">
      <p class="entrada-fecha"><time datetime="${e.fecha}">${e.fechaVisible}</time></p>
      <h2>${e.titulo}</h2>
      <p class="entrada-bajada">${e.bajada}</p>
    </a>
  `).join('');
}


/* ------------------------------------------------------------
   9. APARECER AL BAJAR

   Los bloques entran suavemente cuando aparecen en pantalla.

   CÓMO FUNCIONA, que es más simple de lo que parece:
   El navegador tiene un vigilante incorporado, IntersectionObserver,
   que avisa cuando un elemento entra en la pantalla. Nosotros le
   damos la lista de qué vigilar, y cuando avisa, le ponemos al
   elemento la clase "visible". El movimiento lo hace el CSS.

   Lo importante: NO está escuchando el scroll todo el rato,
   que es lo que hace lento un sitio. El navegador avisa solo
   cuando pasa algo.
   ------------------------------------------------------------ */
function activarRevelado() {
  // Si alguien pidió menos movimiento en su sistema, nada de esto
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Qué bloques se revelan
  const candidatos = document.querySelectorAll(
    '.hero-izq, .hero-circulo, .capacidades-bloque, .work-cabecera, ' +
    '.pieza, .entrada, .about-texto, .about-foto, .timeline, .tools, ' +
    '.contacto-texto, .formulario, .proyecto-cabecera, .galeria figure'
  );

  candidatos.forEach(el => el.classList.add('revelar'));

  const vigilante = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visible');
        // Una vez revelado, dejamos de vigilarlo: no hace falta
        // que desaparezca al subir otra vez
        vigilante.unobserve(entrada.target);
      }
    });
  }, {
    // Se dispara cuando asoma un 12% del elemento
    threshold: 0.12,
    // Y 80px antes de que llegue al borde, para que no se vea
    // "aparecer" justo en el filo de la pantalla
    rootMargin: '0px 0px -80px 0px'
  });

  candidatos.forEach(el => vigilante.observe(el));
}


/* ------------------------------------------------------------
   10. ARRANCAR
   Se ejecutan todos; cada uno comprueba si le toca.
   ------------------------------------------------------------ */

// Los que pintan contenido devuelven una promesa: hay que
// esperarlos antes de revelar, porque si no las tarjetas de
// Work todavía no existirían cuando el vigilante mire.
Promise.all([
  pintarGrilla(),
  pintarCarrusel(),
  pintarProyecto(),
  pintarWriting()
]).then(activarRevelado);
