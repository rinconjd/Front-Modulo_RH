import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { empleadoRoleGuard } from './empleado-role.guard';

describe('empleadoRoleGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => empleadoRoleGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
