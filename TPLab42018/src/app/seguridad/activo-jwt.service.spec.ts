import { TestBed, inject } from '@angular/core/testing';

import { ActivoJwtService } from './activo-jwt.service';

describe('ActivoJwtService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActivoJwtService]
    });
  });

  it('should be created', inject([ActivoJwtService], (service: ActivoJwtService) => {
    expect(service).toBeTruthy();
  }));
});
