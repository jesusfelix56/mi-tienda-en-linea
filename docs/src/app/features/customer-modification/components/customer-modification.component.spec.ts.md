
# `customer-modification.component.spec.ts`

> **Cómo leer este documento:** debajo de cada explicación hay un bloque **Código:** con el fragmento exacto del fichero fuente.

## Código fuente

Archivo: `src/app/features/customer-modification/components/customer-modification.component.spec.ts`

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { provideRouter, Router } from '@angular/router';
import {
  ButtonControllerService,
  CommunicationService,
  EventsControllerService,
  ModalService,
  StepperService,
  WindowRef,
} from '@sanes-hipdig/lf-ng-50084125-front-compones';
import { of } from 'rxjs';
import { buttonControllerServiceStub } from '../../../core/stubs/buttonControllerService.stub';
import { communicationServiceStub } from '../../../core/stubs/communication-service.stub';
import { customerModificationServiceStub } from '../../../core/stubs/customer-modification.service.stub';
import { eventControllerServiceStub } from '../../../core/stubs/eventControllerService.stub';
import { modalServiceStub } from '../../../core/stubs/modal-services.stub';
import { stepperServiceStub } from '../../../core/stubs/stepperServiceStub';
import { tealiumDataServiceStub } from '../../../core/stubs/tealiumDataService.stub';
import { translateOptionsServiceStub } from '../../../core/stubs/translate-options.service.stub';
import { windowRefStub } from '../../../core/stubs/windowRef.stub';
import { TealiumDataService } from '../../../core/services/metrics/tealium-data.service';
import { CustomerModificationClient } from '../../../shared/models/api/common/customer-modification.model';
import { TranslateOptionsService } from '../../../shared/services/translate-options.service';
import { CustomerModificationService } from '../services/customer-modification.service';
import { CustomerModificationComponent } from './customer-modification.component';
import { ModalConfirmChangesComponent } from './modal-confirm-changes/modal-confirm-changes.component';

describe('CustomerModificationComponent', () => {
  let component: CustomerModificationComponent;
  let fixture: ComponentFixture<CustomerModificationComponent>;
  let customerModificationService: CustomerModificationService;
  let translateOptionsService: TranslateOptionsService;
  let buttonControllerService: ButtonControllerService;
  let eventControllerService: EventsControllerService;
  let stepperService: StepperService;
  let modalService: ModalService;
  let communicationService: CommunicationService;
  let tealiumDataService: TealiumDataService;
  let router: Router;
  let windowRef: WindowRef;

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
    {
      id: 2,
      fullName: 'Luis Perez',
      document: '12345678B',
      email: 'luis@test.com',
      phone: '600000002',
      accountNumber: 'ES456',
      accountType: 'SAV',
      branchOffice: 'BCN',
      transferLimit: 4500,
      notificationsEnabled: false,
      preferredContactMethod: 'PHONE',
    },
  ] as CustomerModificationClient[];

  const mockFormData = {
    form: {
      fields: [{ key: 'selectedClientId' }],
      optionsData: {
        accountTypeOptions: [],
      },
    },
  } as any;

  const mockTranslatedOptions = {
    accountTypeOptions: [{ value: 'CHK', label: 'Cuenta corriente' }],
    branchOfficeOptions: [{ value: 'MAD', label: 'Madrid' }],
    preferredContactMethodOptions: [{ value: 'EMAIL', label: 'Email' }],
  } as any;

  const initializeComponent = (): void => {
    spyOn(customerModificationService, 'getData$').and.returnValue(of([{ anyParameter: true }, null, { source: 'router' }, mockFormData]));
    spyOn(customerModificationService, 'getClients$').and.returnValue(of(mockClients));
    spyOn(translateOptionsService, 'translateOptions').and.returnValue(mockTranslatedOptions);
    spyOn(buttonControllerService, 'event$').and.returnValue(of('loadSummaryStep'));
    spyOn(eventControllerService, 'setEventMap');
    spyOn(buttonControllerService, 'executeFunctionByName');
    spyOn(stepperService, 'back');
    spyOn(modalService, 'showModalCustom').and.returnValue(of({ isAccept: false }));
    spyOn(communicationService, 'setBreadcrumb');
    spyOn(tealiumDataService, 'executeTealium');
    spyOn(router, 'navigate').and.resolveTo(true);
    spyOn(windowRef, 'isAppIntoIFrame').and.returnValue(true);

    component.ngOnInit();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerModificationComponent],
      imports: [ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        provideRouter([]),
        { provide: CustomerModificationService, useValue: customerModificationServiceStub },
        { provide: TranslateOptionsService, useValue: translateOptionsServiceStub },
        { provide: ButtonControllerService, useValue: buttonControllerServiceStub },
        { provide: EventsControllerService, useValue: eventControllerServiceStub },
        { provide: StepperService, useValue: stepperServiceStub },
        { provide: ModalService, useValue: modalServiceStub },
        { provide: CommunicationService, useValue: communicationServiceStub },
        { provide: TealiumDataService, useValue: tealiumDataServiceStub },
        { provide: WindowRef, useValue: windowRefStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerModificationComponent);
    component = fixture.componentInstance;
    customerModificationService = TestBed.inject(CustomerModificationService);
    translateOptionsService = TestBed.inject(TranslateOptionsService);
    buttonControllerService = TestBed.inject(ButtonControllerService);
    eventControllerService = TestBed.inject(EventsControllerService);
    stepperService = TestBed.inject(StepperService);
    modalService = TestBed.inject(ModalService);
    communicationService = TestBed.inject(CommunicationService);
    tealiumDataService = TestBed.inject(TealiumDataService);
    router = TestBed.inject(Router);
    windowRef = TestBed.inject(WindowRef);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initialization', () => {
    it('should initialize data and subscribe button events on ngOnInit', () => {
      initializeComponent();

      expect(component.form).toBeInstanceOf(FormGroup);
      expect(component.fields).toEqual(mockFormData.form.fields);
      expect(component.options.formState.clients).toEqual(mockClients);
      expect(component.options.formState.selectOptionsData).toEqual(mockTranslatedOptions);
      expect(component.isAppIntoIFrame).toBeTrue();
      expect(component.isDataReady).toBeTrue();
      expect(eventControllerService.setEventMap).toHaveBeenCalledWith('loadModificationFormStep', 'loadModificationFormStep');
      expect(eventControllerService.setEventMap).toHaveBeenCalledWith('loadSummaryStep', 'loadSummaryStep');
      expect(eventControllerService.setEventMap).toHaveBeenCalledWith('cancelCustomerModification', 'cancelCustomerModification');
      expect(communicationService.setBreadcrumb).toHaveBeenCalled();
      expect(buttonControllerService.executeFunctionByName).toHaveBeenCalledWith('loadSummaryStep', component);
      expect(tealiumDataService.executeTealium).toHaveBeenCalledWith('customerModification.views', 'selectClient');
    });

    it('should complete the unsubscribe subject on ngOnDestroy', () => {
      const nextSpy = spyOn((component as any)._unsubscribe, 'next');
      const completeSpy = spyOn((component as any)._unsubscribe, 'complete');

      component.ngOnDestroy();

      expect(nextSpy).toHaveBeenCalled();
      expect(completeSpy).toHaveBeenCalled();
    });
  });

  describe('Step navigation', () => {
    it('should load selected client data into the form and move to step 2', () => {
      initializeComponent();
      component.model = { selectedClientId: 1 };

      component.loadModificationFormStep();

      expect(component.model.fullName).toBe('Ana Garcia');
      expect(component.model.email).toBe('ana@test.com');
      expect(component.model.preferredContactMethod).toBe('EMAIL');
      expect(stepperService.back).toHaveBeenCalledWith(1);
      expect(tealiumDataService.executeTealium).toHaveBeenCalledWith('customerModification.views', 'modifyClient');
    });

    it('should not move to step 2 when no client is selected', () => {
      initializeComponent();
      component.model = { selectedClientId: 999 };

      component.loadModificationFormStep();

      expect(stepperService.back).not.toHaveBeenCalledWith(1);
    });

    it('should calculate changes and move to summary step', () => {
      initializeComponent();
      component.model = { selectedClientId: 1 };
      component.loadModificationFormStep();
      (stepperService.back as jasmine.Spy).calls.reset();
      component.model.email = 'updated@test.com';
      component.model.notificationsEnabled = false;

      component.loadSummaryStep();

      expect(component.options.formState.changes.length).toBe(2);
      expect(component.options.formState.changes).toContain(
        jasmine.objectContaining({
          fieldKey: 'email',
          oldValue: 'ana@test.com',
          newValue: 'updated@test.com',
        })
      );
      expect(component.options.formState.changes).toContain(
        jasmine.objectContaining({
          fieldKey: 'notificationsEnabled',
          oldValue: true,
          newValue: false,
        })
      );
      expect(stepperService.back).toHaveBeenCalledWith(2);
      expect(tealiumDataService.executeTealium).toHaveBeenCalledWith('customerModification.views', 'summary');
    });
  });

  describe('Actions', () => {
    it('should navigate to distributor when cancellation is requested', () => {
      spyOn(router, 'navigate').and.resolveTo(true);

      component.cancelCustomerModification();

      expect(router.navigate).toHaveBeenCalledWith(['/distributor']);
    });

    it('should open confirmation modal on submit', () => {
      initializeComponent();

      component.submit();

      expect(modalService.showModalCustom).toHaveBeenCalledWith(ModalConfirmChangesComponent, {
        modalSize: 'small',
        data: {},
      });
    });

    it('should navigate after accepting the confirmation modal', () => {
      initializeComponent();
      (modalService.showModalCustom as jasmine.Spy).and.returnValue(of({ isAccept: true }));

      component.submit();

      expect(tealiumDataService.executeTealium).toHaveBeenCalledWith('customerModification.events', 'modificationConfirmed');
      expect(router.navigate).toHaveBeenCalledWith(['/distributor']);
    });
  });
});
```

---

**Ruta fuente:** `src/app/features/customer-modification/components/customer-modification.component.spec.ts`  
**Framework:** Jasmine + Angular `TestBed`

## Objetivo de la suite

Validar el componente raíz de modificación de cliente: inicialización con datos combinados, desuscripción, navegación entre pasos vía métodos públicos (simulando lo que haría `ButtonControllerService`), cancelación, envío y modal de confirmación.

---

## Configuración del `TestBed`


### `declarations`

- `CustomerModificationComponent` únicamente.

### `imports`

- `ReactiveFormsModule` — necesario para `[formGroup]` si se renderizara el template.

### `schemas`

- `NO_ERRORS_SCHEMA` — ignora elementos/desconocidos en plantilla.
- `CUSTOM_ELEMENTS_SCHEMA` — permite `formly-form` y web components sin declararlos.

### `providers`

| Provider | Stub |
|----------|------|
| `provideRouter([])` | Router real con rutas vacías |
| `CustomerModificationService` | `customerModificationServiceStub` |
| `TranslateOptionsService` | `translateOptionsServiceStub` |
| `ButtonControllerService` | `buttonControllerServiceStub` |
| `EventsControllerService` | `eventControllerServiceStub` |
| `StepperService` | `stepperServiceStub` |
| `ModalService` | `modalServiceStub` |
| `CommunicationService` | `communicationServiceStub` |
| `TealiumDataService` | `tealiumDataServiceStub` |
| `WindowRef` | `windowRefStub` |

---

## Datos de prueba


### `mockClients`

Dos clientes `CustomerModificationClient` (Ana García id=1, Luis Pérez id=2) con campos completos para pruebas de selección y diff.

### `mockFormData`

```typescript
{
  form: {
    fields: [{ key: 'selectedClientId' }],
    optionsData: { accountTypeOptions: [] },
  },
}
```

Simula la porción mínima del catálogo devuelta por `getData$()`.

### `mockTranslatedOptions`

Opciones ya traducidas que devuelve el spy de `translateOptions`.

---

## Helper `initializeComponent()`

Centraliza el arranque típico tras `ngOnInit`:

| Spy | Comportamiento |
|-----|----------------|
| `getData$` | `of([{ anyParameter: true }, null, { source: 'router' }, mockFormData])` |
| `getClients$` | `of(mockClients)` |
| `translateOptions` | `mockTranslatedOptions` |
| `event$` | `of('loadSummaryStep')` — dispara un evento al suscribirse |
| `setEventMap` | spy |
| `executeFunctionByName` | spy |
| `stepperService.back` | spy |
| `showModalCustom` | `of({ isAccept: false })` por defecto |
| `setBreadcrumb` | spy |
| `executeTealium` | spy |
| `router.navigate` | resuelve `true` |
| `isAppIntoIFrame` | `true` |

Luego llama `component.ngOnInit()`.

**Implicación:** en tests de inicialización se verifica que `executeFunctionByName` fue llamado con `'loadSummaryStep'` porque `event$` emite ese valor al suscribirse.

---

## Casos de prueba


### `should create`

Comprueba que el componente se instancia.

### Grupo `Initialization`

#### `should initialize data and subscribe button events on ngOnInit`

Verifica:

- `form` es `FormGroup`.
- `fields` igual a `mockFormData.form.fields`.
- `options.formState.clients` === `mockClients`.
- `options.formState.selectOptionsData` === `mockTranslatedOptions`.
- `isAppIntoIFrame === true`.
- `isDataReady === true`.
- Tres llamadas a `setEventMap` con los nombres de eventos esperados.
- `setBreadcrumb` llamado (hay `routerParams` en el mock).
- `executeFunctionByName('loadSummaryStep', component)`.
- Tealium `selectClient`.

#### `should complete the unsubscribe subject on ngOnDestroy`

Espía `next` y `complete` del `Subject` privado `_unsubscribe` vía `(component as any)._unsubscribe`.

---

### Grupo `Step navigation`

#### `should load selected client data into the form and move to step 2`

1. `initializeComponent()`.
2. `model = { selectedClientId: 1 }`.
3. `loadModificationFormStep()`.

Expectativas:

- Campos del modelo rellenados (p. ej. `fullName`, `email`, `preferredContactMethod`).
- `stepperService.back(1)`.
- Tealium `modifyClient`.

#### `should not move to step 2 when no client is selected`

`selectedClientId: 999` → `back(1)` **no** llamado.

#### `should calculate changes and move to summary step`

Flujo completo:

1. Seleccionar cliente 1 → `loadModificationFormStep()`.
2. Reset de llamadas a `back`.
3. Modificar `email` y `notificationsEnabled`.
4. `loadSummaryStep()`.

Expectativas:

- `formState.changes.length === 2`.
- Objetos con `fieldKey` `email` y `notificationsEnabled` y valores old/new correctos.
- `back(2)`.
- Tealium `summary`.

---

### Grupo `Actions`

#### `should navigate to distributor when cancellation is requested`

`cancelCustomerModification()` → `navigate(['/distributor'])`.

#### `should open confirmation modal on submit`

Tras init, `submit()` → `showModalCustom(ModalConfirmChangesComponent, { modalSize: 'small', data: {} })`.

#### `should navigate after accepting the confirmation modal`

Mock del modal devuelve `{ isAccept: true }` → Tealium `modificationConfirmed` + navegación a distribuidor.

---

## Qué no cubre la suite

- Renderizado real de `formly-form` y validadores.
- Error en `getClients$` (lista vacía).
- `getData$` sin `parameters` / sin `formData` (`isDataReady` permanece false).
- Suscripción del modal sin `takeUntil` (fugas menores en tests no medidos).
- Integración E2E del stepper de la librería.

---

## Patrones de testing alineados con producción

| Patrón producción | Cómo se testea |
|-------------------|----------------|
| `combineLatest` vía `getData$` | Spy retorna tupla fija |
| `executeFunctionByName` | Spy + emisión artificial en `event$` |
| `StepperService.back(n)` | Spy con argumento numérico |
| Snapshot `_originalClientData` | Indirectamente vía diff en `loadSummaryStep` |

---

## Ejecutar tests

```bash
ng test --include=**/customer-modification.component.spec.ts
```

(Ajustar al script del `package.json` del proyecto.)
