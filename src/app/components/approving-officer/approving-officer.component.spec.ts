import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovingOfficerComponent } from './approving-officer.component';

describe('ApprovingOfficerComponent', () => {
  let component: ApprovingOfficerComponent;
  let fixture: ComponentFixture<ApprovingOfficerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovingOfficerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovingOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
