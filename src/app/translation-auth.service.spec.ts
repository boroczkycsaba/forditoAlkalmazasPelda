import { TestBed } from '@angular/core/testing';

import { TranslationAuthService } from './translation-auth.service';

describe('TranslationAuthService', () => {
  let service: TranslationAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslationAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
