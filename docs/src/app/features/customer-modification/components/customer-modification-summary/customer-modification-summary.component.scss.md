
# `customer-modification-summary.component.scss`

> **Cómo leer este documento:** debajo de cada explicación hay un bloque **Código:** con el fragmento exacto del fichero fuente.

**Código:**

```scss
/* Archivo vacío — sin reglas CSS definidas */
```

## Código fuente

Archivo: `src/app/features/customer-modification/components/customer-modification-summary/customer-modification-summary.component.scss`

```scss

```

---

## Ubicación del fuente

`src/app/features/customer-modification/components/customer-modification-summary/customer-modification-summary.component.scss`

**Código:**

```scss
/* Archivo vacío — sin reglas CSS definidas */
```

## Estado actual

El archivo fuente está **vacío** (0 bytes). Angular sigue referenciándolo en el decorador:

```typescript
styleUrls: ['./customer-modification-summary.component.scss'],
```

Por tanto, **todos los estilos visuales** del resumen dependen hoy de:

- Estilos globales del proyecto / librería `homeur-*`
- Estilos por defecto del navegador
- Estilos heredados de componentes hijos (`homeur-box-message`)

## Clases BEM previstas (definidas en HTML)

Aunque no haya reglas SCSS, la plantilla ya nombra el bloque y elementos para cuando se implementen estilos locales.

**Código:**

```scss
/* Archivo vacío — sin reglas CSS definidas */
```

### Bloque: `.cm-summary`

Contenedor raíz del componente. Posibles responsabilidades futuras:

- `padding` / `margin` respecto al stepper
- `max-width` del área de resumen
- Tipografía base de la sección

**Código:**

```scss
/* Archivo vacío — sin reglas CSS definidas */
```

### Elementos

| Selector sugerido | Uso en HTML | Estilo típico esperable |
|-------------------|-------------|-------------------------|
| `.cm-summary__disclaimer` | Párrafo dentro del box informativo | Tamaño de fuente secundario, color muted |
| `.cm-summary__title` | `<h3>` del título | `font-weight`, `margin-bottom` |
| `.cm-summary__changes` | Contenedor del `@for` | `display: flex; flex-direction: column; gap` |
| `.cm-summary__change-row` | Una fila de diff | Grid o flex: label a la izquierda, valores a la derecha |
| `.cm-summary__change-label` | Nombre del campo | Negrita, ancho fijo |
| `.cm-summary__change-values` | Grupo antiguo → nuevo | `display: flex; align-items: center; gap` |
| `.cm-summary__change-old` | Valor anterior | Color secundario, `text-decoration: line-through` opcional |
| `.cm-summary__change-arrow` | Separador 👉 | `margin` horizontal pequeño |
| `.cm-summary__change-new` | Valor nuevo | Color de énfasis / éxito |
| `.cm-summary__no-changes` | Sin cambios | Centrado, estilo informativo |

**Código:**

```scss
/* Archivo vacío — sin reglas CSS definidas */
```

### Modificadores BEM (no usados aún)

Ejemplos si el diseño evoluciona:

- `.cm-summary__change-row--highlight` para cambios críticos
- `.cm-summary--compact` en vista móvil

**Código:**

```scss
/* Archivo vacío — sin reglas CSS definidas */
```

## Encapsulamiento Angular

Al ser `styleUrls` del componente, las reglas que se añadan aquí tendrán por defecto **encapsulamiento emulado** (`_ngcontent-*`), salvo que se use `:host` o `::ng-deep` (evitar deep salvo necesidad).

Ejemplo futuro de `:host`:

```scss
:host {
  display: block;
}
```

## Relación con otros SCSS del feature

`customer-modification.component.scss` (padre) puede aportar contexto del stepper; este SCSS debería limitarse al resumen para mantener BEM acotado al bloque `cm-summary`.

**Código:**

```scss
/* Archivo vacío — sin reglas CSS definidas */
```

## Recomendación de implementación

Cuando se añadan estilos:

1. Definir solo bajo `.cm-summary` y descendientes `__` para no fugas globales.
2. Reutilizar variables/tokens del design system del banco si existen en el proyecto.
3. Probar contraste en `.cm-summary__change-old` vs `.cm-summary__change-new` para accesibilidad WCAG.

**Código:**

```scss
/* Archivo vacío — sin reglas CSS definidas */
```
