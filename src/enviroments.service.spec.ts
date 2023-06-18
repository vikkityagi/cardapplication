import { TestBed } from '@angular/core/testing';

import { EnviromentsService } from './enviroments.service';

describe('EnviromentsService', () => {
  let service: EnviromentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnviromentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
