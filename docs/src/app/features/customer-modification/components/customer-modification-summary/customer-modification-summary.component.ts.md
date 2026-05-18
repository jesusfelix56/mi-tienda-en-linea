
# `customer-modification-summary.component.ts`

> **Cómo leer este documento:** debajo de cada explicación hay un bloque **Código:** con el fragmento exacto del fichero fuente.

## Código fuente

Archivo: `src/app/features/customer-modification/components/customer-modification-summary/customer-modification-summary.component.ts`

```typescript
import { Component, inject } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';

/**
 * Change item for the summary comparison view.
 */
export interface CustomerModificationChange {
  fieldKey: string;
  label: string;
  oldValue: any;
  newValue: any;
}

/**
 * CustomerModificationSummaryComponent – custom Formly field type.
 *
 * Renders a comparison table showing old vs. new values for each modified field.
 * Data is read from formState.changes (set by the parent component before
 * advancing to this step).
 */
@Component({
  standalone: false,
  selector: 'homeur-customer-modification-summary',
  templateUrl: './customer-modification-summary.component.html',
  styleUrls: ['./customer-modification-summary.component.scss'],
})
export class CustomerModificationSummaryComponent extends FieldType<FieldTypeConfig> {
  private readonly _translateService = inject(TranslateService);

  /**
   * Returns the computed list of changes from Formly formState.
   *
   * @returns CustomerModificationChange[]
   */
  get changes(): CustomerModificationChange[] {
    return this.options?.formState?.changes ?? [];
  }

  /**
   * Indicates whether there are modified fields to show.
   *
   * @returns boolean
   */
  get hasChanges(): boolean {
    return this.changes.length > 0;
  }

  /**
   * Formats a value for display: booleans and objects are serialised to readable strings.
   *
   * @param fieldKey string
   * @param value any
   * @returns string
   */
  formatValue(fieldKey: string, value: any): string {
    if (value === null || value === undefined) {
      return '—';
    }
    if (typeof value === 'boolean') {
      return value
        ? this._translateService.instant('OPTIONS_DATA.YES_NO.YES.LABEL')
        : this._translateService.instant('OPTIONS_DATA.YES_NO.NO.LABEL');
    }

    const optionsKey = this._getOptionsKey(fieldKey);
    const options = optionsKey ? this.options?.formState?.selectOptionsData?.[optionsKey] ?? [] : [];
    const translatedOption = options.find((option: any) => option.value === value);

    if (translatedOption?.label) {
      return translatedOption.label;
    }

    return String(value);
  }

  /**
   * Resolves which Formly option collection should be used to display a field.
   *
   * @param fieldKey string
   * @returns string | null
   */
  private _getOptionsKey(fieldKey: string): string | null {
    const optionsKeys: Record<string, string> = {
      accountType: 'accountTypeOptions',
      branchOffice: 'branchOfficeOptions',
      preferredContactMethod: 'preferredContactMethodOptions',
    };

    return optionsKeys[fieldKey] ?? null;
  }
}
```

---

## Ubicación del fuente

`src/app/features/customer-modification/components/customer-modification-summary/customer-modification-summary.component.ts`

## Propósito

Componente de **tipo de campo personalizado de ngx-formly** que renderiza el **paso 3 (resumen)** del flujo «Modificar cliente bancario». Muestra una tabla comparativa **valor anterior → valor nuevo** por cada campo modificado. No posee lógica de envío ni de cálculo del diff: solo **lee** datos ya calculados en `formState.changes`.

## Registro en Formly

En `app.module.ts` se registra con el nombre `customer-modification-summary`:

```typescript
{
  name: 'customer-modification-summary',
  component: CustomerModificationSummaryComponent,
}
```

El JSON de definición del formulario (mock `parameters-customer-modification.json`) referencia ese `type` en el paso de resumen.

## Concepto: `FieldType` y `FieldTypeConfig`


### ¿Qué es `FieldType`?

`FieldType` es la clase base de **@ngx-formly/core** para crear componentes Angular que actúan como **renderizadores de un campo** del formulario declarativo. Al extenderla, el componente recibe automáticamente (vía herencia y el ciclo de vida de Formly):

| Propiedad heredada | Descripción |
|-------------------|-------------|
| `field` | Configuración del campo (`FormlyFieldConfig`): `key`, `type`, `templateOptions`, etc. |
| `formControl` | `FormControl` o `FormControl` anidado asociado al `key` del campo |
| `form` | `FormGroup` raíz del formulario Formly |
| `options` | `FormlyFormOptions` del formulario, incluido **`formState`** |
| `model` | Modelo de datos del formulario (objeto plano enlazado con `[(model)]`) |
| `to` | Alias de `templateOptions` (opciones de plantilla del campo) |

### ¿Qué es `FieldTypeConfig`?

`FieldTypeConfig` es el tipo genérico por defecto de la configuración del campo. En este proyecto no se personaliza con una interfaz propia; se usa el config estándar de Formly. La declaración:

```typescript
export class CustomerModificationSummaryComponent extends FieldType<FieldTypeConfig>
```

indica que el componente es un field type «genérico», sin tipado extra en `field`.

### `standalone: false`

El componente **no es standalone**: se declara en `CustomerModificationModule` (y se importa en `app.module.ts` para el registro Formly). Depende del módulo NgModule para pipes (`translate`), componentes (`homeur-box-message`) y Formly.

## `inject(TranslateService)`

```typescript
private readonly _translateService = inject(TranslateService);
```

- **`inject()`** (Angular 14+): función de inyección de dependencias usable en el cuerpo de la clase (constructores no obligatorios). Resuelve `TranslateService` del inyector del componente.
- **Uso**: traducir valores booleanos en `formatValue()` mediante `instant()`, que devuelve la cadena ya traducida de forma síncrona (sin Observable).
- **Claves usadas**: `OPTIONS_DATA.YES_NO.YES.LABEL` y `OPTIONS_DATA.YES_NO.NO.LABEL` (definidas en mocks/API de parámetros, no en `es.json` local del feature).

## Interfaz exportada: `CustomerModificationChange`

```typescript
export interface CustomerModificationChange {
  fieldKey: string;   // Clave del modelo (ej. 'email', 'branchOffice')
  label: string;      // Clave i18n del label (ej. 'CUSTOMER_MODIFICATION.FORM.FIELDS.EMAIL.LABEL')
  oldValue: any;      // Valor antes de editar (snapshot del cliente seleccionado)
  newValue: any;      // Valor actual en el modelo del formulario
}
```

El padre (`CustomerModificationComponent._calculateChanges()`) construye objetos con esta forma y los asigna a `options.formState.changes`.

## `formState` y flujo de datos

`formState` es un objeto **mutable compartido** en `FormlyFormOptions` que atraviesa todos los campos del formulario. El componente padre inicializa:

```typescript
this.options = {
  formState: {
    selectOptionsData: { ... },
    clients: this._clients,
    changes: [],
  },
};
```

Antes del paso 3, `loadSummaryStep()` ejecuta:

```typescript
this.options.formState.changes = changes; // array calculado por _calculateChanges()
this.model = { ...this.model };           // fuerza detección de cambios en Formly
```

Este componente **solo consume**:

| Clave en `formState` | Uso en este componente |
|---------------------|-------------------------|
| `changes` | Getter `changes` → lista a mostrar |
| `selectOptionsData` | Resolver etiquetas de selects (`accountTypeOptions`, etc.) en `formatValue()` |

Acceso defensivo con optional chaining: `this.options?.formState?.changes ?? []`.

## Decorador `@Component`

**Código:**

```typescript
@Component({
  standalone: false,
  selector: 'homeur-customer-modification-summary',
  templateUrl: './customer-modification-summary.component.html',
  styleUrls: ['./customer-modification-summary.component.scss'],
})
export class CustomerModificationSummaryComponent extends FieldType<FieldTypeConfig> {
  private readonly _translateService = inject(TranslateService);

  /**
   * Returns the computed list of changes from Formly formState.
   *
   * @returns CustomerModificationChange[]
   */
  get changes(): CustomerModificationChange[] {
    return this.options?.formState?.changes ?? [];
  }
```


| Metadato | Valor |
|----------|--------|
| `selector` | `homeur-customer-modification-summary` |
| `templateUrl` | `./customer-modification-summary.component.html` |
| `styleUrls` | `./customer-modification-summary.component.scss` (archivo vacío; estilos BEM preparados en HTML) |

## Métodos y propiedades


### Getter `changes`

```typescript
get changes(): CustomerModificationChange[] {
  return this.options?.formState?.changes ?? [];
}
```

- **Entrada**: ninguna (lee estado global del formulario).
- **Salida**: array de cambios; `[]` si `formState` o `changes` no existen.
- **Reactividad**: al ser getter, cada ciclo de detección de cambios de Angular vuelve a leer `formState`. Cuando el padre reasigna `changes` y clona `model`, Formly/Angular refrescan la vista.

### Getter `hasChanges`

```typescript
get hasChanges(): boolean {
  return this.changes.length > 0;
}
```

- Usado en la plantilla con `@if (hasChanges)` para alternar entre lista de cambios y mensaje «sin cambios».

### `formatValue(fieldKey: string, value: any): string`

Formatea un valor para mostrarlo en el resumen (columnas «antes» y «después»).

| Condición | Resultado |
|-----------|-----------|
| `value === null` o `undefined` | `'—'` (raya tipográfica como placeholder) |
| `typeof value === 'boolean'` | `instant` de Sí/No según `OPTIONS_DATA.YES_NO.*` |
| Campo con opciones en `selectOptionsData` | `label` de la opción cuyo `value` coincide |
| Resto | `String(value)` |

**Mapeo de campos a colecciones de opciones** (`_getOptionsKey`):

| `fieldKey` | Clave en `selectOptionsData` |
|------------|------------------------------|
| `accountType` | `accountTypeOptions` |
| `branchOffice` | `branchOfficeOptions` |
| `preferredContactMethod` | `preferredContactMethodOptions` |

### `_getOptionsKey(fieldKey: string): string | null` (privado)

Devuelve el nombre de la colección en `formState.selectOptionsData` o `null` si el campo es texto/número sin catálogo. No se expone a la plantilla.

## Relación con el componente padre

```
CustomerModificationComponent
  ├─ _originalClientData (snapshot al pasar paso 1→2)
  ├─ _calculateChanges() al loadSummaryStep()
  └─ options.formState.changes = [...]
           ↓
CustomerModificationSummaryComponent.changes / formatValue()
```

## Dependencias de importación

**Fragmento de código:**

```typescript
import { Component, inject } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';
```


| Import | Rol |
|--------|-----|
| `@angular/core` | `Component`, `inject` |
| `@ngx-formly/core` | `FieldType`, `FieldTypeConfig` |
| `@ngx-translate/core` | `TranslateService` |

## Lo que este archivo no hace

- No calcula el diff (responsabilidad del padre).
- No valida el formulario.
- No navega ni abre modales.
- No escribe en `formControl` (el resumen es principalmente de solo lectura respecto al modelo de cambios).
