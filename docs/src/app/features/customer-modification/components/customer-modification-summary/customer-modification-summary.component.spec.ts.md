
# `customer-modification-summary.component.spec.ts`

> **Cómo leer este documento:** debajo de cada explicación hay un bloque **Código:** con el fragmento exacto del fichero fuente.

## Código fuente

Archivo: `src/app/features/customer-modification/components/customer-modification-summary/customer-modification-summary.component.spec.ts`

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { translateServiceStub } from '../../../../core/stubs/translateService.stub';
import { CustomerModificationSummaryComponent } from './customer-modification-summary.component';

@Pipe({
  name: 'translate',
  standalone: false,
})
class TranslatePipeMock implements PipeTransform {
  transform(value: string): string {
    return value;
  }
}

describe('CustomerModificationSummaryComponent', () => {
  let component: CustomerModificationSummaryComponent;
  let fixture: ComponentFixture<CustomerModificationSummaryComponent>;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerModificationSummaryComponent, TranslatePipeMock],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: TranslateService, useValue: translateServiceStub }],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerModificationSummaryComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return the changes from formState', () => {
    component.field = {
      options: {
        formState: {
          changes: [{ fieldKey: 'email', label: 'Email', oldValue: 'a', newValue: 'b' }],
        },
      },
    } as any;

    expect(component.changes.length).toBe(1);
  });

  it('should indicate when there are changes to display', () => {
    component.field = {
      options: {
        formState: {
          changes: [{ fieldKey: 'email', label: 'Email', oldValue: 'a', newValue: 'b' }],
        },
      },
    } as any;

    expect(component.hasChanges).toBeTrue();
  });

  it('should indicate when there are no changes to display', () => {
    component.field = {
      options: {
        formState: {
          changes: [],
        },
      },
    } as any;

    expect(component.hasChanges).toBeFalse();
  });

  it('should format null values as an em dash placeholder', () => {
    component.field = {
      options: {
        formState: {
          selectOptionsData: {},
        },
      },
    } as any;

    expect(component.formatValue('email', null)).toBe('—');
  });

  it('should format boolean values using translated yes no labels', () => {
    component.field = {
      options: {
        formState: {
          selectOptionsData: {},
        },
      },
    } as any;
    spyOn(translateService, 'instant').and.callFake((key: string) => {
      return key === 'OPTIONS_DATA.YES_NO.YES.LABEL' ? 'Sí' : 'No';
    });

    expect(component.formatValue('notificationsEnabled', true)).toBe('Sí');
    expect(component.formatValue('notificationsEnabled', false)).toBe('No');
  });

  it('should format values from select options when a matching option exists', () => {
    component.field = {
      options: {
        formState: {
          selectOptionsData: {
            branchOfficeOptions: [{ value: 'MAD', label: 'Madrid' }],
          },
        },
      },
    } as any;

    expect(component.formatValue('branchOffice', 'MAD')).toBe('Madrid');
  });

  it('should fall back to the raw value when no option match exists', () => {
    component.field = {
      options: {
        formState: {
          selectOptionsData: {
            branchOfficeOptions: [{ value: 'MAD', label: 'Madrid' }],
          },
        },
      },
    } as any;

    expect(component.formatValue('branchOffice', 'BCN')).toBe('BCN');
  });
});
```

---

## Ubicación del fuente

`src/app/features/customer-modification/components/customer-modification-summary/customer-modification-summary.component.spec.ts`

## Propósito

Pruebas unitarias de `CustomerModificationSummaryComponent` con **Jasmine** y **Angular TestBed**. Valida lectura de `formState`, getters, y la lógica de `formatValue()` sin montar Formly completo ni el stepper padre.

## Estrategia de aislamiento


### `NO_ERRORS_SCHEMA` y `CUSTOM_ELEMENTS_SCHEMA`

```typescript
schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
```

| Schema | Efecto |
|--------|--------|
| `NO_ERRORS_SCHEMA` | Ignora propiedades/atributos desconocidos en elementos HTML |
| `CUSTOM_ELEMENTS_SCHEMA` | Permite elementos personalizados (`homeur-box-message`) sin declararlos |

Evita fallos por dependencias de plantilla no declaradas en el módulo de prueba.

### `TranslatePipeMock`

Pipe local que implementa `PipeTransform`:

```typescript
transform(value: string): string {
  return value;
}
```

- **Nombre**: `translate` (mismo que `@ngx-translate/core`).
- **Comportamiento**: devuelve la clave sin traducir → las interpolaciones `| translate` en HTML no rompen el test.
- Los tests de booleanos **no dependen** del pipe: espían `TranslateService.instant` directamente.

### Test double: `translateServiceStub`

```typescript
providers: [{ provide: TranslateService, useValue: translateServiceStub }],
```

Import desde `../../../../core/stubs/translateService.stub`.

> **Nota del repositorio**: en el momento de documentar, la ruta `core/stubs/translateService.stub.ts` puede no existir en disco; el spec la referencia. Si los tests fallan por import, hay que crear el stub o alinear la ruta con otros stubs del proyecto.

Patrón **useValue**: sustituye la implementación real de `TranslateService` por un objeto plano con métodos mock (`instant`, `get`, etc., según defina el stub).

## Configuración `beforeEach`

```typescript
await TestBed.configureTestingModule({
  declarations: [CustomerModificationSummaryComponent, TranslatePipeMock],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  providers: [{ provide: TranslateService, useValue: translateServiceStub }],
}).compileComponents();

fixture = TestBed.createComponent(CustomerModificationSummaryComponent);
component = fixture.componentInstance;
translateService = TestBed.inject(TranslateService);
```

- **No** se llama a `fixture.detectChanges()` en el `beforeEach` global: muchos tests solo ejercitan lógica TS.
- `translateService` se obtiene con `TestBed.inject` para espiar `instant` en un caso concreto.

## Simulación de Formly: asignación manual a `component.field`

Formly inyecta `field` en el `FieldType`. En tests se simula así:

```typescript
component.field = {
  options: {
    formState: {
      changes: [...],
      selectOptionsData: { ... },
    },
  },
} as any;
```

| Campo simulado | Qué prueba |
|----------------|------------|
| `options.formState.changes` | Getter `changes` / `hasChanges` |
| `options.formState.selectOptionsData` | Ramas de `formatValue` con opciones de select |

El cast `as any` evita tipar todo `FormlyFieldConfig` en cada test.

## Casos de prueba (cada `it`)

**Código:**

```typescript
it('should create', () => {
    expect(component).toBeTruthy();
  }
```



### `should create`

- **Assert**: `expect(component).toBeTruthy()`
- Comprueba que el componente se instancia en TestBed.

### `should return the changes from formState`

- **Arrange**: un cambio en `formState.changes`
- **Assert**: `component.changes.length === 1`
- Verifica el getter `changes` y el fallback cuando hay datos.

### `should indicate when there are changes to display`

- **Assert**: `hasChanges === true` con un elemento en `changes`.

### `should indicate when there are no changes to display`

- **Arrange**: `changes: []`
- **Assert**: `hasChanges === false`

### `should format null values as an em dash placeholder`

- **Act**: `formatValue('email', null)`
- **Assert**: `'—'`
- `formState` con `selectOptionsData: {}` (sin opciones).

### `should format boolean values using translated yes no labels`

- **Spy**: `spyOn(translateService, 'instant').and.callFake(...)` devuelve `'Sí'` / `'No'` según clave.
- **Act**: `formatValue('notificationsEnabled', true|false)`
- **Assert**: strings traducidos, no `true`/`false` crudos.
- Demuestra integración con `inject(TranslateService)` vía stub inyectado.

### `should format values from select options when a matching option exists`

- **Arrange**: `branchOfficeOptions: [{ value: 'MAD', label: 'Madrid' }]`
- **Act**: `formatValue('branchOffice', 'MAD')`
- **Assert**: `'Madrid'` (usa `_getOptionsKey` internamente).

### `should fall back to the raw value when no option match exists`

- **Act**: `formatValue('branchOffice', 'BCN')` sin opción BCN
- **Assert**: `'BCN'` (`String(value)` efectivo).

## Qué no cubren estos tests

- Renderizado HTML (`@if` / `@for`) — no hay `fixture.detectChanges()` ni `DebugElement`.
- Integración con `homeur-box-message`.
- Campo Formly registrado en `app.module`.
- Otros `fieldKey` de `_getOptionsKey` (`accountType`, `preferredContactMethod`) — mismo patrón que `branchOffice`.

## Ejecutar

Desde la raíz del proyecto (según configuración Angular):

```bash
ng test --include=**/customer-modification-summary.component.spec.ts
```

## Tabla resumen de doubles

| Double | Tipo | Rol |
|--------|------|-----|
| `translateServiceStub` | Provider `useValue` | Sustituto de `TranslateService` |
| `TranslatePipeMock` | Declaración en `declarations` | Pipe `translate` en plantilla |
| `component.field = { ... } as any` | Asignación manual | Simula contexto Formly / `formState` |
| `spyOn(translateService, 'instant')` | Jasmine spy | Control fino de traducciones en un test |
