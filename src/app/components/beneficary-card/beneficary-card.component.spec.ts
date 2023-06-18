import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficaryCardComponent } from './beneficary-card.component';

describe('BeneficaryCardComponent', () => {
  let component: BeneficaryCardComponent;
  let fixture: ComponentFixture<BeneficaryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeneficaryCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeneficaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
