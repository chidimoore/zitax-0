import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { TaxpayerManagementRoutingModule } from './taxpayer-management-routing.module';
import { TaxpayerRegistrationComponent } from './taxpayer-registration/taxpayer-registration.component';
// import { RegistrationOfTaxpayerComponent } from './registration-of-taxpayer/registration-of-taxpayer.component';


@NgModule({
  declarations: [
    TaxpayerRegistrationComponent,
    TaxpayerRegistrationComponent 
  ],
  imports: [
    CommonModule,
    TaxpayerManagementRoutingModule,
    MaterialModule
  ]
})
export class TaxpayerManagementModule { }
