
# `modal-confirm-changes.component.html`

> **Cómo leer este documento:** debajo de cada explicación hay un bloque **Código:** con el fragmento exacto del fichero fuente.

## Código fuente

Archivo: `src/app/features/customer-modification/components/modal-confirm-changes/modal-confirm-changes.component.html`

```html
<div class="modal-confirm">
  <div class="modal-confirm__icon">
    <lib-icon
      iconcontent="correct-circle"
      size="size-48"
    ></lib-icon>
  </div>

  <h2 class="modal-confirm__title">
    {{ 'CUSTOMER_MODIFICATION.MODAL.TITLE' | translate }}
  </h2>

  <p class="modal-confirm__text">
    {{ 'CUSTOMER_MODIFICATION.MODAL.TEXT' | translate }}
  </p>

  <homeur-button
    homeurLabel="CUSTOMER_MODIFICATION.MODAL.ACCEPT"
    [homeurClass]="'button regular-button'"
    (click)="accept()"
  ></homeur-button>
</div>
```

---

## Ubicación del fuente

`src/app/features/customer-modification/components/modal-confirm-changes/modal-confirm-changes.component.html`

## Propósito

Contenido visual del modal de éxito: icono de confirmación, título, texto explicativo y botón que ejecuta `accept()`.

## Bloque BEM: `modal-confirm`

**Fragmento de código:**

```html
<div class="modal-confirm">
```


| Clase | Rol BEM |
|-------|---------|
| `modal-confirm` | **Block**: contenedor raíz del modal |
| `modal-confirm__icon` | **Element**: zona del icono |
| `modal-confirm__title` | **Element**: título (`<h2>`) |
| `modal-confirm__text` | **Element**: párrafo descriptivo |

Convención consistente con `cm-summary` del resumen: prefijo de feature + `__elemento`. Sin modificadores `--` en esta plantilla.

> `modal-confirm-changes.component.scss` está **vacío**; las clases BEM están preparadas para estilos locales futuros.

## Estructura DOM

```
.modal-confirm
├── .modal-confirm__icon
│   └── lib-icon
├── h2.modal-confirm__title
├── p.modal-confirm__text
└── homeur-button
```

## Componente `lib-icon`

```html
<lib-icon
  iconcontent="correct-circle"
  size="size-48"
></lib-icon>
```

| Atributo | Binding | Descripción |
|----------|---------|-------------|
| `iconcontent` | Estático (`correct-circle`) | Nombre del icono en el set de la librería |
| `size` | Estático (`size-48`) | Token de tamaño del design system |

No hay property bindings `[...]`; son atributos literales interpretados por el web component / componente de librería.

## Textos con pipe `translate`

```html
{{ 'CUSTOMER_MODIFICATION.MODAL.TITLE' | translate }}
{{ 'CUSTOMER_MODIFICATION.MODAL.TEXT' | translate }}
```

| Clave | Texto en `es.json` |
|-------|---------------------|
| `CUSTOMER_MODIFICATION.MODAL.TITLE` | «Cambios guardados» |
| `CUSTOMER_MODIFICATION.MODAL.TEXT` | «La modificación del cliente se ha realizado correctamente» |

Interpolación unidireccional; el idioma lo resuelve `@ngx-translate/core` según configuración de la app.

## Componente `homeur-button`

```html
<homeur-button
  homeurLabel="CUSTOMER_MODIFICATION.MODAL.ACCEPT"
  [homeurClass]="'button regular-button'"
  (click)="accept()"
></homeur-button>
```

| Binding / atributo | Tipo | Descripción |
|--------------------|------|-------------|
| `homeurLabel` | Atributo estático (string) | Clave i18n del texto del botón («Aceptar»); el componente `homeur-button` traduce internamente o pasa al pipe |
| `[homeurClass]` | Property binding | Clases CSS aplicadas al botón: `'button regular-button'` |
| `(click)` | Output / event binding | Invoca `accept()` del componente → `ModalService.close({ isAccept: true })` |

### Detalle de `[homeurClass]="'button regular-button'"`

- Expresión entre comillas simples dentro de comillas dobles: string literal en TypeScript de plantilla.
- Equivalente a pasar dos clases de utilidad del design system para botón primario regular.

## Control de flujo Angular

Esta plantilla **no usa** `@if`, `@for`, `@switch` ni directivas estructurales: contenido estático siempre visible.

## Accesibilidad

- `h2` para el título del diálogo (jerarquía dentro del modal).
- El icono es decorativo respecto al mensaje (el texto repite el éxito).
- El botón es el único control interactivo; el cierre por backdrop (si existe) lo gestiona `ModalService`, no esta plantilla.

## Flujo de eventos

```
Usuario click en homeur-button
  → accept()
  → ModalService.close({ isAccept: true })
  → Observable del padre (submit)
  → navigate('/distributor') + Tealium
```

## Elementos no presentes

- Sin `formControl` / Formly
- Sin `@if` condicional
- Sin enlaces a `sanTypeIcon` (definido en TS pero no usado aquí)
