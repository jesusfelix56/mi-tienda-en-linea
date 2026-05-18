
# `customer-selection.component.html`

> **Cómo leer este documento:** debajo de cada explicación hay un bloque **Código:** con el fragmento exacto del fichero fuente.

## Código fuente

Archivo: `src/app/features/customer-modification/components/customer-selection/customer-selection.component.html`

```html
@if (clients.length > 0) {
  <div class="novation-radio-group" [formlyAttributes]="field">
    @for (client of clients; track client.id) {
      <label
        class="novation-radio-option"
        [class.checked]="formControl.value === client.id"
      >
        <input
          type="radio"
          [name]="field.key || 'selectedClientId'"
          [value]="client.id"
          [checked]="formControl.value === client.id"
          (change)="onSelectClient(client.id)"
        />
        <div class="option-content">
          <div class="option-row mortgage">
            <span class="label">{{ 'CUSTOMER_MODIFICATION.FORM.FIELDS.FULL_NAME.LABEL' | translate }}</span>
            <span class="value">{{ client.fullName }}</span>
          </div>
          <div class="option-row">
            <span class="label">{{ client.document }}</span>
            <span class="value amount">{{ getAccountTypeLabel(client.accountType) }}</span>
          </div>
          <div class="option-row amount">
            <span class="label">{{ 'CUSTOMER_MODIFICATION.FORM.FIELDS.ACCOUNT_NUMBER.LABEL' | translate }}</span>
            <span class="value amount">{{ client.accountNumber }}</span>
          </div>
        </div>
      </label>
    }
  </div>
} @else {
  <div class="customer-selection__empty no-mortgage-cont">
    <div class="image">
      <img src="mf-ng-50078458-homeplanner/assets/images/icons/empty-mortgage-list.svg" alt="" />
    </div>
    <div class="body">
      <span class="title">
        {{ 'CUSTOMER_MODIFICATION.NO_CLIENTS' | translate }}
      </span>
      <span class="desc">
        {{ 'CUSTOMER_MODIFICATION.NO_CLIENTS_DESC' | translate }}
      </span>
    </div>
  </div>
}
```

---

## Ubicación del fuente

`src/app/features/customer-modification/components/customer-selection/customer-selection.component.html`

## Propósito

Plantilla del paso 1: **grupo de radios** con datos de cada cliente, o **estado vacío** si `clients` está vacío (API sin resultados o error tratado como lista vacía).

## Control de flujo: `@if` / `@else`

```html
@if (clients.length > 0) {
  ...
} @else {
  ...
}
```

| Rama | Condición | UI |
|------|-----------|-----|
| `@if` | Al menos un cliente en `formState.clients` | `.novation-radio-group` con radios |
| `@else` | `clients.length === 0` | Empty state con imagen y textos i18n |

`clients` es el **getter** del componente; al actualizar `formState.clients` en el padre y refrescar el modelo, Angular reevalúa el `@if`.

## Control de flujo: `@for`

```html
@for (client of clients; track client.id) {
  <label class="novation-radio-option" ...>
    ...
  </label>
}
```

| Parte | Significado |
|-------|-------------|
| `client of clients` | Iteración sobre clientes del mock/API |
| `track client.id` | Clave estable (ids únicos) para listas que pueden recargarse |

## Binding Formly: `[formlyAttributes]="field"`

En el contenedor del grupo:

```html
<div class="novation-radio-group" [formlyAttributes]="field">
```

| Binding | Tipo | Descripción |
|---------|------|-------------|
| `[formlyAttributes]` | Property binding | Directiva/atributo de Formly que propaga `id`, `aria-*`, clases de validación, etc. desde `field` al DOM |
| `field` | Referencia del `FieldType` | Configuración del campo actual en el JSON Formly |

Necesario para integración correcta con accesibilidad y validación del ecosistema Formly.

## Radio buttons: bindings detallados

```html
<input
  type="radio"
  [name]="field.key || 'selectedClientId'"
  [value]="client.id"
  [checked]="formControl.value === client.id"
  (change)="onSelectClient(client.id)"
/>
```

| Atributo / binding | Tipo | Descripción |
|--------------------|------|-------------|
| `type="radio"` | Estático | Input nativo de selección única |
| `[name]` | Property | Agrupa radios; usa `field.key` del JSON o fallback `'selectedClientId'` |
| `[value]` | Property | Valor nativo del input = `client.id` (number coercido a string en DOM) |
| `[checked]` | Property | `true` si el `formControl` ya tiene ese `id` |
| `(change)` | Event binding | Al seleccionar, llama `onSelectClient(client.id)` |

### Label contenedor y clase dinámica

```html
<label
  class="novation-radio-option"
  [class.checked]="formControl.value === client.id"
>
```

| Binding | Descripción |
|---------|-------------|
| `class="novation-radio-option"` | Clase estática (patrón novación, no BEM `cm-`) |
| `[class.checked]` | Añade clase CSS `checked` cuando ese cliente está seleccionado → estilos de tarjeta activa |

## Estructura interna de cada opción


### `.option-content` > `.option-row`

Tres filas por cliente:

| Fila | Clases extra | Contenido |
|------|--------------|-----------|
| 1 | `option-row mortgage` | Label i18n nombre + `client.fullName` |
| 2 | `option-row` | `client.document` + `getAccountTypeLabel(client.accountType)` |
| 3 | `option-row amount` | Label IBAN + `client.accountNumber` |

### Interpolaciones y pipes

```html
{{ 'CUSTOMER_MODIFICATION.FORM.FIELDS.FULL_NAME.LABEL' | translate }}
{{ client.fullName }}
{{ client.document }}
{{ getAccountTypeLabel(client.accountType) }}
{{ 'CUSTOMER_MODIFICATION.FORM.FIELDS.ACCOUNT_NUMBER.LABEL' | translate }}
{{ client.accountNumber }}
```

| Expresión | Tipo |
|-----------|------|
| Claves `CUSTOMER_MODIFICATION.*` | Pipe `translate` |
| `client.*` | Interpolación de propiedades del modelo |
| `getAccountTypeLabel(...)` | Método del componente |

Clases de presentación en spans:

- `.label` — etiqueta o documento
- `.value` — valor principal
- `.value.amount` — énfasis en importes/números de cuenta (convención heredada de novación)

## Rama `@else`: empty state

```html
<div class="customer-selection__empty no-mortgage-cont">
```

| Clase | Convención |
|-------|------------|
| `customer-selection__empty` | **BEM** del feature (bloque implícito `customer-selection`, elemento `__empty`) |
| `no-mortgage-cont` | Clase legada del patrón hipoteca/novación (layout compartido) |

### Imagen

```html
<img src="mf-ng-50078458-homeplanner/assets/images/icons/empty-mortgage-list.svg" alt="" />
```

- Ruta de microfrontend / assets remotos.
- `alt=""` — decorativa; el mensaje está en texto traducido.

### Textos i18n

| Clave | Uso en `es.json` |
|-------|------------------|
| `CUSTOMER_MODIFICATION.NO_CLIENTS` | Título del empty state |
| `CUSTOMER_MODIFICATION.NO_CLIENTS_DESC` | Descripción |

Estructura:

- `.image` — contenedor icono
- `.body` > `.title` + `.desc`

## Clases CSS (no BEM unificado)

Este template mezcla:

1. **Patrón novación**: `novation-radio-group`, `novation-radio-option`, `option-content`, `option-row`
2. **BEM parcial del feature**: `customer-selection__empty`
3. **Utilidades**: `mortgage`, `amount`, `no-mortgage-cont`

El SCSS del componente está vacío; los estilos probablemente viven en hojas globales o del módulo de novación.

## Diagrama DOM (rama con clientes)

```
.novation-radio-group [formlyAttributes]
└── @for client
    └── label.novation-radio-option [.checked]
        ├── input[type=radio]
        └── .option-content
            ├── .option-row.mortgage
            ├── .option-row
            └── .option-row.amount
```

## Accesibilidad

- `<label>` envuelve cada `input` → clic en la tarjeta selecciona el radio.
- Convendría asociar explícitamente `for`/`id` si se añaden validaciones ARIA desde Formly.
- Empty state: título en `.title` debería ser heading semántico (`h2`/`h3`) si se refactoriza.

## Sin `formControlName`

La selección no usa reactive forms template (`formControlName`) porque Formly gestiona el control; la actualización es imperativa vía `onSelectClient` + `formControl.setValue`.
