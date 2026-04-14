import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormlyModule } from '@ngx-formly/core';
import { ServiceContractModule } from './features/service-contract/components/service-contract.module';
import { FormlyTypesModule } from './shared/formly-types/formly-types.module';
import { Validators } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormlyModule.forRoot({
      validators: [
        {
          name: 'email',
          validation: Validators.email,
        },
      ],
    }),
    FormlyTypesModule,
    ServiceContractModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
 