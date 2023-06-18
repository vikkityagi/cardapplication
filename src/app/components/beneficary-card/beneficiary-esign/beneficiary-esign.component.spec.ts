import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiaryEsignComponent } from './beneficiary-esign.component';

describe('BeneficiaryEsignComponent', () => {
  let component: BeneficiaryEsignComponent;
  let fixture: ComponentFixture<BeneficiaryEsignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeneficiaryEsignComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeneficiaryEsignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
