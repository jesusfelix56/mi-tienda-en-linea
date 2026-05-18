
# `customer-modification-summary.component.html`

> **Cómo leer este documento:** debajo de cada explicación hay un bloque **Código:** con el fragmento exacto del fichero fuente.

## Código fuente

Archivo: `src/app/features/customer-modification/components/customer-modification-summary/customer-modification-summary.component.html`

```html
<div class="cm-summary">
  <homeur-box-message type="information">
    <p class="cm-summary__disclaimer">
      {{ 'CUSTOMER_MODIFICATION.SUMMARY.DISCLAIMER' | translate }}
    </p>
  </homeur-box-message>

  <h3 class="cm-summary__title">
    {{ 'CUSTOMER_MODIFICATION.SUMMARY.TITLE' | translate }}
  </h3>

  @if (hasChanges) {
    <div class="cm-summary__changes">
      @for (change of changes; track change.fieldKey) {
        <div class="cm-summary__change-row">
          <span class="cm-summary__change-label">
            {{ change.label | translate }}
          </span>
          <div class="cm-summary__change-values">
            <span class="cm-summary__change-old">{{ formatValue(change.fieldKey, change.oldValue) }}</span>
            <span class="cm-summary__change-arrow" aria-hidden="true">👉</span>
            <span class="cm-summary__change-new">{{ formatValue(change.fieldKey, change.newValue) }}</span>
          </div>
        </div>
      }
    </div>
  } @else {
    <p class="cm-summary__no-changes">
      {{ 'CUSTOMER_MODIFICATION.SUMMARY.NO_CHANGES' | translate }}
    </p>
  }
</div>
```

---

## Ubicación del fuente

`src/app/features/customer-modification/components/customer-modification-summary/customer-modification-summary.component.html`

## Propósito

Plantilla del resumen de modificaciones: aviso informativo, título, y bloque condicional con filas **etiqueta | valor antiguo → valor nuevo** o mensaje de ausencia de cambios.

## Bloque raíz y BEM

Contenedor principal con convención **BEM** (Block Element Modifier):

| Clase | Rol BEM |
|-------|---------|
| `cm-summary` | **Block**: contenedor del resumen de customer modification |
| `cm-summary__disclaimer` | **Element**: texto del aviso dentro del box |
| `cm-summary__title` | **Element**: título de sección |
| `cm-summary__changes` | **Element**: contenedor de filas de cambio |
| `cm-summary__change-row` | **Element**: una fila (un campo modificado) |
| `cm-summary__change-label` | **Element**: etiqueta del campo |
| `cm-summary__change-values` | **Element**: grupo valor antiguo + flecha + valor nuevo |
| `cm-summary__change-old` | **Element**: valor anterior |
| `cm-summary__change-arrow` | **Element**: separador visual (emoji) |
| `cm-summary__change-new` | **Element**: valor nuevo |
| `cm-summary__no-changes` | **Element**: párrafo cuando no hay diff |

El prefijo `cm-` abrevia *customer modification*. Los dobles guiones bajos `__` separan bloque de elemento según BEM estricto. No hay modificadores `--` en esta plantilla.

> **Nota**: `customer-modification-summary.component.scss` está **vacío**; las clases BEM están listas para estilos futuros o globales.

## Componentes y elementos externos


### `<homeur-box-message type="information">`

**Código:**

```html
<homeur-box-message type="information">
    <p class="cm-summary__disclaimer">
      {{ 'CUSTOMER_MODIFICATION.SUMMARY.DISCLAIMER' | translate }}
    </p>
  </homeur-box-message>
```


- Componente de la librería/design system del proyecto.
- `type="information"`: binding de **entrada** al atributo/propiedad `type` (string literal).
- Envuelve el disclaimer para resaltar que es información, no error.

### Pipe `translate`

Sintaxis: `{{ 'CLAVE' | translate }}`

| Clave en plantilla | Texto en `es.json` (aprox.) |
|--------------------|------------------------------|
| `CUSTOMER_MODIFICATION.SUMMARY.DISCLAIMER` | «Esta información es una previsualización…» |
| `CUSTOMER_MODIFICATION.SUMMARY.TITLE` | «Datos modificados» |
| `CUSTOMER_MODIFICATION.SUMMARY.NO_CHANGES` | «No se han detectado cambios» |

En cada fila, `change.label` ya es una **clave i18n** (no texto plano): `{{ change.label | translate }}`.

## Control de flujo Angular: `@if` y `@for`

Sintaxis de **built-in control flow** (Angular 17+), sin `*ngIf` / `*ngFor`.

**Código:**

```html
<div class="cm-summary">
  <homeur-box-message type="information">
    <p class="cm-summary__disclaimer">
      {{ 'CUSTOMER_MODIFICATION.SUMMARY.DISCLAIMER' | translate }}
    </p>
  </homeur-box-message>

  <h3 class="cm-summary__title">
    {{ 'CUSTOMER_MODIFICATION.SUMMARY.TITLE' | translate }}
  </h3>

  @if (hasChanges) {
    <div class="cm-summary__changes">
      @for (change of changes; track change.fieldKey) {
        <div class="cm-summary__change-row">
          <span class="cm-summary__change-label">
            {{ change.label | translate }}
          </span>
          <div class="cm-summary__change-values">
            <span class="cm-summary__change-old">{{ formatValue(change.fieldKey, change.oldValue) }}</span>
            <span class="cm-summary__change-arrow" aria-hidden="true">👉</span>
            <span class="cm-summary__change-new">{{ formatValue(change.fieldKey, change.newValue) }}</span>
          </div>
        </div>
      }
    </div>
  } @else {
    <p class="cm-summary__no-changes">
      {{ 'CUSTOMER_MODIFICATION.SUMMARY.NO_CHANGES' | translate }}
    </p>
  }
</div>
```

### `@if (hasChanges) { ... } @else { ... }`

```html
@if (hasChanges) {
  ...
} @else {
  <p class="cm-summary__no-changes">...</p>
}
```

| Rama | Condición | Contenido |
|------|-----------|-----------|
| `@if` | `hasChanges === true` (`changes.length > 0`) | Lista de cambios |
| `@else` | sin cambios detectados | Mensaje `NO_CHANGES` |

`hasChanges` es un **getter** del componente TypeScript; se evalúa en cada detección de cambios.

### `@for (change of changes; track change.fieldKey)`

```html
@for (change of changes; track change.fieldKey) {
  <div class="cm-summary__change-row">...</div>
}
```

| Parte | Significado |
|-------|-------------|
| `change of changes` | Itera el getter `changes` del componente |
| `track change.fieldKey` | Identidad estable para DOM (reconciliación eficiente; `fieldKey` es único por campo del modelo) |

Cada iteración expone la variable de plantilla `change` con tipo implícito `CustomerModificationChange`.

## Bindings y expresiones por línea


### Disclaimer

```html
{{ 'CUSTOMER_MODIFICATION.SUMMARY.DISCLAIMER' | translate }}
```

- **Interpolación** + pipe: solo salida, sin binding bidireccional.

### Título

```html
{{ 'CUSTOMER_MODIFICATION.SUMMARY.TITLE' | translate }}
```

### Fila de cambio — etiqueta

```html
{{ change.label | translate }}
```

- `change.label`: string con clave i18n asignada por el padre en `_calculateChanges()`.

### Valores formateados

```html
{{ formatValue(change.fieldKey, change.oldValue) }}
{{ formatValue(change.fieldKey, change.newValue) }}
```

| Binding | Tipo | Descripción |
|---------|------|-------------|
| `formatValue(...)` | Llamada a método del componente | Convierte `oldValue`/`newValue` a string legible (booleanos, selects, null) |
| `change.fieldKey` | Argumento | Determina qué catálogo de opciones usar en `formatValue` |
| `change.oldValue` / `change.newValue` | Argumento | Valores crudos del diff |

No hay `[]` ni `()` salvo la invocación implícita en interpolación.

### Flecha decorativa

```html
<span class="cm-summary__change-arrow" aria-hidden="true">👉</span>
```

- `aria-hidden="true"`: atributo estático de accesibilidad; oculta el emoji a lectores de pantalla (decorativo).

## Diagrama de estructura DOM

```
.cm-summary
├── homeur-box-message
│   └── p.cm-summary__disclaimer
├── h3.cm-summary__title
└── @if hasChanges
    └── .cm-summary__changes
        └── @for change
            └── .cm-summary__change-row
                ├── span.cm-summary__change-label
                └── .cm-summary__change-values
                    ├── span.cm-summary__change-old
                    ├── span.cm-summary__change-arrow
                    └── span.cm-summary__change-new
    @else
        └── p.cm-summary__no-changes
```

## Enlace con Formly

Esta plantilla **no** usa `formlyAttributes` ni `formControl` directamente: el campo Formly puede existir solo como contenedor del paso 3. Toda la data visible proviene de **`formState`**, no del valor del `formControl` del campo summary.

## Accesibilidad

- Jerarquía: `h3` para el título de sección.
- La comparación es visual (antiguo → nuevo); no hay `table` semántica; si se requiere mayor accesibilidad, podría evolucionarse a `<table>` o listas con `aria-label` por fila.
