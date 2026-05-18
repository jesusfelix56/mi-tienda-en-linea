
# Mock: `customer-modification-clients.mock.ts`

> **Cómo leer este documento:** debajo de cada explicación hay un bloque **Código:** con el fragmento exacto del fichero fuente.

## Código fuente

Archivo: `src/app/mocks/customer-modification-clients.mock.ts`

```typescript
import { CustomerModificationClient } from 'src/app/shared/models/api/common/customer-modification.model';

export const CUSTOMER_MODIFICATION_CLIENTS_MOCK: CustomerModificationClient[] = [
  {
    id: 1,
    fullName: 'Jesús Félix',
    document: '12345678A',
    email: 'jesus@test.com',
    phone: '600123123',
    accountNumber: 'ES6621000418401234567891',
    accountType: 'Cuenta Nómina',
    branchOffice: 'Madrid Centro',
    transferLimit: 3000,
    notificationsEnabled: true,
    preferredContactMethod: 'EMAIL',
  },
  {
    id: 2,
    fullName: 'María García López',
    document: '87654321B',
    email: 'maria.garcia@test.com',
    phone: '611234567',
    accountNumber: 'ES7620770024003102575766',
    accountType: 'Cuenta Ahorro',
    branchOffice: 'Barcelona Norte',
    transferLimit: 1500,
    notificationsEnabled: false,
    preferredContactMethod: 'PHONE',
  },
  {
    id: 3,
    fullName: 'Carlos Ruiz Martínez',
    document: '11223344C',
    email: 'carlos.ruiz@test.com',
    phone: '622345678',
    accountNumber: 'ES9121000418450200051332',
    accountType: 'Cuenta Empresa',
    branchOffice: 'Sevilla Este',
    transferLimit: 2000,
    notificationsEnabled: true,
    preferredContactMethod: 'SMS',
  },
];
```

---

**Archivo fuente:** `src/app/mocks/customer-modification-clients.mock.ts`  
**JSON equivalente (HTTP mock):** `api/public/mocks/v1/customer-modification/clients.json`  
**Propósito:** Datos de clientes bancarios **en memoria** para stubs, tests y desarrollo sin depender de que el servidor mock esté levantado.

---

## Línea 1: import del modelo TypeScript

```typescript
import { CustomerModificationClient } from 'src/app/shared/models/api/common/customer-modification.model';
```

| Concepto | Explicación |
|----------|-------------|
| **Ruta absoluta `src/app/...`** | El proyecto usa `baseUrl` (típico en Angular) apuntando a `src/`, así que no hace falta `../../../`. |
| **`CustomerModificationClient`** | Interfaz que describe la forma de cada cliente. |
| **Por qué importar** | TypeScript comprueba que cada objeto del array tenga las propiedades correctas y tipos correctos. |

### Interfaz `CustomerModificationClient`

Definida en `src/app/shared/models/api/common/customer-modification.model.ts`:

| Propiedad | Tipo | Significado |
|-----------|------|-------------|
| `id` | `number` | Identificador único del cliente en la lista. |
| `fullName` | `string` | Nombre completo mostrado en UI. |
| `document` | `string` | DNI/NIE u otro documento identificativo. |
| `email` | `string` | Correo de contacto. |
| `phone` | `string` | Teléfono. |
| `accountNumber` | `string` | IBAN u número de cuenta (formato texto). |
| `accountType` | `string` | Tipo de producto (ej. «Cuenta Nómina»). |
| `branchOffice` | `string` | Oficina sucursal. |
| `transferLimit` | `number` | Límite de transferencia (importe numérico). |
| `notificationsEnabled` | `boolean` | Si tiene notificaciones activas. |
| `preferredContactMethod` | `string` | Canal preferido: `EMAIL`, `PHONE`, `SMS`, etc. |

**Principiante:** Una **interfaz** no existe en tiempo de ejecución; solo ayuda al compilador. En JavaScript compilado desaparece.

---

## Línea 3: constante exportada

```typescript
export const CUSTOMER_MODIFICATION_CLIENTS_MOCK: CustomerModificationClient[] = [
```

| Parte | Significado |
|-------|-------------|
| `export` | Otros módulos importan esta constante (stub, tests, barrel `index.ts`). |
| `CUSTOMER_MODIFICATION_CLIENTS_MOCK` | Nombre en MAYÚSCULAS: convención para constantes globales de datos de prueba. |
| `CustomerModificationClient[]` | **Array** donde cada elemento cumple la interfaz. |
| `= [` | Inicio del literal de array con 3 registros. |

---

## Registro 1 — Jesús Félix (líneas 4–16)

```typescript
{
  id: 1,
  fullName: 'Jesús Félix',
  document: '12345678A',
  email: 'jesus@test.com',
  phone: '600123123',
  accountNumber: 'ES6621000418401234567891',
  accountType: 'Cuenta Nómina',
  branchOffice: 'Madrid Centro',
  transferLimit: 3000,
  notificationsEnabled: true,
  preferredContactMethod: 'EMAIL',
},
```

| Campo | Valor | Nota pedagógica |
|-------|-------|-----------------|
| `id: 1` | Primer cliente | Suele usarse en tests al seleccionar «cliente por defecto». |
| `fullName` | Nombre con tilde | En JSON el mismo nombre aparece igual. |
| `document` | `12345678A` | Formato español típico DNI + letra. |
| `email` / `phone` | Datos ficticios `@test.com` | Dominio de prueba, no real. |
| `accountNumber` | IBAN España (`ES66...`) | Cadena; validación de IBAN puede hacerse en otro sitio. |
| `accountType` | Cuenta Nómina | Texto legible para UI (no código `CHK`). |
| `branchOffice` | Madrid Centro | Para desplegables de oficina. |
| `transferLimit` | `3000` | **Número**, no string. |
| `notificationsEnabled` | `true` | Booleano real, no `"true"`. |
| `preferredContactMethod` | `'EMAIL'` | Código en mayúsculas; coherente con catálogo de opciones. |

**Perfil de prueba:** Cliente «completo» con notificaciones ON y contacto por email.

---

## Registro 2 — María García López (líneas 17–29)

```typescript
{
  id: 2,
  fullName: 'María García López',
  document: '87654321B',
  email: 'maria.garcia@test.com',
  phone: '611234567',
  accountNumber: 'ES7620770024003102575766',
  accountType: 'Cuenta Ahorro',
  branchOffice: 'Barcelona Norte',
  transferLimit: 1500,
  notificationsEnabled: false,
  preferredContactMethod: 'PHONE',
},
```

| Contraste con cliente 1 | Detalle |
|-------------------------|---------|
| `accountType` | Ahorro vs Nómina — prueba distintos productos en el mismo listado. |
| `branchOffice` | Barcelona — otra sucursal. |
| `transferLimit` | 1500 — límite menor. |
| `notificationsEnabled` | `false` — escenario sin notificaciones. |
| `preferredContactMethod` | `PHONE` — otro canal. |

**Perfil de prueba:** Variación de límites y preferencias para formularios y resúmenes.

---

## Registro 3 — Carlos Ruiz Martínez (líneas 30–42)

```typescript
{
  id: 3,
  fullName: 'Carlos Ruiz Martínez',
  document: '11223344C',
  email: 'carlos.ruiz@test.com',
  phone: '622345678',
  accountNumber: 'ES9121000418450200051332',
  accountType: 'Cuenta Empresa',
  branchOffice: 'Sevilla Este',
  transferLimit: 2000,
  notificationsEnabled: true,
  preferredContactMethod: 'SMS',
},
```

| Aspecto | Detalle |
|---------|---------|
| `accountType` | Cuenta Empresa — tercer tipo de producto. |
| `preferredContactMethod` | `SMS` — cubre el tercer canal del enum típico. |
| `branchOffice` | Sevilla — tercera ciudad. |

**Perfil de prueba:** Completar cobertura de `EMAIL` / `PHONE` / `SMS` en la lista.

---

## Tipado TypeScript en la práctica


### Ventajas de `CustomerModificationClient[]`

1. **Autocompletado** en el IDE al añadir clientes.  
2. **Error de compilación** si falta `transferLimit` o se pone como string.  
3. **Misma forma** que `getClients$(): Observable<CustomerModificationClient[]>` en el servicio real.

### Casting `as CustomerModificationClient[]` en specs

En algunos `*.spec.ts` los datos locales usan:

```typescript
const mockClients = [ { id: 1, accountType: 'CHK', ... } ] as CustomerModificationClient[];
```

Eso **fuerza** el tipo aunque los literales sean más cortos o usen códigos (`CHK`, `MAD`) en lugar de textos largos. El mock de producción en `customer-modification-clients.mock.ts` usa textos legibles alineados con el JSON del API.

---

## Diferencia: este archivo `.mock.ts` vs `clients.json`

| Criterio | `customer-modification-clients.mock.ts` | `clients.json` |
|----------|----------------------------------------|----------------|
| **Formato** | TypeScript | JSON puro |
| **Tipado** | Sí (`CustomerModificationClient[]`) | No (solo validación manual o schema externo) |
| **Comillas** | Comillas simples en strings TS | Comillas dobles obligatorias en JSON |
| **Comentarios** | Permitidos (`//`) | No permitidos en JSON estándar |
| **Cuándo se usa** | Import en bundle Angular (stub `getClients$`, tests unitarios) | Respuesta HTTP del mock server (`HttpClient` + `UtilsApi` + `.json`) |
| **Ruta física** | `src/app/mocks/` | `api/public/mocks/v1/customer-modification/` |
| **Contenido en este repo** | **Idéntico** en los 3 registros (mismos ids, IBANs, límites) | Misma información, serializada para el wire |

### ¿Por qué duplicar si son iguales?

1. **Front sin backend:** El stub importa el `.mock.ts` y funciona offline en Karma.  
2. **Prueba de integración HTTP:** El servicio real pide `clients.json`; el test hace `request.flush(mockClients)` con datos que pueden ser otra copia local en el spec.  
3. **Separación de capas:** JSON = contrato HTTP; TS = datos tipados dentro del código Angular.

**Mantenimiento:** Si cambias un cliente, actualiza **ambos** archivos (o genera uno desde el otro en el futuro) para evitar divergencias.

### Diferencias sintácticas JSON vs TypeScript (mismo dato)

**TypeScript (mock):**

```typescript
notificationsEnabled: true,
preferredContactMethod: 'EMAIL',
```

**JSON:**

```json
"notificationsEnabled": true,
"preferredContactMethod": "EMAIL"
```

- JSON: claves entre comillas dobles; sin coma final tras el último campo del objeto (en el array sí hay comas entre objetos).  
- TS: última propiedad puede llevar coma final (trailing comma) — permitida en objetos modernos.

---

## Quién consume este mock

| Consumidor | Cómo |
|------------|------|
| `customer-modification.service.stub.ts` | `of(CUSTOMER_MODIFICATION_CLIENTS_MOCK)` en `getClients$` |
| `src/app/mocks/index.ts` | `export * from './customer-modification-clients.mock'` |
| Tests | Pueden importar desde `'../../../mocks'` o definir arrays propios con `as CustomerModificationClient[]` |

---

## Resumen para principiantes

- Es una **lista fija de 3 clientes** ficticios pero realistas.  
- TypeScript **valida la forma** gracias a `CustomerModificationClient`.  
- El **JSON del API** sirve para HTTP; el **`.mock.ts`** sirve para código Angular directo.  
- En este proyecto los datos coinciden; la diferencia es **dónde** y **cómo** se cargan, no el negocio.
