import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilydetailFormComponent } from './familydetail-form.component';

describe('FamilydetailFormComponent', () => {
  let component: FamilydetailFormComponent;
  let fixture: ComponentFixture<FamilydetailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilydetailFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamilydetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
