
# `customer-modification.service.spec.ts`

> **Cómo leer este documento:** debajo de cada explicación hay un bloque **Código:** con el fragmento exacto del fichero fuente.

## Código fuente

Archivo: `src/app/features/customer-modification/services/customer-modification.service.spec.ts`

```typescript
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { StorageService } from '../../../core/services';
import { storageServiceStub } from '../../../core/stubs/StorageServiceStub';
import { utilsApiStub } from '../../../core/stubs/utils-api.stub';
import { CustomerModificationClient } from '../../../shared/models/api/common/customer-modification.model';
import { CustomerModificationService } from './customer-modification.service';
import { UtilsApi } from '@sanes-hipdig/lf-ng-50084125-front-compones';
import { of } from 'rxjs';

describe('CustomerModificationService', () => {
  let service: CustomerModificationService;
  let storageService: StorageService;
  let httpTestingController: HttpTestingController;

  const mockFormConfiguration = {
    form: {
      fields: [{ key: 'selectedClientId' }],
      optionsData: {},
    },
  } as any;

  const mockParameters = {
    mortgagesOriginationCatalogue: {
      parameter: {
        customerModification: mockFormConfiguration,
      },
    },
  } as any;

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        CustomerModificationService,
        { provide: StorageService, useValue: storageServiceStub },
        { provide: UtilsApi, useValue: utilsApiStub },
      ],
    });

    service = TestBed.inject(CustomerModificationService);
    storageService = TestBed.inject(StorageService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Data Retrieval Methods', () => {
    it('should combine parameters customer route params and form configuration in getData$', () => {
      const mockCustomer = { applicant: { applicantId: '1' } } as any;
      const mockRouteParams = { channel: 'INT' } as any;
      spyOn(storageService, 'getParameters').and.returnValue(of(mockParameters));
      spyOn(storageService, 'getCustomer').and.returnValue(of(mockCustomer));
      spyOn(storageService, 'getRouteParams').and.returnValue(of(mockRouteParams));

      service.getData$().subscribe(result => {
        expect(result).toEqual([mockParameters, mockCustomer, mockRouteParams, mockFormConfiguration]);
      });
    });

    it('should retrieve the customer modification form configuration', () => {
      spyOn(storageService, 'getParameters').and.returnValue(of(mockParameters));

      service.getFormConfiguration().subscribe(result => {
        expect(result).toEqual(mockFormConfiguration);
      });
    });

    it('should request the mocked clients endpoint', () => {
      service.getClients$().subscribe(result => {
        expect(result).toEqual(mockClients);
      });

      const request = httpTestingController.expectOne('v1/customer-modification/clients.json');
      expect(request.request.method.toLowerCase()).toBe('get');
      expect(request.request.headers.get('no-error')).toBe('true');
      request.flush(mockClients);
    });

    it('should return an empty array when the clients endpoint fails', () => {
      service.getClients$().subscribe(result => {
        expect(result).toEqual([]);
      });

      const request = httpTestingController.expectOne('v1/customer-modification/clients.json');
      request.flush('error', { status: 500, statusText: 'Server Error' });
    });
  });
});
```

---

**Ruta fuente:** `src/app/features/customer-modification/services/customer-modification.service.spec.ts`

## Objetivo

Probar el servicio de modificación de cliente de forma aislada: combinación de streams en `getData$`, extracción del formulario en `getFormConfiguration`, petición HTTP mock de clientes y degradación ante error 500.

---

## Configuración

```typescript
providers: [
  provideHttpClient(),
  provideHttpClientTesting(),
  CustomerModificationService,
  { provide: StorageService, useValue: storageServiceStub },
  { provide: UtilsApi, useValue: utilsApiStub },
],
```

- **`HttpTestingController`** — intercepta y verifica peticiones.
- **`afterEach` → `httpTestingController.verify()`** — falla si quedan peticiones sin resolver.

---

## Fixtures


### `mockFormConfiguration`

Objeto mínimo con `form.fields` y `form.optionsData` vacío.

### `mockParameters`

Anida `customerModification` en:

```
mortgagesOriginationCatalogue.parameter.customerModification
```

### `mockClients`

Un cliente de ejemplo para el flush HTTP.

---

## Casos de prueba


### `should be created`

Instanciación del servicio.

### `should combine parameters customer route params and form configuration in getData$`

**Spies en StorageService:**

- `getParameters` → `of(mockParameters)`
- `getCustomer` → `of(mockCustomer)`
- `getRouteParams` → `of(mockRouteParams)`

**Expectativa:**

```typescript
[mockParameters, mockCustomer, mockRouteParams, mockFormConfiguration]
```

Valida el contrato de **`combineLatest`**: orden y contenido de la tupla que el componente espera destructurar.

### `should retrieve the customer modification form configuration`

Solo `getParameters` mockeado; `getFormConfiguration()` debe devolver `mockFormConfiguration` (el nodo `customerModification` del catálogo).

### `should request the mocked clients endpoint`

1. `getClients$().subscribe(...)`.
2. `expectOne('v1/customer-modification/clients.json')` — confirma que `UtilsApi` añade `.json` en modo mock.
3. Método GET.
4. Header `no-error: true`.
5. `flush(mockClients)` → resultado igual al mock.

### `should return an empty array when the clients endpoint fails`

1. Misma URL esperada.
2. `flush('error', { status: 500, statusText: 'Server Error' })`.
3. Suscriptor recibe `[]` gracias a `catchError`.

---

## Relación con `combineLatest` en tests

El test de `getData$` **no** usa `HttpTestingController` porque `getFormConfiguration` lee solo de `StorageService`, no de HTTP. Los cuatro miembros del combine son observables de storage sincrónicos (`of(...)`), por lo que la emisión es inmediata en el subscribe.

En integración real, si algún stream tardara, el test seguiría siendo válido mientras todos emitan.

---

## Cobertura ausente

- `getParameters` sin `mortgagesOriginationCatalogue` (formConfiguration `undefined`).
- `UtilsApi` con `mocked: false`.
- Múltiples suscripciones concurrentes a `getClients$`.
- Tipado estricto del retorno `Observable<any>`.

---

## Comando sugerido

```bash
ng test --include=**/customer-modification.service.spec.ts
```
