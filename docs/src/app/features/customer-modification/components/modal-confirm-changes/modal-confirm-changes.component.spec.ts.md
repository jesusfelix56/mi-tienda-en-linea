
# `modal-confirm-changes.component.spec.ts`

> **Cómo leer este documento:** debajo de cada explicación hay un bloque **Código:** con el fragmento exacto del fichero fuente.

## Código fuente

Archivo: `src/app/features/customer-modification/components/modal-confirm-changes/modal-confirm-changes.component.spec.ts`

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { ModalService } from '@sanes-hipdig/lf-ng-50084125-front-compones';
import { modalServiceStub } from '../../../../core/stubs/modal-services.stub';
import { ModalConfirmChangesComponent } from './modal-confirm-changes.component';

@Pipe({
  name: 'translate',
  standalone: false,
})
class TranslatePipeMock implements PipeTransform {
  transform(value: string): string {
    return value;
  }
}

describe('ModalConfirmChangesComponent', () => {
  let component: ModalConfirmChangesComponent;
  let fixture: ComponentFixture<ModalConfirmChangesComponent>;
  let modalService: ModalService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalConfirmChangesComponent, TranslatePipeMock],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: ModalService, useValue: modalServiceStub }],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalConfirmChangesComponent);
    component = fixture.componentInstance;
    modalService = TestBed.inject(ModalService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should execute ngOnInit without errors', () => {
    expect(() => component.ngOnInit()).not.toThrow();
  });

  it('should close the modal with accepted result', () => {
    spyOn(modalService, 'close');

    component.accept();

    expect(modalService.close).toHaveBeenCalledWith({ isAccept: true });
  });
});
```

---

## Ubicación del fuente

`src/app/features/customer-modification/components/modal-confirm-changes/modal-confirm-changes.component.spec.ts`

## Propósito

Pruebas unitarias de `ModalConfirmChangesComponent`: ciclo de vida mínimo y cierre del modal con el payload esperado por `CustomerModificationComponent.submit()`.

## Configuración TestBed

```typescript
await TestBed.configureTestingModule({
  declarations: [ModalConfirmChangesComponent, TranslatePipeMock],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  providers: [{ provide: ModalService, useValue: modalServiceStub }],
}).compileComponents();
```

| Pieza | Función |
|-------|---------|
| `ModalConfirmChangesComponent` | SUT (system under test) |
| `TranslatePipeMock` | Evita error por `| translate` en HTML si se llama `detectChanges` |
| Schemas permisivos | Toleran `lib-icon`, `homeur-button` sin declarar |
| `modalServiceStub` | Sustituto de `ModalService` |

## Test double: `modalServiceStub`

Fuente: `src/app/core/stubs/modal-services.stub.ts`

```typescript
export const modalServiceStub = {
  showModal: (): any => of({}),
  showModalCustom: (): any => of(true),
  confirm: (): any => of({}),
  close: (): any => null,
};
```

| Método stub | Comportamiento por defecto |
|-------------|----------------------------|
| `showModal` | Devuelve `of({})` |
| `showModalCustom` | Devuelve `of(true)` |
| `confirm` | Devuelve `of({})` |
| `close` | Devuelve `null` |

En el test de `accept()`, se **reemplaza** temporalmente el comportamiento de `close` con un **spy** de Jasmine para verificar argumentos.

### Provider pattern

```typescript
{ provide: ModalService, useValue: modalServiceStub }
```

Angular inyecta el objeto plano donde el componente usa `inject(ModalService)`.

## `TranslatePipeMock`

Igual que en el spec del resumen: devuelve la clave sin traducir. Declarado en `declarations` porque el modal no es standalone.

## Variables del describe

```typescript
let component: ModalConfirmChangesComponent;
let fixture: ComponentFixture<ModalConfirmChangesComponent>;
let modalService: ModalService;
```

Tras `createComponent`, `modalService = TestBed.inject(ModalService)` obtiene la **misma instancia** que el stub del provider (útil para `spyOn`).

## Casos de prueba


### `should create`

Verifica instanciación correcta con dependencias mockeadas.

### `should execute ngOnInit without errors`

```typescript
expect(() => component.ngOnInit()).not.toThrow();
```

- Documenta que `OnInit` está vacío pero implementado.
- No valida efectos secundarios (no hay).

### `should close the modal with accepted result`

```typescript
spyOn(modalService, 'close');
component.accept();
expect(modalService.close).toHaveBeenCalledWith({ isAccept: true });
```

| Paso | Detalle |
|------|---------|
| Spy | Sustituye `close` del stub para contar invocaciones |
| Act | `accept()` sin pasar por el DOM |
| Assert | Payload exacto que el padre espera en `result?.isAccept` |

**Contrato de integración** con `CustomerModificationComponent`:

```typescript
.subscribe((result) => {
  if (result?.isAccept) {
    this._router.navigate(['/distributor']);
  }
});
```

Si se cambiara la forma del payload (`{ accepted: true }`), este test y el padre deben actualizarse juntos.

## Qué no se prueba

- Renderizado de `lib-icon` / `homeur-button`
- Traducciones reales de título y texto
- `showModalCustom` (pertenece al spec del componente padre)
- Navegación o Tealium (responsabilidad del padre)
- Propiedad `sanTypeIcon` (no usada en plantilla)

## Relación con `customer-modification.component.spec.ts`

El padre incluye un test de integración que verifica:

```typescript
expect(modalService.showModalCustom).toHaveBeenCalledWith(ModalConfirmChangesComponent, { modalSize: 'small', data: {} });
```

División de responsabilidades:

| Spec | Nivel |
|------|--------|
| `modal-confirm-changes.component.spec.ts` | Unidad: `accept()` → `close` |
| `customer-modification.component.spec.ts` | Integración: apertura del modal correcto |

## Ejecución

```bash
ng test --include=**/modal-confirm-changes.component.spec.ts
```

## Resumen de doubles

| Double | Uso |
|--------|-----|
| `modalServiceStub` | Provider global del módulo de prueba |
| `spyOn(modalService, 'close')` | Aserción del payload en un test |
| `TranslatePipeMock` | Soporte de plantilla con `translate` |
| `NO_ERRORS_SCHEMA` / `CUSTOM_ELEMENTS_SCHEMA` | Ignorar elementos hijos no declarados |
