
# `customer-modification.validators.ts`

> **Cómo leer este documento:** debajo de cada explicación hay un bloque **Código:** con el fragmento exacto del fichero fuente.

## Código fuente

Archivo: `src/app/features/customer-modification/validators/customer-modification.validators.ts`

```typescript
import { AbstractControl, ValidationErrors } from '@angular/forms';

/**
 * Validates that the value does not contain digits.
 *
 * @param control AbstractControl
 * @returns ValidationErrors | null
 */
export function noNumbersValidator(control: AbstractControl): ValidationErrors | null {
  const value: string = control.value ?? '';
  return /\d/.test(value) ? { noNumbers: true } : null;
}

/**
 * Validates that the value matches a basic e-mail pattern.
 *
 * @param control AbstractControl
 * @returns ValidationErrors | null
 */
export function emailFormatValidator(control: AbstractControl): ValidationErrors | null {
  const value: string = control.value ?? '';
  if (!value) {
    return null; // required handles the empty case
  }
  const pattern = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(value) ? null : { emailFormat: true };
}

/**
 * Validates that the value contains only digit characters.
 *
 * @param control AbstractControl
 * @returns ValidationErrors | null
 */
export function onlyNumbersValidator(control: AbstractControl): ValidationErrors | null {
  const value = String(control.value ?? '');
  if (!value) {
    return null;
  }
  return /^\d+$/.test(value) ? null : { onlyNumbers: true };
}

/**
 * Validates that the value has at most 9 digits.
 *
 * @param control AbstractControl
 * @returns ValidationErrors | null
 */
export function maxNineDigitsValidator(control: AbstractControl): ValidationErrors | null {
  const value = String(control.value ?? '');
  if (!value) {
    return null;
  }
  return value.replace(/\D/g, '').length <= 9 ? null : { maxNineDigits: true };
}

/**
 * Validates a Spanish/generic IBAN format.
 * Checks the basic structure (country code + digits, 15-34 chars) and the mod-97 checksum.
 *
 * @param control AbstractControl
 * @returns ValidationErrors | null
 */
export function ibanFormatValidator(control: AbstractControl): ValidationErrors | null {
  const raw: string = String(control.value ?? '')
    .replace(/\s/g, '')
    .toUpperCase();
  if (!raw) {
    return null;
  }
  if (!/^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/.test(raw)) {
    return { ibanFormat: true };
  }
  // Mod-97 validation
  const rearranged = raw.slice(4) + raw.slice(0, 4);
  const numeric = rearranged.replace(/[A-Z]/g, ch => String(ch.charCodeAt(0) - 55));
  let remainder = 0;
  for (const digit of numeric) {
    remainder = (remainder * 10 + parseInt(digit, 10)) % 97;
  }
  return remainder === 1 ? null : { ibanFormat: true };
}

/**
 * Validates that the transfer limit is between 0 and 3000.
 *
 * @param control AbstractControl
 * @returns ValidationErrors | null
 */
export function transferLimitRangeValidator(control: AbstractControl): ValidationErrors | null {
  const value = Number(control.value);
  if (control.value === null || control.value === '' || control.value === undefined) {
    return null;
  }
  return value >= 0 && value <= 3000 ? null : { transferLimitRange: true };
}
```

---

**Ruta fuente:** `src/app/features/customer-modification/validators/customer-modification.validators.ts`

Validadores **síncronos** de Angular Reactive Forms, exportados como funciones puras `(control: AbstractControl) => ValidationErrors | null`. Se registran globalmente en `AppModule` vía `FormlyConfig` para usarse por nombre en el JSON del catálogo (`validators.validation[].name`).

---

## Registro en Formly (`AppModule`)

| Nombre Formly | Función | Clave de error | Mensaje i18n |
|---------------|---------|---------------|--------------|
| `noNumbers` | `noNumbersValidator` | `{ noNumbers: true }` | `CUSTOMER_MODIFICATION.VALIDATORS.NO_NUMBERS` |
| `emailFormat` | `emailFormatValidator` | `{ emailFormat: true }` | `CUSTOMER_MODIFICATION.VALIDATORS.EMAIL_FORMAT` |
| `onlyNumbers` | `onlyNumbersValidator` | `{ onlyNumbers: true }` | `CUSTOMER_MODIFICATION.VALIDATORS.ONLY_NUMBERS` |
| `maxNineDigits` | `maxNineDigitsValidator` | `{ maxNineDigits: true }` | `CUSTOMER_MODIFICATION.VALIDATORS.MAX_NINE_DIGITS` |
| `ibanFormat` | `ibanFormatValidator` | `{ ibanFormat: true }` | `CUSTOMER_MODIFICATION.VALIDATORS.IBAN_FORMAT` |
| `transferLimitRange` | `transferLimitRangeValidator` | `{ transferLimitRange: true }` | `CUSTOMER_MODIFICATION.VALIDATORS.TRANSFER_LIMIT_RANGE` |

---

## Convenciones comunes

- Valor vacío (`''`, `null`, `undefined`): la mayoría devuelve **`null`** (válido) y deja el **`required`** al campo Formly.
- Los errores son objetos con una clave booleana `true` para que Formly muestre el `validationMessage` asociado.

---

## `noNumbersValidator`


**Código:**

```typescript
export function noNumbersValidator(control: AbstractControl): ValidationErrors | null {
  const value: string = control.value ?? '';
  return /\d/.test(value) ? { noNumbers: true } : null;
}
```

### Código

```typescript
const value: string = control.value ?? '';
return /\d/.test(value) ? { noNumbers: true } : null;
```

### Regex: `/\d/`

- **`\d`** — cualquier dígito Unicode decimal `[0-9]`.
- **Sin anclajes** — basta **un** dígito en cualquier posición para fallar.
- **Campo:** `fullName` en el catálogo.

### Ejemplos

| Valor | Resultado |
|-------|-----------|
| `María García` | válido |
| `Ana2` | inválido |
| `` | válido (required aparte) |

---

## `emailFormatValidator`


**Código:**

```typescript
export function emailFormatValidator(control: AbstractControl): ValidationErrors | null {
  const value: string = control.value ?? '';
  if (!value) {
    return null; // required handles the empty case
  }
  const pattern = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(value) ? null : { emailFormat: true };
}
```

### Código

```typescript
const pattern = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
```

### Regex desglosada

| Parte | Significado |
|-------|-------------|
| `^...$` | Cadena completa |
| `[a-zA-Z0-9._%+\-]+` | Parte local: letras, dígitos y `._%+-` |
| `@` | Separador |
| `[a-zA-Z0-9.\-]+` | Dominio |
| `\.` | Punto literal |
| `[a-zA-Z]{2,}` | TLD mínimo 2 letras |

### Limitaciones

- No valida dominios IDN ni todos los RFC 5322.
- Vacío → `null` (no invalida por formato).

---

## `onlyNumbersValidator`


**Código:**

```typescript
export function onlyNumbersValidator(control: AbstractControl): ValidationErrors | null {
  const value = String(control.value ?? '');
  if (!value) {
    return null;
  }
  return /^\d+$/.test(value) ? null : { onlyNumbers: true };
}
```

### Regex: `/^\d+$/`

- **`^` `$`** — toda la cadena debe ser dígitos.
- Convierte valor con `String(control.value ?? '')`.
- Usado en `phone` y `transferLimit` (junto con otros validadores).

| Valor | Resultado |
|-------|-----------|
| `600123123` | válido |
| `600 123` | inválido (espacio) |
| `12.5` | inválido |

---

## `maxNineDigitsValidator`


**Código:**

```typescript
export function maxNineDigitsValidator(control: AbstractControl): ValidationErrors | null {
  const value = String(control.value ?? '');
  if (!value) {
    return null;
  }
  return value.replace(/\D/g, '').length <= 9 ? null : { maxNineDigits: true };
}
```

### Lógica

```typescript
value.replace(/\D/g, '').length <= 9
```

- **`/\D/g`** — elimina todo lo que no sea dígito antes de contar.
- Permite que el usuario pegue formatos con espacios; cuenta solo dígitos.
- Máximo **9 dígitos** (teléfono español sin prefijo internacional en el diseño del formulario).

---

## `ibanFormatValidator`

Validación en **dos fases**: formato superficial y **checksum mod-97** (estándar ISO 13616).

**Código:**

```typescript
export function ibanFormatValidator(control: AbstractControl): ValidationErrors | null {
  const raw: string = String(control.value ?? '')
    .replace(/\s/g, '')
    .toUpperCase();
  if (!raw) {
    return null;
  }
  if (!/^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/.test(raw)) {
    return { ibanFormat: true };
  }
  // Mod-97 validation
  const rearranged = raw.slice(4) + raw.slice(0, 4);
  const numeric = rearranged.replace(/[A-Z]/g, ch => String(ch.charCodeAt(0) - 55));
  let remainder = 0;
  for (const digit of numeric) {
    remainder = (remainder * 10 + parseInt(digit, 10)) % 97;
  }
  return remainder === 1 ? null : { ibanFormat: true };
}
```

### Normalización

```typescript
const raw = String(control.value ?? '')
  .replace(/\s/g, '')
  .toUpperCase();
```

Elimina espacios; mayúsculas para códigos de país.

### Fase 1 — Regex estructural

```typescript
/^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/
```

| Segmento | Regla |
|----------|--------|
| `[A-Z]{2}` | Código de país (ES, DE, …) |
| `\d{2}` | Dígitos de control |
| `[A-Z0-9]{11,30}` | BBAN (longitud total IBAN 15–34 caracteres) |

España: `ES` + 2 dígitos + 22 alfanuméricos = 24 caracteres.

Si falla → `{ ibanFormat: true }` sin calcular mod-97.

### Fase 2 — Validación mod-97

Algoritmo estándar IBAN:

1. **Reordenar:** mover los 4 primeros caracteres al final.  
   Ejemplo: `ES6621000418401234567891` → `21000418401234567891ES66`

2. **Convertir letras a números:** A=10, B=11, …, Z=35 (fórmula `charCodeAt(0) - 55`).

3. **Calcular resto:** el número resultante (como cadena enorme) se procesa **dígito a dígito**:

```typescript
let remainder = 0;
for (const digit of numeric) {
  remainder = (remainder * 10 + parseInt(digit, 10)) % 97;
}
```

Esto equivale a calcular el entero mod 97 sin overflow en JavaScript (números grandes).

4. **Válido si `remainder === 1`.**

Si el resto ≠ 1 → `{ ibanFormat: true }`.

### Ejemplo mental (ES)

Para un IBAN español correcto del mock `ES6621000418401234567891`, tras reordenar y expandir letras, el resto modular debe ser **1**.

### Por qué mod-97

Los dos dígitos de control del IBAN se calculan para que el número completo (reordenado y expandido) sea congruente con **1 módulo 97**. Detecta erratas de un solo carácter en muchos casos, además del formato.

### Vacío

Cadena vacía → `null` (required del campo).

---

## `transferLimitRangeValidator`

```typescript
const value = Number(control.value);
if (control.value === null || control.value === '' || control.value === undefined) {
  return null;
}
return value >= 0 && value <= 3000 ? null : { transferLimitRange: true };
```

- Rango **cerrado** [0, 3000].
- `Number('abc')` → `NaN` → inválido.
- Coherente con mensaje i18n y control `numeric-input-with-controls` en JSON.

---

## Asignación en catálogo Formly

| Campo `key` | Validadores |
|-------------|-------------|
| `fullName` | `noNumbers` |
| `email` | `emailFormat` |
| `phone` | `onlyNumbers`, `maxNineDigits` |
| `accountNumber` | `ibanFormat` |
| `transferLimit` | `onlyNumbers`, `transferLimitRange` |

---

## Diagrama IBAN

```mermaid
flowchart TD
  A[Valor control] --> B[Quitar espacios + MAYÚSC]
  B --> C{¿Vacío?}
  C -->|Sí| OK[null válido]
  C -->|No| D{¿Regex estructura?}
  D -->|No| ERR[{ ibanFormat }]
  D -->|Sí| E[Reordenar + expandir A-Z]
  E --> F[mod 97 dígito a dígito]
  F --> G{¿resto === 1?}
  G -->|Sí| OK
  G -->|No| ERR
```

---

## Pruebas recomendadas (no hay spec dedicado)

| Validador | Casos |
|-----------|--------|
| IBAN | IBAN ES válido mock, dígito control erróneo, país inválido |
| email | sin TLD, doble @ |
| phone | 10 dígitos, letras |
| transferLimit | -1, 3001, 1500 |

Considerar añadir `customer-modification.validators.spec.ts` en el futuro.
