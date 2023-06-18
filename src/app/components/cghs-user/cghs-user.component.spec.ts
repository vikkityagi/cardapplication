import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CghsUserComponent } from './cghs-user.component';

describe('CghsUserComponent', () => {
  let component: CghsUserComponent;
  let fixture: ComponentFixture<CghsUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CghsUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CghsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
