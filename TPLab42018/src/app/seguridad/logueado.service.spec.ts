import { TestBed, inject } from '@angular/core/testing';

import { LogueadoService } from './logueado.service';

describe('LogueadoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogueadoService]
    });
  });

  it('should be created', inject([LogueadoService], (service: LogueadoService) => {
    expect(service).toBeTruthy();
  }));
});
