import { NgModule } from "@angular/core";
import { ServiceContractFormComponent } from "./service-contract-form/service-contract-form.component";
import { CommonModule } from "@angular/common";
import { FormlyModule } from "@ngx-formly/core";
import { ReactiveFormsModule } from "@angular/forms";
import { FormlyPrimeNGModule } from "@ngx-formly/primeng";

@NgModule({
    declarations: [ServiceContractFormComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormlyModule,
        FormlyPrimeNGModule,
    ],
    exports: [ServiceContractFormComponent],
})
export class ServiceContractModule {}