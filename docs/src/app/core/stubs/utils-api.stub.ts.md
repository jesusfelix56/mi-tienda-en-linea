
# Stub: `utils-api.stub.ts`

> **Cómo leer este documento:** debajo de cada explicación hay un bloque **Código:** con el fragmento exacto del fichero fuente.

## Código fuente

Archivo: `src/app/core/stubs/utils-api.stub.ts`

```typescript
export const utilsApiStub = {
  getEndPointUrl: (config: any): string => {
    if (config?.mocked && config?.urlMock) {
      return `${config.urlMock}.json`;
    }

    return config?.url ?? '';
  },
};
```

---

**Archivo fuente:** `src/app/core/stubs/utils-api.stub.ts`  
**Propósito:** Sustituir `UtilsApi` de `@sanes-hipdig/lf-ng-50084125-front-compones` en pruebas del servicio HTTP, reproduciendo la regla que usa la app para construir URLs de endpoints **mock** (archivos `.json` locales).

---

## Contexto en la aplicación

`CustomerModificationService.getClients$()` construye un objeto `config` y pide la URL final a `UtilsApi.getEndPointUrl(config)`:

```typescript
const config = {
  url: 'v1/customer-modification/clients',
  urlMock: 'v1/customer-modification/clients',
  mocked: true,
  httpMethod: HttpMethodEnum.get,
};
// ...
this._http.request(..., this._utilsApiService.getEndPointUrl(config), ...)
```

En entorno mock, la petición debe apuntar a algo como:

`v1/customer-modification/clients.json`

que el `HttpClientTestingModule` intercepta en tests (ver `customer-modification.service.spec.ts`).

El stub replica esa lógica **sin** la librería real.

---

## Explicación línea por línea


### Líneas 1–2: objeto y método

```typescript
export const utilsApiStub = {
  getEndPointUrl: (config: any): string => {
```

| Parte | Significado |
|-------|-------------|
| `utilsApiStub` | Objeto inyectado con `{ provide: UtilsApi, useValue: utilsApiStub }`. |
| `getEndPointUrl` | Único método que la feature necesita del UtilsApi real en tests. |
| `config: any` | Objeto de configuración de endpoint (forma flexible en stub). |
| `: string` | Siempre devuelve la URL final como texto. |

---

### Líneas 3–5: rama mock — `mocked` y `urlMock`

```typescript
if (config?.mocked && config?.urlMock) {
  return `${config.urlMock}.json`;
}
```

#### Operador `?.` (optional chaining)

- `config?.mocked` → si `config` es `null`/`undefined`, la expresión es `undefined` (no lanza error).
- Evita fallos en tests si alguien pasa `config` incompleto.

#### Condición `config?.mocked && config?.urlMock`

Ambas deben ser **truthy**:

| Campo | Rol |
|-------|-----|
| **`mocked`** | Bandera booleana: «este endpoint no va al API real; usa fichero JSON de mocks». En el servicio: `mocked: true`. |
| **`urlMock`** | Ruta base del mock **sin** extensión `.json`. Ejemplo: `'v1/customer-modification/clients'`. |

Si **ambas** se cumplen → se entra en la rama mock.

#### Plantilla `` `${config.urlMock}.json` ``

| Entrada `urlMock` | Salida |
|-------------------|--------|
| `'v1/customer-modification/clients'` | `'v1/customer-modification/clients.json'` |

**Por qué el sufijo `.json`**

1. Los mocks del backend/local viven como archivos JSON en rutas como `api/public/mocks/v1/customer-modification/clients.json`.  
2. El servidor de desarrollo o el interceptor de pruebas resuelve `*.json` como recurso estático.  
3. `HttpTestingController.expectOne('v1/customer-modification/clients.json')` en el spec **depende** de ese sufijo.

**Convención:** `urlMock` = path lógico; el stub (y UtilsApi real) **añaden** `.json` solo en modo mock.

---

### Líneas 7–8: rama no mock

```typescript
return config?.url ?? '';
```

| Parte | Significado |
|-------|-------------|
| `config?.url` | URL «real» del API cuando no se usa mock. |
| `?? ''` | Nullish coalescing: si `url` es `null` o `undefined`, devuelve cadena vacía `''`. |
| **Cuándo ocurre** | `mocked` es `false`, falta `urlMock`, o solo se define `url`. |

En tests de `getClients$` siempre se usa `mocked: true`, por lo que en la práctica se ejecuta la rama `.json`.

---

## Tabla de decisión (lógica completa)

| `mocked` | `urlMock` | `url` | Resultado |
|----------|-----------|-------|-----------|
| `true` | `'v1/.../clients'` | (cualquiera) | `'v1/.../clients.json'` |
| `false` | — | `'https://api/...'` | `'https://api/...'` |
| `false` | — | ausente | `''` |
| ausente | — | `'v1/real'` | `'v1/real'` |

---

## Ejemplo alineado con `CustomerModificationService`

**Config enviado por el servicio:**

```typescript
{
  url: 'v1/customer-modification/clients',
  urlMock: 'v1/customer-modification/clients',
  mocked: true,
  httpMethod: HttpMethodEnum.get,
}
```

**Salida del stub:**

```
v1/customer-modification/clients.json
```

**Test que lo verifica:**

```typescript
const request = httpTestingController.expectOne('v1/customer-modification/clients.json');
```

---

## Diferencia stub vs UtilsApi real

| Aspecto | Stub (este archivo) | Librería real |
|---------|---------------------|---------------|
| Dependencias | Ninguna | Puede leer entorno, base href, proxies |
| Lógica documentada | Solo `mocked` + `urlMock` → `.json` | Puede tener más ramas (auth, versión API) |
| Objetivo en tests | URL predecible para `HttpTestingController` | Comportamiento de producción |

En unit tests del servicio **solo importa** que la URL generada coincida con `expectOne`.

---

## Resumen para principiantes

1. **`mocked: true`** → «usa datos falsos en JSON».  
2. **`urlMock`** → path sin `.json`.  
3. El stub **concatena `.json`** para que HttpClient pida el fichero mock.  
4. Si no es mock, devuelve **`config.url`** o cadena vacía.
