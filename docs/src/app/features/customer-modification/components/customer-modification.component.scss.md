
# `customer-modification.component.scss`

> **Cómo leer este documento:** debajo de cada explicación hay un bloque **Código:** con el fragmento exacto del fichero fuente.

**Código:**

```scss
/* Archivo vacío — sin reglas CSS definidas */
```

## Código fuente

Archivo: `src/app/features/customer-modification/components/customer-modification.component.scss`

```scss

```

---

**Ruta esperada:** `src/app/features/customer-modification/components/customer-modification.component.scss`

## Estado en el repositorio

El decorador `@Component` declara:

```typescript
styleUrls: ['./customer-modification.component.scss'],
```

En el árbol actual del proyecto **este archivo puede no existir físicamente** (solo la referencia en el `.ts`). No hay reglas SCSS bajo `src/app/features/` en algunos snapshots del repo. Angular tolera un `styleUrls` apuntando a un fichero vacío o ausente según configuración del build; conviene crear el archivo si el compilador lo exige.

---

## Responsabilidad prevista

Estilos **locales** del contenedor del formulario de modificación de cliente, sin duplicar el diseño del stepper (propio de la librería Formly/Sanes).

---

**Código:**

```scss
/* Archivo vacío — sin reglas CSS definidas */
```

## Clases usadas desde la plantilla HTML


**Código:**

```scss
/* Archivo vacío — sin reglas CSS definidas */
```

### `.form`

Clase en el `<form>` raíz. Patrón habitual en Home Planner:

- Márgenes/padding respecto al layout del microfrontend.
- Ancho máximo o comportamiento en columnas del grid del shell.

Si no hay reglas en este SCSS, `.form` puede venir de **estilos globales** del MF o de `SharedModule`.

**Código:**

```scss
/* Archivo vacío — sin reglas CSS definidas */
```

### `.min-height`

Aplicada condicionalmente:

```html
[ngClass]="{ 'min-height': isAppIntoIFrame }"
```

**Propósito:** cuando `WindowRef.isAppIntoIFrame()` es `true`, el formulario necesita una **altura mínima** para que el stepper y los botones no queden comprimidos en un iframe con viewport reducido.

Implementación típica sugerida:

```scss
:host {
  display: block;
}

.form {
  width: 100%;
}

.form.min-height {
  min-height: 100vh; // o calc(100vh - <altura header shell>)
}
```

Ajustar el valor real al contrato visual del embed (a menudo `min-height: calc(100vh - 120px)` o variable CSS del shell).

---

## `:host`

Recomendable encapsular el componente:

```scss
:host {
  display: block;
}
```

Evita colapso de altura cuando el custom element del microfrontend solo envuelve este componente.

---

## Encapsulación Angular

Por defecto `ViewEncapsulation.Emulated`: las clases del SCSS solo afectan a la plantilla de este componente salvo `::ng-deep` (evitar salvo necesidad con Formly hijo).

Los campos Formly se renderizan **dentro** del árbol del componente, por lo que selectores como `.form .formly-field` pueden usarse con moderación.

---

**Código:**

```scss
/* Archivo vacío — sin reglas CSS definidas */
```

## Qué no debería incluir este SCSS

- Estilos del stepper (`.stepper`, indicadores): librería.
- Estilos de `customer-selection` o `customer-modification-summary`: tienen sus propios `styleUrls`.
- Tokens de color/tipografía: preferir variables del design system compartido.

---

**Código:**

```scss
/* Archivo vacío — sin reglas CSS definidas */
```

## Relación con otros componentes de la feature

| Componente | SCSS propio |
|------------|-------------|
| `customer-selection` | `customer-selection.component.scss` |
| `customer-modification-summary` | `customer-modification-summary.component.scss` |
| `modal-confirm-changes` | `modal-confirm-changes.component.scss` |

El componente padre solo estiliza el **wrapper** del `<formly-form>`.

---

**Código:**

```scss
/* Archivo vacío — sin reglas CSS definidas */
```

## Checklist al crear el archivo

1. Crear `customer-modification.component.scss` junto al `.ts`.
2. Definir `.form` y `.form.min-height`.
3. Verificar en iframe y en ventana completa.
4. No usar `!important` salvo conflicto documentado con el shell.

**Código:**

```scss
/* Archivo vacío — sin reglas CSS definidas */
```
