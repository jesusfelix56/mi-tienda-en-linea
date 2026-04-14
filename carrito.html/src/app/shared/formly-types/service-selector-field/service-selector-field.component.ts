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
