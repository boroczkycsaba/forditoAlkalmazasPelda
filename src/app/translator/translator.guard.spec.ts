import { TestBed } from '@angular/core/testing';

import { TranslatorGuard } from './translator.guard';

describe('TranslatorGuard', () => {
  let guard: TranslatorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TranslatorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
