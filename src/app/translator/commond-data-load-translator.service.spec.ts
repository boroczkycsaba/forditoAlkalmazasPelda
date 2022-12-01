import { TestBed } from '@angular/core/testing';

import { CommondDataLoadTranslatorService } from './commond-data-load-translator.service';

describe('CommondDataLoadTranslatorService', () => {
  let service: CommondDataLoadTranslatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommondDataLoadTranslatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
