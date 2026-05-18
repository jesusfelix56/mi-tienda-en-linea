
# Documentación: `api/public/mocks/v1/parameters-customer-modification.json`

> **Cómo leer este documento:** debajo de cada explicación hay un bloque **Código:** con el fragmento exacto del fichero fuente.

## Código fuente

Archivo: `api/public/mocks/v1/parameters-customer-modification.json`

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
2. [Estructura raíz del JSON](#estructura-raíz-del-json)
3. [Bloque `customerModification`](#bloque-customermodification)
4. [Bloque `customerModification.form`](#bloque-customermodificationform)
5. [Campo raíz del formulario: stepper](#campo-raíz-del-formulario-stepper)
6. [Paso 1: Selección de cliente](#paso-1-selección-de-cliente)
7. [Paso 2: Modificación de datos](#paso-2-modificación-de-datos)
8. [Paso 3: Resumen](#paso-3-resumen)
9. [Bloque `optionsData`](#bloque-optionsdata)
10. [Bloque `distributorBeInterestedItems`](#bloque-distributorbeinteresteditems)
11. [Claves i18n referenciadas](#claves-i18n-referenciadas)
12. [Relación con el código Angular](#relación-con-el-código-angular)

---

## Propósito del archivo

Este JSON define **dos catálogos de configuración** usados en la feature «Modificar cliente bancario» y en el distribuidor de productos:

1. **`customerModification`** — definición declarativa del formulario Formly (stepper de 3 pasos, validadores, listas desplegables).
2. **`distributorBeInterestedItems`** — tarjetas del bloque «También te puede interesar» en el distribuidor, incluida la entrada que navega a `/customer-modification`.

No contiene textos visibles finales en español: la mayoría de etiquetas son **claves de traducción** (por ejemplo `CUSTOMER_MODIFICATION.FORM.FIELDS.FULL_NAME.LABEL`) resueltas en `src/assets/i18n/es.json`.

En un entorno real, este contenido suele llegar anidado dentro de `mortgagesOriginationCatalogue.parameter` del catálogo de parámetros global. El mock lo expone en la raíz para facilitar desarrollo y pruebas aisladas de la feature.

---

## Estructura raíz del JSON

**Código:**

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
  }
}
```


El documento es un **objeto JSON** (empieza con `{` y termina con `}`).

En la raíz hay **exactamente dos propiedades**:

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `customerModification` | objeto | Configuración del formulario y opciones del flujo de modificación. |
| `distributorBeInterestedItems` | array | Lista de accesos rápidos del distribuidor (10 elementos). |

No hay más claves en la raíz. La coma entre ambos bloques separa dos propiedades hermanas del mismo objeto.

---

## Bloque `customerModification`

```json
"customerModification": {
  "form": { ... }
}
```

- **`customerModification`:** nombre del módulo de parámetros; coincide con `ParametersCustomerModification` y con la ruta que usa `CustomerModificationService.getFormConfiguration()`:
  - `response?.mortgagesOriginationCatalogue.parameter.customerModification`
- Solo contiene, en este mock, la propiedad **`form`**. En otros entornos podrían añadirse más sub-bloques (por ejemplo flags de negocio).

---

## Bloque `customerModification.form`

```json
"form": {
  "fields": [ ... ],
  "optionsData": { ... }
}
```

| Propiedad | Tipo | Rol |
|-----------|------|-----|
| `fields` | array | Lista de campos Formly de nivel superior. Aquí hay **un solo** elemento: el stepper. |
| `optionsData` | objeto | Catálogo de opciones para selects, toggles y modales; se inyecta en `formState.selectOptionsData` tras traducción. |

La aplicación (`CustomerModificationComponent`) hace:

1. Lee `formData.fields` → asigna a `this.fields`.
2. Traduce `formData.optionsData` con `TranslateOptionsService` → `this.options.formState.selectOptionsData`.

---

## Campo raíz del formulario: stepper

**Código:**

```json
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
```


Un único objeto dentro de `fields[]` con `type: "stepper"`.

### Propiedades del stepper

| Propiedad | Valor en mock | Explicación |
|-----------|---------------|-------------|
| `id` | `"customerModification-form"` | Identificador estable del campo; útil para tests y telemetría. |
| `type` | `"stepper"` | Indica al motor Formly que renderice un asistente por pasos. |
| `templateOptions` | objeto | Opciones del componente stepper (botones, etiquetas, icono). |
| `fieldGroup` | array de 3 elementos | **Cada elemento = un paso** del asistente. |

### `templateOptions` del stepper

#### `cancelButton`

```json
"cancelButton": {
  "type": "eventClient",
  "eventClient": "cancelCustomerModification"
}
```

- **`type: "eventClient"`:** el botón no envía el formulario; dispara un evento registrado en `EventsControllerService`.
- **`eventClient`:** nombre del evento. En `CustomerModificationComponent.ngOnInit` se registra `cancelCustomerModification` para volver atrás o salir del flujo.

#### `stepsLabels`

**Código:**

```json
[
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
]
```


Array de 3 objetos que definen el texto de cada pestaña/paso del stepper:

| `step` | Clave `label` | Texto en español (i18n) |
|--------|---------------|-------------------------|
| 1 | `CUSTOMER_MODIFICATION.FORM.FIELDS.STEPS_LABELS.LABEL_1` | Seleccionar cliente |
| 2 | `CUSTOMER_MODIFICATION.FORM.FIELDS.STEPS_LABELS.LABEL_2` | Modificar datos |
| 3 | `CUSTOMER_MODIFICATION.FORM.FIELDS.STEPS_LABELS.LABEL_3` | Resumen |

- **`step`:** número de paso (1-based).
- **`label`:** clave i18n, no texto literal.

#### Otras opciones del stepper

**Código:**

```json
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
```


| Propiedad | Valor | Significado |
|-----------|-------|-------------|
| `label` | `CUSTOMER_MODIFICATION.FORM.FIELDS.LABEL` | Título general del formulario («Modificar cliente»). |
| `submitButtonText` | `ACTIONS.REQUEST_MODIFICATION` | Texto del botón final de envío (clave global de acciones). |
| `icon` | `next-arrow-icon-button` | Icono del botón «siguiente» del stepper en la librería de componentes. |

---

## Paso 1: Selección de cliente

Primer elemento de `fieldGroup` del stepper (índice 0).

### Contenedor del paso (sin `id` propio)

```json
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
  "fieldGroup": [ ... ]
}
```

- **`templateOptions.buttons`:** botón «Continuar» del pie del paso 1.
- **`eventClient: "loadModificationFormStep"`:** al pulsar, el componente valida que haya `selectedClientId`, carga datos del cliente y avanza al paso 2 (`_stepperService.next()`).

### Campo: `customerModificationSelectHeader`

**Código:**

```json
{
  "id": "customerModificationSelectHeader",
  "type": "title",
  "className": "d-block mt-1",
  "templateOptions": {
    "variant": "headline",
    "size": "small",
    "textSlot": "CUSTOMER_MODIFICATION.FORM.FIELDS.SELECT_CLIENT.TITLE"
  }
}
```


| Propiedad | Valor | Notas |
|-----------|-------|-------|
| `id` | `customerModificationSelectHeader` | |
| `type` | `title` | Componente de título, no editable. |
| `className` | `d-block mt-1` | Clases CSS (display block, margen superior). |
| `templateOptions.variant` | `headline` | Estilo de cabecera. |
| `templateOptions.size` | `small` | Tamaño tipográfico. |
| `templateOptions.textSlot` | `CUSTOMER_MODIFICATION.FORM.FIELDS.SELECT_CLIENT.TITLE` | «Selecciona el cliente bancario». |

### Campo: `customerModificationSelectDescription`

**Código:**

```json
{
  "id": "customerModificationSelectDescription",
  "type": "text",
  "className": "d-block mt-1 mb-1",
  "templateOptions": {
    "textSlot": "CUSTOMER_MODIFICATION.FORM.FIELDS.SELECT_CLIENT.DESCRIPTION"
  }
}
```


| Propiedad | Valor |
|-----------|-------|
| `type` | `text` |
| `className` | `d-block mt-1 mb-1` |
| `templateOptions.textSlot` | `CUSTOMER_MODIFICATION.FORM.FIELDS.SELECT_CLIENT.DESCRIPTION` |

Texto descriptivo bajo el título.

### Campo: `customerModificationSelectClient`

**Código:**

```json
{
  "id": "customerModificationSelectClient",
  "key": "selectedClientId",
  "type": "customer-selection-radio",
  "templateOptions": {
    "required": true
  }
}
```


| Propiedad | Valor | Notas |
|-----------|-------|-------|
| `id` | `customerModificationSelectClient` | |
| `key` | `selectedClientId` | Nombre en el **modelo** del formulario donde se guarda el id elegido. |
| `type` | `customer-selection-radio` | Componente custom que lista clientes de `getClients$()`. |
| `templateOptions.required` | `true` | Obligatorio para avanzar. |

No tiene `validators` en JSON: la obligatoriedad la marca `required: true`.

---

## Paso 2: Modificación de datos

Segundo elemento de `fieldGroup` (índice 1).

### Contenedor del paso

- **`fieldGroupClassName: "row"`** — layout en fila Bootstrap para los campos hijos.
- **Botón continuar:** `eventClient: "loadSummaryStep"` → calcula diff y va al paso 3.

### Campo: cabecera y descripción

**Código:**

```json
[
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
  }
]
```


- `customerModificationDataHeader` — `type: title`, `textSlot`: título «Modifica los datos del cliente».
- `customerModificationDataDescription` — `type: text`, descripción del paso.

Ambos usan `className` con `col-xs-12` para ocupar el ancho completo en móvil.

---

### Campo: `fullName`

**Código:**

```json
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
}
```


| Propiedad | Detalle |
|-----------|---------|
| `key` | `fullName` — vinculado al modelo y al cliente seleccionado. |
| `type` | `custom-input` |
| `className` | `col-xs-12 col-sm-6` — mitad de fila en pantallas ≥ sm. |
| `templateOptions.placeholder` | `" "` — espacio en blanco (patrón de label flotante). |
| `templateOptions.required` | `true` |
| `templateOptions.sizeText` | `small` |
| `templateOptions.labelText` | Clave i18n del label. |
| `validators.validation[0].name` | `noNumbers` — rechaza cualquier dígito en el nombre. |

---

### Campo: `email`

**Código:**

```json
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
}
```


| Propiedad | Detalle |
|-----------|---------|
| `key` | `email` |
| `validators.validation[0].name` | `emailFormat` — patrón regex de correo válido. |

---

### Campo: `phone`

**Código:**

```json
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
}
```


| Propiedad | Detalle |
|-----------|---------|
| `key` | `phone` |
| Validadores | `onlyNumbers` + `maxNineDigits` (máximo 9 dígitos numéricos). |

El array `validation` tiene **dos** objetos; el orden no importa para Formly, ambos deben cumplirse.

---

### Campo: `accountNumber`

**Código:**

```json
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
}
```


| Propiedad | Detalle |
|-----------|---------|
| `key` | `accountNumber` |
| Label i18n | «IBAN» |
| Validador | `ibanFormat` — formato y checksum mod-97. |

---

### Campo: `accountType`

| Propiedad | Detalle |
|-----------|---------|
| `type` | `searchable-select` — desplegable con búsqueda. |
| `templateOptions.clearable` | `false` — no se puede vaciar la selección. |
| `templateOptions.type` | `"search"` — modo búsqueda interna del componente. |
| `expressionProperties` | Ver sección siguiente. |

#### `expressionProperties`

```json
"expressionProperties": {
  "templateOptions_options": "formState.selectOptionsData.accountTypeOptions"
}
```

- **`expressionProperties`:** mapa de propiedades calculadas dinámicamente (expresiones evaluadas contra el estado del formulario).
- **`templateOptions_options`:** nombre especial Formly: rellena `templateOptions.options` desde la expresión.
- **`formState.selectOptionsData.accountTypeOptions`:** array traducido desde `optionsData` en el componente.

Sin esta expresión, el select no tendría opciones.

---

### Campo: `branchOffice`

**Código:**

```json
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
}
```


| Propiedad | Detalle |
|-----------|---------|
| `type` | `searchable-modal` — selector en modal con lista filtrable. |
| `modalTemplateOptions.label` | Etiqueta del modal. |
| `modalTemplateOptions.placeholder` | `ACTIONS.SEARCH` («Buscar»). |
| `modalTemplateOptions.searchable` | `true` |
| `expressionProperties.templateOptions_options` | `formState.selectOptionsData.branchOfficeOptions` |

---

### Campo: `transferLimit`

**Código:**

```json
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
}
```


| Propiedad | Detalle |
|-----------|---------|
| `type` | `numeric-input-with-controls` — input numérico con botones +/-. |
| `templateOptions.type` | `"number"` |
| `templateOptions.numberDelta` | `"1"` — incremento/decremento por clic (string en JSON). |
| `templateOptions.decimals` | `0` — enteros sin decimales. |
| Validadores | `onlyNumbers`, `transferLimitRange` (0–3000). |

---

### Campo: `notificationsEnabled`

**Código:**

```json
{
  "id": "customerModificationNotificationsEnabled",
  "key": "notificationsEnabled",
  "defaultValue": false,
  "type": "switch",
  "className": "col-xs-12 col-sm-6",
  "templateOptions": {
    "label": "CUSTOMER_MODIFICATION.FORM.FIELDS.NOTIFICATIONS.LABEL"
  }
}
```


| Propiedad | Detalle |
|-----------|---------|
| `type` | `switch` — interruptor on/off. |
| `defaultValue` | `false` — valor si el modelo aún no tiene dato (antes de cargar cliente). |
| `key` | `notificationsEnabled` |
| Sin `required` | El switch es opcional en cuanto a validación explícita. |

---

### Campo: `preferredContactMethod`

**Código:**

```json
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
```


| Propiedad | Detalle |
|-----------|---------|
| `type` | `button-toggle` |
| `defaultValue` | `"EMAIL"` |
| `templateOptions.displayColumn` | `true` — opciones en columna. |
| `templateOptions.variant` | `radio-button` — comportamiento de radio. |
| `templateOptions.required` | `true` |
| `expressionProperties` | `preferredContactMethodOptions` desde `formState`. |

---

## Paso 3: Resumen

Tercer elemento de `fieldGroup` (índice 2). **No** define `templateOptions.buttons` en el mock: el envío lo gestiona el botón submit del stepper.

### `customerModificationSummaryHeader`

- `type: title`
- `textSlot`: `CUSTOMER_MODIFICATION.SUMMARY.TITLE` («Datos modificados»).

### `customerModificationSummary`

| Propiedad | Valor |
|-----------|-------|
| `key` | `summary` |
| `type` | `customer-modification-summary` |

Componente custom que compara `_originalClientData` con el modelo actual y muestra el diff. No es un input editable.

---

## Bloque `optionsData`

**Fragmento de código:**

```json
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
```


Objeto hermano de `fields` dentro de `form`. Alimenta `expressionProperties` y la traducción de etiquetas.

### `accountTypeOptions`

**Código:**

```json
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
}
```


Array de 4 objetos `{ value, label }`:

| `value` (guardado en modelo) | Clave `label` | Texto ES |
|------------------------------|---------------|----------|
| Cuenta Nómina | `CUSTOMER_MODIFICATION.OPTIONS.ACCOUNT_TYPE.PAYROLL` | Cuenta Nómina |
| Cuenta Ahorro | `...SAVINGS` | Cuenta Ahorro |
| Cuenta Empresa | `...BUSINESS` | Cuenta Empresa |
| Cuenta Premium | `...PREMIUM` | Cuenta Premium |

- **`value`:** string exacto persistido en `model.accountType`.
- **`label`:** clave i18n mostrada al usuario.

### `branchOfficeOptions`

**Código:**

```json
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
}
```


Cuatro oficinas; aquí `label` es **texto literal** (no clave i18n):

- Madrid Centro, Barcelona Norte, Sevilla Este, Valencia Central.

Los `value` deben coincidir con los usados en `clients.json` cuando se quiera coherencia visual.

### `yesNoOptions`

**Código:**

```json
{
  "yesNoOptions": [
    {
      "value": true,
      "label": "OPTIONS_DATA.YES_NO.YES.LABEL"
    },
    {
      "value": false,
      "label": "OPTIONS_DATA.YES_NO.NO.LABEL"
    }
  ]
}
```


| `value` | `label` |
|---------|---------|
| `true` | `OPTIONS_DATA.YES_NO.YES.LABEL` |
| `false` | `OPTIONS_DATA.YES_NO.NO.LABEL` |

Definido en el mock pero **ningún campo del formulario de customer-modification** referencia `yesNoOptions` en este JSON. Se incluye por homogeneidad con otros formularios del catálogo o uso futuro.

### `preferredContactMethodOptions`

**Código:**

```json
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
```


| `value` | Significado |
|---------|-------------|
| EMAIL | Correo electrónico |
| PHONE | Teléfono |
| SMS | SMS |

Claves bajo `CUSTOMER_MODIFICATION.OPTIONS.PREFERRED_CONTACT.*`.

---

## Bloque `distributorBeInterestedItems`

**Fragmento de código:**

```json
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
```


Array de **10 objetos**. Cada uno representa una tarjeta en la sección «También te puede interesar» del distribuidor.

### Propiedades comunes

**Código:**

```json
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
}
```


| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `tealium` | objeto | Configuración de analítica Tealium al hacer clic. |
| `tealium.key` | string | Namespace del evento, aquí `"distributor.events"`. |
| `tealium.parentKey` | string | Sub-evento, aquí `"clickElement"`. |
| `hideExpression` | boolean o string | Si es `true`, oculta la tarjeta. Si es string, expresión evaluada contra `model` (p. ej. canal). |
| `icon` | string | Nombre del icono en el design system. |
| `title` | string | Clave i18n del título. |
| `description` | string | Clave i18n del subtítulo. |
| `path` | string (opcional) | Ruta interna Angular, p. ej. `/customer-modification`. |
| `externalLink` | objeto (opcional) | Navegación a flujos externos parametrizados. |
| `isNovation` | boolean (opcional) | Flag especial para novación. |

---

### Ítem 1 — Modificar cliente bancario

**Código:**

```json
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
}
```


| Campo | Valor |
|-------|-------|
| `hideExpression` | `false` (siempre visible) |
| `icon` | `edit` |
| `title` | `DISTRIBUTOR.BE_INTERESTED.CUSTOMER_MODIFICATION.TITLE` |
| `description` | `DISTRIBUTOR.BE_INTERESTED.CUSTOMER_MODIFICATION.SUMMARY` |
| `path` | `/customer-modification` |

**Navegación interna** a la feature documentada en este repositorio. No usa `externalLink`.

---

### Ítem 2 — Modificar préstamo hipotecario (novación)

**Código:**

```json
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
}
```


| Campo | Valor |
|-------|-------|
| `icon` | `mortgage` |
| `title` | `DISTRIBUTOR.BE_INTERESTED.NOVATION.TITLE` |
| `path` | `/novation` |
| `isNovation` | `true` |

Marca explícita de flujo de novación para lógica condicional del distribuidor.

---

### Ítem 3 — Cancelación registral

**Código:**

```json
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
}
```


| Campo | Valor |
|-------|-------|
| `icon` | `mortgages-euro` |
| `title` | Certificado de deuda cero / cancelación registral |
| `externalLink.key` | `cancellationRegistration` |

#### `externalLink.officeParams`

**Código:**

```json
{
  "origin": "ADN",
  "customerId": "model.customer.applicant.applicantId",
  "ope": "hipreg",
  "token": "model.queryParams.token",
  "language": "model.queryParams.language"
}
```


Parámetros para canal oficina (`origin: "ADN"`, `ope: "hipreg"`, etc.). Valores como `"model.customer.applicant.applicantId"` son **rutas de modelo**, no strings literales: el runtime los resuelve al valor real del cliente.

#### `externalLink.params`

**Código:**

```json
{
  "origin": "APP",
  "path": "cancelacion-registral",
  "operationChannel": "APP-INT",
  "carryAppVersion": "model.queryParams.carryAppVersion"
}
```


Parámetros app (`origin: "APP"`, `path: "cancelacion-registral"`, `operationChannel: "APP-INT"`, etc.).

---

### Ítem 4 — Vender tu vivienda

**Código:**

```json
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
}
```


| Campo | Valor |
|-------|-------|
| `icon` | `realestatecredit` |
| `externalLink.key` | `sellingHouse` |
| `params.channel` | `model.routeParams.channel` |
| `params.applicantId` | `model.customer.applicant.applicantId` |

Enlace externo con canal y id del solicitante tomados del modelo de sesión.

---

### Ítem 5 — Alquilar tu vivienda

**Código:**

```json
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
}
```


| Campo | Valor |
|-------|-------|
| `icon` | `renting-home` |
| `externalLink.key` | `rentYourHouse` |

Solo define la clave del enlace; sin `params` adicionales en el mock.

---

### Ítem 6 — Simular seguro de hogar

**Código:**

```json
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
}
```


| Campo | Valor |
|-------|-------|
| `hideExpression` | `"model.channel==='NHB' \|\| model.channel==='RED' \|\| model.channel==='OFI'"` |
| `icon` | `protected-home` |
| `externalLink.key` | `simulateInsurance` |

**Expresión de visibilidad:** la tarjeta se **oculta** cuando el canal es NHB, RED u OFI. En otros canales se muestra.

Los operadores `===` y `||` se evalúan en el motor de expresiones del distribuidor.

---

### Ítem 7 — Promociones de obra nueva

**Código:**

```json
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
}
```


| Campo | Valor |
|-------|-------|
| `hideExpression` | `true` (siempre oculto en este mock) |
| `icon` | `franchise` |
| `externalLink.key` | `workPromotions` |
| `params.canal` | `"MOV"` (literal fijo) |

Útil para probar tarjetas deshabilitadas por configuración.

---

### Ítem 8 — Instalar paneles solares

**Código:**

```json
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
}
```


| Campo | Valor |
|-------|-------|
| `hideExpression` | `true` |
| `icon` | `solar-energy` |
| `externalLink.key` | `solarPanelEnergy` |
| `params` | `channel` y `applicantId` desde modelo |

Igual que ítem 7: oculto por defecto en el mock.

---

### Ítem 9 — Calcular ahorro energético

**Código:**

```json
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
}
```


| Campo | Valor |
|-------|-------|
| `icon` | `saving-investment` |
| `externalLink.key` | `calculateEnergySavings` |

**Nota:** este objeto **no** define `hideExpression` en el JSON. El comportamiento por defecto del componente distribuidor aplicará su regla habitual (normalmente visible salvo otra lógica).

---

### Ítem 10 — Contratar alarma

**Código:**

```json
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
```


| Campo | Valor |
|-------|-------|
| `hideExpression` | `"model.channel !== 'MOV'"` |
| `icon` | `security` |
| `externalLink.key` | `contractAlarm` |
| `params.operativa` | `"mpa"` |
| `params.operationChannel` | `"APP-INT"` |
| `params.canal` | `model.routeParams.channel` |

Solo visible cuando el canal es exactamente **`MOV`** (móvil).

---

## Claves i18n referenciadas

Las traducciones en español viven en `src/assets/i18n/es.json`, secciones:

- `CUSTOMER_MODIFICATION.*` — formulario, resumen, opciones, validadores.
- `DISTRIBUTOR.BE_INTERESTED.*` — títulos del distribuidor.
- `ACTIONS.*` — Continuar, Buscar, Solicitar modificación.
- `OPTIONS_DATA.YES_NO.*` — Sí/No genérico.

Si cambias una clave en el JSON de parámetros, debes añadir la entrada correspondiente en i18n o la UI mostrará la clave cruda.

---

## Relación con el código Angular

| Pieza | Uso del JSON |
|-------|----------------|
| `StorageService.getParameters()` | Carga el catálogo (en integración suele ser `parameters.json` completo). |
| `CustomerModificationService.getFormConfiguration()` | Extrae `customerModification` del catálogo. |
| `CustomerModificationComponent` | Construye Formly `fields`, `model`, `options.formState`. |
| `app.module.ts` | Registra validadores por `name` referenciados en `validators.validation`. |
| Distribuidor | Lee `distributorBeInterestedItems` para pintar tarjetas y enlaces. |

Validadores referenciados en este archivo y su implementación:

| Nombre en JSON | Archivo |
|----------------|---------|
| `noNumbers` | `customer-modification.validators.ts` |
| `emailFormat` | idem |
| `onlyNumbers` | idem |
| `maxNineDigits` | idem |
| `ibanFormat` | idem |
| `transferLimitRange` | idem (rango 0–3000) |

---

## Archivo fuente

Ruta: `api/public/mocks/v1/parameters-customer-modification.json`

Ver también: [parameters.json.md](./parameters.json.md) — copia para integración del mismo contenido.
