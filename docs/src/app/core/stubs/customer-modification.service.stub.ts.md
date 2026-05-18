
# Stub: `customer-modification.service.stub.ts`

> **Cómo leer este documento:** debajo de cada explicación hay un bloque **Código:** con el fragmento exacto del fichero fuente.

## Código fuente

Archivo: `src/app/core/stubs/customer-modification.service.stub.ts`

```typescript
import { Observable, of } from 'rxjs';
import { CUSTOMER_MODIFICATION_CLIENTS_MOCK } from '../../../mocks';

export const customerModificationServiceStub = {
  getData$: (): Observable<any> =>
    of([
      {},
      {},
      {},
      {
        form: {
          fields: [],
          optionsData: {},
        },
      },
    ]),
  getFormConfiguration: (): Observable<any> =>
    of({
      form: {
        fields: [],
        optionsData: {},
      },
    }),
  getClients$: (): Observable<any> => of(CUSTOMER_MODIFICATION_CLIENTS_MOCK),
};
```

---

**Archivo fuente:** `src/app/core/stubs/customer-modification.service.stub.ts`  
**Propósito:** Sustituir el servicio real `CustomerModificationService` en pruebas unitarias de componentes, para que Angular no haga llamadas HTTP ni dependa de `StorageService` real.

---

## ¿Qué es un «stub»?

Un **stub** (sustituto) es un objeto falso que imita la forma del servicio real: mismos nombres de métodos, pero con respuestas controladas y predecibles. En los tests se registra así:

```typescript
{ provide: CustomerModificationService, useValue: customerModificationServiceStub }
```

Así el componente bajo prueba cree que habla con el servicio de producción, pero en realidad recibe datos de mentira.

---

## Explicación línea por línea


### Línea 1: `import { Observable, of } from 'rxjs';`

| Parte | Significado |
|-------|-------------|
| `Observable` | Tipo de RxJS: representa un flujo de datos que puede emitir valores a lo largo del tiempo. El servicio real también devuelve `Observable`. |
| `of` | Operador/fábrica de RxJS que crea un Observable que emite los valores que le pasas **de inmediato** y luego se completa. Ideal para tests: no hay red, no hay esperas. |

**Para principiantes:** En la app real los datos «llegan» de forma asíncrona (HTTP, almacenamiento). En el stub usamos `of(...)` para simular esa llegada al instante.

**Código:**

```typescript
import { Observable, of } from 'rxjs';
```

---

### Línea 2: `import { CUSTOMER_MODIFICATION_CLIENTS_MOCK } from '../../../mocks';`

Importa la constante con la lista de clientes de prueba desde el **barrel** `src/app/mocks/index.ts`.

#### Desglose de la ruta relativa

El archivo del stub está en:

`src/app/core/stubs/customer-modification.service.stub.ts`

Cada `..` sube un nivel de carpeta:

| Segmento | Carpeta resultante |
|----------|-------------------|
| (inicio) | `src/app/core/stubs/` |
| `..` | `src/app/core/` |
| `../..` | `src/app/` |
| `../../..` | `src/` |
| `../../../mocks` | Busca la carpeta o módulo `mocks` dentro de `src/` |

En este proyecto, los mocks viven en **`src/app/mocks/`**, no en `src/mocks/`. Desde `stubs/`, la ruta más directa al barrel sería **`../../mocks`** (dos niveles arriba → `src/app/mocks`).

La ruta escrita en el código (`../../../mocks`) sube **tres** niveles hasta `src/` y luego pide `mocks`. Conviene alinear la importación con la carpeta real (`../../mocks`) o usar una ruta absoluta del proyecto, como hace el propio mock:

`import { ... } from 'src/app/mocks';`

**Qué se importa:** `CUSTOMER_MODIFICATION_CLIENTS_MOCK`, definido en `customer-modification-clients.mock.ts` y reexportado por `index.ts`. Ver documentación en `docs/src/app/mocks/customer-modification-clients.mock.ts.md`.

**Código:**

```typescript
import { CUSTOMER_MODIFICATION_CLIENTS_MOCK } from '../../../mocks';
```

---

### Línea 4: `export const customerModificationServiceStub = {`

| Parte | Significado |
|-------|-------------|
| `export` | Otros archivos (p. ej. `*.spec.ts`) pueden importar este objeto. |
| `const` | Referencia fija; no se reasigna el stub completo. |
| `customerModificationServiceStub` | Nombre descriptivo: stub del servicio de modificación de cliente. |
| `= { ... }` | Objeto literal con métodos que imitan la API pública del servicio. |

No es una clase ni usa `@Injectable()`: es un objeto plano suficiente para `useValue` en `TestBed`.

**Código:**

```typescript
export const customerModificationServiceStub = {
```

---

### Líneas 5–16: `getData$`

#### Firma del método

| Parte | Significado |
|-------|-------------|
| `getData$` | Mismo nombre que en `CustomerModificationService`. El sufijo `$` es convención RxJS («devuelve un Observable»). |
| `(): Observable<any>` | Función sin parámetros que devuelve un Observable. `any` evita tipar el stub al detalle; en tests a menudo se sobrescribe con `spyOn`. |
| `=>` | Función flecha (cuerpo en una expresión). |
| `of([...])` | Emite **un solo valor**: el array de 4 elementos. |

#### Por qué el array tiene exactamente 4 elementos

El servicio **real** implementa `getData$()` con `combineLatest` de **cuatro** fuentes:

```typescript
return combineLatest([
  this._storageService.getParameters(),      // índice 0
  this._storageService.getCustomer(),        // índice 1
  this._storageService.getRouteParams(),     // índice 2
  this.getFormConfiguration(),               // índice 3
]);
```

El componente `CustomerModificationComponent` se suscribe y **desestructura** así:

```typescript
.subscribe(([parameters, , routerParams, formData]) => {
```

| Índice | Origen real | Rol en el componente |
|--------|-------------|----------------------|
| **0** | `getParameters()` | Catálogo global; debe existir o el `subscribe` sale pronto (`if (!parameters \|\| !formData)`). |
| **1** | `getCustomer()` | Cliente actual; **no se usa** en esta desestructuración (coma vacía `, ,`). |
| **2** | `getRouteParams()` | Si hay valor, configura breadcrumb. |
| **3** | `getFormConfiguration()` | Configuración del formulario (`fields`, `optionsData`). |

El stub replica esa **forma de tupla de 4 posiciones**:

| Posición stub | Valor | Motivo |
|---------------|-------|--------|
| 0 | `{}` | Objeto truthy mínimo para pasar `if (!parameters)`. |
| 1 | `{}` | Ocupa el hueco del cliente; el componente lo ignora. |
| 2 | `{}` | Truthy opcional; en tests del componente suele sustituirse por `spyOn` con `{ source: 'router' }`. |
| 3 | `{ form: { fields: [], optionsData: {} } }` | Estructura mínima de `formData` para no fallar al leer `formData.form?.fields`. |

**Importante:** En `customer-modification.component.spec.ts` el stub por defecto **no basta** para escenarios ricos: se hace `spyOn(customerModificationService, 'getData$').and.returnValue(of([...]))` con datos más realistas (`mockFormData`, `null` en cliente, etc.). El stub ofrece un **valor por defecto seguro** cuando no se espía el método.

**Código:**

```typescript
  getData$: (): Observable<any> =>
    of([
      {},
      {},
      {},
      {
        form: {
          fields: [],
          optionsData: {},
        },
      },
    ]),
```

---

### Líneas 17–23: `getFormConfiguration`

| Aspecto | Detalle |
|---------|---------|
| Servicio real | Extrae `response?.mortgagesOriginationCatalogue.parameter.customerModification` de parámetros. |
| Stub | Devuelve directamente un objeto con `form.fields` y `form.optionsData` vacíos. |
| Uso | Método público del servicio; útil si algún test llama `getFormConfiguration()` sin pasar por `getData$`. |

**Código:**

```typescript
  getFormConfiguration: (): Observable<any> =>
    of({
      form: {
        fields: [],
        optionsData: {},
      },
    }),
```

---

### Línea 24: `getClients$`

| Parte | Significado |
|-------|-------------|
| `getClients$` | Mismo nombre que en el servicio real (lista de clientes modificables). |
| `of(CUSTOMER_MODIFICATION_CLIENTS_MOCK)` | Emite el array tipado de 3 clientes del mock TypeScript. |
| Servicio real | Hace HTTP GET a `v1/customer-modification/clients.json` (vía `UtilsApi` + mock en `api/public/mocks/...`). |
| Stub | Evita HTTP; datos en memoria desde `src/app/mocks/`. |

En tests del componente suele reemplazarse con `spyOn(..., 'getClients$').and.returnValue(of(mockClients))` para control fino.

**Código:**

```typescript
  getClients$: (): Observable<any> => of(CUSTOMER_MODIFICATION_CLIENTS_MOCK),
```

---

## Relación con el servicio real

| Método | Servicio real | Stub |
|--------|---------------|------|
| `getData$` | `combineLatest` de 4 observables | `of([{}, {}, {}, { form: ... }])` |
| `getFormConfiguration` | `map` sobre parámetros | `of({ form: ... })` |
| `getClients$` | `HttpClient` + JSON mock | `of(CUSTOMER_MODIFICATION_CLIENTS_MOCK)` |

---

## Dónde se usa

- `src/app/features/customer-modification/components/customer-modification.component.spec.ts`  
  - `provide: CustomerModificationService, useValue: customerModificationServiceStub`  
  - Spies adicionales sobre `getData$` y `getClients$` en `initializeComponent()`.

---

## Resumen para principiantes

1. El stub **no llama al backend** ni al `StorageService`.  
2. `getData$` devuelve **4 elementos** porque el componente espera la misma tupla que `combineLatest` del servicio real.  
3. `getClients$` reutiliza datos centralizados en `CUSTOMER_MODIFICATION_CLIENTS_MOCK`.  
4. En pruebas exigentes se combina el stub con **`spyOn`** para respuestas más específicas.
