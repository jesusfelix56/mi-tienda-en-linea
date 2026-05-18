
# `customer-selection.component.ts`

> **Cómo leer este documento:** debajo de cada explicación hay un bloque **Código:** con el fragmento exacto del fichero fuente.

## Código fuente

Archivo: `src/app/features/customer-modification/components/customer-selection/customer-selection.component.ts`

```typescript
import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { CustomerModificationClient } from '../../../../shared/models/api/common/customer-modification.model';

/**
 * CustomerSelectionComponent – custom Formly field type.
 *
 * Renders a radio-button list of bank customers loaded via formState.clients.
 * If no clients are available it shows an empty-state message.
 * Modelled after FormlyFieldNovationSelectMortgageRadioButtonComponent.
 */
@Component({
  standalone: false,
  selector: 'homeur-customer-selection',
  templateUrl: './customer-selection.component.html',
  styleUrls: ['./customer-selection.component.scss'],
})
export class CustomerSelectionComponent extends FieldType<FieldTypeConfig> {
  /**
   * Returns the latest client list from Formly formState.
   * This keeps the field reactive when the parent loads clients asynchronously.
   */
  get clients(): CustomerModificationClient[] {
    return this.options?.formState?.clients ?? [];
  }

  /**
   * Resolves the translated account type label from Formly select options.
   * Falls back to the raw value if no option match exists.
   *
   * @param accountType string
   * @returns string
   */
  getAccountTypeLabel(accountType: string): string {
    const accountTypeOptions = this.options?.formState?.selectOptionsData?.accountTypeOptions ?? [];
    const selectedOption = accountTypeOptions.find((option: any) => option.value === accountType);

    return selectedOption?.label ?? accountType;
  }

  /**
   * Handles radio button selection.
   *
   * @param clientId number
   */
  onSelectClient(clientId: number): void {
    this.formControl.setValue(clientId);
    this.formControl.markAsTouched();
  }
}
```

---

## Ubicación del fuente

`src/app/features/customer-modification/components/customer-selection/customer-selection.component.ts`

## Propósito

**Tipo de campo Formly personalizado** del **paso 1** del flujo «Modificar cliente bancario»: lista de clientes como **radio buttons** enriquecidos (nombre, documento, tipo de cuenta, IBAN). El valor del formulario es el **`id` numérico** del cliente seleccionado (`selectedClientId` en el modelo del padre).

Modelado explícitamente según el comentario del código tras `FormlyFieldNovationSelectMortgageRadioButtonComponent` (patrón de novación hipotecaria).

## Registro Formly

En `app.module.ts`:

```typescript
{
  name: 'customer-selection-radio',
  component: CustomerSelectionComponent,
}
```

El JSON del formulario usa `type: 'customer-selection-radio'` en el campo de selección de cliente.

## `FieldType<FieldTypeConfig>`

Misma base que el resumen:

| Herencia Formly | Uso en este componente |
|-----------------|-------------------------|
| `formControl` | Guarda `client.id` seleccionado |
| `field.key` | Típicamente `selectedClientId`; usado como `name` del grupo radio |
| `options.formState` | Lista `clients` y `selectOptionsData` |
| `field` + `[formlyAttributes]` | Enlaza atributos Formly al contenedor (plantilla HTML) |

No usa `inject()`: solo dependencias implícitas de Formly y del módulo (pipes en plantilla).

## Interfaz de datos: `CustomerModificationClient`

Import desde `shared/models/api/common/customer-modification.model.ts`:

| Propiedad | Tipo | Visible en UI del radio |
|-----------|------|-------------------------|
| `id` | `number` | Valor del control / `value` del input |
| `fullName` | `string` | Sí |
| `document` | `string` | Sí (como «label» de fila) |
| `email`, `phone`, etc. | varios | No en este paso (solo en paso 2) |
| `accountNumber` | `string` | Sí |
| `accountType` | `string` | Sí (traducido vía opciones) |

## `formState`


### Getter `clients`

```typescript
get clients(): CustomerModificationClient[] {
  return this.options?.formState?.clients ?? [];
}
```

El padre (`CustomerModificationComponent`) carga clientes asíncronamente:

```typescript
// Inicialización
formState: { clients: this._clients, ... }

// Tras API
this.options.formState.clients = this._clients;
this.model = { ...this.model }; // refresco Formly
```

**Por qué un getter y no `@Input`**: Formly no pasa la lista como input; el estado compartido en `options.formState` permite actualizar la lista sin redefinir el campo cuando llega la respuesta HTTP/mock.

### `selectOptionsData.accountTypeOptions`

Usado en `getAccountTypeLabel()` — array de `{ value, label }` ya traducidos por `TranslateOptionsService` en el padre.

## Métodos


### `getAccountTypeLabel(accountType: string): string`

| Paso | Acción |
|------|--------|
| 1 | Lee `this.options?.formState?.selectOptionsData?.accountTypeOptions ?? []` |
| 2 | `find` opción con `option.value === accountType` |
| 3 | Devuelve `selectedOption.label` o, si no hay match, `accountType` crudo |

Usado en plantilla: `{{ getAccountTypeLabel(client.accountType) }}`.

### `onSelectClient(clientId: number): void`

| Línea | Efecto |
|-------|--------|
| `this.formControl.setValue(clientId)` | Actualiza el modelo Formly en `selectedClientId` (o la `key` del campo) |
| `this.formControl.markAsTouched()` | Marca el control como tocado → validaciones/visualización de error si el stepper lo exige |

Invocado desde `(change)` del `<input type="radio">` en la plantilla.

## Decorador `@Component`

**Código:**

```typescript
@Component({
  standalone: false,
  selector: 'homeur-customer-selection',
  templateUrl: './customer-selection.component.html',
  styleUrls: ['./customer-selection.component.scss'],
})
export class CustomerSelectionComponent extends FieldType<FieldTypeConfig> {
  /**
   * Returns the latest client list from Formly formState.
   * This keeps the field reactive when the parent loads clients asynchronously.
   */
  get clients(): CustomerModificationClient[] {
    return this.options?.formState?.clients ?? [];
  }
```


| Metadato | Valor |
|----------|--------|
| `standalone` | `false` |
| `selector` | `homeur-customer-selection` |
| `templateUrl` | `./customer-selection.component.html` |
| `styleUrls` | `./customer-selection.component.scss` (vacío) |

## Flujo de interacción

```
Usuario elige radio
  → onSelectClient(id)
  → formControl = id, touched
  → Usuario pulsa Continuar en stepper
  → CustomerModificationComponent.loadModificationFormStep()
  → busca cliente por id en _clients y rellena model
```

## Diferencias respecto a `CustomerModificationSummaryComponent`

| Aspecto | Selección | Resumen |
|---------|-----------|---------|
| Escribe en `formControl` | Sí | No (solo lectura de `formState.changes`) |
| `inject()` | No | Sí (`TranslateService`) |
| Estado principal | `formState.clients` | `formState.changes` |
| UI vacía | Bloque empty state en HTML | N/A |

## Dependencias

| Import | Rol |
|--------|-----|
| `@angular/core` | `Component` |
| `@ngx-formly/core` | `FieldType`, `FieldTypeConfig` |
| `CustomerModificationClient` | Tipado de elementos de `clients` |
