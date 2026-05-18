
# `modal-confirm-changes.component.ts`

> **Cómo leer este documento:** debajo de cada explicación hay un bloque **Código:** con el fragmento exacto del fichero fuente.

## Código fuente

Archivo: `src/app/features/customer-modification/components/modal-confirm-changes/modal-confirm-changes.component.ts`

```typescript
import { Component, OnInit, inject } from '@angular/core';
import { ModalService, SanTypeIcon } from '@sanes-hipdig/lf-ng-50084125-front-compones';

/**
 * ModalConfirmChangesComponent
 *
 * Displayed after the user submits the customer modification form.
 * Confirms the modification was successful and provides a button to
 * navigate back to the distributor.
 */
@Component({
  standalone: false,
  selector: 'homeur-modal-confirm-changes',
  templateUrl: './modal-confirm-changes.component.html',
  styleUrls: ['./modal-confirm-changes.component.scss'],
})
export class ModalConfirmChangesComponent implements OnInit {
  private readonly _modalService = inject(ModalService);

  sanTypeIcon = SanTypeIcon;

  /**
   * OnInit
   */
  ngOnInit(): void {
    // No extra initialisation needed for this simple confirmation modal.
  }

  /**
   * Close the modal accepting the result – the parent will then navigate.
   */
  accept(): void {
    this._modalService.close({ isAccept: true });
  }
}
```

---

## Ubicación del fuente

`src/app/features/customer-modification/components/modal-confirm-changes/modal-confirm-changes.component.ts`

## Propósito

Modal de **confirmación de éxito** tras enviar el formulario de modificación de cliente (paso final del stepper). Informa que los cambios se guardaron y ofrece un botón **Aceptar** que cierra el modal con un resultado que el padre interpreta para **navegar al distribuidor**.

**No es un `FieldType` de Formly**: es un componente Angular estándar abierto vía `ModalService.showModalCustom`.

## Apertura desde el padre

En `CustomerModificationComponent.submit()`:

```typescript
this._modalService
  .showModalCustom(ModalConfirmChangesComponent, {
    modalSize: 'small',
    data: {},
  })
  .subscribe((result) => {
    if (result?.isAccept) {
      this._tealiumDataService.executeTealium('customerModification.events', 'modificationConfirmed');
      this._router.navigate(['/distributor']);
    }
  });
```

| Parámetro | Valor | Efecto |
|-----------|--------|--------|
| Componente | `ModalConfirmChangesComponent` | Contenido del modal |
| `modalSize` | `'small'` | Tamaño del diálogo en la librería Sanes |
| `data` | `{}` | Sin payload extra (el modal no lee `data` hoy) |
| Resultado | `{ isAccept: true }` | Emitido por `accept()` → navegación |

## `inject(ModalService)`

```typescript
private readonly _modalService = inject(ModalService);
```

- Servicio de `@sanes-hipdig/lf-ng-50084125-front-compones`.
- **`close(payload)`** cierra el modal actual y propaga `payload` al `Observable` de `showModalCustom`.

Contraste con Formly field types: aquí la inyección es para **infraestructura de UI modal**, no para `formState`.

## `implements OnInit`

```typescript
export class ModalConfirmChangesComponent implements OnInit {
  ngOnInit(): void {
    // No extra initialisation needed for this simple confirmation modal.
  }
}
```

- Cumple el contrato del ciclo de vida por consistencia con otros modales del proyecto.
- Cuerpo vacío: no hay suscripciones, ni lectura de `data`, ni métricas en init.
- El spec verifica que `ngOnInit()` no lance.

## Propiedad pública `sanTypeIcon`

```typescript
sanTypeIcon = SanTypeIcon;
```

- Expone el **enum** `SanTypeIcon` de la librería a la plantilla (patrón habitual para usar enums en HTML).
- **Nota**: la plantilla actual usa `<lib-icon iconcontent="correct-circle">` y **no** referencia `sanTypeIcon`; la propiedad queda disponible para variantes futuras o copia de otro modal.

## Método `accept(): void`

```typescript
accept(): void {
  this._modalService.close({ isAccept: true });
}
```

| Aspecto | Detalle |
|---------|---------|
| Disparador | `(click)` en `homeur-button` en HTML |
| Payload | Objeto con flag booleano `isAccept: true` |
| Consumidor | `subscribe` del padre filtra `result?.isAccept` |

No llama al router ni a Tealium: **separación de responsabilidades** (el modal solo confirma; el padre navega).

## Decorador `@Component`

**Código:**

```typescript
@Component({
  standalone: false,
  selector: 'homeur-modal-confirm-changes',
  templateUrl: './modal-confirm-changes.component.html',
  styleUrls: ['./modal-confirm-changes.component.scss'],
})
export class ModalConfirmChangesComponent implements OnInit {
  private readonly _modalService = inject(ModalService);

  sanTypeIcon = SanTypeIcon;

  /**
   * OnInit
   */
  ngOnInit(): void {
    // No extra initialisation needed for this simple confirmation modal.
  }
```


| Metadato | Valor |
|----------|--------|
| `standalone` | `false` |
| `selector` | `homeur-modal-confirm-changes` |
| `templateUrl` | `./modal-confirm-changes.component.html` |
| `styleUrls` | `./modal-confirm-changes.component.scss` (vacío) |

Declarado en `CustomerModificationModule` junto a los field types Formly.

## Comparación con componentes Formly del mismo feature

| | Modal confirm | Summary / Selection |
|--|---------------|---------------------|
| Base class | `Object` (componente normal) | `FieldType` |
| Estado | ModalService | `formState` / `formControl` |
| Registro | Uso directo en `showModalCustom` | `types` en `FormlyModule` |
| Paso del stepper | Tras submit | Pasos 1 y 3 del formulario |

## Dependencias

| Import | Rol |
|--------|-----|
| `Component`, `OnInit`, `inject` | Angular core |
| `ModalService`, `SanTypeIcon` | Librería front Sanes Hipdig |

## Extensiones posibles

- Leer `data` inyectado por `showModalCustom` en `ngOnInit`.
- Botón cancelar con `close({ isAccept: false })`.
- Usar `sanTypeIcon` en plantilla si se migra a otro componente de icono.
