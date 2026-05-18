
# `customer-selection.component.scss`

> **Cómo leer este documento:** debajo de cada explicación hay un bloque **Código:** con el fragmento exacto del fichero fuente.

**Código:**

```scss
/* Archivo vacío — sin reglas CSS definidas */
```

## Código fuente

Archivo: `src/app/features/customer-modification/components/customer-selection/customer-selection.component.scss`

```scss

```

---

## Ubicación del fuente

`src/app/features/customer-modification/components/customer-selection/customer-selection.component.scss`

**Código:**

```scss
/* Archivo vacío — sin reglas CSS definidas */
```

## Estado actual

Archivo **vacío**. Referenciado en:

```typescript
styleUrls: ['./customer-selection.component.scss'],
```

Los estilos visuales del selector dependen de clases definidas en el HTML y probablemente de **hojas globales** o del módulo de **novación** (`novation-radio-*`, `no-mortgage-cont`).

## Clases usadas en la plantilla (referencia para futuro SCSS)


**Código:**

```scss
/* Archivo vacío — sin reglas CSS definidas */
```

### Patrón novación (bloque implícito «novation radio»)

| Clase | Elemento | Rol visual esperado |
|-------|----------|---------------------|
| `.novation-radio-group` | Contenedor `@if` | Layout vertical/horizontal del listado de tarjetas-radio |
| `.novation-radio-option` | `<label>` por cliente | Tarjeta clicable, borde, padding |
| `.novation-radio-option.checked` | Modificador vía `[class.checked]` | Estado seleccionado (borde activo, fondo) |
| `.option-content` | Contenedor de filas | Columna de datos del cliente |
| `.option-row` | Fila de datos | Flex/grid label-valor |
| `.option-row.mortgage` | Primera fila | Posible énfasis tipográfico (nombre) |
| `.option-row.amount` | Tercera fila | Estilo numérico / IBAN |

**Código:**

```scss
/* Archivo vacío — sin reglas CSS definidas */
```

### BEM del feature

| Clase | Rol |
|-------|-----|
| `.customer-selection__empty` | Contenedor del empty state (elemento del bloque `customer-selection`) |

**Código:**

```scss
/* Archivo vacío — sin reglas CSS definidas */
```

### Clases compartidas / legado

| Clase | Rol |
|-------|-----|
| `.no-mortgage-cont` | Layout del estado vacío (imagen + cuerpo), reutilizado de hipotecas |
| `.image` | Contenedor del SVG |
| `.body` | Textos del empty state |
| `.title` | Título principal del mensaje |
| `.desc` | Descripción secundaria |
| `.label` / `.value` | Parejas etiqueta-valor dentro de cada radio |
| `.value.amount` | Variante para cifras/cuenta |

**Código:**

```scss
/* Archivo vacío — sin reglas CSS definidas */
```

## BEM: bloque `customer-selection`

Solo se nombra explícitamente el empty state con BEM del feature:

```
customer-selection (bloque conceptual)
└── __empty (elemento)
```

Las tarjetas radio usan nomenclatura de **novación**, no `customer-selection__option`, para **reutilizar CSS existente** sin duplicar reglas.

## Encapsulamiento

Reglas futuras en este archivo:

- Deberían usar `:host` para display block del field type.
- Selectores `.novation-radio-option.checked` pueden necesitar `:host ::ng-deep` solo si los estilos globales no alcanzan (preferir mover estilos compartidos a un partial importado).

Ejemplo hipotético:

```scss
:host {
  display: block;
}

.customer-selection__empty {
  text-align: center;
  padding: 2rem;
}
```

## Coherencia con `customer-modification-summary.component.scss`

Ambos SCSS de subcomponentes están vacíos; el feature concentra posiblemente estilos en `customer-modification.component.scss` o en librería externa. Al implementar, evitar duplicar `.novation-radio-*` aquí si ya existen en el bundle de novación.

**Código:**

```scss
/* Archivo vacío — sin reglas CSS definidas */
```

## Assets

La imagen del empty state no se estiliza en este SCSS; la ruta es remota en el `src` del `<img>`.

**Código:**

```scss
/* Archivo vacío — sin reglas CSS definidas */
```
