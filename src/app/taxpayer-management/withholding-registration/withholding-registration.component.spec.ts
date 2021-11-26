import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithholdingRegistrationComponent } from './withholding-registration.component';

describe('WithholdingRegistrationComponent', () => {
  let component: WithholdingRegistrationComponent;
  let fixture: ComponentFixture<WithholdingRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithholdingRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WithholdingRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
