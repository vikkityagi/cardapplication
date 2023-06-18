import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationOfficeComponent } from './organization-office.component';

describe('OrganizationOfficeComponent', () => {
  let component: OrganizationOfficeComponent;
  let fixture: ComponentFixture<OrganizationOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationOfficeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
