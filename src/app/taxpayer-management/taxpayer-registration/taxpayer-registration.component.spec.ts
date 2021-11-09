import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxpayerRegistrationComponent } from './taxpayer-registration.component';

describe('TaxpayerRegistrationComponent', () => {
  let component: TaxpayerRegistrationComponent;
  let fixture: ComponentFixture<TaxpayerRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxpayerRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxpayerRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
