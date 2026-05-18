
# `customer-modification.component.html`

> **Cómo leer este documento:** debajo de cada explicación hay un bloque **Código:** con el fragmento exacto del fichero fuente.

## Código fuente

Archivo: `src/app/features/customer-modification/components/customer-modification.component.html`

```html
@if (form && isDataReady) {
  <form
    class="form"
    [formGroup]="form"
    (ngSubmit)="submit()"
    [ngClass]="{ 'min-height': isAppIntoIFrame }"
  >
    <formly-form
      [form]="form"
      [fields]="fields"
      [options]="options"
      [model]="model"
    ></formly-form>
  </form>
}
```

---

**Ruta fuente:** `src/app/features/customer-modification/components/customer-modification.component.html`

## Contenido completo

La plantilla consta de **15 líneas** y un único bloque condicional que envuelve el formulario Formly.

---

## Estructura línea a línea


### `@if (form && isDataReady)`

Directiva de control de flujo de Angular 17+ (sintaxis `@if`).

**Condiciones conjuntas:**

| Condición | Motivo |
|-----------|--------|
| `form` | Tras `ngOnInit`, `_initializeDataSurvey` asigna `this.form = new FormGroup({})`. Hasta entonces es `undefined` y no debe renderizarse el formulario. |
| `isDataReady` | Solo pasa a `true` cuando `getData$()` ha entregado `parameters` y `formData` válidos y se han asignado `fields` y `options`. Evita parpadeo o Formly sin configuración. |

Si falta cualquiera, **no se muestra nada** (pantalla vacía hasta que los observables resuelvan).

---

**Código:**

```html
@if (form && isDataReady) {
  <form
    class="form"
    [formGroup]="form"
    (ngSubmit)="submit()"
    [ngClass]="{ 'min-height': isAppIntoIFrame }"
  >
    <formly-form
      [form]="form"
      [fields]="fields"
      [options]="options"
      [model]="model"
    ></formly-form>
  </form>
}
```

### Elemento `<form>`

```html
<form
  class="form"
  [formGroup]="form"
  (ngSubmit)="submit()"
  [ngClass]="{ 'min-height': isAppIntoIFrame }"
>
```

| Atributo / binding | Función |
|--------------------|---------|
| `class="form"` | Clase global de estilos de formularios del proyecto (definida en estilos compartidos o en SCSS del componente si existe). |
| `[formGroup]="form"` | Enlaza el `FormGroup` vacío creado en el componente; Formly lo rellena con controles hijos según `fields`. |
| `(ngSubmit)="submit()"` | Al enviar el formulario (botón submit del stepper en el último paso), abre el modal de confirmación. |
| `[ngClass]="{ 'min-height': isAppIntoIFrame }"` | Si la app está embebida en iframe (`WindowRef.isAppIntoIFrame()`), aplica la clase `min-height` para altura mínima usable dentro del shell del microfrontend. |

**Nota:** el botón final del stepper debe ser de tipo `submit` o disparar submit del form para que `ngSubmit` se ejecute; la configuración viene del JSON del stepper (`submitButtonText`, etc.).

---

### `<formly-form>`

```html
<formly-form
  [form]="form"
  [fields]="fields"
  [options]="options"
  [model]="model"
></formly-form>
```

Componente de `@ngx-formly/core` que renderiza dinámicamente:

- **Stepper** de 3 pasos (definido en catálogo `customerModification.form.fields`).
- Campos estándar (`custom-input`, `searchable-select`, etc.).
- Tipos personalizados (`customer-selection-radio`, `customer-modification-summary`).

| Input | Origen en TS |
|-------|----------------|
| `[form]` | `FormGroup` raíz |
| `[fields]` | Catálogo → `formData.form.fields` |
| `[options]` | `formState` con clientes, opciones y cambios |
| `[model]` | Estado del wizard; mutado en `loadModificationFormStep` y `loadSummaryStep` |

No hay contenido proyectado ni `*ngFor` en la plantilla: **toda la UI** sale del JSON de parámetros.

---

## Qué no aparece en la plantilla

- No hay markup de pasos manual: el stepper es un tipo Formly.
- No hay mensajes de error inline: los gestiona Formly + validadores globales en `AppModule`.
- No hay breadcrumb ni cabecera de marca: los provee el shell / `CommunicationService`.
- No hay loading spinner explícito: el patrón es ocultar el form hasta `isDataReady`.

---

## Interacción con estilos

La clase `min-height` se documenta en `customer-modification.component.scss.md`. El archivo SCSS está referenciado en el `@Component` pero puede no existir aún en el repositorio; en ese caso la clase solo tendría efecto si está definida en estilos globales.

---

## Accesibilidad y semántica

- Un único `<form>` por vista, coherente con `ngSubmit`.
- El stepper y campos heredan accesibilidad de los componentes de la librería Sanes y Formly.

---

## Pruebas relacionadas

`customer-modification.component.spec.ts` no hace `fixture.detectChanges()` explícito sobre el DOM del formulario en la mayoría de casos; los tests se centran en la lógica TS. Para probar la plantilla habría que activar `isDataReady` y comprobar la presencia de `formly-form`.
