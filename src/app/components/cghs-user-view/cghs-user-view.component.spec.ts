import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CghsUserViewComponent } from './cghs-user-view.component';

describe('CghsUserViewComponent', () => {
  let component: CghsUserViewComponent;
  let fixture: ComponentFixture<CghsUserViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CghsUserViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CghsUserViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
