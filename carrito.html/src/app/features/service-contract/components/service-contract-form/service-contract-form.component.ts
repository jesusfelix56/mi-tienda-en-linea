import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Subject, takeUntil } from 'rxjs';
import { FormConfigService } from '../../../../core/services/form-config.service';
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
  public form = new FormGroup({});
  public model: ServiceFormDraft = {};
  public options: FormlyFormOptions = {};
  public fields: FormlyFieldConfig[] = [];
  public submitLabel = '';
  public loadError = '';

  private readonly _destroy$ = new Subject<void>();

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
    if (this.form.invalid || !this.model.service) {
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

  public get hasSelectedService(): boolean {
    return !!this.model.service;
  }

  public get selectedServiceLabel(): string {
    return this.model.service === 'gas'
      ? 'Gas'
      : this.model.service === 'electricity'
      ? 'Electricity'
      : '';
  }

  private _buildSubmitPayload(): ServiceFormPayload {
    const { name = '', email = '', service } = this.model;

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