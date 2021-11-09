import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
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
