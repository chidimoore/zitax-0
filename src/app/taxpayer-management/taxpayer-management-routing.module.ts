import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaxpayerRegistrationComponent } from './taxpayer-registration/taxpayer-registration.component';
// import { TaxpayerRegistrationComponent} from './taxpayer-registration/taxpayer-registration.component';
import { MainComponent } from '../Main/main.component';
import { KYCComponent } from './kyc/kyc.component';
const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path:'taxpayerRegistration',
        component: TaxpayerRegistrationComponent
      },
      {
        path:'kyc',
        component: KYCComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaxpayerManagementRoutingModule { }
