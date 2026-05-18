
# `customer-selection.component.spec.ts`

> **Cómo leer este documento:** debajo de cada explicación hay un bloque **Código:** con el fragmento exacto del fichero fuente.

## Código fuente

Archivo: `src/app/features/customer-modification/components/customer-selection/customer-selection.component.spec.ts`

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CustomerModificationClient } from '../../../../shared/models/api/common/customer-modification.model';
import { CustomerSelectionComponent } from './customer-selection.component';

describe('CustomerSelectionComponent', () => {
  let component: CustomerSelectionComponent;
  let fixture: ComponentFixture<CustomerSelectionComponent>;

  const mockClients = [
    {
      id: 1,
      fullName: 'Ana Garcia',
      document: '12345678A',
      email: 'ana@test.com',
      phone: '600000001',
      accountNumber: 'ES123',
      accountType: 'CHK',
      branchOffice: 'MAD',
      transferLimit: 2500,
      notificationsEnabled: true,
      preferredContactMethod: 'EMAIL',
    },
  ] as CustomerModificationClient[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerSelectionComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerSelectionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return clients from formState', () => {
    component.field = {
      options: {
        formState: {
          clients: mockClients,
        },
      },
      formControl: new FormControl(null),
    } as any;

    expect(component.clients).toEqual(mockClients);
  });

  it('should return an empty clients list when formState is missing', () => {
    component.field = {
      options: {},
      formControl: new FormControl(null),
    } as any;

    expect(component.clients).toEqual([]);
  });

  it('should resolve the translated account type label', () => {
    component.field = {
      options: {
        formState: {
          selectOptionsData: {
            accountTypeOptions: [{ value: 'CHK', label: 'Cuenta corriente' }],
          },
        },
      },
      formControl: new FormControl(null),
    } as any;

    expect(component.getAccountTypeLabel('CHK')).toBe('Cuenta corriente');
  });

  it('should fall back to the raw account type when there is no option match', () => {
    component.field = {
      options: {
        formState: {
          selectOptionsData: {
            accountTypeOptions: [{ value: 'CHK', label: 'Cuenta corriente' }],
          },
        },
      },
      formControl: new FormControl(null),
    } as any;

    expect(component.getAccountTypeLabel('SAV')).toBe('SAV');
  });

  it('should set the selected client into the form control', () => {
    const mockFormControl = new FormControl(null);
    spyOn(mockFormControl, 'markAsTouched');
    component.field = {
      options: {
        formState: {
          clients: mockClients,
        },
      },
      formControl: mockFormControl,
    } as any;

    component.onSelectClient(1);

    expect(component.formControl.value).toBe(1);
    expect(mockFormControl.markAsTouched).toHaveBeenCalled();
  });
});
```

---

## Ubicación del fuente

`src/app/features/customer-modification/components/customer-selection/customer-selection.component.spec.ts`

## Propósito

Pruebas unitarias de `CustomerSelectionComponent`: getters sobre `formState`, resolución de etiquetas de tipo de cuenta, y actualización del `FormControl` al seleccionar cliente.

## Aislamiento del TestBed

```typescript
TestBed.configureTestingModule({
  declarations: [CustomerSelectionComponent],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
});
```

| Decisión | Motivo |
|----------|--------|
| Solo declara el componente bajo test | Lógica TS sin plantilla renderizada |
| `NO_ERRORS_SCHEMA` / `CUSTOM_ELEMENTS_SCHEMA` | Tolerancia si en el futuro se añaden elementos custom en tests con `detectChanges` |
| **Sin** `TranslateService` ni `TranslatePipeMock` | Los tests actuales no renderizan HTML ni llaman pipes |

No hay providers: no se usa `inject()` en el componente.

## Fixture de datos: `mockClients`

Array tipado `as CustomerModificationClient[]` con un cliente de ejemplo (`id: 1`, `accountType: 'CHK'`, etc.). Reutilizado en varios `it` para poblar `formState.clients`.

## Simulación Formly: `component.field`

Patrón idéntico al resumen:

```typescript
component.field = {
  options: { formState: { ... } },
  formControl: new FormControl(null),
} as any;
```

| Propiedad en mock | Uso |
|-------------------|-----|
| `options.formState.clients` | Getter `clients` |
| `options.formState.selectOptionsData` | `getAccountTypeLabel` |
| `formControl` | `onSelectClient` / `formControl.value` en assertions |

## Casos de prueba


### `should create`

Instanciación básica del componente.

### `should return clients from formState`

- **Arrange**: `clients: mockClients`
- **Assert**: `component.clients` deep equal a `mockClients`
- Verifica lectura correcta de `formState` y que el getter no copia defensivamente (misma referencia de array).

### `should return an empty clients list when formState is missing`

- **Arrange**: `options: {}` sin `clients`
- **Assert**: `component.clients === []`
- Cubre `?? []` del getter.

### `should resolve the translated account type label`

- **Arrange**: `accountTypeOptions: [{ value: 'CHK', label: 'Cuenta corriente' }]`
- **Act/Assert**: `getAccountTypeLabel('CHK') === 'Cuenta corriente'`

### `should fall back to the raw account type when there is no option match`

- **Act**: `getAccountTypeLabel('SAV')` sin opción SAV
- **Assert**: `'SAV'`

### `should set the selected client into the form control`

- **Arrange**: `mockFormControl = new FormControl(null)` asignado a `field.formControl`
- **Spy**: `spyOn(mockFormControl, 'markAsTouched')`
- **Act**: `onSelectClient(1)`
- **Assert**:
  - `component.formControl.value === 1`
  - `markAsTouched` llamado una vez

Demuestra el contrato del evento `(change)` de la plantilla sin disparar el DOM.

## Test doubles utilizados

| Double | Tipo | Descripción |
|--------|------|-------------|
| `mockClients` | Datos fijos | Cliente bancario de prueba |
| `new FormControl(null)` | Control real de Angular Forms | Sustituto del control Formly |
| `spyOn(mockFormControl, 'markAsTouched')` | Jasmine spy | Verifica efecto secundario de UX/validación |
| `as any` en `field` | Cast | Omite tipado estricto de Formly en tests |

**No** se usa `translateServiceStub` porque `getAccountTypeLabel` lee `label` ya resuelto en `selectOptionsData` (responsabilidad del padre en integración).

## Cobertura ausente

- Renderizado `@if` / `@for` y clase `.checked`
- `[formlyAttributes]`
- Empty state (`clients.length === 0`)
- Interacción con input radio nativo
- `field.key` como `name` del grupo

## Ejecución

```bash
ng test --include=**/customer-selection.component.spec.ts
```
