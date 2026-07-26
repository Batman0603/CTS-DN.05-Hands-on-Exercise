import { TestBed } from '@angular/core/testing';

import { unsavedChangesGuard } from './unsaved-changes-guard';

describe('unsavedChangesGuard', () => {
  const executeGuard = (...guardParameters: any[]) => 
      TestBed.runInInjectionContext(() => unsavedChangesGuard(...guardParameters as [any, any, any, any]));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
