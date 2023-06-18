import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetcardComponent } from './getcard.component';

describe('GetcardComponent', () => {
  let component: GetcardComponent;
  let fixture: ComponentFixture<GetcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetcardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
