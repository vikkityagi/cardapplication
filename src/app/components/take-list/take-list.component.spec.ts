import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeListComponent } from './take-list.component';

describe('TakeListComponent', () => {
  let component: TakeListComponent;
  let fixture: ComponentFixture<TakeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TakeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TakeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
