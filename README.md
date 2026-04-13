import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { FormOption } from '../../models/form-option.model';

@Component({
  selector: 'app-service-selector-field',
  templateUrl: './service-selector-field.component.html',
  styleUrls: ['./service-selector-field.component.scss'],
})
export class ServiceSelectorFieldComponent extends FieldType {
  public get serviceOptions(): FormOption[] {
    return (this.props['options'] as FormOption[]) || [];
  }

  public selectService(value: string): void {
    if (this.formControl.disabled) {
      return;
    }

    if (this.formControl.value === value) {
      return;
    }

    this.formControl.setValue(value);
    this.formControl.markAsDirty();
    this.formControl.markAsTouched();
  }

  public isSelected(value: string): boolean {
    return this.formControl.value === value;
  }

  public buildOptionId(value: string): string {
    return `serviceOption${value.charAt(0).toUpperCase()}${value.slice(1)}`;
  }
}
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Subject, takeUntil } from 'rxjs';
import { FormConfigService } from '../../../../core/services/form-config.service';
import { FormOption } from '../../../../shared/models/form-option.model';
import {
  ElectricityRateType,
  GasRateType,
  ServiceFormDraft,
  ServiceFormPayload,
  ServiceType,
} from '../../../../shared/models/service-form.model';

@Component({
  selector: 'app-service-contract-form',
  templateUrl: './service-contract-form.component.html',
  styleUrls: ['./service-contract-form.component.scss'],
})
export class ServiceContractFormComponent implements OnInit, OnDestroy {
  public form: FormGroup = new FormGroup({});
  public model: ServiceFormDraft = {};
  public options: FormlyFormOptions = {};
  public fields: FormlyFieldConfig[] = [];
  public submitLabel: string = '';
  public loadError: string = '';
  private readonly _destroy$ = new Subject<void>();
  private _serviceOptions: FormOption[] = [];

  constructor(private readonly _formConfigService: FormConfigService) { }

  ngOnInit(): void {
    this._formConfigService
      .getServiceContractConfig()
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (config) => {
          this.loadError = '';
          this.submitLabel = config.submitLabel;
          this.fields = config.fields;
          this._serviceOptions = this._extractServiceOptions(config.fields);
        },
        error: () => {
          this.fields = [];
          this.loadError = 'Unable to load form configuration.';
        },
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public submitForm(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log('Form data:', this._buildSubmitPayload());
  }

  public clearForm(): void {
    if (this.options.resetModel) {
      this.options.resetModel();
      return;
    }

    this.model = {};
    this.form.reset();
  }

  public toggleService(): void {
    if (!this._serviceOptions.length) {
      return;
    }

    const currentIndex = this._serviceOptions.findIndex((option) => option.value === this.model.service);
    const nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % this._serviceOptions.length;
    const nextService = this._serviceOptions[nextIndex].value as ServiceType;

    this.form.get('service')?.setValue(nextService);
    this.form.get('service')?.markAsTouched();
  }

  public get hasSelectedService(): boolean {
    return !!this.model.service;
  }

  public get selectedServiceLabel(): string {
    const selectedOption = this._serviceOptions.find((option) => option.value === this.model.service);
    return selectedOption?.label || '';
  }

  public get toggleServiceLabel(): string {
    if (!this.hasSelectedService) {
      return 'Switch service';
    }

    const currentIndex = this._serviceOptions.findIndex((option) => option.value === this.model.service);
    const nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % this._serviceOptions.length;
    const nextLabel = this._serviceOptions[nextIndex]?.label || 'service';
    return `Switch to ${nextLabel}`;
  }

  private _extractServiceOptions(fields: FormlyFieldConfig[]): FormOption[] {
    const serviceField = fields.find((field) => field.key === 'service');
    return (serviceField?.props?.['options'] as FormOption[]) || [];
  }

  private _buildSubmitPayload(): ServiceFormPayload {
    const name = this.model.name || '';
    const email = this.model.email || '';
    const service = this.model.service;

    if (service === 'gas') {
      return {
        name,
        email,
        service,
        rateGas: this.model.rateGas as GasRateType,
        consumption: Number(this.model.consumption),
      };
    }

    if (service === 'electricity') {
      return {
        name,
        email,
        service,
        rateElectricity: this.model.rateElectricity as ElectricityRateType,
        power: Number(this.model.power),
      };
    }

    throw new Error('Service type is required to build payload.');
  }
}
{
  "submitLabel": "Submit form",
  "fields": [
    {
      "key": "name",
      "type": "input",
      "props": {
        "type": "text",
        "label": "Name",
        "placeholder": "Enter your name",
        "required": true
      },
      "validation": {
        "messages": {
          "required": "Name is required."
        }
      }
    },
    {
      "key": "email",
      "type": "input",
      "props": {
        "type": "email",
        "label": "Email",
        "placeholder": "name@domain.com",
        "required": true
      },
      "validators": {
        "validation": [
          "email"
        ]
      },
      "validation": {
        "messages": {
          "required": "Email is required.",
          "email": "Enter a valid email."
        }
      }
    },
    {
      "key": "service",
      "type": "service-selector",
      "props": {
        "label": "Service type",
        "required": true,
        "requiredMessage": "You must select a service type.",
        "options": [
          {
            "label": "Gas",
            "value": "gas",
            "hint": "TUR and free market rates"
          },
          {
            "label": "Electricity",
            "value": "electricity",
            "hint": "Fixed and variable rates"
          }
        ]
      },
      "validation": {
        "messages": {
          "required": "You must select a service type."
        }
      }
    },
    {
      "key": "rateElectricity",
      "type": "select",
      "resetOnHide": true,
      "props": {
        "label": "Rate type (Electricity)",
        "placeholder": "Select a rate",
        "options": [
          {
            "label": "Fixed",
            "value": "fixed"
          },
          {
            "label": "Variable",
            "value": "variable"
          }
        ]
      },
      "expressions": {
        "hide": "model.service !== \"electricity\"",
        "props.required": "model.service === \"electricity\""
      },
      "validation": {
        "messages": {
          "required": "Electricity rate is required."
        }
      }
    },
    {
      "key": "power",
      "type": "input",
      "resetOnHide": true,
      "props": {
        "type": "number",
        "label": "Contracted power",
        "placeholder": "Example: 4.6",
        "min": 1
      },
      "expressions": {
        "hide": "model.service !== \"electricity\"",
        "props.required": "model.service === \"electricity\""
      },
      "validation": {
        "messages": {
          "required": "Contracted power is required.",
          "min": "Power must be greater than 0."
        }
      }
    },
    {
      "key": "rateGas",
      "type": "select",
      "resetOnHide": true,
      "props": {
        "label": "Rate type (Gas)",
        "placeholder": "Select a rate",
        "options": [
          {
            "label": "TUR",
            "value": "tur"
          },
          {
            "label": "Free market",
            "value": "freeMarket"
          }
        ]
      },
      "expressions": {
        "hide": "model.service !== \"gas\"",
        "props.required": "model.service === \"gas\""
      },
      "validation": {
        "messages": {
          "required": "Gas rate is required."
        }
      }
    },
    {
      "key": "consumption",
      "type": "input",
      "resetOnHide": true,
      "props": {
        "type": "number",
        "label": "Estimated consumption",
        "placeholder": "Example: 120",
        "min": 1
      },
      "expressions": {
        "hide": "model.service !== \"gas\"",
        "props.required": "model.service === \"gas\""
      },
      "validation": {
        "messages": {
          "required": "Estimated consumption is required.",
          "min": "Consumption must be greater than 0."
        }
      }
    }
  ]
}
