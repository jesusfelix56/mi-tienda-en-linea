
# `app-routing.module.ts` — bloque Customer Modification

> **Cómo leer este documento:** debajo de cada explicación hay un bloque **Código:** con el fragmento exacto del fichero fuente.

## Código fuente

Archivo: `src/app/app-routing.module.ts`

```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { isCanLoadGuard } from './core/guards/is-can-load.guard';
import { ErrorScreenComponent, ErrorService } from '@sanes-hipdig/lf-ng-50084125-front-compones';
import { distributorAccesGuard } from './core/guards/distributor.guard';
import { flowExpressOtherObjetiveGuard } from './core/guards/flow-express-other-objetive.guard';
import { flowExpressAttractingGuard } from './core/guards/flow-express-attacting.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/distributor/distributor.module').then(
        (m) => m.DistributorModule
      ),
    canActivate: [authGuard, distributorAccesGuard],
  },
  {
    path: 'distributor',
    loadChildren: () =>
      import('./features/distributor/distributor.module').then(
        (m) => m.DistributorModule
      ),
    canActivate: [authGuard, distributorAccesGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canActivate: [authGuard, isCanLoadGuard],
  },

  {
    path: 'budget-calculator',
    loadChildren: () =>
      import('./features/budget-calculator/budget-calculator.module').then(
        (m) => m.BudgetCalculatorModule
      ),
    canActivate: [authGuard, isCanLoadGuard],
  },
  {
    path: 'home-identification',
    loadChildren: () =>
      import('./features/home-identification/home-identification.module').then(
        (m) => m.HomeIdentificationModule
      ),
    canActivate: [authGuard, isCanLoadGuard],
  },
  {
    path: 'mortgage-customization',
    loadChildren: () =>
      import(
        './features/mortgage-customization/mortgage-customization.module'
      ).then((m) => m.MortgageCustomizationModule),
    canActivate: [authGuard, isCanLoadGuard],
  },
  {
    path: 'pre-approbation',
    loadChildren: () =>
      import('./features/pre-approbation/pre-approbation.module').then(
        (m) => m.PreApprobationModule
      ),
    canActivate: [authGuard, isCanLoadGuard],
  },
  {
    path: 'appraisal',
    loadChildren: () =>
      import('./features/appraisal/appraisal.module').then(
        (m) => m.AppraisalModule
      ),
    canActivate: [authGuard, isCanLoadGuard],
  },
  {
    path: 'attracting',
    loadChildren: () =>
      import('./features/attracting/attracting.module').then(
        (m) => m.AttractingModule
      ),
    canActivate: [authGuard, isCanLoadGuard, flowExpressAttractingGuard],
  },
  {
    path: 'other-objetive',
    loadChildren: () =>
      import('./features/other-objetive/other-objetive.module').then(
        (m) => m.OtherObjetiveModule
      ),
    canActivate: [authGuard, isCanLoadGuard, flowExpressOtherObjetiveGuard],
  },
  {
    path: 'home-academy',
    loadChildren: () =>
      import('./features/home-academy/home-academy.module').then(
        (m) => m.HomeAcademyModule
      ),
    canActivate: [isCanLoadGuard],
  },
  {
    path: 'messages',
    loadChildren: () =>
      import('./features/messages/messages.module').then(
        (m) => m.MessagesModule
      ),
    canActivate: [isCanLoadGuard],
  },
  {
    path: 'confirm-mortgage',
    loadChildren: () =>
      import('./features/mortgate-confirmate/mortgate-confirmate.module').then(
        (m) => m.MortgateConfirmateModule
      ),
    canActivate: [isCanLoadGuard],
  },
  {
    path: 'novation',
    loadChildren: () =>
      import('./features/novation/novation.module').then(
        (m) => m.NovationModule
      ),
    canActivate: [authGuard],
  },
  {
    path: 'customer-modification',
    loadChildren: () =>
      import('./features/customer-modification/customer-modification.module').then(
        (m) => m.CustomerModificationModule
      ),
    canActivate: [authGuard],
  },
  {
    path: ErrorService.routeError,
    component: ErrorScreenComponent
  },
];

/**
 * AppRoutingModule
 * Designed to be the root routing module.
 *
 * imports:
 *  - RouterModule. Adds router directives and providers.
 *
 * exports:
 *  - RouterModule. The module with the configured routes.
 */
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
```

---

**Ruta fuente:** `src/app/app-routing.module.ts`

Documentación centrada en la ruta **`customer-modification`**, lazy loading y guards. El módulo define el enrutado raíz de todo el microfrontend Home Planner.

---

## Configuración global del router

```typescript
RouterModule.forRoot(routes, {
  anchorScrolling: 'enabled',
}),
```

- **`forRoot`** — una sola vez en la aplicación raíz.
- **`anchorScrolling: 'enabled'`** — desplazamiento a anclas en la URL.

---

## Bloque `customer-modification` (líneas 124–131)

```typescript
{
  path: 'customer-modification',
  loadChildren: () =>
    import('./features/customer-modification/customer-modification.module').then(
      (m) => m.CustomerModificationModule
    ),
  canActivate: [authGuard],
},
```

### Tabla de propiedades

| Propiedad | Valor | Descripción |
|-----------|--------|-------------|
| `path` | `'customer-modification'` | Segmento URL: `/customer-modification` |
| `loadChildren` | función dinámica `import()` | **Lazy loading** del NgModule |
| `canActivate` | `[authGuard]` | Exige autenticación antes de descargar/cargar el chunk |

No usa `isCanLoadGuard` (a diferencia de `dashboard`, `budget-calculator`, etc.). Tampoco guards de distribuidor ni de flujos express.

---

## Lazy loading — mecanismo detallado


### 1. Navegación inicial

El usuario (o el distribuidor) navega a `/customer-modification`. El `Router` evalúa la configuración en `forRoot`.

### 2. Guards

`authGuard` se ejecuta **antes** de activar la ruta. Si falla, no se carga el módulo feature.

### 3. Carga del chunk

`loadChildren` devuelve una **Promise** del bundler (Webpack/esbuild):

```typescript
import('./features/customer-modification/customer-modification.module')
  .then((m) => m.CustomerModificationModule)
```

- Genera un **archivo JavaScript separado** en build de producción.
- Reduce el bundle inicial del microfrontend.
- La Promise resuelve al `NgModule` exportado.

### 4. Registro del módulo hijo

Angular instancia `CustomerModificationModule`, que importa `CustomerModificationRoutingModule` con `RouterModule.forChild`.

### 5. Activación del componente

Ruta hija `path: ''` → `CustomerModificationComponent`.

```mermaid
flowchart LR
  A[/customer-modification] --> B[authGuard]
  B --> C[import chunk]
  C --> D[CustomerModificationModule]
  D --> E[CustomerModificationComponent]
```

---

## Entrada desde el distribuidor

En `parameters-customer-modification.json` (catálogo):

```json
{
  "title": "DISTRIBUTOR.BE_INTERESTED.CUSTOMER_MODIFICATION.TITLE",
  "path": "/customer-modification"
}
```

El tile “También te puede interesar” enlaza a esta ruta. Claves i18n bajo `DISTRIBUTOR.BE_INTERESTED.CUSTOMER_MODIFICATION`.

---

## Comparación con ruta `novation`

| Aspecto | `novation` | `customer-modification` |
|---------|------------|---------------------------|
| `authGuard` | sí | sí |
| `isCanLoadGuard` | no | no |
| Patrón `loadChildren` | idéntico | idéntico |
| Módulo | `NovationModule` | `CustomerModificationModule` |

Ambas son features Formly stepper sin guard de carga adicional.

---

## Rutas relacionadas en el mismo archivo

- **`''` y `'distributor'`** — cargan `DistributorModule` (origen habitual tras cancelar/confirmar).
- **`ErrorService.routeError`** — pantalla de error global.

El componente de customer modification hace `navigate(['/distributor'])` al salir.

---

## Microfrontend y rutas

El app se registra como custom element (`homeur-mf-ng-50078458-homeplanner`). El **host** (shell) suele montar el MF con un prefijo de ruta; la ruta interna sigue siendo `customer-modification` relativa al router del MF.

---

## Pruebas y depuración

- Ver chunk en DevTools → Network al primera visita a la ruta.
- `router.config` en consola Angular para verificar `loadChildren`.
- Si `authGuard` redirige, el chunk no se descargará.

---

## Extensión

Para pre-cargar el módulo:

```typescript
{
  path: 'customer-modification',
  loadChildren: () => import(...),
  canActivate: [authGuard],
  data: { preload: true },
}
```

No está en el código actual.
