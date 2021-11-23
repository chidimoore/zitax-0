import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { KYCComponent } from './kyc/kyc/kyc.component';
import { KYCComponent } from './taxpayer-management/kyc/kyc.component';
const routes: Routes = [
  {path:'outerKYC',
  component:KYCComponent},
  {
    path:'',
    loadChildren: () => import('./Main/main.module').then(m => m.MainModule)
  }
,
  {
    path:'',
    loadChildren: () => import('./taxpayer-management/taxpayer-management.module').then(m => m.TaxpayerManagementModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
