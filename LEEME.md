# Portafolio de Carlota Corzo

Sitio en HTML y CSS puros. Sin instalar nada, sin terminal, sin dependencias.
Abres un archivo, lo editas, lo guardas, recargas el navegador y ya está.

---

## 1. Qué es cada archivo

| Archivo | Qué es |
|---|---|
| `index.html` | La portada |
| `work.html` | El listado de todos los proyectos |
| `about.html` | Sobre mí, skills, experiencia |
| `contact.html` | Los enlaces de contacto |
| `proyecto-artika.html` | La plantilla de un caso. Se duplica para cada proyecto nuevo |
| `css/estilos.css` | Cómo se ve todo el sitio. Un solo archivo para las cuatro páginas |
| `imagenes/` | Acá van todas las fotos |

---

## 2. Cómo trabajar

1. Abre la carpeta `D:\Portafolio` en **Visual Studio Code** (gratis, es el editor estándar).
2. Edita el archivo que quieras.
3. Guarda con `Ctrl+S`.
4. Haz doble clic en `index.html` para verlo en el navegador. Recarga con `F5` cada vez que guardes.

**Truco:** instala la extensión **Live Server** en VS Code. Clic derecho sobre `index.html`, "Open with Live Server", y el navegador se recarga solo cada vez que guardas. Deja de ser incómodo al instante.

---

## 3. Las tres cosas que vas a hacer todo el tiempo

### 3.1. Agregar un proyecto al listado

En `work.html`, busca un bloque que empiece con `<a href=... class="proyecto">`. Cópialo entero (hasta su `</a>`), pégalo abajo y cambia:

- el **href**: a qué página lleva
- el **título** y la **categoría**
- el **tono**: `tono-1` hasta `tono-6`, son los colores de relleno

### 3.2. Poner una imagen de verdad

Guarda la foto en `imagenes/`. Luego, en el bloque del proyecto, borra esta línea:

```html
<span class="sin-imagen">A</span>
```

y en su lugar pon:

```html
<img src="imagenes/el-nombre-de-tu-archivo.jpg" alt="Describe qué se ve">
```

**Reglas de los nombres de archivo en la web:** minúsculas, sin tildes, sin ñ, sin espacios. En vez de espacios, guiones. `artika-packaging-01.jpg`, no `Artika Packaging 01.jpg`.

**El `alt` no es opcional.** Es lo que escucha alguien que usa lector de pantalla y lo que lee Google. Una frase describiendo la imagen.

### 3.3. Cambiar un color de todo el sitio

En `css/estilos.css`, arriba del todo, está el bloque `:root`. Cambias el valor ahí y cambia en las cuatro páginas a la vez.

---

## 4. Cómo hacerle su página a un proyecto

1. Copia `proyecto-artika.html` y pégalo en la misma carpeta.
2. Renómbralo: `proyecto-voces.html`, por ejemplo.
3. Cambia el texto de adentro.
4. En `work.html`, en la tarjeta de ese proyecto, cambia `href="#"` por `href="proyecto-voces.html"`.

---

## 5. Cómo publicarlo

**Netlify Drop**, gratis y sin cuenta para probar:

1. Entra a [app.netlify.com/drop](https://app.netlify.com/drop)
2. Arrastra la carpeta `Portafolio` entera a la pantalla.
3. En diez segundos te da una dirección pública.

Te va a dar un nombre feo tipo `brave-panda-4821.netlify.app`. Se puede cambiar por `carlotacorzo.netlify.app` desde el panel, y más adelante conectarle un dominio propio.

Para actualizar: vuelves a arrastrar la carpeta. (Cuando esto canse, se conecta con GitHub y se actualiza solo al guardar. Eso es para después.)

---

## 6. Pendientes

- [ ] Completar los enlaces de Behance y LinkedIn (están a medias, falta el usuario)
- [ ] Revisar la experiencia en `about.html`: las fechas y los cargos vienen del Wix viejo
- [ ] Reemplazar el texto de relleno de `proyecto-artika.html`
- [ ] Subir las imágenes reales
- [ ] Decidir el dominio
