import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Nodal2Component } from './nodal2.component';

describe('Nodal2Component', () => {
  let component: Nodal2Component;
  let fixture: ComponentFixture<Nodal2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Nodal2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Nodal2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
