
# Documentación: `api/public/mocks/v1/parameters.json`

> **Cómo leer este documento:** debajo de cada explicación hay un bloque **Código:** con el fragmento exacto del fichero fuente.

## Código fuente

Archivo: `api/public/mocks/v1/parameters.json`

```json
{
  "customerModification": {
    "form": {
      "fields": [
        {
          "id": "customerModification-form",
          "type": "stepper",
          "templateOptions": {
            "cancelButton": {
              "type": "eventClient",
              "eventClient": "cancelCustomerModification"
            },
            "stepsLabels": [
              {
                "step": 1,
                "label": "CUSTOMER_MODIFICATION.FORM.FIELDS.STEPS_LABELS.LABEL_1"
              },
              {
                "step": 2,
                "label": "CUSTOMER_MODIFICATION.FORM.FIELDS.STEPS_LABELS.LABEL_2"
              },
              {
                "step": 3,
                "label": "CUSTOMER_MODIFICATION.FORM.FIELDS.STEPS_LABELS.LABEL_3"
              }
            ],
            "label": "CUSTOMER_MODIFICATION.FORM.FIELDS.LABEL",
            "submitButtonText": "ACTIONS.REQUEST_MODIFICATION",
            "icon": "next-arrow-icon-button"
          },
          "fieldGroup": [
            {
              "templateOptions": {
                "buttons": [
                  {
                    "text": "ACTIONS.CONTINUE",
                    "type": "eventClient",
                    "eventClient": "loadModificationFormStep"
                  }
                ]
              },
              "fieldGroup": [
                {
                  "id": "customerModificationSelectHeader",
                  "type": "title",
                  "className": "d-block mt-1",
                  "templateOptions": {
                    "variant": "headline",
                    "size": "small",
                    "textSlot": "CUSTOMER_MODIFICATION.FORM.FIELDS.SELECT_CLIENT.TITLE"
                  }
                },
                {
                  "id": "customerModificationSelectDescription",
                  "type": "text",
                  "className": "d-block mt-1 mb-1",
                  "templateOptions": {
                    "textSlot": "CUSTOMER_MODIFICATION.FORM.FIELDS.SELECT_CLIENT.DESCRIPTION"
                  }
                },
                {
                  "id": "customerModificationSelectClient",
                  "key": "selectedClientId",
                  "type": "customer-selection-radio",
                  "templateOptions": {
                    "required": true
                  }
                }
              ]
            },
            {
              "templateOptions": {
                "buttons": [
                  {
                    "text": "ACTIONS.CONTINUE",
                    "type": "eventClient",
                    "eventClient": "loadSummaryStep"
                  }
                ]
              },
              "fieldGroupClassName": "row",
              "fieldGroup": [
                {
                  "id": "customerModificationDataHeader",
                  "type": "title",
                  "className": "col-xs-12 mt-1",
                  "templateOptions": {
                    "variant": "headline",
                    "size": "small",
                    "textSlot": "CUSTOMER_MODIFICATION.FORM.FIELDS.MODIFY_DATA.TITLE"
                  }
                },
                {
                  "id": "customerModificationDataDescription",
                  "type": "text",
                  "className": "col-xs-12 mt-1 mb-1",
                  "templateOptions": {
                    "textSlot": "CUSTOMER_MODIFICATION.FORM.FIELDS.MODIFY_DATA.DESCRIPTION"
                  }
                },
                {
                  "id": "customerModificationFullName",
                  "key": "fullName",
                  "type": "custom-input",
                  "className": "col-xs-12 col-sm-6",
                  "templateOptions": {
                    "placeholder": " ",
                    "required": true,
                    "sizeText": "small",
                    "labelText": "CUSTOMER_MODIFICATION.FORM.FIELDS.FULL_NAME.LABEL"
                  },
                  "validators": {
                    "validation": [
                      {
                        "name": "noNumbers"
                      }
                    ]
                  }
                },
                {
                  "id": "customerModificationEmail",
                  "key": "email",
                  "type": "custom-input",
                  "className": "col-xs-12 col-sm-6",
                  "templateOptions": {
                    "placeholder": " ",
                    "required": true,
                    "sizeText": "small",
                    "labelText": "CUSTOMER_MODIFICATION.FORM.FIELDS.EMAIL.LABEL"
                  },
                  "validators": {
                    "validation": [
                      {
                        "name": "emailFormat"
                      }
                    ]
                  }
                },
                {
                  "id": "customerModificationPhone",
                  "key": "phone",
                  "type": "custom-input",
                  "className": "col-xs-12 col-sm-6",
                  "templateOptions": {
                    "placeholder": " ",
                    "required": true,
                    "sizeText": "small",
                    "labelText": "CUSTOMER_MODIFICATION.FORM.FIELDS.PHONE.LABEL"
                  },
                  "validators": {
                    "validation": [
                      {
                        "name": "onlyNumbers"
                      },
                      {
                        "name": "maxNineDigits"
                      }
                    ]
                  }
                },
                {
                  "id": "customerModificationAccountNumber",
                  "key": "accountNumber",
                  "type": "custom-input",
                  "className": "col-xs-12 col-sm-6",
                  "templateOptions": {
                    "placeholder": " ",
                    "required": true,
                    "sizeText": "small",
                    "labelText": "CUSTOMER_MODIFICATION.FORM.FIELDS.ACCOUNT_NUMBER.LABEL"
                  },
                  "validators": {
                    "validation": [
                      {
                        "name": "ibanFormat"
                      }
                    ]
                  }
                },
                {
                  "id": "customerModificationAccountType",
                  "key": "accountType",
                  "type": "searchable-select",
                  "className": "col-xs-12 col-sm-6",
                  "templateOptions": {
                    "required": true,
                    "label": "CUSTOMER_MODIFICATION.FORM.FIELDS.ACCOUNT_TYPE.LABEL",
                    "clearable": false,
                    "placeholder": "CUSTOMER_MODIFICATION.FORM.FIELDS.ACCOUNT_TYPE.LABEL",
                    "type": "search"
                  },
                  "expressionProperties": {
                    "templateOptions_options": "formState.selectOptionsData.accountTypeOptions"
                  }
                },
                {
                  "id": "customerModificationBranchOffice",
                  "key": "branchOffice",
                  "type": "searchable-modal",
                  "className": "col-xs-12 col-sm-6",
                  "templateOptions": {
                    "required": true,
                    "label": "CUSTOMER_MODIFICATION.FORM.FIELDS.BRANCH_OFFICE.LABEL",
                    "modalTemplateOptions": {
                      "label": "CUSTOMER_MODIFICATION.FORM.FIELDS.BRANCH_OFFICE.LABEL",
                      "placeholder": "ACTIONS.SEARCH",
                      "searchable": true
                    }
                  },
                  "expressionProperties": {
                    "templateOptions_options": "formState.selectOptionsData.branchOfficeOptions"
                  }
                },
                {
                  "id": "customerModificationTransferLimit",
                  "key": "transferLimit",
                  "type": "numeric-input-with-controls",
                  "className": "col-xs-12 col-sm-6",
                  "templateOptions": {
                    "type": "number",
                    "placeholder": " ",
                    "required": true,
                    "sizeText": "small",
                    "labelText": "CUSTOMER_MODIFICATION.FORM.FIELDS.TRANSFER_LIMIT.LABEL",
                    "numberDelta": "1",
                    "decimals": 0
                  },
                  "validators": {
                    "validation": [
                      {
                        "name": "onlyNumbers"
                      },
                      {
                        "name": "transferLimitRange"
                      }
                    ]
                  }
                },
                {
                  "id": "customerModificationNotificationsEnabled",
                  "key": "notificationsEnabled",
                  "defaultValue": false,
                  "type": "switch",
                  "className": "col-xs-12 col-sm-6",
                  "templateOptions": {
                    "label": "CUSTOMER_MODIFICATION.FORM.FIELDS.NOTIFICATIONS.LABEL"
                  }
                },
                {
                  "id": "customerModificationPreferredContactMethod",
                  "key": "preferredContactMethod",
                  "defaultValue": "EMAIL",
                  "type": "button-toggle",
                  "className": "col-xs-12 col-sm-6",
                  "templateOptions": {
                    "required": true,
                    "displayColumn": true,
                    "variant": "radio-button",
                    "label": "CUSTOMER_MODIFICATION.FORM.FIELDS.PREFERRED_CONTACT.LABEL"
                  },
                  "expressionProperties": {
                    "templateOptions_options": "formState.selectOptionsData.preferredContactMethodOptions"
                  }
                }
              ]
            },
            {
              "fieldGroup": [
                {
                  "id": "customerModificationSummaryHeader",
                  "type": "title",
                  "className": "d-block mt-1",
                  "templateOptions": {
                    "variant": "headline",
                    "size": "small",
                    "textSlot": "CUSTOMER_MODIFICATION.SUMMARY.TITLE"
                  }
                },
                {
                  "id": "customerModificationSummary",
                  "key": "summary",
                  "type": "customer-modification-summary"
                }
              ]
            }
          ]
        }
      ],
      "optionsData": {
        "accountTypeOptions": [
          {
            "value": "Cuenta Nómina",
            "label": "CUSTOMER_MODIFICATION.OPTIONS.ACCOUNT_TYPE.PAYROLL"
          },
          {
            "value": "Cuenta Ahorro",
            "label": "CUSTOMER_MODIFICATION.OPTIONS.ACCOUNT_TYPE.SAVINGS"
          },
          {
            "value": "Cuenta Empresa",
            "label": "CUSTOMER_MODIFICATION.OPTIONS.ACCOUNT_TYPE.BUSINESS"
          },
          {
            "value": "Cuenta Premium",
            "label": "CUSTOMER_MODIFICATION.OPTIONS.ACCOUNT_TYPE.PREMIUM"
          }
        ],
        "branchOfficeOptions": [
          {
            "value": "Madrid Centro",
            "label": "Madrid Centro"
          },
          {
            "value": "Barcelona Norte",
            "label": "Barcelona Norte"
          },
          {
            "value": "Sevilla Este",
            "label": "Sevilla Este"
          },
          {
            "value": "Valencia Central",
            "label": "Valencia Central"
          }
        ],
        "yesNoOptions": [
          {
            "value": true,
            "label": "OPTIONS_DATA.YES_NO.YES.LABEL"
          },
          {
            "value": false,
            "label": "OPTIONS_DATA.YES_NO.NO.LABEL"
          }
        ],
        "preferredContactMethodOptions": [
          {
            "value": "EMAIL",
            "label": "CUSTOMER_MODIFICATION.OPTIONS.PREFERRED_CONTACT.EMAIL"
          },
          {
            "value": "PHONE",
            "label": "CUSTOMER_MODIFICATION.OPTIONS.PREFERRED_CONTACT.PHONE"
          },
          {
            "value": "SMS",
            "label": "CUSTOMER_MODIFICATION.OPTIONS.PREFERRED_CONTACT.SMS"
          }
        ]
      }
    }
  },
  "distributorBeInterestedItems": [
    {
      "tealium": {
        "key": "distributor.events",
        "parentKey": "clickElement"
      },
      "hideExpression": false,
      "icon": "edit",
      "title": "DISTRIBUTOR.BE_INTERESTED.CUSTOMER_MODIFICATION.TITLE",
      "description": "DISTRIBUTOR.BE_INTERESTED.CUSTOMER_MODIFICATION.SUMMARY",
      "path": "/customer-modification"
    },
    {
      "tealium": {
        "key": "distributor.events",
        "parentKey": "clickElement"
      },
      "hideExpression": false,
      "icon": "mortgage",
      "title": "DISTRIBUTOR.BE_INTERESTED.NOVATION.TITLE",
      "description": "DISTRIBUTOR.BE_INTERESTED.NOVATION.SUMMARY",
      "path": "/novation",
      "isNovation": true
    },
    {
      "tealium": {
        "key": "distributor.events",
        "parentKey": "clickElement"
      },
      "hideExpression": false,
      "icon": "mortgages-euro",
      "title": "DISTRIBUTOR.BE_INTERESTED.CANCELLATION_OF_REGISTRATION.TITLE",
      "description": "DISTRIBUTOR.BE_INTERESTED.CANCELLATION_OF_REGISTRATION.SUMMARY",
      "externalLink": {
        "key": "cancellationRegistration",
        "officeParams": {
          "origin": "ADN",
          "customerId": "model.customer.applicant.applicantId",
          "ope": "hipreg",
          "token": "model.queryParams.token",
          "language": "model.queryParams.language"
        },
        "params": {
          "origin": "APP",
          "path": "cancelacion-registral",
          "operationChannel": "APP-INT",
          "carryAppVersion": "model.queryParams.carryAppVersion"
        }
      }
    },
    {
      "tealium": {
        "key": "distributor.events",
        "parentKey": "clickElement"
      },
      "hideExpression": false,
      "icon": "realestatecredit",
      "title": "DISTRIBUTOR.BE_INTERESTED.SELLING_HOUSE.TITLE",
      "description": "DISTRIBUTOR.BE_INTERESTED.SELLING_HOUSE.SUMMARY",
      "externalLink": {
        "key": "sellingHouse",
        "params": {
          "channel": "model.routeParams.channel",
          "applicantId": "model.customer.applicant.applicantId"
        }
      }
    },
    {
      "tealium": {
        "key": "distributor.events",
        "parentKey": "clickElement"
      },
      "hideExpression": false,
      "icon": "renting-home",
      "title": "DISTRIBUTOR.BE_INTERESTED.RENT_HOUSE.TITLE",
      "description": "DISTRIBUTOR.BE_INTERESTED.RENT_HOUSE.SUMMARY",
      "externalLink": {
        "key": "rentYourHouse"
      }
    },
    {
      "tealium": {
        "key": "distributor.events",
        "parentKey": "clickElement"
      },
      "hideExpression": "model.channel==='NHB' || model.channel==='RED' || model.channel==='OFI'",
      "icon": "protected-home",
      "title": "DISTRIBUTOR.BE_INTERESTED.INSURANCE_SIMULATE.TITLE",
      "description": "DISTRIBUTOR.BE_INTERESTED.INSURANCE_SIMULATE.SUMMARY",
      "externalLink": {
        "key": "simulateInsurance"
      }
    },
    {
      "tealium": {
        "key": "distributor.events",
        "parentKey": "clickElement"
      },
      "hideExpression": true,
      "icon": "franchise",
      "title": "DISTRIBUTOR.BE_INTERESTED.WORK_PROMOTIONS.TITLE",
      "description": "DISTRIBUTOR.BE_INTERESTED.WORK_PROMOTIONS.SUMMARY",
      "externalLink": {
        "key": "workPromotions",
        "params": {
          "canal": "MOV"
        }
      }
    },
    {
      "tealium": {
        "key": "distributor.events",
        "parentKey": "clickElement"
      },
      "hideExpression": true,
      "icon": "solar-energy",
      "title": "DISTRIBUTOR.BE_INTERESTED.SOLAR_PANEL_ENERGY.TITLE",
      "description": "DISTRIBUTOR.BE_INTERESTED.SOLAR_PANEL_ENERGY.SUMMARY",
      "externalLink": {
        "key": "solarPanelEnergy",
        "params": {
          "channel": "model.routeParams.channel",
          "applicantId": "model.customer.applicant.applicantId"
        }
      }
    },
    {
      "tealium": {
        "key": "distributor.events",
        "parentKey": "clickElement"
      },
      "icon": "saving-investment",
      "title": "DISTRIBUTOR.BE_INTERESTED.CALCULATE_ENERGY_SAVINGS.TITLE",
      "description": "DISTRIBUTOR.BE_INTERESTED.CALCULATE_ENERGY_SAVINGS.SUMMARY",
      "externalLink": {
        "key": "calculateEnergySavings"
      }
    },
    {
      "tealium": {
        "key": "distributor.events",
        "parentKey": "clickElement"
      },
      "hideExpression": "model.channel !== 'MOV'",
      "icon": "security",
      "title": "DISTRIBUTOR.BE_INTERESTED.CONTRACT_ALARM.TITLE",
      "description": "DISTRIBUTOR.BE_INTERESTED.CONTRACT_ALARM.SUMMARY",
      "externalLink": {
        "key": "contractAlarm",
        "params": {
          "operativa": "mpa",
          "operationChannel": "APP-INT",
          "canal": "model.routeParams.channel"
        }
      }
    }
  ]
}
```

---

## Índice

1. [Propósito del archivo](#propósito-del-archivo)
2. [Relación con `parameters-customer-modification.json`](#relación-con-parameters-customer-modificationjson)
3. [Cuándo usar cada fichero](#cuándo-usar-cada-fichero)
4. [Contenido efectivo (resumen)](#contenido-efectivo-resumen)
5. [Integración en la aplicación](#integración-en-la-aplicación)
6. [Mantenimiento y sincronización](#mantenimiento-y-sincronización)

---

## Propósito del archivo

`parameters.json` es el **mock del catálogo global de parámetros** que la aplicación hipotecaria carga al arrancar o al entrar en un flujo que depende de `StorageService.getParameters()`.

En producción, ese catálogo suele ser un JSON enorme con decenas de secciones (`novation`, `simulation`, `customerModification`, etc.). En el repositorio Eplicar, para desarrollo local e **integración de la feature de modificación de cliente**, este mock contiene **el mismo contenido** que el fichero especializado:

**`parameters-customer-modification.json`**

Es decir: no es un subconjunto parcial ni una versión simplificada distinta; en el estado actual del proyecto, **ambos archivos son copias byte a byte equivalentes** (misma estructura raíz, mismos 510 líneas de configuración).

La razón de tener dos rutas es **organizacional y de despliegue**, no funcional:

| Fichero | Intención |
|---------|-----------|
| `parameters-customer-modification.json` | Documentar y versionar **solo** la parte de negocio de «Modificar cliente» + tarjetas del distribuidor relacionadas. |
| `parameters.json` | Simular la **respuesta real** del endpoint genérico de parámetros que el shell de la app ya espera consumir. |

---

## Relación con `parameters-customer-modification.json`


### Estructura idéntica

Ambos exponen en la raíz:

```json
{
  "customerModification": { "form": { ... } },
  "distributorBeInterestedItems": [ ... ]
}
```

No hay diferencia de nombres de propiedades, tipos de campo Formly, validadores ni ítems del distribuidor entre un archivo y otro.

### Documentación detallada

**Toda la explicación línea a línea** del formulario stepper, los tres pasos, cada campo, `expressionProperties`, `optionsData` y los 10 elementos de `distributorBeInterestedItems` está en:

**[parameters-customer-modification.json.md](./parameters-customer-modification.json.md)**

Este documento (`parameters.json.md`) no repite ese nivel de detalle para evitar duplicación y desincronización. Cuando necesites entender una coma, un validador o un `hideExpression`, consulta el enlace anterior.

---

## Cuándo usar cada fichero


### Usa `parameters.json` cuando…

- Configuras el **servidor de mocks** o el proxy para que `GET .../v1/parameters.json` (o la URL que use `StorageService`) devuelva el catálogo estándar.
- Ejecutas la **aplicación completa** o un flujo de integración que solo conoce el endpoint global de parámetros y no un endpoint específico de customer-modification.
- Quieres reproducir el comportamiento de **carga única de parámetros** igual que en otros features (novación, simulación, etc.) que también leen del mismo servicio.

### Usa `parameters-customer-modification.json` cuando…

- Trabajas **aisladamente** en la feature «Modificar cliente bancario» y quieres un fichero con nombre explícito en el repositorio.
- Documentas o revisas cambios **solo** de `customerModification` y `distributorBeInterestedItems` sin mezclar con futuras secciones que puedan añadirse a `parameters.json`.
- Montas un mock HTTP dedicado (por ejemplo `GET v1/parameters-customer-modification.json`) en herramientas externas o pruebas contractuales centradas en esta operativa.

### Regla práctica

| Escenario | Fichero a editar primero | Fichero a sincronizar después |
|-----------|--------------------------|-------------------------------|
| Cambio de campo del formulario | `parameters-customer-modification.json` | `parameters.json` |
| Cambio de tarjeta del distribuidor | idem | idem |
| Integración E2E que solo mockea `parameters.json` | `parameters.json` | `parameters-customer-modification.json` |

Si solo actualizas uno, la integración y el desarrollo aislado **divergirán**.

---

## Contenido efectivo (resumen)

Para referencia rápida sin abrir el JSON:

### `customerModification.form`

- Un **stepper** de 3 pasos: selección de cliente → edición de datos → resumen.
- Campos editables: `fullName`, `email`, `phone`, `accountNumber`, `accountType`, `branchOffice`, `transferLimit`, `notificationsEnabled`, `preferredContactMethod`.
- `optionsData` con tipos de cuenta, oficinas, sí/no y método de contacto.
- Validadores declarativos enlazados a `customer-modification.validators.ts`.

### `distributorBeInterestedItems`

- **10 tarjetas**, desde «Modificar cliente bancario» (`path: /customer-modification`) hasta «Contratar Alarma» (visible solo en canal `MOV`).
- Mezcla de rutas internas (`path`) y enlaces externos (`externalLink` con `key` y `params`/`officeParams`).
- Varios `hideExpression` booleanos o basados en `model.channel`.

Detalle completo: [parameters-customer-modification.json.md](./parameters-customer-modification.json.md).

---

**Código:**

```json
{
  "distributorBeInterestedItems": [
    {
      "tealium": {
        "key": "distributor.events",
        "parentKey": "clickElement"
      },
      "hideExpression": false,
      "icon": "edit",
      "title": "DISTRIBUTOR.BE_INTERESTED.CUSTOMER_MODIFICATION.TITLE",
      "description": "DISTRIBUTOR.BE_INTERESTED.CUSTOMER_MODIFICATION.SUMMARY",
      "path": "/customer-modification"
    },
    {
      "tealium": {
        "key": "distributor.events",
        "parentKey": "clickElement"
      },
      "hideExpression": false,
      "icon": "mortgage",
      "title": "DISTRIBUTOR.BE_INTERESTED.NOVATION.TITLE",
      "description": "DISTRIBUTOR.BE_INTERESTED.NOVATION.SUMMARY",
      "path": "/novation",
      "isNovation": true
    },
    {
      "tealium": {
        "key": "distributor.events",
        "parentKey": "clickElement"
      },
      "hideExpression": false,
      "icon": "mortgages-euro",
      "title": "DISTRIBUTOR.BE_INTERESTED.CANCELLATION_OF_REGISTRATION.TITLE",
      "description": "DISTRIBUTOR.BE_INTERESTED.CANCELLATION_OF_REGISTRATION.SUMMARY",
      "externalLink": {
        "key": "cancellationRegistration",
        "officeParams": {
          "origin": "ADN",
          "customerId": "model.customer.applicant.applicantId",
          "ope": "hipreg",
          "token": "model.queryParams.token",
          "language": "model.queryParams.language"
        },
        "params": {
          "origin": "APP",
          "path": "cancelacion-registral",
          "operationChannel": "APP-INT",
          "carryAppVersion": "model.queryParams.carryAppVersion"
        }
      }
    },
    {
      "tealium": {
        "key": "distributor.events",
        "parentKey": "clickElement"
      },
      "hideExpression": false,
      "icon": "realestatecredit",
      "title": "DISTRIBUTOR.BE_INTERESTED.SELLING_HOUSE.TITLE",
      "description": "DISTRIBUTOR.BE_INTERESTED.SELLING_HOUSE.SUMMARY",
      "externalLink": {
        "key": "sellingHouse",
        "params": {
          "channel": "model.routeParams.channel",
          "applicantId": "model.customer.applicant.applicantId"
        }
      }
    },
    {
      "tealium": {
        "key": "distributor.events",
        "parentKey": "clickElement"
      },
      "hideExpression": false,
      "icon": "renting-home",
      "title": "DISTRIBUTOR.BE_INTERESTED.RENT_HOUSE.TITLE",
      "description": "DISTRIBUTOR.BE_INTERESTED.RENT_HOUSE.SUMMARY",
      "externalLink": {
        "key": "rentYourHouse"
      }
    },
    {
      "tealium": {
        "key": "distributor.events",
        "parentKey": "clickElement"
      },
      "hideExpression": "model.channel==='NHB' || model.channel==='RED' || model.channel==='OFI'",
      "icon": "protected-home",
      "title": "DISTRIBUTOR.BE_INTERESTED.INSURANCE_SIMULATE.TITLE",
      "description": "DISTRIBUTOR.BE_INTERESTED.INSURANCE_SIMULATE.SUMMARY",
      "externalLink": {
        "key": "simulateInsurance"
      }
    },
    {
      "tealium": {
        "key": "distributor.events",
        "parentKey": "clickElement"
      },
      "hideExpression": true,
      "icon": "franchise",
      "title": "DISTRIBUTOR.BE_INTERESTED.WORK_PROMOTIONS.TITLE",
      "description": "DISTRIBUTOR.BE_INTERESTED.WORK_PROMOTIONS.SUMMARY",
      "externalLink": {
        "key": "workPromotions",
        "params": {
          "canal": "MOV"
        }
      }
    },
    {
      "tealium": {
        "key": "distributor.events",
        "parentKey": "clickElement"
      },
      "hideExpression": true,
      "icon": "solar-energy",
      "title": "DISTRIBUTOR.BE_INTERESTED.SOLAR_PANEL_ENERGY.TITLE",
      "description": "DISTRIBUTOR.BE_INTERESTED.SOLAR_PANEL_ENERGY.SUMMARY",
      "externalLink": {
        "key": "solarPanelEnergy",
        "params": {
          "channel": "model.routeParams.channel",
          "applicantId": "model.customer.applicant.applicantId"
        }
      }
    },
    {
      "tealium": {
        "key": "distributor.events",
        "parentKey": "clickElement"
      },
      "icon": "saving-investment",
      "title": "DISTRIBUTOR.BE_INTERESTED.CALCULATE_ENERGY_SAVINGS.TITLE",
      "description": "DISTRIBUTOR.BE_INTERESTED.CALCULATE_ENERGY_SAVINGS.SUMMARY",
      "externalLink": {
        "key": "calculateEnergySavings"
      }
    },
    {
      "tealium": {
        "key": "distributor.events",
        "parentKey": "clickElement"
      },
      "hideExpression": "model.channel !== 'MOV'",
      "icon": "security",
      "title": "DISTRIBUTOR.BE_INTERESTED.CONTRACT_ALARM.TITLE",
      "description": "DISTRIBUTOR.BE_INTERESTED.CONTRACT_ALARM.SUMMARY",
      "externalLink": {
        "key": "contractAlarm",
        "params": {
          "operativa": "mpa",
          "operationChannel": "APP-INT",
          "canal": "model.routeParams.channel"
        }
      }
    }
  ]
}
```

## Integración en la aplicación


### Cómo llega `customerModification` al componente

1. Al iniciar, un servicio de arranque (patrón común en apps Sanes/LF) persiste en `StorageService` la respuesta del catálogo de parámetros.
2. `CustomerModificationService.getData$()` combina:
   - parámetros globales,
   - datos de cliente,
   - parámetros de ruta,
   - y `getFormConfiguration()`.
3. `getFormConfiguration()` hace:

```typescript
this._storageService.getParameters().pipe(
  map(response => response?.mortgagesOriginationCatalogue.parameter.customerModification)
);
```

En un catálogo real, `customerModification` estaría **anidado** dentro de `mortgagesOriginationCatalogue.parameter`. Los mocks locales de este repositorio exponen `customerModification` en la **raíz** del JSON para simplificar pruebas; el código de tests suele envolver el mock así:

```typescript
mortgagesOriginationCatalogue: {
  parameter: {
    customerModification: mockFormConfiguration,
  },
},
```

Si sirves `parameters.json` tal cual desde el mock HTTP, verifica que la capa que alimenta `StorageService` aplique la misma estructura anidada que espera producción, o adapta el mock de integración en consecuencia.

### Otros recursos del mismo flujo

| Recurso | Documentación |
|---------|----------------|
| Lista de clientes | [customer-modification/clients.json.md](./customer-modification/clients.json.md) |
| Formulario y distribuidor (detalle) | [parameters-customer-modification.json.md](./parameters-customer-modification.json.md) |

---

## Mantenimiento y sincronización

1. **Tras cualquier cambio funcional**, copia el contenido entre `parameters.json` y `parameters-customer-modification.json`, o automatiza la copia en un script de build.
2. **Comprueba** que las claves i18n nuevas existan en `src/assets/i18n/es.json`.
3. **Comprueba** que los `value` de `optionsData` sigan alineados con `clients.json` (tipos de cuenta, oficinas, métodos de contacto).
4. En el futuro, si `parameters.json` crece con más secciones (novación, simulación…), **`parameters-customer-modification.json` puede seguir siendo el extracto** solo de customer-modification, mientras `parameters.json` será el merge completo. Hoy ambos son iguales; conviene documentar en el PR cuando dejen de serlo.

---

## Archivos en disco

| Ruta | Rol |
|------|-----|
| `api/public/mocks/v1/parameters.json` | Mock de catálogo global (integración) |
| `api/public/mocks/v1/parameters-customer-modification.json` | Mock / fuente documentada de la feature |
| `docs/api/public/mocks/v1/parameters-customer-modification.json.md` | Referencia exhaustiva del contenido compartido |
