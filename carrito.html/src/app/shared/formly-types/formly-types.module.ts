import { NgModule } from '@angular/core';
import { ServiceSelectorFieldComponent } from './service-selector-field/service-selector-field.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';

@NgModule({
  declarations: [ServiceSelectorFieldComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'service-selector',
          component: ServiceSelectorFieldComponent,
        },
      ],
    }),
  ],
})
export class FormlyTypesModule {}
