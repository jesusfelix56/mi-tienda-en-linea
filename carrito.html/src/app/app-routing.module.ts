import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceContractFormComponent } from './features/service-contract/components/service-contract-form/service-contract-form.component';

const routes: Routes = [
  {
    path: '',
    component: ServiceContractFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }