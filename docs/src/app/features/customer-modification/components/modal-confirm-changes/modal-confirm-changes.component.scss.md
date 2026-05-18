
# `modal-confirm-changes.component.scss`

> **Cómo leer este documento:** debajo de cada explicación hay un bloque **Código:** con el fragmento exacto del fichero fuente.

**Código:**

```scss
/* Archivo vacío — sin reglas CSS definidas */
```

## Código fuente

Archivo: `src/app/features/customer-modification/components/modal-confirm-changes/modal-confirm-changes.component.scss`

```scss

```

---

## Ubicación del fuente

`src/app/features/customer-modification/components/modal-confirm-changes/modal-confirm-changes.component.scss`

**Código:**

```scss
/* Archivo vacío — sin reglas CSS definidas */
```

## Estado actual

Archivo **vacío**. Referenciado en el decorador del componente; el modal se muestra con estilos por defecto de:

- Contenedor del `ModalService` (overlay, centrado, tamaño `small`)
- Componentes de librería (`lib-icon`, `homeur-button`)
- Posibles estilos globales de modales en el proyecto Sanes

**Código:**

```scss
/* Archivo vacío — sin reglas CSS definidas */
```

## Bloque BEM definido en HTML


**Código:**

```scss
/* Archivo vacío — sin reglas CSS definidas */
```

### `.modal-confirm` (block)

Contenedor flex/columna centrada típica de modales de confirmación:

- Padding interno uniforme
- Alineación centrada de icono, textos y botón
- `max-width` acotado al `modalSize: 'small'` del servicio

**Código:**

```scss
/* Archivo vacío — sin reglas CSS definidas */
```

### Elementos

| Selector | Elemento HTML | Estilos habituales |
|----------|---------------|-------------------|
| `.modal-confirm__icon` | Wrapper de `lib-icon` | `margin-bottom`, centrado |
| `.modal-confirm__title` | `<h2>` | Tamaño de título, peso semibold, margen inferior |
| `.modal-confirm__text` | `<p>` | Color secundario, `line-height`, margen antes del botón |

**Código:**

```scss
/* Archivo vacío — sin reglas CSS definidas */
```

### Relación con el botón

`homeur-button` está **fuera** de la nomenclatura BEM del bloque (componente externo). Espaciado superior suele aplicarse con:

```scss
.modal-confirm homeur-button {
  margin-top: 1.5rem;
}
```

(o clase wrapper `.modal-confirm__actions` si se refactoriza).

## `:host` en modales

Al renderizarse dentro del portal del modal, conviene:

```scss
:host {
  display: block;
  width: 100%;
}
```

para que el contenido ocupe el ancho del panel `small`.

## `sanTypeIcon` y estilos

El TypeScript expone `SanTypeIcon` pero la plantilla usa `lib-icon` con atributos fijos; no hay reglas SCSS ligadas al enum hoy.

**Código:**

```scss
/* Archivo vacío — sin reglas CSS definidas */
```

## Coherencia con otros modales

Buscar en el repositorio otros `modal-confirm` o modales de éxito de la librería antes de duplicar reglas; este SCSS debería contener solo deltas del feature «customer modification».

**Código:**

```scss
/* Archivo vacío — sin reglas CSS definidas */
```

## Accesibilidad visual

Si se estiliza:

- Contraste suficiente en `.modal-confirm__text`
- Área clicable del botón ya la define `homeur-button` con `regular-button`

**Código:**

```scss
/* Archivo vacío — sin reglas CSS definidas */
```
