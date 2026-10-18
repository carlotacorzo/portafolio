# Portafolio de Carlota Corzo

Sitio en HTML, CSS y un poco de JavaScript. Sin instalar nada, sin terminal.

---

## 1. Lo primero que tienes que saber

> ### Para agregar o editar un proyecto o una entrada, **no se tocan estos archivos**. Se usa el panel: `tusitio.com/admin`

Los proyectos y las entradas de Writing ya no están escritos dentro del HTML. Viven en `datos/`, y el panel es lo que los edita.

Este archivo es para cuando quieras tocar el **diseño**, no el contenido.

---

## 2. Qué es cada archivo

| Archivo | Qué es | ¿Lo tocas? |
|---|---|---|
| `datos/proyectos.json` | Tus proyectos | **No a mano**, usa el panel |
| `datos/writing.json` | Tus entradas | **No a mano**, usa el panel |
| `imagenes/` | Las fotos | El panel las sube acá solo |
| `css/estilos.css` | Cómo se ve todo el sitio | Sí, si quieres cambiar el diseño |
| `js/sitio.js` | Lee los datos y arma las páginas | No hace falta |
| `index.html` | La portada | Solo para cambiar sus textos fijos |
| `work.html` | El listado. La grilla la arma el JavaScript | Casi nunca |
| `proyecto.html` | **Sirve para todos los proyectos.** Cuál se muestra lo decide la dirección | No |
| `about.html` · `contact.html` | Textos fijos | Sí, para cambiar lo que dicen |
| `writing.html` | La lista. La arma el JavaScript | Casi nunca |
| `admin/config.yml` | Qué campos tiene el panel | Solo si quieres un campo nuevo |

---

## 3. Los dos números que controlan todo el diseño

Están arriba del todo en `css/estilos.css`:

```css
html { font-size: 12.8px; }   /* el tamaño de TODO el sitio */
--margen: 200px;              /* el aire a los lados */
```

**El primero cambia todo junto** sin deformar nada: textos, círculo, carrusel, separaciones, botón. 16 sería el tamaño de tu Figma; 12.8 es el 80%, que es el que elegiste.

Los colores están justo debajo, en el bloque de variables. Cambias el rosa ahí y cambia en las cinco páginas.

---

## 4. Para ver cambios en tu computadora

⚠️ **Ya no sirve el doble clic.** El sitio ahora lee archivos de datos, y los navegadores no dejan que una página abierta desde el disco lea otros archivos del disco, por seguridad.

**Qué hacer:** instala la extensión **Live Server** en Visual Studio Code. Clic derecho sobre `index.html`, "Open with Live Server", y listo. Además se recarga sola cada vez que guardas.

Publicado en Netlify funciona siempre, sin nada de esto.

---

## 5. Cómo se publica un cambio

**Si editaste contenido desde el panel:** ya está. El panel guarda en GitHub y Netlify lo publica solo, en un minuto.

**Si editaste el diseño en tu computadora:** hay que subir los archivos a GitHub. Netlify los ve y publica.

---

## 6. Las reglas de las imágenes

- **2000 píxeles** de ancho máximo
- **Menos de 500 KB** cada una
- **JPG al 80%** de calidad
- Nombres en **minúsculas, sin tildes, sin espacios**: `skinbro-packaging-01.jpg`
- **Los videos no van acá.** Se suben a Vimeo y se incrustan

El detalle de por qué está en el vault, en *Cómo preparar las imágenes para la web*.

---

## 7. Pendientes

- [ ] Las imágenes de los proyectos
- [ ] La ilustración del círculo de la portada y la foto del About
- [ ] Completar los enlaces de Behance y LinkedIn, y el correo de Contact
- [ ] Los años y las descripciones de los proyectos, desde el panel
- [ ] Los tres textos de Writing
