import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenDraftListComponent } from './ben-draft-list.component';

describe('BenDraftListComponent', () => {
  let component: BenDraftListComponent;
  let fixture: ComponentFixture<BenDraftListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenDraftListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenDraftListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
