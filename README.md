Práctica Angular: Formulario dinámico con Formly

Desarrollar un formulario dinámico utilizando ngx-formly que permita gestionar la contratación de servicios (Gas o Electricidad), incluyendo lógica condicional y un componente personalizado.

1. Formulario base

El formulario debe incluir los siguientes campos:

- Nombre

- Tipo: texto

- Obligatorio


- Email

- Tipo: email

- Obligatorio

- Validación de formato


- Tipo de servicio

- Campo obligatorio

- Debe implementarse mediante un componente personalizado, no un select corriente (Ver punto 6).

- Opciones:

- Gas

- Electricidad


2. Campos dependientes

El formulario debe mostrar u ocultar campos dinámicamente en función del tipo de servicio seleccionado:

Si el usuario selecciona Electricidad:

- Tipo de tarifa. Opciones:

- Fija

- Variable

- Potencia contratada (numérico, obligatorio).

Si el usuario selecciona Gas:

- Tipo de tarifa. Opciones:

- TUR

- Mercado libre

- Consumo estimado (numérico, obligatorio).


3. Comportamiento dinámico

- Los campos deben:

- Aparecer y desaparecer dinámicamente

- Ser obligatorios únicamente cuando estén visibles


4. Envío del formulario

- Añadir un botón de envío

- Al enviar:

- Validar el formulario

- Mostrar por consola el objeto con los datos introducidos

Ejemplo de estructura esperada:

{

"name": "Juan", "email": "juan@email.com",

"service": "Gas",

"rateGas": "tur",

"consumption": 120

}


5. Requisitos técnicos

- Uso obligatorio de Reactive Forms

- Uso obligatorio de ngx-formly

- El formulario debe definirse mediante configuración ("FormlyFieldConfig[]")

- No se permite crear inputs manualmente en HTML, exceptuando el componente propio.


6. Componente personalizado (obligatorio)

Se debe crear un custom field de Formly para el campo Tipo de servicio:

- Debe permitir seleccionar entre Gas y Electricidad

- Puede implementarse como:

- Botones

- Toggle

- Tarjetas clicables

- Debe integrarse correctamente con el formulario (usar "formControl")


Validaciones

- Nombre obligatorio

- Email obligatorio y con formato válido

- Campos dependientes obligatorios solo cuando estén visibles


Bonus (opcional)

- Limpiar los valores de campos ocultos al cambiar el tipo de servicio

- Personalizar mensajes de error

- Mejorar la interfaz visual
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
  protected form: FormGroup = new FormGroup({});
  protected model: ServiceFormDraft = {};
  protected options: FormlyFormOptions = {};
  protected fields: FormlyFieldConfig[] = [];
  protected submitLabel: string = '';
  protected loadError: string = '';
  private readonly _destroy$ = new Subject<void>();
  private _serviceOptions: FormOption[] = [];

  constructor(private readonly _formConfigService: FormConfigService) {}

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

  protected _submitForm(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log('Form data:', this._buildSubmitPayload());
  }

  protected _clearForm(): void {
    if (this.options.resetModel) {
      this.options.resetModel();
      return;
    }

    this.model = {};
    this.form.reset();
  }

  protected _toggleService(): void {
    if (!this._serviceOptions.length) {
      return;
    }

    const currentIndex = this._serviceOptions.findIndex((option) => option.value === this.model.service);
    const nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % this._serviceOptions.length;
    const nextService = this._serviceOptions[nextIndex].value as ServiceType;

    this.form.get('service')?.setValue(nextService);
    this.form.get('service')?.markAsTouched();
  }

  protected get _hasSelectedService(): boolean {
    return !!this.model.service;
  }

  protected get _selectedServiceLabel(): string {
    const selectedOption = this._serviceOptions.find((option) => option.value === this.model.service);
    return selectedOption?.label || '';
  }

  protected get _toggleServiceLabel(): string {
    if (!this._hasSelectedService) {
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

